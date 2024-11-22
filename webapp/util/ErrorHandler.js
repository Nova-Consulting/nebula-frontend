sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox"
], function (BaseObject, MessageBox) {
    "use strict";

    return BaseObject.extend("nebula.util.ErrorHandler", {
        /**
         * Construtor do ErrorHandler
         * @param {sap.ui.core.UIComponent} oComponent - Componente principal da aplicação
         */
        constructor: function (oComponent) {
            this._oComponent = oComponent;
            this._oModel = oComponent.getModel(); // Modelo padrão
        },

        /**
         * Trata erros genéricos de requisições OData
         * @param {object} oError - Objeto de erro retornado pela requisição
         */
        handleODataError: function (oError) {
            console.log('message error')
            const sMessage = this._getErrorMessage(oError);
            MessageBox.error(sMessage, {
                title: "Erro na Requisição",
                details: oError.responseText || oError.message
            });
        },

        /**
         * Trata erros personalizados
         * @param {string} sMessage - Mensagem de erro
         */
        handleCustomError: function (sMessage) {
            console.log('message')
            MessageBox.error(sMessage, {
                title: "Erro"
            });
        },

        /**
         * Extrai e formata a mensagem de erro de uma resposta OData
         * @param {object} oError - Objeto de erro
         * @returns {string} - Mensagem de erro extraída
         */
        _getErrorMessage: function (oError) {
            try {
                const oResponse = JSON.parse(oError.responseText);
                return oResponse.error.message.value || "Erro desconhecido.";
            } catch (e) {
                return oError.message || "Erro desconhecido.";
            }
        }
    });
});
