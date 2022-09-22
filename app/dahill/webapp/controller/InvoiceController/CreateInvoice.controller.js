// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/model/odata/v4/ODataModel","sap/m/MessageToast",
    "sap/m/MessageBox","sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,ODataModel,MessageToast,MessageBox,Fragment,JSONModel) {
        "use strict";

        return Controller.extend("dahill.dahill.controller.InvoiceController.CreateInvoice", {
            onInit: function () {
                this.count = 1;
                var oJsonModel = new JSONModel({
                    Items:[
                       {
                        id: 1,
                        description: "shopnil",
                        amount: "1000",
                       },
                       {
                        id: 2,
                        description: "Ashik",
                        amount: "2000",
                       }
                    ]
                })
                var oTotalCounterModel = new JSONModel({
                   total:0
                })
                this.getView().setModel(oJsonModel, "oItemData");
                this.getView().setModel(oTotalCounterModel, "oTotalCounterModel");
                this._description = this.byId("Invoice_description_textarea");
                this._amount = this.byId("input_amount");
                this._total = 0;
                this._totalCalculation();

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
                var oView = this.getView();
                if (!this._pValueHelpDialogItem) {
                    this._pValueHelpDialogItem = Fragment.load({
                        id: oView.getId(),
                        name: "dahill.dahill.view.fragment.CreateItem",
                        controller: this,
                    }).then(function (oValueHelpDialogItem) {
                        oView.addDependent(oValueHelpDialogItem);
                        return oValueHelpDialogItem;
                    });
                }
                this._pValueHelpDialogItem.then(
                    function (oValueHelpDialogItem) {
                        oValueHelpDialogItem.open();
                    }.bind(this)
                );
                },
                onCancelPressed: function () {
                    if(this._pValueHelpDialogItem){
                        this._pValueHelpDialogItem.then(
                            function (oDialog) {
                              oDialog.close();
                           
                            }.bind(this)
                          );
                          this.byId("Invoice_description_textarea").setValue("");
                          this.byId("input_amount").setValue("");
                    }
                    else if(this._pValueHelpDialogItemEdit){
                        this._pValueHelpDialogItemEdit.then(
                            function (oDialogEdit) {
                              oDialogEdit.close();
                           
                            }.bind(this)
                          );
                          this.byId("Invoice_description_textarea").setValue("");
                          this.byId("input_amount").setValue("");
                    }
                  },
                  onCreate:function(data){
                    var oList = this.byId("main_table");
                    var oBinding = oList.getBinding("items");
                    // console.log(oBinding);
                    var _data = {
                        id: this.count,
                        description: data.description,
                        amount: data.amount,
                      };
                    var oModel = this.getView().getModel("oItemData").getData();
                    // console.log(oModel)
                    oModel.Items.push(_data);
                    this.getView().getModel("oItemData").setData(oModel);
                    // console.log(oModel);
                    this.count++;
                    this._totalCalculation();

                  },
                  onSavePresseditem:function(){
                    var _description = this.byId("Invoice_description_textarea");
                    var _amount = this.byId("input_amount");
                    var description = _description.getValue();
                    var amount = _amount.getValue();
                    this.onCreate({description,amount});
                    this._pValueHelpDialogItem.then(
                        function (oValueHelpDialogItem) {
                            oValueHelpDialogItem.close();
                        }.bind(this)
                    );
                    this.byId("Invoice_description_textarea").setValue("");
                    this.byId("input_amount").setValue("");

                  },
                  onDeletePresseditem:function(oEvent){
                    const oTotalCounterModel = this.getView().getModel("oTotalCounterModel");
                    var getObjectId =  oEvent.getSource().getBindingContext("oItemData").getObject().id;
                    var oModel = this.getView().getModel("oItemData").getData();
                    for (let i = 0; i < oModel.Items.length; i++) {
                        var temp = oModel.Items[i];
                        if (temp.id === getObjectId) {
                          var index = i;
                          this._total -= temp.amount;
                          oTotalCounterModel.setProperty("/total", this._total);
                          temp = "";
                          break;
                        }
                      }
                      oModel.Items.splice(index, 1);
                    this.getView().getModel("oItemData").setData(oModel);
                   
                  },
                  onEditItemPress:function(oEvent){
                    var getObject =  oEvent.getSource().getBindingContext("oItemData").getObject();
                    var oView = this.getView();
                    console.log(getObject);
                    if (!this._pValueHelpDialogItemEdit) {
                        this._pValueHelpDialogItemEdit = Fragment.load({
                            id: oView.getId(),
                            name: "dahill.dahill.view.fragment.CreateItem",
                            controller: this,
                        }).then(function (oValueHelpDialogItemEdit) {
                            oView.addDependent(oValueHelpDialogItemEdit);
                            return oValueHelpDialogItemEdit;
                        });
                    }
                    this._pValueHelpDialogItemEdit.then(
                        function (oValueHelpDialog) {
                          this.byId("Invoice_description_textarea").setValue(getObject.description);
                          this.byId("input_amount").setValue(getObject.amount);
                            oValueHelpDialog.open();
                        }.bind(this)
                    );
                   
                },
                _totalCalculation:function(){
                    const oTotalCounterModel = this.getView().getModel("oTotalCounterModel");
                    var oModel = this.getView().getModel("oItemData").getData();
                    let arr = [];
                    for (let i = 0; i < oModel.Items.length; i++) {
                        var temp = oModel.Items[i];
                        arr.push(temp.amount)
                      }
                     this._total = 0;
                     for(var i=0; i < arr.length; i++){
                        this._total += parseInt(arr[i]);
                    }
                    oTotalCounterModel.setProperty("/total", this._total);
                },
                
               
        });
    });
  