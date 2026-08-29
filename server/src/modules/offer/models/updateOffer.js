const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offerNumber, update}) => {
    const filter = {
        offerNumber: offerNumber,
        userId: new ObjectId(userId),
        invoiceId: {
            $exists: false,
        },
    };
    const doc = {
        $set: update,
    };
    const db = getDb();

    const result = await db.collection("offers")
        .updateOne(filter, doc);

    return result;
};
