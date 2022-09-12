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
    orderItems  : String;
    customer    : Association to Customer
                      on customer.ID = ID;
}
