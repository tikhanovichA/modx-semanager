var SEManager = function(config) {
    config = config || {};
    SEManager.superclass.constructor.call(this,config);
};
Ext.extend(SEManager,Ext.Component,{
    page:{},window:{},grid:{},form:{},tree:{},panel:{},combo:{},config:{},view:{}
});
Ext.reg('SEManager',SEManager);

var SEManager = new SEManager();