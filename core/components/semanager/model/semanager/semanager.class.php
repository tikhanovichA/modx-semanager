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
            $this->makeDirs($elements_dir);
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
                $this->makeDirs($dir);
            }
        }

        // 3. проверить настройку - использовать категории - если да, то нужно предварительно для элемента создавать папки с категориями
        $use_categories = $this->modx->getOption('semanager.use_categories', null, true);

        if($use_categories){

            $this->getCategories();

            #print_r($c);
        }



        // вывод папку с элементами
        //$d = opendir($elements_dir);
        //while ( $entry = readdir($d) ){
        //    print $entry;
        //}


        // для начала хватит просто имена файлов посоздавать в куче по шаблонам
        // сниппеты
        //$modx->newQuery('modSnippet');
        $c = $this->modx->getCollection('modSnippet', 1);

        #print_r($c);

        //$count = $modx->getCount('modSnippet',$c);





        // 4. для каждого типа элементов пройтись и сделать запись в файл содержимого с учетом путей
        // если файла нет - пишем смело.
        // если файл есть, но дата изменения элемента в базе новее, чем дата в файле - пишем в файл
        // если файл свежее, то оставляем его как есть
        // или другой способ - для записи в файл-из файла используем api modx, просто записываем элементу путь к статике и включаем флаг - статический.




    }

    public function getCategories($empty = false){

        // get all categories
        $categories = $this->modx->getCollection('modCategory');
        $clist = array();
        foreach($categories as $c){
            $clist[] = array(
                $c->id,
                $c->parent,
                $c->category
            );
        }

        $data = array();

        findAllParents($clist[2], &$data);

        function findAllParents($element, array $parents){
            $data[] = $element[2];

            if($element[1] == 0){
                return $data;
            }else{
                findAllParents();
            }
        }

        function buildCategoryRecursive($element, $tree){
            if($element[1] == 0){ // is root element
                $tree[$element[0]] = array(
                    'name' => $element[3],
                    'path' => 'ff'
                );
            }
        }

    }

    /**
     * Recursive mkdir function
     *
     * @param $strPath
     * @return bool
     */
    protected function makeDirs($strPath){
        if (is_dir($strPath)) return true;
        $pStrPath = dirname($strPath);
        if (!$this->makeDirs($pStrPath)) return false;
        return @mkdir($strPath);
    }



}
