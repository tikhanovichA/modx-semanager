SEManager.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
         border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container form-with-labels'
        ,items: [{
            html: '<h2>' + _('semanager.title') + ' <sup style="font-size: 0.5em">' + _('semanager.description') + '</sup></h2>'
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
            ,activeItem: 5
            /*
            ,getState: function() {
                return { activeTab:this.items.indexOf(this.getActiveTab()) };
            }
            */
            ,items: [{
                 title:  _('semanager.tabs.actions')
                ,id: 'semanager-tab-actions'
                ,layout: 'form'
                ,items: [{
                    html: '<p>'+_('semanager.description')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    bodyCssClass: 'main-wrapper'
                    ,border: false
                    ,layout: 'column'
                    ,items: [{
                        columnWidth: '60'
                        ,border: true
                        ,items: [{
                            xtype: 'button'
                            ,text: 'Обновить (обновить файлы, проверить на новые)'
                        },{
                            xtype: 'button'
                            ,text: 'Удалить пустые папки'
                        },{
                            xtype: 'button'
                            ,text: _('semanager.common.actions.alltofiles')
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
                        }]

                    },{
                        columnWidth: '30%'
                        ,border: false
                        ,items: [{
                            xtype: 'button'
                            ,text: _('semanager.common.actions.alltodb')
                            ,bodyStyle: 'width: 300px'
                            ,listeners: {
                                click: function() {
                                    console.log('cancel');
                                }
                            }
                        }]
                    }]
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
                title: _('semanager.tabs.settings')
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