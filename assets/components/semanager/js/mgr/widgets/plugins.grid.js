SEManager.grid.Plugins = function(config) {
    config = config || {};
    this.exp = new Ext.grid.RowExpander({
        tpl: new Ext.Template('<p>{description}</p>')
    });

    this.sm = new Ext.grid.CheckboxSelectionModel();

    Ext.applyIf(config,{
        url: SEManager.config.connector_url
        //,fields: ['id','source','name','description','category','locked','static','static_file']
        ,fields: ['id','name','description','static','static_file']
        ,id: 'semanager-grid-plugins'
        ,paging: true
        ,pageSize: MODx.config.default_per_page > 10 ? MODx.config.default_per_page : 10
        ,remoteSort: true
        ,sm: this.sm
        ,plugins: [this.exp]
        ,baseParams: {
            action: 'mgr/plugins/getlist'
        }
        ,save_action: 'mgr/plugins/updatefromgrid'
        //,autosave: true
        //,autoHeight: true
        ,clicksToEdit: 2
        ,columns: [this.exp, this.sm, {
            header: _('id')
            ,dataIndex: 'id'
            ,width: 35
            ,sortable: true
        },{
            header: _('name')
            ,dataIndex: 'name'
            ,sortable: true
        },{
            header: 'is_static'
            ,dataIndex: 'static'
            ,width: 100
            ,sortable: true
        },{
            header: 'path_to_file'
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

