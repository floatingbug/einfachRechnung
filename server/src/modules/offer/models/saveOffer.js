const {getDb} = require("../../../db/mongo");


module.exports = async ({offer}) => {
    const db = getDb();

    db.collection("offers").insertOne(offer);
};
