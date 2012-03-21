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
     * @var string
     */
    public $elements_dir = '';

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
     * Make synchronization of all Elements
     */
    public function syncAll(){

        // 1. проверить, есть ли папка elements  в assets. если папки нет - создать
        $this->elements_dir = $this->modx->getOption('semanager.elements_dir', null, MODX_ASSETS_PATH . '/elements/');

        if (!file_exists($this->elements_dir)){
            $this->_makeDirs($this->elements_dir);
        }

        // 2. проверить настройку - использовать ли типы. если да, то создать папки нужные
        $type_separation = $this->modx->getOption('semanager.type_separation', null, true);

        if($type_separation){

            $dirs = array(
                'modTemplate' => $this->elements_dir . 'templates/',
                'modChunk'    => $this->elements_dir . 'chunks/',
                'modSnippet'  => $this->elements_dir . 'snippets/',
                'modPlugin'   => $this->elements_dir . 'plugins/'
            );

            foreach($dirs as $type => $dir){
                $this->_makeDirs($dir);
                $this->manyElementsToStatic($type, $dir);
            }

        }else{

            $types = array(
                'modTemplate',
                'modChunk',
                'modSnippet',
                'modPlugin'
            );

            foreach($types as $type){
                $this->manyElementsToStatic($type);
            }

        }

        // диверсия против сниппета
        $snippet = $this->modx->getObject('modSnippet', array('id' => 7));

        $filename_tpl_snippet = $this->modx->getOption('semanager.filename_tpl_snippet', null, '{name}.sn.php');

        $filename = $this->elements_dir . 'snippets/' . str_replace('{name}', $snippet->name, $filename_tpl_snippet);

        //touch($filename);

        $cmap = $this->getCategoriesMap($snippet->category);


    }

    public function oneElementToStatic($element, $path){

        $use_categories = $this->modx->getOption('semanager.use_categories', null, true);

        if($use_categories){

            $categories_map = $this->getCategoriesMap($element->category);

            if($categories_map != ''){

                $path = $path . $categories_map . '/';
                $this->_makeDirs($path);

            }

        }

        // TODO: отрефакторить. учесть все возможные БД
        $element_class = str_replace(array('_mysql','_sqlsrv'), '', get_class($element));

        $type = strtolower(str_replace('mod', '', $element_class));

        $types = array(
            'template'  => 'tp.html',
            'plugin'    => 'pl.php',
            'snippet'   => 'sn.php',
            'chunks'    => 'ch.html'
        );

        $filename_tpl = $this->modx->getOption('semanager.filename_tpl_' . $type, null, '{name}.'.$types[$type]);

        // fix name notice for templates
        if($element_class == 'modTemplate'){
            $element->name = $element->templatename;
        }

        $file_path = $path . str_replace('{name}', $element->name, $filename_tpl);

        touch($file_path);

        $content = $element->getContent();
        $element->set('static_file', $file_path);
        $element->set('static', true);
        $element->setFileContent($content);

        if($element->save()){
            return true;
        }

    }

    public function manyElementsToStatic($class_name, $path = ''){

        if($path == ''){
            $path = $this->elements_dir;
        }

        $elements = $this->modx->getCollection($class_name);

        foreach($elements as $element){

            $this->oneElementToStatic($element, $path);

        }

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
     * @param $id_category
     * @return string
     */
    public function getCategoriesMap($id_category){

        if($id_category == 0){
            return '';
        }

        // get all categories
        $categories = $this->modx->getCollection('modCategory');
        $list = array();
        foreach($categories as $c){
            $list[$c->id] = array(
                'parent'    => $c->parent,
                'name'      => $c->category
            );
        }

        $map = array();
        $this->_findAllParents($id_category, &$map, $list);

        $map_to_path = join('/',array_reverse($map));

        return $map_to_path;
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
