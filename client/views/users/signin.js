Template.signin.events({
    'click input[type=submit]': function(event){
      event.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();
      Meteor.loginWithPassword(username, password, function(err){
        if(err){
          console.log(err);
          throwError(err.reason);
        }
      });
  },

  'click #signup': function(){
      // Session.set('state', 'signup');
      Router.go('/'+baseUrl+'/signup');
  },

  'click .twitter-button': function(){
    Meteor.loginWithTwitter(function(){
      Router.go('/'+baseUrl);
    });
  }
});