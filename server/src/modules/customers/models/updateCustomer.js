const { getDb, ObjectId } = require("../../../db/mongo");

module.exports = async ({ customer }) => {
    const db = getDb();

    const filter = {
        _id: new ObjectId(customer.id),
    };

    const { id, ...customerDoc } = customer;

    const doc = {
        $set: customerDoc,
    };

    const result = await db
        .collection("customers")
        .updateOne(filter, doc);

    return result;
};
