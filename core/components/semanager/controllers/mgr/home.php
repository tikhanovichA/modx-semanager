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
 * @subpackage controllers
 */

$modx->regClientStartupScript($semanager->config['jsUrl'].'mgr/widgets/snippets.grid.js');
$modx->regClientStartupScript($semanager->config['jsUrl'].'mgr/widgets/chunks.grid.js');
$modx->regClientStartupScript($semanager->config['jsUrl'].'mgr/widgets/templates.grid.js');
$modx->regClientStartupScript($semanager->config['jsUrl'].'mgr/widgets/plugins.grid.js');
$modx->regClientStartupScript($semanager->config['jsUrl'].'mgr/widgets/home.panel.js');
$modx->regClientStartupScript($semanager->config['jsUrl'].'mgr/sections/home.js');

$output = '<div id="semanager-panel-home-div"></div>';

return $output;