// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/routing/History",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,History) {
        "use strict";

        return Controller.extend("dahill.dahill.controller.CustomerDetail", {
            onInit: function () {
                let oEditModel = new JSONModel({
                    editmode: false,
                    textMode: true,
                    
                  });
                 
                  this.getView().setModel(oEditModel, "editModel");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter
                  .getRoute("CustomerDetail")
                  .attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function (oEvent) {
    
            this.getView().bindElement({
                path:
                "/" +
                window.decodeURIComponent(oEvent.getParameter("arguments").ID),
            });   
            },
      
            onNavButton: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CustomerMain", {}, true);
              
            }
            },
            onEditPressed: function () {
                this._toggleEdit(true, false);
              },
            _toggleEdit: function (bEditMode, textMode) {
            let oEditModel = this.getView().getModel("editModel");
    
            oEditModel.setProperty("/editmode", bEditMode);
            oEditModel.setProperty("/textMode", textMode);
            },
            onSavePressed:function(){
                this._toggleEdit(false, true);
            },
            onCancelPressed: function () {
                this._toggleEdit(false, true);
              },
            });
    });
