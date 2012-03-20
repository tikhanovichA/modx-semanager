<?php
/**
 * SE Manager
 *
 * Copyright 2012 by Ivan Klimchuk <ivan@klimchuk.com>
 *
 * SE Manager is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * SE Manager is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * SE Manager; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package semanager
 */
class SEManager
{
    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config=array()){
        $this->modx =& $modx;

        $corePath = $this->modx->getOption('semanager.core_path',$config,$this->modx->getOption('core_path').'components/semanager/');
        $assetsUrl = $this->modx->getOption('semanager.assets_url',$config,$this->modx->getOption('assets_url').'components/semanager/');
        $connectorUrl = $assetsUrl.'connector.php';
        $connectorsUrl = $assetsUrl.'connectors/';

        $this->config = array_merge(array(
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl.'css/',
            'jsUrl' => $assetsUrl.'js/',
            'imagesUrl' => $assetsUrl.'img/',

            'connectorUrl' => $connectorUrl,
            'connectorsUrl' => $connectorsUrl,

            'corePath' => $corePath,
            'modelPath' => $corePath.'model/',
            'chunksPath' => $corePath.'elements/chunks/',
            'chunkSuffix' => '.chunk.tpl',
            'snippetsPath' => $corePath.'elements/snippets/',
            'processorsPath' => $corePath.'processors/',
        ),$config);

        if ($this->modx->lexicon) {
            $this->modx->lexicon->load('semanager:default');
        }

        // Вывод ошибок debug only
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
    }

    /**
     * Initializes SE Manager into different contexts.
     *
     * @access public
     * @param string $ctx The context to load. Defaults to web.
     */
    public function initialize($ctx="web"){
        switch($ctx){
            case "mgr":

                if (!$this->modx->loadClass('semanager.request.SEManagerControllerRequest',$this->config['modelPath'],true,true)) {
                    return 'Could not load controller request handler.';
                }
                $this->request = new SEManagerControllerRequest($this);

                return $this->request->handleRequest();

                break;
            case "web":
                return '';
                break;
            default:
                return '';
                break;
        }
    }

    /**
     * Create directory with $name on the $path
     *
     * @access public
     * @param $name
     * @param $path
     */

    public function createDirectory($name, $path){

    }

    /**
     * Make synchronization of all Elements
     */
    public function syncAll(){

        // 1. проверить, есть ли папка elements  в assets. если папки нет - создать
        $elements_dir = $this->modx->getOption('semanager.elements_dir', null, MODX_ASSETS_PATH . '/elements/');

        if (!file_exists($elements_dir)){
            $this->_makeDirs($elements_dir);
        }

        // 2. проверить настройку - использовать ли типы. если да, то создать папки нужные
        $type_separation = $this->modx->getOption('semanager.type_separation', null, true);

        if($type_separation){
            $dirs = array(
                $elements_dir . '/templates',
                $elements_dir . '/chunks',
                $elements_dir . '/snippets',
                $elements_dir . '/plugins'
            );

            foreach($dirs as $dir){
                $this->_makeDirs($dir);
            }
        }

        // 3. проверить настройку - использовать категории - если да, то нужно предварительно для элемента создавать папки с категориями
        $use_categories = $this->modx->getOption('semanager.use_categories', null, true);

        if($use_categories){

            $categories_map = $this->getCategoriesMap();

            // TODO: сделать условие или как-то разрулить момент, чтобы он при включенной настройке - разделение типов - клал папки внутрь этих типов.
            // Ну и нужна видимо проверка на непустые
            foreach($categories_map as $item){
                //$this->_makeDirs($elements_dir .'/'. $item);
            }

        }


        // диверсия против чанков - все в статику
//        $chunks = $this->modx->getCollection('modChunk');
//        foreach($chunks as $chunk){
//            if(!$chunk->isStatic()){
//                $content = $chunk->getContent();
//                $chunk->set('static_file', $elements_dir .'/chunks/' . $chunk->name);
//                $chunk->set('static', true);
//                $chunk->setFileContent($content);
//
//                $chunk->save();
//            }else{
//                $chunk->set('static', false);
//                $chunk->save();
//            }
//            #print_r($chunk->isStatic());
//            #print_r($chunk->get('static_file'));
//            #echo '---';
//        }

        // диверсия против сниппета
        $snippet = $this->modx->getObject('modSnippet', array('id' => 17));

        $filename_tpl_snippet = $this->modx->getOption('semanager.filename_tpl_snippet', null, '{name}.sn.php');

        $filename = $elements_dir . 'snippets/' . str_replace('{name}', $snippet->name, $filename_tpl_snippet);

        touch($filename);

        print_r($filename);

        // получаем до сохранения в файл контент
        $content = $snippet->getContent();

        // говорим в какой файл класть сниппет
        $snippet->set('static_file', $filename);
        // говорим сниппету, что он теперь статичный
        $snippet->set('static', true);
        // кладем контент в файл, ранее сохраненный
        $snippet->setFileContent($content);
        // сохраняеи все.
        $snippet->save();



        #print_r($snippet->static_file);


        // 4. для каждого типа элементов пройтись и сделать запись в файл содержимого с учетом путей
        // если файла нет - пишем смело.
        // если файл есть, но дата изменения элемента в базе новее, чем дата в файле - пишем в файл
        // если файл свежее, то оставляем его как есть
        // или другой способ - для записи в файл-из файла используем api modx, просто записываем элементу путь к статике и включаем флаг - статический.




    }

    /**
     * Рекурсивная функция, которая получает полные пути для вложенных категорий
     *
     * @param $id
     * @param array $parents
     * @param array $category_list
     */
    private function _findAllParents($id, array $parents, array $category_list){

        $parents[] = $category_list[$id]['name'];

        $parent = $category_list[$id]['parent'];

        if($parent != 0){
            $this->_findAllParents($parent, &$parents, $category_list);
        }
    }


    /**
     * Get all categories as map for filesistem
     *
     * @param bool $empty
     * @return array
     */
    public function getCategoriesMap($empty = false){

        // TODO: реализовать возможность определения пустая категория или нет.
        // get all categories
        $categories = $this->modx->getCollection('modCategory');
        $list = array();
        foreach($categories as $c){
            $list[$c->id] = array(
                'parent'    => $c->parent,
                'name'      => $c->category
            );
        }

        $categories_map = array();

        foreach($list as $key => $value){
            $array = array();
            $this->_findAllParents($key, &$array, $list);
            $categories_map[] = join('/',array_reverse($array));
        }

        return $categories_map;
    }

    /**
     * Recursive mkdir function
     *
     * @param $strPath
     * @return bool
     */
    private function _makeDirs($strPath){
        if (is_dir($strPath)) return true;
        $pStrPath = dirname($strPath);
        if (!$this->_makeDirs($pStrPath)) return false;
        return @mkdir($strPath);
    }



}
