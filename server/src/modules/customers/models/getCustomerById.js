const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({customerId}) => {
    const db = getDb();
    const filter = {
        _id: new ObjectId(customerId),
    };

    const customer = await db.collection("customers")
        .findOne(filter);

    return customer;
};
