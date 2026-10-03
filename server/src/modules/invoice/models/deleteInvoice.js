const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = async ({ userId, invoiceNumber }) => {
  const db = getDb();
  const filter = {
    userId: new ObjectId(userId),
    invoiceNumber,
  };

  return await db.collection("invoices")
    .deleteOne(filter);
}
