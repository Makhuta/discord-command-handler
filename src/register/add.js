module.exports = async function ({ cmds, NRCMD }) {
  if (NRCMD.HasCreate) {
    await require(NRCMD.Path)?.create({
      commands: cmds,
      permissions: (function () {
        if (NRCMD.IsOwnerDependent || NRCMD.IsAdminDependent) {
          if (NRCMD.RequiedUserPermissions.length < 1) return "0";
          else return require("../other/PermissionsList.json")[NRCMD.RequiedUserPermissions];
        }
      })(),
      dmEnabled: NRCMD.PMEnable
    });
  } else {
    await cmds?.create({
      name: NRCMD.Name.toLowerCase(),
      description: NRCMD.DescriptionShort,
      dmPermission: NRCMD.PMEnable,
      defaultMemberPermissions: (function () {
        if (NRCMD.IsOwnerDependent || NRCMD.IsAdminDependent) {
          if (NRCMD.RequiedUserPermissions.length < 1) return "0";
          else return require("../other/PermissionsList.json")[NRCMD.RequiedUserPermissions];
        }
      })()
    });
  }
};
