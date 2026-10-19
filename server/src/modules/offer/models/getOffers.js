const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = async ({ userId, limit, page, customerId, filterString }) => {
  const db = getDb();
  limit = limit ?? 10;
  page = page ?? 0;

  const filter = {
    userId: new ObjectId(userId),
  };

  if (filterString) {
    for (const f of filterString.split(",")) {
      const [field, value] = f.split(":");

      if (field && value) {
        filter[field] = { $regex: value, $options: "i" };
      }
    }
  }

  if (customerId) {
    filter.customerId = new ObjectId(customerId);
  }

  const skip = (page) * limit;

  const items = await db.collection("offers")
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db.collection("offers")
    .countDocuments(filter);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
