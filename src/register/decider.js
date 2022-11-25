function JSONFilter({ JSONObject, SearchedElement, ElementValue }) {
  return Object.entries(JSONObject).reduce((a, [Element, ElementData]) => {
    ElementData[SearchedElement] == ElementValue ? (a[Element] = ElementData) : "";
    return a;
  }, {});
}

async function FilterCommands({ RegisteredCommands, ExistingCommands }) {
  let ExistingCommandsKeys = Object.keys(ExistingCommands);
  let NotRegisteredCommands = ExistingCommandsKeys.filter((ECMD) => !RegisteredCommands.includes(ECMD));
  let NotExistingCommands = RegisteredCommands.filter((RCMD) => !ExistingCommandsKeys.includes(RCMD));

  return { NotRegisteredCommands, NotExistingCommands };
}

module.exports = async function ({ client }) {
  //Check if Guild is specified
  let RegisteredCommands = [];

  await new Promise((resolve, reject) => {
    client.application?.commands.fetch().then(async (cmdslist) => {
      for (individualcmd of cmdslist) {
        RegisteredCommands.push(individualcmd[1].name);
      }
      resolve();
    });
  });

  //Filter guild commands from CommandList
  let ExistingCommands = Object.assign(
    {},
    JSONFilter({
      JSONObject: JSONFilter({ JSONObject: CommandList, SearchedElement: "Released", ElementValue: true }),
      SearchedElement: "IsOwnerDependent",
      ElementValue: false
    })
  );

  //Getting (not)registered commands as arrays
  let { NotRegisteredCommands, NotExistingCommands } = await FilterCommands({
    RegisteredCommands,
    ExistingCommands
  });

  console.info(
    `\nRegistered commands: ${RegisteredCommands.join(", ")}\nNot registered commands: ${NotRegisteredCommands}\nExisting commands: ${Object.keys(ExistingCommands).join(
      ", "
    )}\nNot existing commands: ${NotExistingCommands}\n`
  );

  //Registering not registered commands
  for (NRCMD of NotRegisteredCommands) {
    await require("./add")({
      cmds: client.application?.commands,
      NRCMD: ExistingCommands[NRCMD]
    });
  }

  //Removing not existing commands
  for (NECMD of NotExistingCommands) {
    await require("./remove")({
      cmds: client.application?.commands,
      NECMD
    });
  }
};
