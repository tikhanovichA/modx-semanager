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
class SEManager {
    /**
     * @var string
     */
    public $elements_dir = '';

    public $modx = null;

    public $config = array();

    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config=array()) {
        $this->modx =& $modx;

        $corePath = $this->modx->getOption('semanager.core_path', null, $this->modx->getOption('core_path').'components/semanager/');
        $assetsPath = $this->modx->getOption('semanager.assets_path', null, $this->modx->getOption('assets_path').'components/semanager/');
        $assetsUrl = $this->modx->getOption('semanager.assets_url', null, $this->modx->getOption('assets_url').'components/semanager/');

        $this->config = array_merge(array(
            'corePath' => $corePath,
            'modelPath' => $corePath.'model/',
            'processorsPath' => $corePath.'processors/',
            'controllersPath' => $corePath.'controllers/',
            'templatesPath' => $corePath.'templates/',
            // chunks and snippets

            'baseUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl.'css/',
            'jsUrl' => $assetsUrl.'js/',
            'imgUrl' => $assetsUrl.'img/',
            'connectorUrl' => $assetsUrl.'connector.php',

            'elements_dir' => $this->elements_dir = $this->modx->getOption('semanager.elements_dir', null, MODX_ASSETS_PATH.'/elements/'),
            'filename_tpl_chunk' => $this->elements_dir = $this->modx->getOption('semanager.filename_tpl_chunk', null, '{name}.ch.html'),
            'filename_tpl_plugin' => $this->elements_dir = $this->modx->getOption('semanager.filename_tpl_plugin', null, '{name}.pl.php'),
            'filename_tpl_snippet' => $this->elements_dir = $this->modx->getOption('semanager.filename_tpl_snippet', null, '{name}.sn.php'),
            'filename_tpl_template' => $this->elements_dir = $this->modx->getOption('semanager.filename_tpl_template', null, '{name}.tp.html'),

            'default_filenames' => array(
                'template'  => 'tp.html',
                'plugin'    => 'pl.php',
                'snippet'   => 'sn.php',
                'chunks'    => 'ch.html'),
        ),$config);

        $this->modx->addPackage('semanager', $this->config['modelPath']);

        if ($this->modx->lexicon) {
            $this->modx->lexicon->load('semanager:default');
        }

        $this->initDebug();
    }

    /**
     * Load debugging settings
     */
    public function initDebug() {
        if ($this->modx->getOption('debug',$this->config,false)) {
            error_reporting(E_ALL); ini_set('display_errors',true);
            $this->modx->setLogTarget('HTML');
            $this->modx->setLogLevel(modX::LOG_LEVEL_ERROR);

            $debugUser = $this->config['debugUser'] == '' ? $this->modx->user->get('username') : 'anonymous';
            $user = $this->modx->getObject('modUser',array('username' => $debugUser));
            if ($user == null) {
                $this->modx->user->set('id',$this->modx->getOption('debugUserId',$this->config,1));
                $this->modx->user->set('username',$debugUser);
            } else {
                $this->modx->user = $user;
            }
        }
    }

    /**
     * Initializes SE Manager into different contexts.
     *
     * @access public
     * @param string $ctx The context to load. Defaults to web.
     */
    public function initialize($ctx="mgr"){
        $output = '';
        switch($ctx){
            case "mgr":
                if (!$this->modx->loadClass('semanager.request.SEManagerControllerRequest',$this->config['modelPath'],true,true)) {
                    return 'Could not load controller request handler.';
                }
                $this->request = new SEManagerControllerRequest($this);
                $output = $this->request->handleRequest();
            break;
        }
        return $output;
    }

    /**
     * Make synchronization of all Elements
     */
    public function syncAll(){

        // TODO: перейти на переменную в config
        $this->elements_dir = $this->config['elements_dir'];

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

        $filename_tpl = $this->modx->getOption('semanager.filename_tpl_' . $type, null, '{name}.'.$this->config['default_filenames'][$type]);

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
