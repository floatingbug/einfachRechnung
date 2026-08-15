const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offerNumber}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
        offerNumber,
    };

    const offer = db.collection("offers")
        .findOne(filter);

    return offer;
};
