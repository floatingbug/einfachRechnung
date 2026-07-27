const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, offerSettings}) => {
    const db = getDb();
    const filter = {
        userId: new ObjectId(userId),
    };
    const updateDoc = {
        $set: {
            "offer.offerPrefix": offerSettings.offerPrefix,
            "offer.offerNumberFormat": offerSettings.offerNumberFormat,
            "offer.defaultValidityDays": offerSettings.defaultValidityDays,
            "offer.introduction": offerSettings.defaultIntroduction,
            "offer.closing": offerSettings.defaultClosing,
            "offer.showTaxRatePerItem": offerSettings.showTaxRatePerItem,
            "offer.showItemNumbers": offerSettings.showItemNumbers,
        }
    };
    const options = {
        upsert: true,
    };

    const result = await db.collection("settings")
        .updateOne(filter, updateDoc, options);

    return result;
};
