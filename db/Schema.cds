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

entity Orders : managed {
    customer    : Association to Customer;
    description : String;
    price       : Double;
}
