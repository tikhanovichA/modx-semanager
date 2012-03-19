SEManager.grid.Snippets = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        url: SEManager.config.connector_url
        ,baseParams: {
            action: 'mgr/snippets/getlist'
        }
        ,save_action: 'mgr/snippets/updatefromgrid'
        ,id: 'semanager-grid-snippets'
        //,fields: ['id','source','name','description','category','locked','static','static_file']
        ,fields: ['id','name','static','static_file']
        ,paging: true
        ,pageSize: MODx.config.default_per_page > 10 ? MODx.config.default_per_page : 10

        ,autosave: true
        ,autoHeight: true
        ,remoteSort: true
        ,clicksToEdit: 2

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
    SEManager.grid.Snippets.superclass.constructor.call(this, config);
};
Ext.extend(SEManager.grid.Snippets, MODx.grid.Grid);
Ext.reg('semanager-grid-snippets',SEManager.grid.Snippets);

