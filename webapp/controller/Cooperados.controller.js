sap.ui.define(["./BaseController", 'sap/ui/model/json/JSONModel'], function (BaseController, JSONModel ) {
	"use strict";

	return BaseController.extend("nebula.controller.Fornecedores", {
		onInit: function() {
			this._navContainerDelegate = { onBeforeShow: this.onBeforeShow, onAfterShow: this.onAfterShow, onAfterHide: this.onAfterHide };
			this.getView().addEventDelegate(this._navContainerDelegate, this);
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

        _onItemPress: function(oEvent) {
            var sPath = oEvent.getSource().getBindingContext().getPath();           
            var sId = this.getView().getModel().getProperty(sPath);
			var oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
			this.getOwnerComponent().setModel(oViewModel, "appView");
            this.getOwnerComponent().getRouter().navTo("cooperadosRouteDetail", {id: sId.ID});
        }
	  
	});
});
