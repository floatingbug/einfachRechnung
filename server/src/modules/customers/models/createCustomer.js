const {getDb} = require("../../../db/mongo");


module.exports = async ({customer}) => {
    const db = getDb();

    const result = await db.collection("customers")
        .insertOne({...customer});

    return result;
};
