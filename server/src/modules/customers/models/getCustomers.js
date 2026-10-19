const { getDb, ObjectId } = require("../../../db/mongo");


module.exports = async ({ userId, queries }) => {
  const db = getDb();
  const filter = {
    userId: new ObjectId(userId),
  };
  const limit = queries.limit ? Number(queries.limit) : 100_000;
  const page = queries.page ? Number(queries.page) : 0;
  const skip = limit * page;

  // --- sort parameter ---
  // sortQuery example: customerName:1,contactPerson:-1
  const sortQuery = queries.sort;
  const sort = {};

  if (sortQuery) {
    for (const item of sortQuery.split(",")) {
      const [field, direction] = item.split(":");

      if (field === "customerName") {
        sort.firstName = Number(direction);
        sort.lastName = Number(direction);
        sort.companyName = Number(direction);
      }
      else if (field === "contactPerson") {
        sort.contactPerson = Number(direction);
      }

      sort[field] = Number(direction);
    }
  }
  else {
    sort.createdAt = -1;
  }

  // --- filter parameter ---
  // filterQuery example: customerName:bob,contactPerson:anton
  const filterQuery = queries.filter;

  if (filterQuery) {
    for (const item of filterQuery.split(",")) {
      if (!item) continue;

      const [field, ...valueParts] = item.split(":");
      const value = valueParts.join(":");

      if (!field || !value) continue;

      if (field === "name") {
        filter.$or = [
          { firstName: { $regex: value, $options: "i" } },
          { lastName: { $regex: value, $options: "i" } },
          { companyName: { $regex: value, $options: "i" } },
          { contactPerson: { $regex: value, $options: "i" } },
        ];
      }
      else {
        filter[field] = { $regex: value, $options: "i" };
      }

      if (field === "phone") {
        filter.phone = { $regex: value, $options: "i" };
      }
    }
  }

  const customers = await db.collection("customers")
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db.collection("customers")
    .countDocuments(filter);

  return {
    customers,
    pagination: {
      limit,
      page,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
};
