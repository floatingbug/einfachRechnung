const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = ({ customerId }) => {
  const db = getDb({ customerId });
  const filter = {
    customerId: new ObjectId(customerId),
  }

  const cursor = db.collection("documents")
    .find(filter)

  return cursor;
};
