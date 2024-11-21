sap.ui.define(function () {
	"use strict";

	return {
		formatValue: function (value) {
			return value && value.toUpperCase();
		},
		srcImageValue : function (sImagePath) {

			return sImagePath + ".jpg";
		}
	};
});
