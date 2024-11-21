sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/Fragment","sap/m/MessageToast"],function(e,t,a,i,n,s){"use strict";return e.extend("nebula.controller.MaterialDetail",{onInit:function(){this._navContainerDelegate={onBeforeShow:this.onBeforeShow,onAfterShow:this.onAfterShow,onAfterHide:this.onAfterHide,onExit:this.onExit};this.getView().addEventDelegate(this._navContainerDelegate,this);this.getOwnerComponent().getRouter().getRoute("materialRouteDetail").attachPatternMatched(this._onRouteMatched,this);this.lazy(true)},lazy:function(e){var a=new t({busy:e,delay:0});this.getOwnerComponent().setModel(a,"appView")},_onRouteMatched:function(e){var n=this;var s=e.getParameter("arguments").id;this.lazy(true);this._clearFragment();var o=[];o.push(new a("ID",i.EQ,s));this.getView().getModel().read("/Material",{filters:o,success:function(e){this.byId("editMaterial").setEnabled(true);this.byId("editMaterial").setVisible(true);this.byId("saveMaterial").setVisible(false);n.getView().setModel(new t(e.results[0]),"modelData")}.bind(this),error:function(e){console.log(e)}});this._formFragments={};this.lazy(false);this._showFormFragment("MaterialDetail")},handleEditPress:function(){this.lazy(true);this._oCliente=Object.assign({},this.getView().getModel("modelData").getData());this._toggleButtonsAndView(true)},_toggleButtonsAndView:function(e){var t=this.getView();this.lazy(true);t.byId("editMaterial").setVisible(!e);t.byId("saveMaterial").setVisible(e);this._showFormFragment(e?"MaterialEdit":"MaterialDetail");this.lazy(false)},_clearFragment:function(){var e=this.byId("materialPage");e.removeAllContent()},_onBackPress:function(){this.lazy(true);var e=this.getOwnerComponent().getRouter();e.navTo("materialRoute")},_getFormFragment:function(e){var t=this._formFragments[e],a=this.getView();this.lazy(true);this._clearFragment();if(!t){t=n.load({id:a.getId(),name:"nebula.view.fragments."+e});this._formFragments[e]=t}this.lazy(false);return t},handleSavePress:function(){var e=this.getView().getModel();var t=this.getView().getModel("modelData").getData();this.lazy(true);e.update("/Material("+t.ID+")",t,{success:function(e){s.show("O Material foi Atualizado");this._toggleButtonsAndView(false)}.bind(this),error:function(e){s.show("Ocorreu um erro ao atualizar o material, tente novamente");this._toggleButtonsAndView(false)}})},_showFormFragment:function(e){var t=this.byId("materialPage");t.removeAllContent();this._getFormFragment(e).then(function(e){t.insertContent(e)})},onAfterShow:function(){this.lazy(false)},onExit:function(){this.getView().removeEventDelegate(this._navContainerDelegate);this._navContainerDelegate=null}})});
//# sourceMappingURL=MaterialDetail.controller.js.map