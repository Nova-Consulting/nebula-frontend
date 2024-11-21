sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageBox", 'sap/ui/model/json/JSONModel', "../model/formatter"], function (Controller, MessageBox, JSONModel, formatter ) {
	"use strict";
	
	return Controller.extend("nebula.controller.Recover", {
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

		onBackPress: function() {
			var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("loginRoute"); // Nome da rota definida no manifest.json
		},

		onPress: function () {
			var oInputUsername = this.byId("inputEmail");

			var lblUsername = this.byId("labelEmail");
			
            var email = oInputUsername.getValue();

			oInputUsername.removeStyleClass("inputError");
			lblUsername.removeStyleClass("labelError");

            if (!this._isValidUsername(email)) {
				oInputUsername.addStyleClass("inputError");
				lblUsername.addStyleClass("labelError")
                MessageBox.error("Por favor, preencha o campo de e-mail");
                return;
            } else {
                // oInputUsername.setValueState('');
            }

            this._doLogin(email);
		},
   
		onForgotPasswordPress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("recoverRoute"); // Nome da rota definida no manifest.json
        },

		_isValidUsername: function (sUsername) {
            var oRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return oRegex.test(sUsername);
        },

		_isValidPassword: function (sPassword) {
            var oRegex = /^[a-zA-Z0-9]{1,}$/;
            return oRegex.test(sPassword);
        },

		onExit: function() { 
			this.getView().removeEventDelegate(this._navContainerDelegate);
			this._navContainerDelegate = null;

		},
		
        _doLogin: function (email) {
			// eslint-disable-next-line consistent-this

			var oPayload = {
				email: email
			};		

			// eslint-disable-next-line no-unused-vars
			var aData = jQuery.ajax({
				type : "POST",
				contentType : "application/json",
				url : "http://20.64.235.73:4004/odata/v4/admin/recoverPassword",
				dataType : "json",
				data: JSON.stringify(oPayload),
				async: true, 
				success: function (data, textStatus, jqXHR) {
					sap.m.MessageToast.show("Um E-mail foi enviado com as instruções de recuperação de senha!");
				},
				error: function (jqXHR, textStatus, errorThrown) {
					if ( jqXHR.status == 404 ) {
						MessageBox.error("Usuário não encontrado");
					}
				}
			});
        }
	});
});
