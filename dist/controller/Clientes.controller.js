sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("nebula.controller.Clientes",{onInit:function(){this._navContainerDelegate={onBeforeShow:this.onBeforeShow,onAfterShow:this.onAfterShow,onAfterHide:this.onAfterHide};this.getView().addEventDelegate(this._navContainerDelegate,this)},onAfterShow:function(){const e=new t({busy:false,delay:0});this.getOwnerComponent().setModel(e,"appView")},onExit:function(){this.getView().removeEventDelegate(this._navContainerDelegate);this._navContainerDelegate=null},_onItemPress:function(e){var n=e.getSource().getBindingContext().getPath();var o=this.getView().getModel().getProperty(n);var i=new t({busy:true,delay:0});this.getOwnerComponent().setModel(i,"appView");this.getOwnerComponent().getRouter().navTo("clientesRouteDetail",{id:o.ID})}})});
//# sourceMappingURL=Clientes.controller.js.map