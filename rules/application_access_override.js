function (user, context, callback) {
  // Applications that are restricted
  var MOCO_MOFO_APPS = ['phonebook.mozilla.com', 'phonebook-dev.mozilla.com', 'login.mozilla.com', 'passwordreset.mozilla.com'];
  // LDAP groups allowed to access these applications
  var ALLOWED_GROUPS = ['team_moco', 'team_mofo'];

  if (MOCO_MOFO_APPS.indexOf(context.clientName) !== -1) {
    var groupHasAccess = ALLOWED_GROUPS.some(
      function (group) {
        if (!user.groups)
          return false;
        return user.groups.indexOf(group) >= 0;
    });
    if (groupHasAccess) {
     return callback(null, user, context);
    } else {
     context.redirect = {
       url: "https://sso.mozilla.com"
     };
     return callback(null, null, context);
    }
  }
  callback(null, user, context);
}
