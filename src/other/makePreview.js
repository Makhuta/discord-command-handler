const { join } = require("path");
const fs = require("fs");

module.exports = function ({ filePath }) {
  fs.readFile(join(__dirname, "template.txt"), "utf8", function (err, data) {
    fs.writeFile(join(filePath, "templateCommand.txt"), data, (err) => {
      if (err) console.log(err);
    });
  });
};
