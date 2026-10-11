const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = async ({ customerId, userId }) => {
  const db = getDb();
  const filter = {
    userId: new ObjectId(userId),
    _id: new ObjectId(customerId),
  };

  const result = await db.collection("customers")
    .deleteOne(filter);

  return result;
};
