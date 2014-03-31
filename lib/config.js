TelescopeConfig.siteUrl='forum'

if(Meteor.isClient){
  Meteor.startup(function () {
    TelescopeConfig.title='My Site'
    TelescopeConfig.enableNotifications=true
    TelescopeConfig.enableUserLinks=true
    TelescopeConfig.enableCategories=true
    TelescopeConfig.backgroudColor='#353535'
    telescopeRoutes(TelescopeConfig.siteUrl);
  });
}

if(Meteor.isServer){
  Meteor.startup(function () {
    TelescopeConfig.enableNotifications=true
    telescopeRoutesServer(TelescopeConfig.siteUrl);
  });
}
