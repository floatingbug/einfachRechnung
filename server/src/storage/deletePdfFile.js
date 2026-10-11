const fs = require("fs");
const path = require("path");


module.exports = async ({ storageKey }) => {
  const absoluteFilePath = path.join(process.cwd(), "storage", "documents", storageKey);

  return new Promise((resolve, reject) => {
    function unlinkCallback(error) {
      error ? reject(error) : resolve();
    }

    fs.unlink(absoluteFilePath, unlinkCallback);
  });
};
