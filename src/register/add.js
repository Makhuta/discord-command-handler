module.exports = async function ({ cmds, NRCMD }) {
  if (NRCMD.HasCreate) {
    await require(NRCMD.Path)?.create({
      commands: cmds,
      permissions: require(join(Configs, "PermissionsList.json"))[this.RequiedUserPermissions]
        ? require(join(Configs, "PermissionsList.json"))[this.RequiedUserPermissions]
        : "0",
      dmEnabled: NRCMD.PMEnable
    });
  } else {
    await cmds?.create({
      name: NRCMD.Name.toLowerCase(),
      description: NRCMD.DescriptionShort,
      dmPermission: NRCMD.PMEnable,
      defaultMemberPermissions: require(join(Configs, "PermissionsList.json"))[this.RequiedUserPermissions]
        ? require(join(Configs, "PermissionsList.json"))[this.RequiedUserPermissions]
        : "0"
    });
  }
};
