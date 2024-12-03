sap.ui.define(["./BaseController", 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'], function (BaseController, JSONModel, MessageToast ) {
	"use strict";

	return BaseController.extend("nebula.controller.solicitacaoMaterial", {
		onInit: function() {
			this._navContainerDelegate = { onBeforeShow: this.onBeforeShow, onAfterShow: this.onAfterShow, onAfterHide: this.onAfterHide };
			this.getView().addEventDelegate(this._navContainerDelegate, this);

			this.getOwnerComponent().getRouter().getRoute("solicitacaoMateriaisRoute").attachPatternMatched(this._onRouteMatched, this);			
			this.lazy(true)
		},

		initModel: function() {
			return {
				codMaterial: "",
				subFamilia: "",
				descricao: "",
				fabricante: "",
				descricaoLong: "",
				pesoBruto: "",
				pesoLiquido: "",
				tipoMaterial: "",
				grupo: "",
				codMapa: "",
				subGrupo: "",
				codigoEan: "",
				categoriaEan: "",
				hierarquia: "",
				unidadeMedida: "",
				codLegado: "",
				setorAtividade: "",
				fisPaisOrigem: "",
				fisUnRemessa: "",
				fisNcm: "",
				fisQtdMinima: "",
				fisCfop: "",
				fisReceita: "",
				fisCentroLucro: "",
				fisOnu: "",
				fisOrigem: "",
				fisCompPa1: "",
				fisCompPa2: "",
				fisCompPa3: "",
				fisCompPa4: "",
				status: ""
			}
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
			this.lazy(true)
			const model = new JSONModel(this.initModel, 'modelData')
			that.getView().setModel( model, 'modelData')

			this.lazy(false)
		},

		onAfterShow: function () {
			const oViewModel = new JSONModel({
				busy : false,
				delay : 0
			});

			this.getOwnerComponent().setModel(oViewModel, "appView");
		},
		onExit: function() { 
			this.getView().removeEventDelegate(this._navContainerDelegate);
			this._navContainerDelegate = null;
		},

		handleSavePress : function () {
			var that = this
			var oModel = this.getView().getModel()
			var oData = this.getView().getModel('modelData').getData()
			this.lazy(true)

			oModel.create('/SolicitacaoMaterial', oData,{
				success: function(oData) {
					MessageToast.show('A Solicitação de Material foi Cadastrada');
					const model = new JSONModel(that.initModel, 'modelData')
					that.getView().setModel( model, 'modelData')
					this.lazy(false)
				}.bind(this),
				error: function(oError){
					this._oErrorHandler.handleODataError(oError);
					this.lazy(false)
				}
			})


			
		},
	  
	});
});
