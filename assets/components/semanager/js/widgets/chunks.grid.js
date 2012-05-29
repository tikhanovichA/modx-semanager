SEManager.grid.Chunks = function(config) {
    config = config || {};
    Ext.applyIf(config,{
         id: 'semanager-grid-chunks'
        ,url: SEManager.config.connector_url
        ,baseParams: {
            action: 'chunks/getlist'
        }
        ,save_action: 'chunks/updatefromgrid'
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
            header: _('is_static')
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
    SEManager.grid.Chunks.superclass.constructor.call(this, config);
};
Ext.extend(SEManager.grid.Chunks, MODx.grid.Grid);
Ext.reg('semanager-grid-chunks',SEManager.grid.Chunks);

