// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("dahill.dahill.controller.CustomerMain", {
            onInit: function () {
                // var oList = this.byId("main_table"),
                // oBinding = oList.getBindingContext("items");
                // oBinding.refresh();
            },
            onTableItemPressed: function (oEvent) {
                let sPath = oEvent.getSource().getBindingContext().getPath();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oItem = oEvent.getSource();
          
                oRouter.navTo("CustomerDetail", {
                  ID: window.encodeURIComponent(
                    oItem.getBindingContext().getPath().substr(1)
                  ),
                });
              },
        });
    });
