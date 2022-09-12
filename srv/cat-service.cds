using db.Customer as customer from '../db/Schema';
using db.Orders as orders from '../db/Schema';

service shopService {
    entity Customer   as projection on customer;
    entity Orders     as projection on orders;
}
