sap.ui.define(["./BaseController", 'sap/ui/model/json/JSONModel', "sap/ui/core/Fragment"], function ( BaseController, JSONModel, Fragment  ) {
	"use strict";

	return BaseController.extend("nebula.controller.Main", {
		TIMEOUT: 900000,
		_logoutTimer: null,

		_validateSession: function () {
            var sToken = sessionStorage.getItem("authToken")
			var sTokenLocal = localStorage.getItem("authToken");

            if (!sToken && !sTokenLocal) {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("loginRoute");
            }
        },
		onInit : function() {
			this._validateSession();
			this._resetLogoutTimer();
            this._attachUserInteractionEvents();

			this.oView = this.getView();
		
			this.oMyAvatar = this.oView.byId("avatar");
			this._oPopover = Fragment.load({
				id: this.oView.getId(),
				name: "nebula.view.Popover",
				controller: this
			}).then(function(oPopover) {
				this.oView.addDependent(oPopover);
				this._oPopover = oPopover;
			}.bind(this));

			// var oModel = new JSONModel("/model/data.json");
			// this.getView().setModel(oModel);

			this.getView().addEventDelegate({
				onBeforeShow:function(evt){
					var currentUrl = window.location.href;

					if (!currentUrl.includes("/login")) {

					var sToken = sessionStorage.getItem("authToken")
					var sTokenLocal = localStorage.getItem("authToken");

					if (!sToken && !sTokenLocal) 
						window.location.href = "/"
					}
				}
			})
		},

		onPress: function(oEvent) {
			var oEventSource = oEvent.getSource(),
				bActive = this.oMyAvatar.getActive();

			this.oMyAvatar.setActive(!bActive);

			if (bActive) {
				this._oPopover.close();
			} else {
				this._oPopover.openBy(oEventSource);
			}
		},
		onPopoverClose: function () {
			this.oMyAvatar.setActive(false);
		},
		onListItemPress: function () {
			this.oMyAvatar.setActive(false);
			this._oPopover.close();
		},

		_attachUserInteractionEvents: function () {
            // Ouvir eventos de interação do usuário para resetar o timer
            document.addEventListener("click", this._resetLogoutTimer.bind(this));
            document.addEventListener("mousemove", this._resetLogoutTimer.bind(this));
            document.addEventListener("keydown", this._resetLogoutTimer.bind(this));
        },

        _resetLogoutTimer: function () {
            // Limpar o timer atual, se houver
            if (this._logoutTimer) {
                clearTimeout(this._logoutTimer);
            }

			if (localStorage.getItem("sKeepSigned") == true){
				clearTimeout(this._logoutTimer);
			}

            // Iniciar um novo timer de logout
            this._logoutTimer = setTimeout(this._onLogout.bind(this), this.TIMEOUT);
        },

        _onLogout: function () {
            // Lógica para logout (redirecionar para login ou encerrar sessão)
            sap.m.MessageToast.show("Você será deslogado.");

            // Redirecionar para a página de login
            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("loginRoute");

            // Opcional: Limpar dados de sessão (localStorage, etc.)
            localStorage.clear();
			sessionStorage.clear()
        },

		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			this.byId("parentNavContainer").to(this.getView().createId(item.getKey()));
		},

		onPatternMatched: function(event) {
			var key = event.getParameter("name");
			var uiModel = this.getOwnerComponent().getModel("ui");

			if (key === "home" || key === "main") {
				uiModel.setProperty("/selectedRoute", "inicioRoute1");
			} else {
				uiModel.setProperty("/selectedRoute", key);
			}
		},

		onSegmentedButtonSelectionChange: function(event) {
			var router = this.getRouter()
			var currentHash = router.getHashChanger().getHash();

			if ( router.getRouteInfoByHash(currentHash).name == event.getParameter("item").getKey() ) {
				return;	
			}

			var oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});

			this.getOwnerComponent().setModel(oViewModel, "appView");
			this.navTo(event.getParameter("item").getKey());
		},

		onSelectedRouteBindingChange: function(event) {
			this.navTo(event.getSource().getValue());
		},

		onMenuButtonPress : function() {
			var toolPage = this.byId("toolPage");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		onExit: function() { // Don't forget to deregister the delegate on exit.
			this.getView().removeEventDelegate(this._navContainerDelegate);
			this._navContainerDelegate = null;
			
		},
	});
});
