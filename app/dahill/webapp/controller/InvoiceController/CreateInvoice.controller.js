// @ts-nocheck
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/odata/v4/ODataModel",
        "sap/m/MessageToast",
        "sap/m/MessageBox",
        "sap/ui/core/Fragment",
        "sap/ui/model/json/JSONModel",
        "sap/m/PDFViewer"	
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        History,
        ODataModel,
        MessageToast,
        MessageBox,
        Fragment,
        JSONModel,
        PDFViewer
    ) {
        "use strict";

        return Controller.extend(
            "dahill.dahill.controller.InvoiceController.CreateInvoice",
            {
                onInit: function () {
                    this.count = 1;
                    var oJsonModel = new JSONModel({
                        Items: [
                           {
                            id:"",
                            description:"Repair and fixed the intercom cable.",
                            amount:10
                           },
                           {
                            id:"",
                            description:"Repair and fixed the intercom cable. Install new amplifier in the basement for control the system. ",
                            amount:10
                           },
                           {
                            id:"",
                            description:"Repair and fixed the intercom cable. Install new amplifier in the basement for control the system.Replace and install new outdoor push bottom panel front of the building. ",
                            amount:10
                           }

                        ],
                    });
                    var oTotalCounterModel = new JSONModel({
                        total: 0,
                    });
                    var oSaveBtnModel = new JSONModel({
                        saveMode: true,
                        editMode: false,
                    });
                    this.getView().setModel(oJsonModel, "oItemData");
                    this.getView().setModel(
                        oTotalCounterModel,
                        "oTotalCounterModel"
                    );
                    this.getView().setModel(oSaveBtnModel, "oSaveBtnModel");
                    this._description = this.byId(
                        "Invoice_description_textarea"
                    );
                    this._amount = this.byId("input_amount");
                    this._total = 0;
                    this._totalCalculation();
                    this._editId = 0;
                },
                onCustomerHelper: function () {
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
                    var oFilter = new Filter(
                        "name",
                        FilterOperator.Contains,
                        sValue
                    );
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
                    this.byId("Inoice_input_address").setValue(
                        oSelectedItem.getCells()[0].getTitle()
                    );
                    this.byId("Inoice_input_address").setValue(
                        oSelectedItem.getCells()[1].getText()
                    );
                    this.byId("Inoice_input_phone").setValue(
                        oSelectedItem.getCells()[2].getText()
                    );
                    this.byId("Inoice_input_jobLocation").setValue(
                        oSelectedItem.getCells()[3].getText()
                    );
                },
                onSavePressed: function () {
                    var test = this.byId("invoice_Date").getValue();
                    console.log(test);
                },
                onAddItem: function () {
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
                    if (this._pValueHelpDialogItem) {
                        this._pValueHelpDialogItem.then(
                            function (oDialog) {
                                oDialog.close();
                            }.bind(this)
                        );
                        this.byId("Invoice_description_textarea").setValue("");
                        this.byId("input_amount").setValue("");
                    }
                },
                onEditItemCancelPressed: function () {
                    this._pValueHelpDialogItemEdit.then(
                        function (oDialogEdit) {
                            oDialogEdit.close();
                        }.bind(this)
                    );
                    this.byId("edit_description_textarea").setValue("");
                    this.byId("edit_input_amount").setValue("");
                    this._editId = "";
                },
                onCreate: function (data) {
                    var oList = this.byId("main_table");
                    var oBinding = oList.getBinding("items");
                    // console.log(oBinding);
                    var oModel = this.getView().getModel("oItemData").getData();
                    console.log(oModel.Items.length)
                    this.count = oModel.Items.length + 1;
                    var _data = {
                        id: this.count,
                        description: data.description,
                        amount: data.amount,
                    };
                    
                    // console.log(oModel)
                    oModel.Items.push(_data);
                    this.getView().getModel("oItemData").setData(oModel);
                    console.log(oModel);
                    this.count++;
                    this._totalCalculation();
                },
                onSavePresseditem: function () {
                    var _description = this.byId(
                        "Invoice_description_textarea"
                    );
                    var _amount = this.byId("input_amount");
                    var description = _description.getValue();
                    var amount = _amount.getValue();
                    this.onCreate({ description, amount });
                    this._pValueHelpDialogItem.then(
                        function (oValueHelpDialogItem) {
                            oValueHelpDialogItem.close();
                        }.bind(this)
                    );
                    this.byId("Invoice_description_textarea").setValue("");
                    this.byId("input_amount").setValue("");
                },
                onDeletePresseditem: function (oEvent) {
                    const oTotalCounterModel =
                        this.getView().getModel("oTotalCounterModel");
                    var getObjectId = oEvent
                        .getSource()
                        .getBindingContext("oItemData")
                        .getObject().id;
                    var oModel = this.getView().getModel("oItemData").getData();
                    for (let i = 0; i < oModel.Items.length; i++) {
                        var temp = oModel.Items[i];
                        if (temp.id === getObjectId) {
                            var index = i;
                            this._total -= temp.amount;
                            oTotalCounterModel.setProperty(
                                "/total",
                                this._total
                            );
                            temp = "";
                            break;
                        }
                    }
                    oModel.Items.splice(index, 1);
                    this.getView().getModel("oItemData").setData(oModel);
                },
                onEditItemPress: function (oEvent) {
                    var getObject = oEvent
                        .getSource()
                        .getBindingContext("oItemData")
                        .getObject();
                        this._editId = getObject.id;
                        console.log(getObject.id,"openning id")
                    var oView = this.getView();
                    if (!this._pValueHelpDialogItemEdit) {
                        this._pValueHelpDialogItemEdit = Fragment.load({
                            id: oView.getId(),
                            name: "dahill.dahill.view.fragment.EditItem",
                            controller: this,
                        }).then(function (oValueHelpDialogItemEdit) {
                            oView.addDependent(oValueHelpDialogItemEdit);
                            return oValueHelpDialogItemEdit;
                        });
                    }
                    this._pValueHelpDialogItemEdit.then(
                        function (oValueHelpDialog) {
                            this.byId("edit_description_textarea").setValue(getObject.description);
                            this.byId("edit_input_amount").setValue(getObject.amount);
                            oValueHelpDialog.open();
                        }.bind(this)
                    );
                },
                _totalCalculation: function () {
                    const oTotalCounterModel =
                        this.getView().getModel("oTotalCounterModel");
                    var oModel = this.getView().getModel("oItemData").getData();
                    let arr = [];
                    for (let i = 0; i < oModel.Items.length; i++) {
                        var temp = oModel.Items[i];
                        arr.push(temp.amount);
                    }
                    this._total = 0;
                    for (var i = 0; i < arr.length; i++) {
                        this._total += parseInt(arr[i]);
                    }
                    oTotalCounterModel.setProperty("/total", this._total);
                },
                onSavePressedEdit:function(){
                    var oModel = this.getView().getModel("oItemData").getData();
                    console.log(this._editId,"id")
                    let _data = oModel.Items.find((x) => {
                        return x.id === this._editId;
                    });
                    console.log(_data.amount,"amount")
                    _data.description = this.byId("edit_description_textarea").getValue();
                    _data.amount = this.byId("edit_input_amount").getValue();
                    console.log(this.byId("edit_input_amount").getValue(),"input ampount")
                    this.getView().getModel("oItemData").setData(oModel);
                    this.onEditItemCancelPressed();
                    this._editId = "";
                },
                onPreviewPressedBtn:function(){
                    // var oModel = this.getView().getModel("oItemData").getData();
                    // var opdfViewer = new PDFViewer();
                    // this.getView().addDependent(opdfViewer);
                    // var sSource = "shopnil";
                    // opdfViewer.setSource(oModel);
                    // opdfViewer.setTitle( "My PDF");
                    // opdfViewer.open();
                    // pdfMake.createPdf(oModel).
                    const cusName = this.byId("CustomerInput").getValue();
                    const cusAddress = this.byId("Inoice_input_address").getValue();
                    const cusPhone = this.byId("Inoice_input_phone").getValue();
                    const jobLocation = this.byId("Inoice_input_jobLocation").getValue();
                    const invoiceDate = this.byId("invoice_Date").getValue();
                    var oView = this.getView();
                    if (!this._pValueHelpDialogItemPreview) {
                        this._pValueHelpDialogItemPreview = Fragment.load({
                            id: oView.getId(),
                            name: "dahill.dahill.view.fragment.Preview",
                            controller: this,
                        }).then(function (oValueHelpDialogItemPreview) {
                            oView.addDependent(oValueHelpDialogItemPreview);
                            return oValueHelpDialogItemPreview;
                        });
                    }
                    this._pValueHelpDialogItemPreview.then(
                        function (oValueHelpDialogPreview) {
                            if(cusName.length && cusAddress.length && cusPhone.length && jobLocation.length && invoiceDate.length > 0){
                                this.byId("preCustomerName").setText(cusName);
                                this.byId("preCutomerAddress").setText(cusAddress);
                                this.byId("preCutomerPhone").setText(cusPhone);
                                this.byId("preJobLocation").setText(jobLocation);
                                this.byId("preInvoiceDate").setText(invoiceDate);
                                oValueHelpDialogPreview.open();
                            }
                            else{
                                MessageToast.show("Please Provide All Data");
                            }

                        }.bind(this)
                    );
                },
                onClosePressed:function(){
                    this._pValueHelpDialogItemPreview.then(
                        function (oValueHelpDialogPreview) {
                            oValueHelpDialogPreview.close();
                        }.bind(this)
                        );
                },
                onAddNote:function(){
                    var oView = this.getView();
                    if (!this._pValueHelpDialogNote) {
                        this._pValueHelpDialogNote = Fragment.load({
                            id: oView.getId(),
                            name: "dahill.dahill.view.fragment.CreateNote",
                            controller: this,
                        }).then(function (oValueHelpDialogNote) {
                            oView.addDependent(oValueHelpDialogNote);

                            return oValueHelpDialogNote;
                        });
                    }
                }
            }
        );
    }
);
