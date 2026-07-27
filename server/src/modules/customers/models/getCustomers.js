const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
    };

    const cursor = db.collection("customers")
        .find(filter);
    
    return await cursor.toArray();
};
