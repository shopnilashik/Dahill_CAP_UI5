// module.exports = (srv) => {
//     srv.before("CREATE", "Orders", async (req) => {
//         const { Orders, OrderItems } = cds.entities("db");
//         const order = req.data;

//         const custID = order.customer_ID;
//         const orderItems = order.order;

//         // const data = await CREATE();
//         // console.log("custID, OrderItems", custID, orderItems);
//         const tx = cds.transaction(req);
//         const affectedRows = await tx.run(
//             INSERT.into(Orders).entries({customer_ID:custID})
//         )
//         console.log('affectedRows', affectedRows)
//         return order;
//     });
// };
