const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = ({ customerId }) => {
  const db = getDb();
  const filter = {
    customerId: new ObjectId(customerId),
  };

  return db.collection("invoices")
    .find(filter);
};
