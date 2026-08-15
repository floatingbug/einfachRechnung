const {getDb} = require("../../../db/mongo");


module.exports = async ({offer}) => {
    const db = getDb();

    const result = await db.collection("offers").insertOne(offer);

    return result;
};
