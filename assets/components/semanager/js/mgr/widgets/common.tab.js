SEManager.panel.CommonTab = function(config) {
    config = config || {};
//    var oc = {
//        'change':{fn:MODx.fireResourceFormChange}
//        ,'select':{fn:MODx.fireResourceFormChange}
//    };
    Ext.applyIf(config,{
        id: 'semanager-tab-common'
        ,border: false
        ,plain: true
        ,deferredRender: true
        ,anchor: '100%'
        ,activeItem: 0
        //,cls: 'x-form-label-top'
        ,items: [{
            title: 'Actions'
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'button'
                ,text: 'Sync All'
                ,bodyStyle: 'width: 200px;'
                ,listeners: {
                    click: function(){
                        Ext.Ajax.request({
                            url: SEManager.config.connector_url
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
            title: 'File Settings'
            ,anchor: '100%'
            ,cls: 'form-with-labels'
            ,layout: 'form'
            ,defaults: {
                msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textfield'
                ,name: 'elemenets-path'
                ,id: 'elements-path'
                ,fieldLabel: 'Папака с элементами'
                ,description: MODx.expandHelp ? '' : 'articles.setting.commentsAnonymousName_desc'
                ,anchor: '100%'
                ,value: '{assets}/elements/'
                ,listeners: {
                    render: function(p) {
                        p.getEl().parent().applyStyles({
                            paddingLeft: '0px'
                        });
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'elements-path'
                ,html: 'elements path folder'
                ,cls: 'desc-under'
            },{
                xtype: 'textfield'
                ,name: 'snippets-name-tpl'
                ,id: 'snippets-name-tpl'
                ,fieldLabel: 'Шаблон имени сниппета'
                ,description: MODx.expandHelp ? '' : 'help'
                ,anchor: '100%'
                ,value: '{name}.sn.php'
                ,listeners: {
                    render: function(p) {
                        p.getEl().parent().applyStyles({
                            paddingLeft: '0px'
                        });
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'snippets-name-tpl'
                ,html: 'snippets name tpl'
                ,cls: 'desc-under'
            },{
                xtype: 'textfield'
                ,name: 'templates-name-tpl'
                ,id: 'templates-name-tpl'
                ,fieldLabel: 'Шаблон имени шаблона'
                ,description: MODx.expandHelp ? '' : 'help'
                ,anchor: '100%'
                ,value: '{name}.tp.html'
                ,listeners: {
                    render: function(p) {
                        p.getEl().parent().applyStyles({
                            paddingLeft: '0px'
                        });
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'templates-name-tpl'
                ,html: 'templates name tpl'
                ,cls: 'desc-under'
            },{
                xtype: 'textfield'
                ,name: 'chunks-name-tpl'
                ,id: 'chunks-name-tpl'
                ,fieldLabel: 'Шаблон имени чанка'
                ,description: MODx.expandHelp ? '' : 'help'
                ,anchor: '100%'
                ,value: '{name}.ch.html'
                ,listeners: {
                    render: function(p) {
                        p.getEl().parent().applyStyles({
                            paddingLeft: '0px'
                        });
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'chunks-name-tpl'
                ,html: 'chunks name tpl'
                ,cls: 'desc-under'
            },{
                xtype: 'textfield'
                ,name: 'plugins-name-tpl'
                ,id: 'plugins-name-tpl'
                ,fieldLabel: 'Шаблон имени плагина'
                ,description: MODx.expandHelp ? '' : 'help'
                ,anchor: '100%'
                ,value: '{name}.pl.php'
                ,listeners: {
                    render: function(p) {
                        p.getEl().parent().applyStyles({
                            paddingLeft: '0px'
                        });
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'plugins-name-tpl'
                ,html: 'plugins name tpl'
                ,cls: 'desc-under'
            }]
        },{
            title: 'Other settings'
            ,anchor: '100%'
            ,defaults: {
                msgTarget: 'under'
            }
        }]
    });
    SEManager.panel.CommonTab.superclass.constructor.call(this,config);
};

Ext.extend(SEManager.panel.CommonTab,MODx.VerticalTabs,{});
Ext.reg('semanager-tab-common',SEManager.panel.CommonTab);
