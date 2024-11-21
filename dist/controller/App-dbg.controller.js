sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel"], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("nebula.controller.App", {
		onInit: function () {
			this._navContainerDelegate = { onBeforeShow: this.onBeforeShow, onAfterShow: this.onAfterShow, onAfterHide: this.onAfterHide };
			this.getView().addEventDelegate(this._navContainerDelegate, this);

			var oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});

			this.getOwnerComponent().setModel(oViewModel, "appView");
			// this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		
	});
});
