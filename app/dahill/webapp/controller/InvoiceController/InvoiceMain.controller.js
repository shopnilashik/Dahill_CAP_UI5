sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History) {
        "use strict";

        return Controller.extend("dahill.dahill.controller.InvoiceMain", {
            onInit: function () {

            },
            onNavButton: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Dashboard", {}, true);
                  
                }
            },
            onPressCreateInvoice:function(){
                var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("CreateInvoice", {}, true);
            },
        });
    });
