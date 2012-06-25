SEManager.grid.Elements = function(config) {
    config = config || {};

    this.exp = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p class="desc">{description}</p>'
        )
    });

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
        xtype: 'modx-combo'
        ,name: 'filter_category'
        ,id: 'semanager-filter-category'+config.type
        ,emptyText: _('semanager.elements.filter_by_category')
        ,fields: ['id','category']
        ,displayField: 'category'
        ,valueField: 'id'
        ,width: 250
        ,pageSize: 10
        ,url: SEManager.config.connectorUrl
        ,baseParams: {
            action: 'elements/getcategorylist'
            ,type: config.type
        }
        ,listeners: {
            'select': {fn: this.filterByCategory, scope: this}
        }
    },'-',{
        xtype: 'textfield'
        ,name: 'filter_name'
        ,id: 'semanager-filter-name-'+config.type
        ,emptyText: _('semanager.elements.filter_by_name')+'...'
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
        ,handler: this.clearFilter
    });

    Ext.applyIf(config,{
         id: 'semanager-grid-elements-' + config.type + 's'
        ,url: SEManager.config.connectorUrl
        ,baseParams: {
            action: 'elements/getlist'
            ,type: config.type
        }
        ,autosave: true
        ,plugins: this.exp
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,clicksToEdit: true
        ,fields: ['id','name','static','static_file',
            'description','category','snippet','plugincode','templatename','content','disabled']
            // additional fields, for all elements. Needed for quick update
        ,columns: [this.exp,{
            header: _('id')
            ,dataIndex: 'id'
            ,width: 35
            ,sortable: true
        },{
            header: _('name')
            ,dataIndex: (config.type=='template')?'templatename':'name'
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
        ,tools: [{
            id: 'plus'
            ,qtip: _('expand_all')
            ,handler: this.expandAll
            ,scope: this
        },{
            id: 'minus'
            ,hidden: true
            ,qtip: _('collapse_all')
            ,handler: this.collapseAll
            ,scope: this
        }]
    });
    SEManager.grid.Elements.superclass.constructor.call(this, config);
};
Ext.extend(SEManager.grid.Elements, MODx.grid.Grid, {

    filterByCategory: function(category, selected){
        this.getStore().baseParams.categoryfilter = selected.id;
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,filterByName: function(tf, newValue) {
        this.getStore().baseParams.namefilter = newValue || tf;
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,clearFilter: function() {
        this.getStore().baseParams = {
            action: 'elements/getlist'
            ,type: this.config.type
        };
        Ext.getCmp('semanager-filter-category'+this.config.type).reset();
        Ext.getCmp('semanager-filter-name-'+this.config.type).reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,getMenu: function() {
        var m = [];
        m.push({
            text: _('quick_update_' + this.config.type)
            ,handler: this.updateElement
        });
        m.push('-');
        m.push({
            text: (this.menu.record.static)?_('semanager.elements.remove_static_file'):_('semanager.elements.make_static_file')
            ,handler: this.updateStaticElement
        });
        this.addContextMenuItem(m);
    }
    ,updateElement: function(btn,e){
        var r = this.menu.record;
        r.clearCache = 1;
        var que = MODx.load({
            xtype: 'modx-window-quick-update-' + this.config.type
            ,record: r
            ,grid: this
            ,listeners: {
                'success' : {fn:function(){
                    this.refresh();
                },scope:this}
            }
        });
        que.reset();
        que.setValues(r);
        que.show(e.target);
    }
    ,updateStaticElement: function(){
        var r = this.menu.record;
        r.static_file = '123';
        //r.refresh();
        console.log(r);


    }
});

Ext.reg('semanager-grid-elements-chunks', SEManager.grid.Elements);
Ext.reg('semanager-grid-elements-plugins', SEManager.grid.Elements);
Ext.reg('semanager-grid-elements-snippets', SEManager.grid.Elements);
Ext.reg('semanager-grid-elements-templates', SEManager.grid.Elements);