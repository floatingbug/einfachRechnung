const {getDb} = require("../../../db/mongo");


module.exports = async () => {
    const db = getDb();
    const filter = {
        status: {
            $in: ["draft", "sent"],
        },
        validUntil: {
            $lt: new Date(),
        },
    };
    const update = {
        $set: {
            status: "expired",
        },
    };

    const result = await db.collection("offers")
        .updateMany(filter, update)

    return result;
}
