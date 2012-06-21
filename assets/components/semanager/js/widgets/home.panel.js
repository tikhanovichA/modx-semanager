SEManager.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
         border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>' + _('semanager.title') + '</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,defaults: {
                autoHeight: true
            }
            ,border: true
            ,hideMode: 'offsets'
            ,cls: 'x-form-label-top'
            ,stateful: true
            ,stateId: 'semanager-tabpanel-home'
            ,stateEvents: ['tabchange']
            ,getState: function() {
                return { activeTab:this.items.indexOf(this.getActiveTab()) };
            }
            ,items: [{
                 title:  _('semanager.common.actions')
                ,id: 'semanager-tab-actions'
                ,layout: 'form'
                ,items: [{
                    html: '<p>'+_('actions')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'button'
                    ,text: _('semanager.common.actions.alltofiles')
                    ,bodyStyle: 'width: 300px;'
                    ,listeners: {
                        click: function(){
                            Ext.Ajax.request({
                                url: SEManager.config.connectorUrl
                                ,success: function(response) {
                                    console.log(response.responseText);

                                }
                                ,failure: function(response) {
                                    console.log(response);
                                }
                                ,params: {
                                    action: '/mgr/common/syncall'
                                    ,root: '111111'
                                }
                            });
                        }
                    }
                },{
                    xtype: 'button'
                    ,text: _('semanager.common.actions.alltodb')
                    ,bodyStyle: 'width: 300px'
                    ,listeners: {
                        click: function() {
                            console.log('cancel');
                        }
                    }
                }]
            },{
                title: _('chunks')
                ,id: 'semanager-tab-chunks'
                ,layout: 'form'
                ,items: [{
                    html: '<p>'+_('chunks')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'semanager-grid-elements-chunks'
                    ,preventSaveRefresh: true
                    ,cls: 'main-wrapper'
                    ,type: 'chunk'
                }]
            },{
                title: _('plugins')
                ,id: 'semanager-tab-plugins'
                ,layout: 'form'
                ,items: [{
                    html: '<p>'+_('plugins')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'semanager-grid-elements-plugins'
                    ,preventSaveRefresh: true
                    ,cls: 'main-wrapper'
                    ,type: 'plugin'
                }]
            },{
                title: _('snippets')
                ,id: 'semanager-tab-snippets'
                ,layout: 'form'
                ,items: [{
                    html: '<p>' + _('snippets') + '</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'semanager-grid-elements-snippets'
                    ,preventSaveRefresh: true
                    ,cls: 'main-wrapper'
                    ,type: 'snippet'
                }]
            },{
                title: _('templates')
                ,id: 'semanager-tab-templates'
                ,layout: 'form'
                ,items: [{
                    html: '<p>'+_('templates')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'semanager-grid-elements-templates'
                    ,preventSaveRefresh: true
                    ,cls: 'main-wrapper'
                    ,type: 'template'
                }]
            },{
                title: _('semanager.common_settings')
                ,id: 'semanager-tab-settings'
                ,items: [{
                    xtype: 'semanager-tab-common'
                }]
            },{
                title: 'Git'
                ,id: 'semanager-tab-git'
                ,disabled: true
            }]
        }]
    });
    SEManager.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(SEManager.panel.Home,MODx.Panel);
Ext.reg('semanager-panel-home',SEManager.panel.Home);



                            /*


// Комбобоксы статусов, складов и категорий товаров
MODx.combo.status = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'status'
        ,hiddenName: 'status'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fields: ['id','name']
        //,pageSize: 5
        ,value: miniShop.config.status
        ,emptyText: _('ms.combo.select')
        ,url: miniShop.config.connector_url
        ,baseParams: {
            action:  'mgr/status/getcombo'
        }
        //,onRender: function(tf) {
        //this.readOnly = true;
        //this.disabled = !this.initialConfig.submitValue;
        //MODx.StaticBoolean.superclass.onRender.apply(this, arguments);
        //this.on('change',this.onChange,this);
        //}
    });
    MODx.combo.status.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.status,MODx.combo.ComboBox);
Ext.reg('minishop-filter-status',MODx.combo.status);

MODx.combo.category = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'category'
        ,hiddenName: 'category'
        ,displayField: 'pagetitle'
        ,valueField: 'id'
        //,autoSelect: true
        ,editable: true
        ,fields: ['pagetitle','id']
        ,pageSize: 5
        ,value: miniShop.config.category
        ,emptyText: _('ms.category.select')
        ,url: miniShop.config.connector_url
        ,baseParams: {
            action:  'mgr/goods/getcombo'
            ,addall: 1
        }
    });
    MODx.combo.category.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.category,MODx.combo.ComboBox);
Ext.reg('minishop-filter-category',MODx.combo.category);

MODx.combo.warehouse = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'warehouse'
        ,hiddenName: 'warehouse'
        ,displayField: 'name'
        ,valueField: 'id'
        //,autoSelect: true
        //,editable: true
        ,fields: ['name','id']
        ,pageSize: 5
        ,value: miniShop.config.warehouse
        ,emptyText: _('ms.warehouse.select')
        ,url: miniShop.config.connector_url
        ,baseParams: {
            action:  'mgr/warehouse/getcombo'
        }
    });
    MODx.combo.warehouse.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.warehouse,MODx.combo.ComboBox);
Ext.reg('minishop-filter-warehouse',MODx.combo.warehouse);
/////////////////////////////////////////


// Комбобокс выбора чанка
MODx.combo.chunk = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        name: 'chunk'
        ,hiddenName: 'chunk'
        ,displayField: 'name'
        ,valueField: 'name'
        //,autoSelect: true
        //,editable: true
        ,fields: ['id','name']
        ,pageSize: 20
        ,emptyText: _('ms.chunk.select')
        ,url: MODx.config.connectors_url+'element/chunk.php'
        ,baseParams: {
            action: 'getList'
        }
    });
    MODx.combo.chunk.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.chunk,MODx.combo.ComboBox);
Ext.reg('minishop-combo-chunk',MODx.combo.chunk);
///////////////////////////////////////





// Поиск: строка и кнопка сброса
MODx.form.FilterByQuery = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        xtype: 'textfield'
        ,emptyText: _('search')
        ,width: 200
    });
    MODx.form.FilterByQuery.superclass.constructor.call(this,config);
};
Ext.extend(MODx.form.FilterByQuery,Ext.form.TextField);
Ext.reg('minishop-filter-byquery',MODx.form.FilterByQuery);

MODx.form.FilterClear = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        xtype: 'button'
        ,text: _('clear_filter')
    });
    MODx.form.FilterClear.superclass.constructor.call(this,config);
};
Ext.extend(MODx.form.FilterClear,Ext.Button);
Ext.reg('minishop-filter-clear',MODx.form.FilterClear);
/////////////////////////////////////////
                                    */