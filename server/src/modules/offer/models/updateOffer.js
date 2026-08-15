const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offer}) => {
    const {customerId, ...sanitizedOffer} = offer;
    const filter = {
        userId: new ObjectId(userId),
        offerNumber: offer.offerNumber,
    };
    const doc = {
        $set: {
            ...sanitizedOffer
        },
    };
    const db = getDb();

    const result = await db.collection("offers")
        .updateOne(filter, doc);

    return result;
};
