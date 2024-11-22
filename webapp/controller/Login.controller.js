sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageBox", 'sap/ui/model/json/JSONModel', "../model/formatter"], function (Controller, MessageBox, JSONModel, formatter ) {
	"use strict";
	
	return Controller.extend("nebula.controller.Login", {
		formatter: formatter,

		onInit: function() {
			var oLoginButton = this.byId("loginButton");
			oLoginButton.setEnabled(true); 
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

		onPress: function () {
			var oLoginButton = this.byId("loginButton");
            oLoginButton.setEnabled(false);

			var oInputUsername = this.byId("inputUsername");
			var oInputPassword = this.byId("inputPassword");
			var oInputKeepSigned = this.byId("manterConectado");

			var lblUsername = this.byId("labelUsername");
			var lblPassword = this.byId("labelPassword");
			
            var sUsername = oInputUsername.getValue();
			var sPassword = oInputPassword.getValue();
			var sKeepSigned = oInputKeepSigned.getSelected();

			oInputUsername.removeStyleClass("inputError");
			lblUsername.removeStyleClass("labelError");

			oInputPassword.removeStyleClass("inputError");
			lblPassword.removeStyleClass("labelError");

            if (!this._isValidUsername(sUsername)) {
				oInputUsername.addStyleClass("inputError");
				lblUsername.addStyleClass("labelError")
                MessageBox.error("Por favor, preencha o campo de nome de usuário");
				oLoginButton.setEnabled(true); // Reativar o botão
                return;
            } else {
                // oInputUsername.setValueState('');
            }
 
            if (!this._isValidUsername(sPassword)) {
				oInputPassword.addStyleClass("inputError");
				lblPassword.addStyleClass("labelError")
                MessageBox.error("Por favor, preencha o campo de senha.");
				oLoginButton.setEnabled(true); // Reativar o botão
                return;
            }

            this._doLogin(sUsername, sPassword, sKeepSigned);
		},

		onForgotPasswordPress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("recoverRoute");
        },

		_isValidUsername: function (sUsername) {

            return sUsername.length > 0;
        },

		_isValidPassword: function (sPassword) {
            var oRegex = /^[a-zA-Z0-9]{1,}$/;
            return oRegex.test(sPassword);
        },

		onExit: function() { 
			this.getView().removeEventDelegate(this._navContainerDelegate);
			this._navContainerDelegate = null;
		},
		
        _doLogin: function (username, password, sKeepSigned) {
			// eslint-disable-next-line consistent-this
			var lthis = this;

			var oPayload = {
				username: username,
				password: password
			};		

			// eslint-disable-next-line no-unused-vars
			var aData = jQuery.ajax({
				type : "POST",
				contentType : "application/json",
				url : "http://20.64.235.73:4004/odata/v4/nebula/login",
				dataType : "json",
				data: JSON.stringify(oPayload),
				async: true, 
				success: function (data, textStatus, jqXHR) {
					var sToken = data.value;

					if (sToken) {
						sessionStorage.setItem("authToken", sToken);
						localStorage.setItem("authToken", sToken);

						if (sKeepSigned)
							localStorage.setItem("sKeepSigned", 'true');

						sap.m.MessageToast.show("Login realizado com sucesso, você será redirecionado em breve!");
						// sap.ui.core.UIComponent.getRouterFor(this).navTo("Dashboard");
						var oRouter = lthis.getOwnerComponent().getRouter();
			
						oRouter.navTo("main");
					} else {
						oLoginButton.setEnabled(true);
						sap.m.MessageBox.error("Ocorreu um erro ao efetuar seu login. Tente novamente.");
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					if ( jqXHR.status == 401 ) {
						oLoginButton.setEnabled(true);
						MessageBox.error("Usuário ou senha incorretos.");
					}
				}
			});
        }
	});
});
