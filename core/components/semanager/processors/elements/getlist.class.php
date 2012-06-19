<?php

class modSEManagerGetListProcessor extends modObjectGetListProcessor {
    //public $classKey = 'modChunk';
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
        $data = array();

        $type = $this->getProperty('type');
        $this->classKey = 'mod'.ucfirst($type);

        $limit = intval($this->getProperty('limit'));
        $start = intval($this->getProperty('start'));

        $c = $this->modx->newQuery($this->classKey);
        $c = $this->prepareQueryBeforeCount($c);
        $data['total'] = $this->modx->getCount($this->classKey,$c);
        $c = $this->prepareQueryAfterCount($c);

        $sortClassKey = $this->getSortClassKey();
        $sortKey = $this->modx->getSelectColumns($sortClassKey,$this->getProperty('sortAlias',$sortClassKey),'',array($this->getProperty('sort')));
        if (empty($sortKey)) $sortKey = $this->getProperty('sort');
        $c->sortby($sortKey,$this->getProperty('dir'));
        if ($limit > 0) {
            $c->limit($limit,$start);
        }

        //if($this->classKey == 'modTemplate'){

        //}

        //$name = $this->getProperty('name',false);

        //$criteria = array();

        $data['results'] = $this->modx->getCollection($this->classKey, $c);
        return $data;

    }

    public function prepareRow(xPDOObject $object) {
        return $object->toArray();
    }

}
return 'modSEManagerGetListProcessor';