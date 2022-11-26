module.exports = async function ({ cmds, NRCMD }) {
  if (NRCMD.HasCreate) {
    await require(NRCMD.Path)?.create({
      commands: cmds,
      permissions: require("../other/PermissionsList.json")[NRCMD.RequiedUserPermissions]
        ? require("../other/PermissionsList.json")[NRCMD.RequiedUserPermissions]
        : "0",
      dmEnabled: NRCMD.PMEnable
    });
  } else {
    await cmds?.create({
      name: NRCMD.Name.toLowerCase(),
      description: NRCMD.DescriptionShort,
      dmPermission: NRCMD.PMEnable,
      defaultMemberPermissions: require("../other/PermissionsList.json")[NRCMD.RequiedUserPermissions]
        ? require("../other/PermissionsList.json")[NRCMD.RequiedUserPermissions]
        : "0"
    });
  }
};
