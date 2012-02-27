SEManager.grid.Plugins = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'semanager-grid-plugins'
        ,url: SEManager.config.connector_url
        ,baseParams: {
            action: 'mgr/plugins/getlist'
        }
        ,save_action: 'mgr/plugins/updatefromgrid'
        ,autosave: true
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,clicksToEdit: true
        //,fields: ['id','source','name','description','category','locked','static','static_file']
        ,fields: ['id','name','static','static_file']
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,width: 35
            ,sortable: true
        },{
            header: _('name')
            ,dataIndex: 'name'
            ,sortable: true
        },{
            header: _('static')
            ,dataIndex: 'static'
            ,width: 100
            ,sortable: true
        },{
            header: _('static_file')
            ,dataIndex: 'static_file'
        }]
        ,listeners: {
            // pass
        }
    });
    SEManager.grid.Plugins.superclass.constructor.call(this, config);
};
Ext.extend(SEManager.grid.Plugins, MODx.grid.Grid);
Ext.reg('semanager-grid-plugins',SEManager.grid.Plugins);

