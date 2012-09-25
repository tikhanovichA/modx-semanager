<?php
class modSEManagerUpdateElementsFromGridProcessor extends modProcessor {

    public $semanager = null;

    public function checkPermissions() {
        return true;
    }

    public function getLanguageTopics() {
        return array('semanager');
    }

    /**
     * {@inheritDoc}
     *
     * @return mixed
     */
    public function process() {

        $data = $this->getProperty('data');
        if (empty($data)) return $this->modx->lexicon('semanager.error.ufg_no_data');

        $this->modx->loadClass("semanager.SEManager");
        $this->semanager = new SEManager($this->modx);

        // get data from row
        $record = $this->modx->fromJSON($data);

        $e = $this->modx->getObject('mod'.ucfirst($record['type']), array(
            'id' => $record['id']
        ));

        $this->modx->log(E_ERROR, $record['static']);

        if($record['static']){
            // make static
            $this->semanager->makeStaticElement($e);

            //$record['static'] = true;
            //$record['static_file'] = $e->static_file;
        }else{
            // unmake static
            $this->semanager->unmakeStaticElement($e);



        }

        return $this->success('Updated');
    }

    /**
     * Validate the passed properties
     *
     * @return boolean
     */
    public function validate() {
        $key = $this->getProperty('key');
        if (empty($key)) {
            $this->addFieldError('key',$this->modx->lexicon('context_err_ns_key'));
        }
        if ($this->context->get('key') != $key) {
            if ($this->alreadyExists($key)) {
                $this->addFieldError('key',$this->modx->lexicon('context_err_ae'));
            }
        }
        return !$this->hasErrors();
    }

    /**
     * Check to see if the context already exists
     *
     * @param string $key
     * @return boolean
     */
    public function alreadyExists($key) {
        return $this->modx->getCount('modContext',$key) > 0;
    }

    /**
     * Run the OnContextUpdate event
     * @return void
     */
    public function runOnUpdateEvent() {
        $this->modx->invokeEvent('OnContextUpdate',array(
            'context' => &$this->context,
            'properties' => $this->getProperties(),
        ));
    }

    /**
     * Log the manager action of updating this Context
     * @return void
     */
    public function logManagerAction() {
        $this->modx->logManagerAction('context_update','modContext',$this->context->get('id'));
    }

}
return 'modSEManagerUpdateElementsFromGridProcessor';