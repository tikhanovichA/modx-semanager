SEManager.grid.Templates = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'semanager-grid-templates'
        ,url: SEManager.config.connector_url
        ,baseParams: {
            action: 'mgr/templates/getlist'
        }
        ,save_action: 'mgr/templates/updatefromgrid'
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
    SEManager.grid.Templates.superclass.constructor.call(this, config);
};
Ext.extend(SEManager.grid.Templates, MODx.grid.Grid);
Ext.reg('semanager-grid-templates',SEManager.grid.Templates);

