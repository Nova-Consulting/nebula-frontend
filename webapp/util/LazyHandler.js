sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return {
        init: function (oComponent, sModelName) {
            const oViewModel = new JSONModel({
                busy: false,
                delay: 0
            });
            oComponent.setModel(oViewModel, sModelName || "appView");
        },

        setBusy: function (oComponent, isBusy, sModelName) {
            const oModel = oComponent.getModel(sModelName || "appView");
            if (oModel) {
                oModel.setProperty("/busy", isBusy);
            }
        }
    };
});
