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
              
                this.count = 1;
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
                this.byId("Inoice_input_address").setValue(oSelectedItem.getCells()[1].getText());
                this.byId("Inoice_input_phone").setValue(oSelectedItem.getCells()[2].getText());
                this.byId("Inoice_input_jobLocation").setValue(oSelectedItem.getCells()[3].getText());
            },
            onSavePressed:function(){
                var test = this.byId("invoice_Date").getValue();
                console.log(test);
               
            },
            onAddItem:function(){ 
               
                this._oPnl = this.byId("_IDGenVBox6");
                var oLabel = new sap.m.Label({
                    width:"100%",
                    text:this.count
                });
                var oInput1 = new sap.m.TextArea({
                    width:"100%",
                    placeholder:`Enter Item ${this.count}`
                });
                var oInput2 = new sap.m.Input({
                    width:"100%",
                    placeholder:`Enter Amount ${this.count}`

                });
                var delIcon = new sap.ui.core.Icon({
                    src:"sap-icon://delete"
                });
                var FlexBox1 = new sap.m.FlexBox({
                    width:"100%",
                    direction:"Column",
                    alignItems:"Start",
                    items:[oLabel,oInput1,oInput2,delIcon]
                })
                var  _oCcLayout = new sap.m.FlexBox({
                    width:"100%",
                    alignItems:"Center",
                    justifyContent:"Start",
                    items:[FlexBox1]
                    });
                    
                    this._oPnl.addContent(_oCcLayout);
                    this.count++;
                }
                    
    
        });
    });
