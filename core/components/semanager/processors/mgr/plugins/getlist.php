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

$isLimit = !empty($_REQUEST['limit']);
$start = $modx->getOption('start',$_REQUEST,0);
$limit = $modx->getOption('limit',$_REQUEST,20);
$sort = $modx->getOption('sort',$_REQUEST,'pagetitle');
$dir = $modx->getOption('dir',$_REQUEST,'ASC');
$query = $modx->getOption('query',$_REQUEST, 0);

$c = $modx->newQuery('modPlugin');


//$c->where(array('modResource.deleted' => false, 'modResource.template:IN' => $goods_tpls));

// Фильтрация по категории
//if (!empty($category)) {
//    $c->andCondition(array('parent' => $category), '', 1);
//
//    $ids = $modx->miniShop->getGoodsByCategories($category);
//    if (!empty($ids)) {
//        $c->orCondition(array('id:IN' => $ids), '', 1);
//    }
//}

// Фильтрация по строке поиска
//if (!empty($query)) {
//    // Поиск по названию и артиклю
//    $c->andCondition(array('modResource.pagetitle:LIKE' => '%'.$query.'%'), '', 2);
//    $c->orCondition(array('ModGoods.article:LIKE' => '%'.$query.'%'), '', 2);
//}

$count = $modx->getCount('modPlugin',$c);

/*if ($sort == 'id') {$sort = 'modSnippet.id';}
$c->sortby($sort,$dir);
if ($isLimit) {$c->limit($limit,$start);}*/
$elements = $modx->getCollection('modPlugin', $c);

$list = array();
foreach ($elements as $e){
    $item = array(
        'id' => $e->get('id'),
        'name' => $e->get('name'),
        'static' => $e->get('static'),
        'static_file' => $e->get('static_file')
    );
    $list[] = $item;
}

return $this->outputArray($list, $count);


/*$arr = array();
foreach ($goods as $v) {
    $tmp = array(
     'id' => $v->get('id')
    ,'pagetitle' => $v->get('pagetitle')
    ,'parent' => $v->get('parent')
    );
    $tmp['url'] = $this->modx->makeUrl($v->get('id'), '', '', 'full');
    if ($tmp2 = $modx->getObject('ModGoods', array('gid' => $tmp['id'], 'wid' => $warehouse)) ) {
        $tmp2 = $tmp2->toArray();
        unset($tmp2['id'], $tmp2['gid']);
    }
    else {
        $tmp2 = array(
            'wid' => $warehouse
        );
    }

    $tmp = array_merge($tmp, $tmp2);

    $arr[]= $tmp;
}
return $this->outputArray($arr, $count);*/