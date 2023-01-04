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
        "sap/m/PDFViewer",
        "../../libs/jspdf",
        "../../libs/html2pdf",	
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
	PDFViewer,
	jspdf,
	html2pdf,
	Image
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
                            amount:10,
                            counter: 1
                           },
                           {
                            id:"",
                            description:"Repair and fixed the intercom cable. Install new amplifier in the basement for control the system. ",
                            amount:10,
                            counter: 2
                           },
                           {
                            id:"",
                            description:"Repair and fixed the intercom cable. Install new amplifier in the basement for control the system.Replace and install new outdoor push bottom panel front of the building. ",
                            amount:10,
                            counter: 3
                           }

                        ],
                        Note:[
                            {
                                description: "Repair and fixed the intercom cable",
                                counter: 1,
                                id: 1
                            }
                        ],
                        Type:[
                            {
                                type: "Invoice",
                                key:1
                            },
                            {
                                type: "Proposal",
                                key:2
                            }
                        ]
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

                    // Template literal
                    var content = `
                    <center>
                    <div style="width: 600px;">
                        <table>
                            <tbody>
                                <tr>
                                <td style="font-size: 14px; color: #000000; font-family: 'Open Sans', sans-serif; line-height: .1px; vertical-align: top; text-align: center;">
                                    <h2>DAHILL CONTRACTION CO.</h2>
                                </td>
                                </tr>
                                <tr>
                                <td style="font-size: 10px; color: #000000; font-family: 'Open Sans', sans-serif; line-height: .1px; vertical-align: top; text-align: center;">
                                    <p>108 East 2nd St. Suite # 2, Brooklyn NY 11218</p>
                                </td>
                                </tr>
                                <tr>
                                <td style="font-size: 10px; color: #000000; font-family: 'Open Sans', sans-serif; line-height: .1px; vertical-align: top; text-align: center;">
                                    <p>Tel: (646) 284-302</p>
                                </td>
                                </tr>
                                <tr>
                                <td style="font-size:12px; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 1px; vertical-align: top; text-align: center; font-weight: bold;">
                                    <p>Design - Build - Remodel</p>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        <h2>Invoice</h2>
                            
                        <div style="display: flex;">
                            <div style="height: auto;float: left; width: 50%" >
                                <table border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                                    <tbody>
                                    <tr>
                                        <td style="font-size: 14px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top;">
                                        <strong>BILLING INFORMATION</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100%" height="10"></td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top;width: 250px;">
                                            <strong>NAME</strong>: Philip Brooks Public Wales
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; width: 250px;">
                                            <strong>ADDRESS</strong>: Somewhere New York NY 4468, United States
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; width: 250px;">
                                        <strong>PHONE</strong>: 202-555-0133
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                            </div> 
                            <div style="height: auto;float: right; width: 50%">
                                <table border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                                    <tbody>
                                    <tr>
                                        <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                        <strong>Date</strong>: 12/03/2022
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100%" height="10"></td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; width: 250px;">
                                            <strong>Job Location</strong>: Philip Brooks Public Wales, Somewhere New York NY 4468, United States
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Order Details -->
                        <div style="margin-top: 20px;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                                <tbody>
                                <tr>
                                    <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                                        <strong>Item Description</strong>
                                    </th>
                                    <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                                    <strong>Subtotal</strong>
                                    </th>
                                </tr>
                                <tr>
                                    <td height="1" style="background: #bebebe;" colspan="4"></td>
                                </tr>
                                <tr>
                                    <td height="10" colspan="4"></td>
                                </tr>
                                <tr>
                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #ff0000;  line-height: 18px;  vertical-align: top; padding:10px 0;" class="article">
                                    Beats Studio Over-Ear Headphones
                                    </td>
                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">$299.95</td>
                                </tr>
                                <tr>
                                    <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                                </tr>
                                <tr>
                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #ff0000;  line-height: 18px;  vertical-align: top; padding:10px 0;" class="article">Beats RemoteTalk Cable</td>
                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">$29.95</td>
                                </tr>
                                <tr>
                                    <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- /Order Details -->
                        <!-- Total details -->
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                            <tbody>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                                  Subtotal
                                </td>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap;" width="80">
                                  $329.90
                                </td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                                  <strong>Grand Total</strong>
                                </td>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                                  <strong>$344.90</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        <!-- /Total Details -->
                         <!-- Note Details -->
                         <div style="margin-top: 15px;">
                            <h3 style="display: flex;float: left;">Note</h3>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                <tbody>
                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000000;  line-height: 18px;  vertical-align: top; padding:10px 0;" class="article">Beats RemoteTalk Cable</td>
                                </tbody>
                            </table>
                        </div>
                        <!-- /Note Details -->
                        <!-- Signature -->
                        <div style="display: flex;margin-top: 80px;">
                            <div style="float: left;width: 50%;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" align="" >
                                    <tbody>
                                        <tr style="width: 50px;">
                                            <span style="display: inline-block;background-color: #b1b1b1;height: 1px;width: 200px;"></span>
                                        </tr>
                                        <tr>
                                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000000;  line-height: 18px;  vertical-align: top; padding:10px 0;text-align: center;" class="article">Constractor Signature</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style="float: right;width: 50%;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" align="" >
                                    <tbody>
                                        <tr style="width: 50%;">
                                            <span style="display: inline-block;background-color: #b1b1b1;height: 1px;width: 200px;"></span>
                                        </tr>
                                        <tr>
                                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000000;  line-height: 18px;  vertical-align: top; padding:10px 0;text-align: center;" class="article">Customer Signature</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- /Signeture -->
                    </div>
                </center>
                    `;
                    var element = (document.getElementById("content").innerHTML = content);
                    var opt = {
                        margin:       1,
                        filename:     'myfile.pdf',
                        image:        { type: 'jpeg', quality: 0.98 },
                        html2canvas:  { scale: 10 },
                        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                      };

                    // html2pdf().set(opt).from(element).save();
                    html2pdf(element, opt);
                    html2pdf(content, {
                    margin: 0,
                    filename: "demo.pdf",
                    });
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
                    var oModel = this.getView().getModel("oItemData").getData();
                    console.log(oModel.Items.length)
                    this.count = oModel.Items.length + 1;
                    var _data = {
                        id: this.count,
                        description: data.description,
                        amount: data.amount,
                        counter:  this.count
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
                    this._itemCounter();
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
                _itemCounter: function(){
                    var oModel = this.getView().getModel("oItemData").getData();
                    for (let i = 0; i < oModel.Items.length; i++) {
                        oModel.Items[i].counter = i + 1;
                    }
                    this.getView().getModel("oItemData").setData(oModel);
                },
                _totalCalculation: function () {
                    const oTotalCounterModel =
                    this.getView().getModel("oTotalCounterModel");
                    var oModel = this.getView().getModel("oItemData").getData();
                    let arr = [];
                    for (let i = 0; i < oModel.Items.length; i++) {
                        var temp = oModel.Items[i];
                        oModel.Items[i].counter = i + 1;
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
                    const invoiceType = this.byId("invoiceComboBox").getValue();
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
                            if(cusName.length && cusAddress.length && cusPhone.length && jobLocation.length && invoiceDate.length && invoiceType.length > 0){
                                this.byId("preCustomerName").setText(cusName);
                                this.byId("preCutomerAddress").setText(cusAddress);
                                this.byId("preCutomerPhone").setText(cusPhone);
                                this.byId("preJobLocation").setText(jobLocation);
                                this.byId("preInvoiceDate").setText(invoiceDate);
                                this.byId("PreviewInvoiceDialog").setTitle("Preview "+ invoiceType);
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
                    this._pValueHelpDialogNote.then(
                        function (oValueHelpDialogNote) {
                            oValueHelpDialogNote.open();
                        }.bind(this)
                    );
                },
                onCancelPressedNote: function() {
                    this._pValueHelpDialogNote.then(
                        function (oValueHelpDialogNote) {
                            oValueHelpDialogNote.close();
                            this.byId("Invoice_description_note").setValue("")
                        }.bind(this)
                        );
                },
                onSavePressedNote:function(){
                    const data = this.byId("Invoice_description_note").getValue();
                    if(data){
                    const oModel = this.getView().getModel("oItemData");
                    const oModelData = oModel.getData();
                    this.count = oModelData.Note.length + 1;
                    var _data = {
                        description: data,
                        counter:  this.count,
                        id: this.count
                    };
                    oModelData.Note.push(_data);
                    oModel.setData(oModelData);
                    this.count++;
                    this.onCancelPressedNote();
                    }else{
                        MessageToast.show("Please Add Note");
                    }
                    
                },
                onDeletePressedNote: function (oEvent) {
                    var getObjectId = oEvent
                    .getSource()
                    .getBindingContext("oItemData").getObject().id;
                        console.log(getObjectId);
                    var oModel = this.getView().getModel("oItemData").getData();
                    for (let i = 0; i < oModel.Note.length; i++) {
                        var temp = oModel.Note[i];
                        if (temp.id === getObjectId) {
                            var index = i;
                            temp = "";
                            break;
                        }
                    }
                    oModel.Note.splice(index, 1);
                    for (let i = 0; i < oModel.Note.length; i++) {
                        oModel.Note[i].counter = i + 1;
                    }
                    this.getView().getModel("oItemData").setData(oModel);
                },
            }
        );
    }
);
