sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/Fragment","sap/m/MessageToast"],function(e,t,n,i,o,s){"use strict";return e.extend("nebula.controller.ClientesDetail",{onInit:function(){this._navContainerDelegate={onBeforeShow:this.onBeforeShow,onAfterShow:this.onAfterShow,onAfterHide:this.onAfterHide,onExit:this.onExit};this.getView().addEventDelegate(this._navContainerDelegate,this);this.getOwnerComponent().getRouter().getRoute("clientesRouteDetail").attachPatternMatched(this._onRouteMatched,this);var e=new t({busy:true,delay:0});this.getOwnerComponent().setModel(e,"appView")},lazy:function(e){var n=new t({busy:e,delay:0});this.getOwnerComponent().setModel(n,"appView")},_onRouteMatched:function(e){var o=this;var s=e.getParameter("arguments").id;var a=this.byId("clientPage");a.removeAllContent();var r=[];r.push(new n("ID",i.EQ,s));this.getView().getModel().read("/BusinessPartners",{filters:r,success:function(e){this.byId("edit").setEnabled(true);o.getView().setModel(new t(e.results[0]),"modelData")}.bind(this),error:function(e){this.getOwnerComponent().getRouter().navTo("notFound")}.bind(this)});this._formFragments={};this._showFormFragment("ClientDetail")},handleEditPress:function(){this._oCliente=Object.assign({},this.getView().getModel("modelData").getData());this._toggleButtonsAndView(true)},_toggleButtonsAndView:function(e){var t=this.getView();t.byId("edit").setVisible(!e);t.byId("save").setVisible(e);this._showFormFragment(e?"ClientEdit":"ClientDetail")},_getFormFragment:function(e){var t=this._formFragments[e],n=this.getView();if(!t){t=o.load({id:n.getId(),name:"nebula.view.fragments."+e});this._formFragments[e]=t}return t},handleSavePress:function(){var e=this.getView().getModel();var t=this.getView().getModel("modelData").getData();this.lazy(true);e.update("/BusinessPartners("+t.ID+")",t,{success:function(e){s.show("O Cliente foi Atualizado");this._toggleButtonsAndView(false)}.bind(this),error:function(e){s.show("Ocorreu um erro ao atualizar o cliente, tente novamente");this._toggleButtonsAndView(false)}})},_clearFragment:function(){var e=this.byId("clientPage");e.removeAllContent()},_showFormFragment:function(e){this._clearFragment();var t=this.byId("clientPage");this._getFormFragment(e).then(function(e){t.insertContent(e)})},onAfterShow:function(){const e=new t({busy:false,delay:0});this.getOwnerComponent().setModel(e,"appView")},onExit:function(){this._clearFragment();this.getView().removeEventDelegate(this._navContainerDelegate);this._navContainerDelegate=null}})});
//# sourceMappingURL=ClientesDetail.controller.js.map