<?php
/**
 * Loads system settings into build
 *
 * @package semanager
 * @subpackage build
 */

$menu= $modx->newObject('modMenu');
$menu->fromArray(array(
    'action' => 'index',
    'namespace' => 'semanager',
    'text' => 'semanager.title',
    'description' => 'semanager.description',
    'parent' => 'components',
    'icon' => '',
    'menuindex' => 0,
    'params' => '',
    'handler' => '',
),'',true,true);

return $menu;