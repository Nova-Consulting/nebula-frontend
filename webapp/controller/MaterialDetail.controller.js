sap.ui.define(["./BaseController",
	 'sap/ui/model/json/JSONModel', 
	 "sap/ui/model/Filter", 
	 "sap/ui/model/FilterOperator",
	 "sap/ui/core/Fragment",
	 'sap/m/MessageToast'
	], function (BaseController, JSONModel, Filter, FilterOperator, Fragment, MessageToast ) {
	"use strict";
 
	return BaseController.extend("nebula.controller.MaterialDetail", {
		onInit: function() {
			this._navContainerDelegate = { onBeforeShow: this.onBeforeShow, onAfterShow: this.onAfterShow, onAfterHide: this.onAfterHide, onExit: this.onExit };
			this.getView().addEventDelegate(this._navContainerDelegate, this);

			this._oErrorHandler = this.getOwnerComponent().getErrorHandler();

			this.getOwnerComponent().getRouter().getRoute("materialRouteDetail").attachPatternMatched(this._onRouteMatched, this);			
			this.lazy(true)
		},

		lazy: function (param) {
			var oViewModel = new JSONModel({
				busy : param,
				delay : 0
			});
			this.getOwnerComponent().setModel(oViewModel, "appView");
		},

		_onRouteMatched: function (oEvent) {
			var that = this
			var sId = oEvent.getParameter("arguments").id;
			this.lazy(true)
			this._clearFragment()

			var aFilter = []

			aFilter.push( new Filter('ID', FilterOperator.EQ, sId) )

			this.getView().getModel().read('/Material', {
				// urlParameters: {"$expand": "contatos"}, 
				filters: aFilter,
				success: function(oData) {
					this.byId('editMaterial').setEnabled(true);
					this.byId('editMaterial').setVisible(true);
					this.byId('saveMaterial').setVisible(false);
					that.getView().setModel( new JSONModel(oData.results[0]), 'modelData')
				}.bind(this),
				error: function(err) {
					console.log(err)
				}
			})

			this._formFragments = {};
			this.lazy(false)
			this._showFormFragment("MaterialDetail");
		},

		handleEditPress: function() {
			this.lazy(true)
			this._oCliente = Object.assign({}, this.getView().getModel('modelData').getData());
			this._toggleButtonsAndView(true);
		},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();
			this.lazy(true)

			oView.byId("editMaterial").setVisible(!bEdit);
			oView.byId("saveMaterial").setVisible(bEdit);

			this._showFormFragment(bEdit ? "MaterialEdit" : "MaterialDetail");

			this.lazy(false)
		},

		_clearFragment: function () {
			var oPage = this.byId("materialPage");
			oPage.removeAllContent();
		},

		_onBackPress: function() {
			this.lazy(true)
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("materialRoute");
		},

		_getFormFragment: function (sFragmentName) {
			var pFormFragment = this._formFragments[sFragmentName],
				oView = this.getView();
				this.lazy(true)
				this._clearFragment()

			if (!pFormFragment) {
				pFormFragment = Fragment.load({
					id: oView.getId(),
					name: "nebula.view.fragments." + sFragmentName
				});
				this._formFragments[sFragmentName] = pFormFragment;
			}
			this.lazy(false)
			return pFormFragment;
		},

		handleSavePress : function () {
			var that = this
			var oModel = this.getView().getModel()
			var oData = this.getView().getModel('modelData').getData()
			this.lazy(true)

			oModel.update('/Material('+oData.ID+')', oData,{
				success: function(oData) {
					MessageToast.show('O Material foi Atualizado');
					that._toggleButtonsAndView(false);
				}.bind(this),
				error: function(oError){
					this._oErrorHandler.handleODataError(oError);
					that._toggleButtonsAndView(false);
				}
			})
			
		},

		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("materialPage");
			oPage.removeAllContent();
			this._getFormFragment(sFragmentName).then(function(oVBox){
				oPage.insertContent(oVBox);
			});
		},
		
		onAfterShow: function () {
			this.lazy(false)
		},

		onExit: function() { 
			this.getView().removeEventDelegate(this._navContainerDelegate);
			this._navContainerDelegate = null;
		},
	  
	});
});
