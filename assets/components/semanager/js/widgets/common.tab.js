SEManager.panel.CommonTab = function(config) {
    config = config || {};
//    var oc = {
//        'change':{fn:MODx.fireResourceFormChange}
//        ,'select':{fn:MODx.fireResourceFormChange}
//    };
    Ext.applyIf(config,{
        id: 'semanager-tab-common'
        ,activeItem: 1
        ,items: [{
            title: _('semanager.common.actions')
            ,items: [{
                xtype: 'button'
                ,text: _('semanager.common.actions.alltofiles')
                ,bodyStyle: 'width: 300px;'
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
            title: _('semanager.common.file_settings')
            ,cls: 'form-with-labels'
            ,items: [{
                xtype: 'textfield'
                ,name: 'elements_dir'
                ,id: 'elements_dir'
                ,fieldLabel: _('semanager.common.fs.elements_dir')
                ,description: MODx.expandHelp ? '' : _('semanager.common.fs.elements_dir_desc')
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
                ,forId: 'elements-path'
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
            title: _('semanager.common.other_settings')
        }]
    });
    SEManager.panel.CommonTab.superclass.constructor.call(this,config);
};

Ext.extend(SEManager.panel.CommonTab,MODx.VerticalTabs,{
    windows: {}
    ,getSettingsValue: function(p){
        p.getEl().parent().applyStyles({
            paddingLeft: '0px'
        });
        Ext.Ajax.request({
            url: SEManager.config.connector_url
            ,success: function(response) {
                p.setValue(response.responseText);
                p.enable();
            }
            ,params: {
                action: '/common/getsetting'
                ,settings_name: p.name
            }
        });
    }
    ,putSettingsValue: function() {
       // alert('fired');
    }
});
Ext.reg('semanager-tab-common',SEManager.panel.CommonTab);
