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
                    var fname = "dsfgsdfg"
                    var lname = "asdfsdfsdf"
                    var price = "asdgfsdfsd"
                    var productName = "sdfgsdfgdsfg"
                    var quantity = "dsfgdfsg"
                    var total = "3423"

                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, "0");
                    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                    var yyyy = today.getFullYear();

                    today = mm + "/" + dd + "/" + yyyy;

                    // Template literal
                    var content = `
                    <style type="text/css">

</style>


<!-- Header -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tr>
    <td height="20"></td>
  </tr>
  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
        <tr class="hiddenMobile">
          <td height="40"></td>
        </tr>
        <tr class="visibleMobile">
          <td height="30"></td>
        </tr>

        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td>
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                      <tbody>
                        <tr>
                          <td align="left"> <img src="http://www.supah.it/dribbble/017/logo.png" width="32" height="32" alt="logo" border="0" /></td>
                        </tr>
                        <tr class="hiddenMobile">
                          <td height="40"></td>
                        </tr>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                            Hello, Philip Brooks.
                            <br> Thank you for shopping from our store and for your order.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                      <tbody>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td height="5"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                            Invoice
                          </td>
                        </tr>
                        <tr>
                        <tr class="hiddenMobile">
                          <td height="0"></td>
                        </tr>
                        <tr class="visibleMobile">
                          <td height="0"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                            <small>ORDER</small> #800000025<br />
                            <small>MARCH 4TH 2016</small>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- /Header -->
<!-- Information -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="40"></td>
            </tr>
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td>
                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">

                          <tbody>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>BILLING INFORMATION</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                Philip Brooks<br> Public Wales, Somewhere<br> New York NY<br> 4468, United States<br> T: 202-555-0133
                              </td>
                            </tr>
                          </tbody>
                        </table>


                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                          <tbody>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>PAYMENT METHOD</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                Credit Card<br> Credit Card Type: Visa<br> Worldpay Transaction ID: <a href="#" style="color: #ff0000; text-decoration:underline;">4185939336</a><br>
                                <a href="#" style="color:#b0b0b0;">Right of Withdrawal</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
              </td>
            </tr>
            <tr class="hiddenMobile">
              <td height="0"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="0"></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<!-- /Information -->
<!-- Order Details -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="40"></td>
            </tr>
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                        Item
                      </th>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                        Subtotal
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
              </td>
            </tr>
            <tr>
              <td height="20"></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<!-- /Order Details -->
<!-- Total -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
              <td>

                <!-- Table Total -->
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
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
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                        Shipping &amp; Handling
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                        $15.00
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                        <strong>Grand Total (Incl.Tax)</strong>
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                        <strong>$344.90</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #b0b0b0; line-height: 22px; vertical-align: top; text-align:right; "><small>TAX</small></td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #b0b0b0; line-height: 22px; vertical-align: top; text-align:right; ">
                        <small>$72.40</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- /Table Total -->

              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<!-- /Total -->

<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">

  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                    Have a nice day.
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="spacer">
          <td height="50"></td>
        </tr>

      </table>
    </td>
  </tr>
  <tr>
    <td height="20"></td>
  </tr>
</table>
                    `;
                    // "<h1>Invoice</h1>" +
                    // "First Name:  " +
                    // fname +
                    // "<br>Last Name:  " +
                    // lname +
                    // "<br>Sales Amount:  " +
                    // salesAmount +
                    // " EUR";
                    var element = (document.getElementById("content").innerHTML = content);

                    console.log(productName);
                    html2pdf(element, {
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
