const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = async ({
  userId,
  invoiceId,
  customerId,
  type,
  storageKey,
  contentHash,
}) => {
  const db = getDb();

  const document = {
    userId: new ObjectId(userId),
    customerId: new ObjectId(customerId),
    invoiceId,
    type,
    storageKey,
    contentHash,
  };

  const result = await db
    .collection("documents")
    .insertOne(document);

  return {
    ...document,
    _id: result.insertedId,
  };
};
