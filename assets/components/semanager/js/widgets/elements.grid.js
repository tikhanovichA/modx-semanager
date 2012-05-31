SEManager.grid.Elements = function(config) {
    config = config || {};


    //выносим во внешний файл либо ниже, в зависимости от конфига
    //будем строить автоматически

    if (!config.tbar) {
        config.tbar = [{
            text: _('quick_create_'+config.type)
            ,handler: {
                xtype: 'modx-window-quick-create-'+config.type
                ,blankValues: true
            }
        }];
    }
    config.tbar.push('->',{
        // custom combo select
        xtype: 'semanager-combo-category'
    },'-',{
        xtype: 'textfield'
        ,name: 'filter_name'
        ,id: 'semanager-filter-name-'+config.type
        ,emptyText: _('semanager.elements.search_by_name')+'...'
        ,listeners: {
            'change': {fn: this.filterByName, scope: this}
            ,'render': {fn: function(cmp) {
                new Ext.KeyMap(cmp.getEl(), {
                    key: Ext.EventObject.ENTER
                    ,fn: this.blur
                    ,scope: cmp
                });
            },scope:this}
        }
    },{
        xtype: 'button'
        ,id: 'semanager-filter-clear-'+config.type
        ,text: _('filter_clear')
        ,listeners: {
            //'click': {fn: this.clearFilter, scope: this}
            click: function(e) {
                alert('click'+ e.xtype);
            }
        }
    });


    Ext.applyIf(config,{
         id: 'semanager-grid-elements-' + config.type + 's'
        ,url: SEManager.config.connectorUrl
        ,baseParams: {
            action: 'elements/getlist'
        }
        //,save_action: 'chunks/updatefromgrid'
        ,autosave: true
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,clicksToEdit: true
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
            header: _('semanager.elements.static')
            ,dataIndex: 'static'
            ,width: 100
            ,sortable: true
        },{
            header: _('semanager.elements.file')
            ,dataIndex: 'static_file'
        }]
        ,listeners: {
            render: function(p){
                //alert(p.type);
            }
            // pass
        }
    });
    SEManager.grid.Elements.superclass.constructor.call(this, config);
};
Ext.extend(SEManager.grid.Elements, MODx.grid.Grid, {

    filterByName: function(tf, newValue, oldValue) {
        var nv = newValue || tf;
        this.getStore().baseParams.name = nv;
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,clearFilter: function() {
        this.getStore().baseParams = {
            action: 'elements/getlist2224'
        };
        Ext.getCmp('semanager-combo-category').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
});

Ext.reg('semanager-grid-elements-chunks', SEManager.grid.Elements);
Ext.reg('semanager-grid-elements-plugins', SEManager.grid.Elements);
Ext.reg('semanager-grid-elements-snippets', SEManager.grid.Elements);
Ext.reg('semanager-grid-elements-templates', SEManager.grid.Elements);