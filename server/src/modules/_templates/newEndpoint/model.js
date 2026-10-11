const { getDb } = require("../../../db/mongo");


module.exports = async ({ }) => {
  const db = getDb();

  const result = await db.collection("name")
    .method();

  return result;
};
