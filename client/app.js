Deps.autorun(function() {
  console.log('runnning Deps');
  // userId() can be changed before user(), because loading profile takes time
  if(Meteor.userId()) {
//      Router.go('/notes');

    Session.set('userId',Meteor.userId());
  }else{
//    Router.go('/');
    console.log('User logged out');
    Session.set('userId','');
  }

});

Meteor.startup(function () {
//  TelescopeConfig.title='Cybit QA'
  TelescopeConfig.siteUrl='mum'
  TelescopeConfig.enableNotifications=true
  TelescopeConfig.enableUserLinks=true
  TelescopeConfig.enableCategories=true
//  TelescopeConfig.backgroudColor='#353535'

  telescopeRoutes(TelescopeConfig.appBaseUrl);
});