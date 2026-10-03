const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = async ({ userId, invoiceId, type }) => {
  const db = getDb();
  const filter = {
    userId: new ObjectId(userId),
    invoiceId: new ObjectId(invoiceId),
    type,
  };

  await db.collection("documents")
    .deleteOne(filter);
}
