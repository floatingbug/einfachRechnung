const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, type}) => {
    const filter = {
        userId: new ObjectId(userId),
    };
    const updateDoc = {
        $inc: {
            "offer.nextOfferNumber": 1,
        },
    };
    const options = {
        returnDocument: "before",
    };

    const db = getDb();

    const result = await db.collection("settings").findOneAndUpdate(
        filter,
        updateDoc,
        options
    );

    return result.offer.nextOfferNumber;
}
