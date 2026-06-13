const {getDb} = require("../../../db/mongo");


module.exports = async () => {
    const db = getDb();

    const cursor = db.collection("customers").find();
    
    return await cursor.toArray();
};
