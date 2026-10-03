const fs = require("fs");


module.exports = (path) => {
  return new Promise((resolve, reject) => {
    function rmCallback(error) {
      if (!error) {
        resolve();
      }
      else {
        reject(error);
      }
    }

    fs.rm(path, { force: true }, rmCallback)
  });
}
