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
 * @subpackage processors
 */

if (!isset($modx->semanager) || !is_object($modx->semanager)) {
    $semanager = $modx->getService('semanager','SEManager',$modx->getOption('semanager.core_path',null,$modx->getOption('core_path').'components/semanager/').'model/semanager/', $scriptProperties);
    if (!($semanager instanceof SEManager)) return '---';
}

if (!$modx->hasPermission('view')) {return $modx->error->failure($modx->lexicon('semanager.no_permission'));}

/*
$test = array(
    array(
        "id" => '1',
        "name" => 'name'
    ),
    array(
        "id" => '2',
        "name" => 'name2'
    ),
);

return $this->outputArray($test, 2);
  */

$isLimit    = !empty($_REQUEST['limit']);
$start      = $modx->getOption('start',$_REQUEST,0);
$limit      = $modx->getOption('limit',$_REQUEST,20);
$addall     = $modx->getOption('addall',$_REQUEST, 0);


$c = $modx->newQuery("modCategory");
$total = $modx->getCount("modCategory", $c);

$c->select('id,category');

if ($isLimit)
    $c->limit($limit,$start);

$items = $modx->getCollection('modCategory', $c);

if (!empty($addall)) {
    $list = array(array('id' => 0, 'name' => $modx->lexicon('ms.combo.all')));
}
else {
    $list = array();
}

foreach ($items as $item) {
    $itemArray = $item->toArray();
    $list[]= $itemArray;
}

return $this->outputArray($list,$total);