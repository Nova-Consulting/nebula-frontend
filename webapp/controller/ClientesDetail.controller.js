sap.ui.define(["./BaseController",
	 'sap/ui/model/json/JSONModel', 
	 "sap/ui/model/Filter", 
	 "sap/ui/model/FilterOperator",
	 "sap/ui/core/Fragment",
	 'sap/m/MessageToast'
	], function (BaseController, JSONModel, Filter, FilterOperator, Fragment, MessageToast ) {
	"use strict";

	return BaseController.extend("nebula.controller.ClientesDetail", {
		onInit: function() {
			this._navContainerDelegate = { onBeforeShow: this.onBeforeShow, onAfterShow: this.onAfterShow, onAfterHide: this.onAfterHide, onExit: this.onExit };
			this.getView().addEventDelegate(this._navContainerDelegate, this);

			this.getOwnerComponent().getRouter().getRoute("clientesRouteDetail").attachPatternMatched(this._onRouteMatched, this);			
			var oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
			this.getOwnerComponent().setModel(oViewModel, "appView");
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

			var oPage = this.byId("clientPage");
			oPage.removeAllContent();

			var aFilter = []

			aFilter.push( new Filter('ID', FilterOperator.EQ, sId) )

			this.getView().getModel().read('/BusinessPartners', {
				// urlParameters: {"$expand": "contatos"}, 
				filters: aFilter,
				success: function(oData) {
					this.byId('edit').setEnabled(true);
					that.getView().setModel( new JSONModel(oData.results[0]), 'modelData')
				}.bind(this),
				error: function(oData) {
					this.getOwnerComponent().getRouter().navTo("notFound");
				}.bind(this)
			})

			this._formFragments = {};

			this._showFormFragment("ClientDetail");
		},

		handleEditPress: function() {
			this._oCliente = Object.assign({}, this.getView().getModel('modelData').getData());
			this._toggleButtonsAndView(true);
		},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);

			this._showFormFragment(bEdit ? "ClientEdit" : "ClientDetail");
		},

		_getFormFragment: function (sFragmentName) {
			var pFormFragment = this._formFragments[sFragmentName],
				oView = this.getView();

			if (!pFormFragment) {
				pFormFragment = Fragment.load({
					id: oView.getId(),
					name: "nebula.view.fragments." + sFragmentName
				});
				this._formFragments[sFragmentName] = pFormFragment;
			}

			return pFormFragment;
		},

		_onBackPress: function() {
			this.lazy(true)
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("clientesRoute");
		},

		handleSavePress : function () {
			var oModel = this.getView().getModel()
			var oData = this.getView().getModel('modelData').getData()
			this.lazy(true)

			oModel.update('/BusinessPartners('+oData.ID+')', oData,{
				success: function(oData) {
					MessageToast.show('O Cliente foi Atualizado');
					this._toggleButtonsAndView(false);
					this.lazy(false)
				}.bind(this),
				error: function(oError){
					MessageToast.show('Ocorreu um erro ao atualizar o cliente, tente novamente');
					this._toggleButtonsAndView(false);
					this.lazy(false)
				}
			})

			this.lazy(false)
		},

		_clearFragment: function () {
			var oPage = this.byId("clientPage");
			oPage.removeAllContent();
		},

		_showFormFragment : function (sFragmentName) {
			this._clearFragment()
			var oPage = this.byId("clientPage");
			this._getFormFragment(sFragmentName).then(function(oVBox){
				oPage.insertContent(oVBox);
			});
		},
		
		onAfterShow: function () {
			const oViewModel = new JSONModel({
				busy : false,
				delay : 0
			});

			this.getOwnerComponent().setModel(oViewModel, "appView");
		},

		onExit: function() { 
			this._clearFragment()
			this.getView().removeEventDelegate(this._navContainerDelegate);
			this._navContainerDelegate = null;
		},
	  
	});
});
