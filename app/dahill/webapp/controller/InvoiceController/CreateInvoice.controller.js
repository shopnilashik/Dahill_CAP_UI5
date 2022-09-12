// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/model/odata/v4/ODataModel","sap/m/MessageToast",
    "sap/m/MessageBox","sap/ui/core/Fragment",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,ODataModel,MessageToast,MessageBox,Fragment) {
        "use strict";

        return Controller.extend("dahill.dahill.controller.InvoiceController.CreateInvoice", {
            onInit: function () {
              
            },
            onCustomerHelper:function(){
                var oView = this.getView();

                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "dahill.dahill.view.fragment.CreateInvoice",
                        controller: this,
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this._pValueHelpDialog.then(
                    function (oValueHelpDialog) {
                        oValueHelpDialog.open();
                    }.bind(this)
                );
            },
            handleSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("name", FilterOperator.Contains, sValue);
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter([oFilter]);
            },	
           

            handleValueHelpClose: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem"),
                oInput = this.byId("CustomerInput");
                
                if (!oSelectedItem) {
                    oInput.resetProperty("value");
                    return;
                }
                
                oInput.setValue(oSelectedItem.getCells()[0].getTitle());
                this.byId("Inoice_input_address").setValue(oSelectedItem.getCells()[0].getTitle());
            }
    
            
                
        });
    });
