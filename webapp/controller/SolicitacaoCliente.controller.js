sap.ui.define(["./BaseController", 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'], function (BaseController, JSONModel, MessageToast ) {
	"use strict";

	return BaseController.extend("nebula.controller.solicitacaoMaterial", {
		onInit: function() {
			this._navContainerDelegate = { onBeforeShow: this.onBeforeShow, onAfterShow: this.onAfterShow, onAfterHide: this.onAfterHide };
			this.getView().addEventDelegate(this._navContainerDelegate, this);

			this.getOwnerComponent().getRouter().getRoute("solicitacaoClientesRoute").attachPatternMatched(this._onRouteMatched, this);			
			this.lazy(true)
		},

		initModel: function() {
			return {
				codigoNebula: "",
				tipoCadastro: "CLIENTE",
				tipoParceiro: "",
				avatar: "",
				statusNebula: "",
				cpfCnpj: "",
				email: "",
				dataFundacao: null,
				nomeCompleto: "",
				dataNascimento: null,
				genero: "",
				nacionalidade: "",
				naturalidade: "",
				uf: "",
				estadoCivil: "",
				profissao: "",
				nomeMae: "",
				nomePai: "",
				rgNumero: "",
				rgEmissor: "",
				rgEmissao: null,
				logradouro: "",
				numero: "",
				cep: "",
				bairro: "",
				municipio: "",
				estado: "",
				complemento: "",
				tipoContribIcms: "",
				inscricaoEstadual: "",
				inscricaoMunicipal: "",
				codMuncipioIbge: "",
				classificacaoFiscal: "",
				grupoContas: "",
				codSuframa: "",
				cnaePrincipal: "",
				naturezaJuridica: "",
				tipoSetorIndustrial: "",
				tipoDeclaracaoImposto: "",
				porteEmpresa: "",
				optanteSimples: false
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

			oModel.create('/SolicitacaoBp', oData,{
				success: function(oData) {
					MessageToast.show('A Solicitação de BP foi Cadastrada');
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
