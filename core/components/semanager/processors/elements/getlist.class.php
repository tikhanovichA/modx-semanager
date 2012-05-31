<?php

class modSEManagerGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'modChunk';
    //public $languageTopics = array('');
    //public $permission = '';
    public $defaultSortField = 'name';

    public function initialize() {
        $initialized = parent::initialize();
        $this->setDefaultProperties(array(
            'name' => false,
            'category' => false
        ));
        return $initialized;
    }

    /**
     * Get a collection of modChunk objects
     * @return array
     */
    public function getData() {
        $name = $this->getProperty('name',false);
        $data = array();

        $criteria = array();

        //print_r('ddddd');

        $ch = $this->modx->getCollection('modChunk');




        $data['total'] = $this->modx->getCount('modChunk');
        $data['results'] = $ch;

        return $data;

        /*
        $settingsResult = $this->modx->call('modChunk', 'listSettings', array(
            &$this->modx,
            $criteria,
            array(
                $this->getProperty('sort') => $this->getProperty('dir'),
            ),
            $this->getProperty('limit'),
            $this->getProperty('start'),
        ));
        */

    }

    public function prepareRow(xPDOObject $object) {
        $elementArray = $object->toArray();

        return $elementArray;
    }
}
return 'modSEManagerGetListProcessor';