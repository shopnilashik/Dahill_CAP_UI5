// @ts-nocheck
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/m/MessageBox",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        JSONModel,
        MessageToast,
        MessageBox,
        Filter,
        FilterOperator
    ) {
        "use strict";

        return Controller.extend("dahill.dahill.controller.CustomerMain", {
            onInit: function () {
                let oModeModel = new JSONModel({
                    deleteModel: true,
                    decline: false,
                    createBtn: true,
                });
                this.getView().setModel(oModeModel, "oModeModel");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter
                    .getRoute("CustomerMain")
                    .attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function (oEvent) {
                var oList = this.byId("main_table").getBinding("items");

                if (!oList.hasPendingChanges()) {
                    oList.refresh();
                    return;
                }
            },
            onTableItemPressed: function (oEvent) {
                // var oList = this.byId("main_table"),
                //       oBinding = oList.getBinding("items"),
                //       oContext = oBinding.create({
                //           "ID" : "",
                //           "name" : "shopnil",
                //           "address" : "dhaka",
                //           "phone" : "3543513514",
                //           "jobLocation" : "dhaka"
                //       });
                let sPath = oEvent.getSource().getBindingContext().getPath();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oItem = oEvent.getSource();

                oRouter.navTo("CustomerDetail", {
                    ID: window.encodeURIComponent(
                        oItem.getBindingContext().getPath().substr(1)
                    ),
                });
            },
            onDelete: function () {
                var oList = this.byId("main_table");
                oList.setMode(sap.m.ListMode.SingleSelectLeft);
                let oEditModel = this.getView().getModel("oModeModel");
                oEditModel.setProperty("/deleteModel", true);
                oEditModel.setProperty("/createBtn", false);
                oEditModel.setProperty("/decline", true);

                var oSelected = this.byId("main_table").getSelectedItem();

                if (oSelected) {
                    oSelected
                        .getBindingContext()
                        .delete("$auto")
                        .then(
                            function () {
                                MessageToast.show("Customer Deleted");
                            }.bind(this),
                            function (oError) {
                                MessageBox.error(oError.message);
                            }
                        );
                }
            },
            ondecline: function () {
                let oEditModel = this.getView().getModel("oModeModel");
                var oList = this.byId("main_table");
                oList.setMode(sap.m.ListMode.None);
                oEditModel.setProperty("/deleteModel", true);
                oEditModel.setProperty("/createBtn", true);
                oEditModel.setProperty("/decline", false);
            },
            onOpenDialog: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("CreateCustomer");
            },

            onSuggest: function (event) {
                var sValue = event.getParameter("suggestValue"),
                    aFilters = [];
                if (sValue) {
             
                    aFilters = [
                        new Filter(
                            [
                                new Filter("name", function (sText) {
                                    return (
                                        (sText || "")
                                            .toUpperCase()
                                            .indexOf(sValue.toUpperCase()) > -1
                                    );
                                }),
                            ],
                            false
                        ),
                    ];
                }
                this.oSF = this.getView().byId("searchField");
                this.oSF.getBinding("suggestionItems");
                this.oSF.suggest();
            },

            onSearch: function (event) {
                var oItem = event.getParameter("suggestionItem");
               
                if (oItem) {
                    var aFilter = [];
                    var value = oItem.getText();
                    if (value) {
                        aFilter.push(
                            new Filter("name", FilterOperator.Contains, value)
                        );
                    }

                    // filter binding
                    var oList = this.byId("main_table");
                    var oBinding = oList.getBinding("items");
                    oBinding.filter(aFilter);
                    MessageToast.show("Search for: " + oItem.getText());
                } else {
                    MessageToast.show("Search is fired!");
                }
            },
          
        });
    }
);
