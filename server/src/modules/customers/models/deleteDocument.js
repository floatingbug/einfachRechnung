const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = async ({ documentId }) => {
  const db = getDb();
  const filter = {
    _id: new ObjectId(documentId),
  };

  await db.collection("documents")
    .deleteOne(filter);
};
