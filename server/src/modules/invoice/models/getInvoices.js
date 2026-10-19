const { getDb, ObjectId } = require("../../../db/mongo");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

module.exports = async ({ userId, limit, page, customerId, filterString }) => {
  const db = getDb();
  limit = limit ? Number(limit) : DEFAULT_LIMIT;
  page = page ? Number(page) : DEFAULT_PAGE;

  const filter = {
    userId: new ObjectId(userId),
  };

  if (customerId) {
    filter.customerId = new ObjectId(customerId);
  }

  if (filterString) {
    for (const f of filterString.split(",")) {
      const [field, value] = f.split(":");

      if (field && value && field === "paymentStatus") {
        filter["payment.status"] = value;
      }
      else if (field && value) {
        filter[field] = {
          $regex: value,
          $options: "i",
        };
      }
    }
  }

  console.log(filter);

  const skip = page * limit;

  const items = await db.collection("invoices")
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db.collection("invoices")
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
