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

$modx->regClientStartupScript($semanager->config['jsUrl'].'mgr/semanager.js');
$modx->regClientStartupHTMLBlock('
    <script type="text/javascript">
        Ext.onReady(function() {
            SEManager.config = '.$modx->toJSON($semanager->config).';
            SEManager.config.connector_url = "'.$semanager->config['connectorUrl'].'";
            SEManager.config.connectors_url = "'.$semanager->config['connectorsUrl'].'";
            SEManager.action = "'.(!empty($_REQUEST['a']) ? $_REQUEST['a'] : 0).'";
        });
    </script>');
return '';

