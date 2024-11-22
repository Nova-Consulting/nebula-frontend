sap.ui.define([
    "sap/ui/core/UIComponent",
    "nebula/model/models",
    "nebula/util/ErrorHandler"
], (UIComponent, models, ErrorHandler) => {
    "use strict";

    return UIComponent.extend("nebula.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            this._oErrorHandler = new ErrorHandler(this);

            // enable routing
            this.getRouter().initialize();
        },

           /**
         * Retorna o ErrorHandler para uso nas controllers
         * @returns {my.namespace.util.ErrorHandler} - Instância do ErrorHandler
         */
           getErrorHandler: function () {
            return this._oErrorHandler;
        }
    });
});