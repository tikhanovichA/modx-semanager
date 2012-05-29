SEManager.panel.SnippetsTab = function(config) {
    config = config || {};
//    var oc = {
//        'change':{fn:MODx.fireResourceFormChange}
//        ,'select':{fn:MODx.fireResourceFormChange}
//    };
    Ext.applyIf(config,{
        title: 'test'
        ,html: '<p>111'+_('semanager_desc')+'</p>'
        ,border: false
        ,bodyCssClass: 'panel-desc'
        ,items: [{
            xtype: 'semanager-grid-snippets'
            ,preventRender: true
            ,cls: 'main-wrapper'
        }]
    });
    SEManager.panel.SnippetsTab.superclass.constructor.call(this,config);
};

Ext.extend(SEManager.panel.SnippetsTab,MODx.Panel,{});
Ext.reg('semanager-tab-snippets',SEManager.panel.SnippetsTab);
