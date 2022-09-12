using {
    Country,
    managed,
    cuid
} from '@sap/cds/common';

namespace db;

entity Customer : cuid {
    name        : String;
    address     : String;
    phone       : String;
    jobLocation : String;
}

entity Orders : managed, cuid {
    customer_ID : String;
    customer    : Association to Customer
                      on customer.ID = ID;
    items       : Association to many OrderItems
                      on items.orderID = ID;
}

entity OrderItems : cuid {
    orderID : String;
    name    : String;
    price   : Double;
}
