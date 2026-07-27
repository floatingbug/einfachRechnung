const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, emailSettings}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
    };
    const updateDoc = {
        $set: {
            email: emailSettings,
        },
    };
    const options = {
        upsert: true,
    };


    const result = await db.collection("settings")
        .updateOne(filter, updateDoc, options);


    return result;
};
