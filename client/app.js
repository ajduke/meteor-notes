Deps.autorun(function() {
  console.log('runnning Deps');
  // userId() can be changed before user(), because loading profile takes time
  if(Meteor.userId()) {
//      Router.go('/notes');
    console.log(AppConfig.title)

    Session.set('userId',Meteor.userId());
  }else{
//    Router.go('/');
    console.log('User logged out');
    Session.set('userId','');
  }
});

Meteor.startup(function () {
  console.log('Startup called..')
  AppConfig.title='Yo Yo'
  AppConfig.appBaseUrl='quebec'
  telescopeRoutes(AppConfig.appBaseUrl);
});