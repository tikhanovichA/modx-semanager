SEManager.panel.CommonTab = function(config) {
    config = config || {};
//    var oc = {
//        'change':{fn:MODx.fireResourceFormChange}
//        ,'select':{fn:MODx.fireResourceFormChange}
//    };
    Ext.applyIf(config,{
        id: 'semanager-tab-common'
        ,cls: 'vertical-tabs-panel'
        ,defaults: {
            bodyCssClass: 'vertical-tabs-body'
            ,autoScroll: true
            ,autoHeight: true
            ,autoWidth: true
            ,layout: 'form'
        }
        ,items: [{
            title: _('semanager.common.fs')
            ,anchor: '100%'

            /*
            ,defaults: {
                msgTarget: 'under'

                ,hideMode: 'offsets'
                ,autoWidth: false
                ,anchor: '100%'
                ,style: {
                    paddingLeft: '0px'
                }
            } */

            ,items: [{
                xtype: 'modx-combo-boolean'
                ,name: 'test-cb'
                ,hiddenName: 'test-cb'
                ,id: 'sm-test-cb'
                ,fieldLabel: _('semanager.common.os.use_categories')
                ,itemCls: 'clllllassss'
                ,cls: 'testcls'
                ,defaults: {
                    paddingLeft: '0px'
                    ,autoWidth: true
                }

                ,description: MODx.expandHelp ? '' : _('semanager.common.os.use_categories_desc')
                //,anchor: '40%'
                ,value: true
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'sm-test-cb'
                ,html: _('semanager.common.os.use_categories_desc')
                ,cls: 'desc-under'

            },{
                xtype: 'textfield'
                ,name: 'elements_dir'
                ,id: 'semanager-elements_dir'
                ,fieldLabel: _('semanager.common.fs.elements_dir')
                ,description: MODx.expandHelp ? '' : _('semanager.common.fs.elements_dir_desc')
                ,anchor: '100%'
                //,disabled: true
                ,listeners: {
                    render: {
                        fn: this.getSettingsValue
                    }
                    ,blur: {
                        fn: this.putSettingsValue
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'semanager-elements_dir'
                ,html: _('semanager.common.fs.elements_dir_desc')
                ,cls: 'desc-under'
        //========================
            },{
                xtype: 'textfield'
                ,name: 'filename_tpl_chunk'
                ,id: 'filename_tpl_chunk'
                ,fieldLabel: _('semanager.common.fs.filename_tpl_chunk')
                ,description: MODx.expandHelp ? '' : _('semanager.common.fs.filename_tpl_chunk_desc')
                ,anchor: '100%'
                ,disabled: true
                ,listeners: {
                    render: {
                        fn: this.getSettingsValue
                    }
                    ,blur: {
                        fn: this.putSettingsValue
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'filename_tpl_chunk'
                ,html: _('semanager.common.fs.filename_tpl_chunk_desc')
                ,cls: 'desc-under'
        //==========================
            },{
                xtype: 'textfield'
                ,name: 'filename_tpl_plugin'
                ,id: 'filename_tpl_plugin'
                ,fieldLabel: _('semanager.common.fs.filename_tpl_plugin')
                ,description: MODx.expandHelp ? '' : _('semanager.common.fs.filename_tpl_plugin_desc')
                ,anchor: '100%'
                ,disabled: true
                ,listeners: {
                    render: {
                        fn: this.getSettingsValue
                    }
                    ,blur: {
                        fn: this.putSettingsValue
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'filename_tpl_plugin'
                ,html: _('semanager.common.fs.filename_tpl_plugin_desc')
                ,cls: 'desc-under'
                //==========================
            },{
                xtype: 'textfield'
                ,name: 'filename_tpl_snippet'
                ,id: 'filename_tpl_snippet'
                ,fieldLabel: _('semanager.common.fs.filename_tpl_snippet')
                ,description: MODx.expandHelp ? '' : _('semanager.common.fs.filename_tpl_snippet_desc')
                ,anchor: '100%'
                ,disabled: true
                ,listeners: {
                    render: {
                        fn: this.getSettingsValue
                    }
                    ,blur: {
                        fn: this.putSettingsValue
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'filename_tpl_snippet'
                ,html: _('semanager.common.fs.filename_tpl_snippet_desc')
                ,cls: 'desc-under'
        //==========================
            },{
                xtype: 'textfield'
                ,name: 'filename_tpl_template'
                ,id: 'filename_tpl_template'
                ,fieldLabel: _('semanager.common.fs.filename_tpl_template')
                ,description: MODx.expandHelp ? '' : _('semanager.common.fs.filename_tpl_template_desc')
                ,anchor: '100%'
                ,disabled: true
                ,listeners: {
                    render: {
                        fn: this.getSettingsValue
                    }
                    ,blur: {
                        fn: this.putSettingsValue
                    }
                }
            },{
                xtype: MODx.expandHelp ? 'label' : 'hidden'
                ,forId: 'filename_tpl_template'
                ,html: _('semanager.common.fs.filename_tpl_template_desc')
                ,cls: 'desc-under'
        //==========================
            }]
        },{
            title: _('semanager.common.os')
            ,cls: 'form-with-labels'
            ,items: [{
                xtype: 'combo-boolean'
                ,name: 'use_categories'
                ,id: 'use_categories'
                ,fieldLabel: _('semanager.common.os.use_categories')
                ,description: MODx.expandHelp ? '' : _('semanager.common.os.use_categories_desc')
                ,anchor: '100%'
                ,disabled: false
                ,listeners: {
                    render: {
                        fn: this.getSettingsValue
                    }
                    ,blur: {
                        fn: this.putSettingsValue
                    }
                }
            },{
                xtype: 'combo-boolean'
                ,name: 'type_separation'
                ,id: 'type_separation'
                ,fieldLabel: _('semanager.common.os.type_separation')
                //,description: MODx.expandHelp ? '' : _('semanager.common.os.type_separation_desc')
                ,description: _('semanager.common.os.type_separation_desc')
                ,anchor: '100%'
                ,disabled: false

                ,listeners: {
                    load: {
                        fn: function(){
                            alert('allllerto!');
                        }
                    }
                    ,render: {
                        fn: this.getSettingsValue
                    }
                    ,blur: {
                        fn: this.putSettingsValue
                    }
                }
            }]
        },{
            title: _('semanager.excluded')
        }]
    });
    SEManager.panel.CommonTab.superclass.constructor.call(this,config);
};

Ext.extend(SEManager.panel.CommonTab,MODx.VerticalTabs,{

    getSettingsValue: function(p){

        var w = p.getEl().parent().getWidth()-12-1;

        console.log(p.getEl().getComputedWidth());

        console.log(p.getEl().dom.style.cssText);

        //p.getEl().parent().applyStyles({paddingLeft: '0px'});

        //p.getEl().

        Ext.Ajax.request({
            url: SEManager.config.connectorUrl
            ,success: function(response) {
                p.setValue(response.responseText);
                //p.enable();
            }
            ,params: {
                action: '/common/getsetting'
                ,settings_name: p.name
            }
        });
    }
    ,putSettingsValue: function() {
        //alert('fired');
    }
});
Ext.reg('semanager-tab-common',SEManager.panel.CommonTab);
