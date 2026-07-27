const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, taxSettings}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
    };
    const updateDoc = {
        $set: {
            tax: taxSettings,
        }
    };
    const options = {
        upsert: true,
    };

    const result = await db.collection("settings")
        .updateOne(filter, updateDoc, options);


    return result;
};
