// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/model/odata/v4/ODataModel","sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,ODataModel,MessageToast,MessageBox) {
        "use strict";

        return Controller.extend("dahill.dahill.controller.CreateCustomer", {
            onInit: function () {
                this._name = this.byId("create_input_name");
                this._address = this.byId("create_input_address");
                this._phone= this.byId("create_input_phone");
                this._jobLocation = this.byId("create_input_jobLocation");
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            clearField:function(){
                this._name.setValue("");
                this._address.setValue("");
                this._phone.setValue("");
                this._jobLocation.setValue("");
                },
            onNavButton: function () {
                this.clearField();
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.oRouter.navTo("CustomerMain", {}, true);
                }
                },
                onSavePressed:function(){
                this._name = this.byId("create_input_name");
                this._address = this.byId("create_input_address");
                this._phone= this.byId("create_input_phone");
                this._jobLocation = this.byId("create_input_jobLocation");
                var oBinding = this.getView().getModel();
                var oList = oBinding.bindList("/Customer")
                let name = this._name.getValue(),
                address = this._address.getValue(),
                phone = this._phone.getValue(),
                jobLocation = this._jobLocation.getValue()
                console.log(name.length,address.length,phone.length,jobLocation.length);
                 if(name.length > 2 && address.length > 2 && phone.length > 2 && jobLocation.length > 2){
                    oList.create({
                       
                        "name" : this._name.getValue(),
                        "address" : this._address.getValue(),
                        "phone" : this._phone.getValue(),
                        "jobLocation" : this._jobLocation.getValue()
                    });
                    this.oRouter.navTo("CustomerMain");
                    this.clearField();
                 }
                  else{
                    MessageToast.show("Please Provide All Data");
                  }
                
                
                },
                onCancelPressed:function(){
                this.clearField();
                this.oRouter.navTo("CustomerMain", {}, true);
                },
                
        });
    });
