sap.ui.define(["./BaseController",
"sap/m/MessageBox",
"sap/ui/core/mvc/XMLView", 
"sap/ui/core/mvc/View",
'sap/ui/model/json/JSONModel',
'sap/m/library',
"sap/ui/core/UIComponent", "../model/formatter"], function (BaseController, MessageBox, XMLView, View, JSONModel, library, UIComponent, formatter ) {
	"use strict";
	
	return BaseController.extend("nebula.controller.Inicio", {
		formatter: formatter,
		onInit: function() {
			this._navContainerDelegate = { onBeforeShow: this.onBeforeShow, onAfterShow: this.onAfterShow, onAfterHide: this.onAfterHide };
			this.getView().addEventDelegate(this._navContainerDelegate, this);
		},
		onAfterShow: function () {
			var oViewModel = new JSONModel({
				busy : false,
				delay : 0
			});
			this.getOwnerComponent().setModel(oViewModel, "appView");
		},
		onExit: function() { 
			this.getView().removeEventDelegate(this._navContainerDelegate);
			this._navContainerDelegate = null;

		},
	});
});
