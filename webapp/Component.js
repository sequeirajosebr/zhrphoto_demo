sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"br/com/pushjob_zhrphoto_demo/model/models"
], function(UIComponent, Device, models) {
	"use strict";
	return UIComponent.extend("br.com.pushjob_zhrphoto_demo.Component", {
		metadata: {
			"version": "1.0.0",
			"rootView": {
				viewName: "br.com.pushjob_zhrphoto_demo.view.View1",
				type: sap.ui.core.mvc.ViewType.XML
			},
			"dependencies": {
				"libs": [
					"sap.ui.core",
					"sap.m",
					"sap.ui.layout"
				]
			},
			"config": {
				"i18nBundle": "br.com.pushjob_zhrphoto_demo.i18n.i18n",
				"icon": "",
				"favIcon": "",
				"phone": "",
				"phone@2": "",
				"tablet": "",
				"tablet@2": "",
				"serviceConfig": {
					"name": "ZHR_PHOTO_DEMO_SRV",
					"serviceUrl": "/sap/opu/odata/sap/ZHR_PHOTO_DEMO_SRV/"
				}
			}
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the resource and application models are set.
		 * @public
		 * @override
		 */
		init: function() {
			var mConfig = this.getMetadata().getConfig();
			// set the i18n model
			this.setModel(models.createResourceModel(mConfig.i18nBundle), "i18n");
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
		}
	});
});