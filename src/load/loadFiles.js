const fs = require("fs");
const { join } = require("path");

module.exports = function ({ srcFolder }) {
  return new Promise((resolve, reject) => {
    global.CommandList = {};
    var FileLocation = join(srcFolder, "commands");
    fs.readdir(FileLocation, (err, files) => {
      if (err) return console.error(err);

      //Filter by their end
      let jsfiles = files?.filter((f) => f.split(".").pop() === "js");

      //Checking if there are any files in the folder
      if ((jsfiles?.length ? jsfiles?.length : 0) < 1) {
        console.info("There isn't any commands to load!");
        resolve();
        return;
      }

      for (jsfile of jsfiles) {
        let FilePath = join(FileLocation, jsfile);
        let RequestedCommand = require(FilePath);
        let CommandName = RequestedCommand.Name || `${jsfile.split(".").shift().slice(0, 1).toUpperCase()}${jsfile.split(".").shift().slice(1)}`;
        let CommandStructured = {
          Name: CommandName,
          DescriptionShort: RequestedCommand.DescriptionShort || `This is the ${CommandName.toLowerCase()} command.`,
          DescriptionLong: RequestedCommand.DescriptionLong || `This is the ${CommandName.toLowerCase()} command.`,
          IsPremium: RequestedCommand.IsPremium || false,
          IsVoteDependent: RequestedCommand.IsVoteDependent || false,
          IsOwnerDependent: RequestedCommand.IsOwnerDependent || false,
          IsAdminDependent: (function () {
            if (RequestedCommand.IsOwnerDependent) return true;
            else return RequestedCommand.IsAdminDependent || false;
          })(),
          PMEnable: (function () {
            if (RequestedCommand.IsOwnerDependent) return false;
            else return RequestedCommand.PMEnable || false;
          })(),
          Released: RequestedCommand.Released || false,
          Usage: RequestedCommand.Usage || `${RequestedCommand.IsOwnerDependent || false ? "!" : "/"}${CommandName.toLowerCase()}`,
          Category: RequestedCommand.Category || "Other",
          HasCreate: require(FilePath)?.create ? true : false,
          RequiedUserPermissions: RequestedCommand.RequiedUserPermissions || [],
          RequiedBotPermissions: RequestedCommand.RequiedBotPermissions || [],
          Path: FilePath
        };
        CommandList[CommandStructured.Name.toLowerCase()] = CommandStructured;
        CommandList[CommandStructured.Name] = CommandStructured.Name.toLowerCase();
      }
      resolve();
    });
  });
};
