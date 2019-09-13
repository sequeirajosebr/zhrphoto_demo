jQuery.sap.require("sap.ndc.BarcodeScanner");
sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	var oModel, me, img, panel, header;
	return Controller.extend("br.com.pushjob_zhrphoto_demo.controller.View1", {
		onInit: function() {
			header = this.byId("__header0");
			panel = this.byId("__panel0");
			me = this.byId("me");
			img = this.byId("__image0");
			var sServiceUrl = "/sap/opu/odata/sap/ZHR_PHOTO_DEMO_SRV/";
			oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl);
			oModel.attachRequestSent(function() {
				panel.setBusy(true);
			});
			oModel.attachRequestCompleted(function() {
				panel.setBusy(false);
			});	
			oModel.attachRequestFailed(function(oEvent) {
				panel.setBusy(false);
			});	
			this.getView().setModel(oModel);			
		},
		onpress: function() {
			var that = this;
			sap.ndc.BarcodeScanner.scan(function(mResult) {
				that.getdata("'" + mResult.text + "'");
			}, function(Error) {
				sap.m.MessageBox.error(Error, {
					title: "Error", // default
					onClose: null, // default
					styleClass: "", // default
					initialFocus: null, // default
					textDirection: sap.ui.core.TextDirection.Inherit // default
				});
			});
		},
		back: function() {
			window.history.go(-1);
		},
		getdata: function(string) { //string receives the employee code...
			//Get employee data...
			var dude = "/EmployeeDataSet(" + string + ")";
			var image = "/sap/opu/odata/sap/ZHR_PHOTO_DEMO_SRV/EmployeeSet(" + string + ")/$value";
			oModel.read(dude, {
				success: function(oRetrievedResult) {
					/* do something */
					me.setText("Hello, my name is: " + oRetrievedResult.LastName + "," + oRetrievedResult.Firstname);
					//Setting the image...
					header.setIcon(image);
					header.setTitle(oRetrievedResult.Firstname + "  "  + oRetrievedResult.LastName);
					img.setSrc(image);
				},
				error: function(oError) {
					/* do something */
					sap.m.MessageBox.error("Something went wrong, check your GW System log...", {
						title: "Error", // default
						onClose: null, // default
						styleClass: "", // default
						initialFocus: null, // default
						textDirection: sap.ui.core.TextDirection.Inherit // default
					});
				}
			});
		}
	});
});