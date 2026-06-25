const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = async ({ userId, type }) => {
    const db = getDb();

    const filter = {
        userId: new ObjectId(userId),
    };

    const options = {
        projection: {
            _id: 0,
            [type]: 1,
        },
    };

    const settings = await db.collection("settings")
        .findOne(filter, options);

    return settings[type];
};
