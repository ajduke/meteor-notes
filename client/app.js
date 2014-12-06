Notes = new Meteor.Collection("notes");
Tags = new Meteor.Collection("tags");

Deps.autorun(function() {
  // userId() can be changed before user(), because loading profile takes time
  if(Meteor.userId()) {
    Session.set('userId',Meteor.userId());
  }else{
    Router.go('/');
    console.log('User logged out');
    Session.set('userId','');
  }
});

Meteor.startup(function () {
  Session.setDefault("selectedTag", null);
  Session.set('current_template','')
}); // end of startup


Meteor.autorun(function() {

  if (Meteor.userId()) {
    Session.set('userId', Meteor.userId());
    setTimeout(function () {
      $('#noteTag').tagsinput('refresh');
    }, 200)
  } else {
    Session.set('userId', '');
  }
});


// Handlebars if eq helper definition
Template.registerHelper('if_eq', function (ownerId) {
  if (ownerId === Meteor.userId()) {
    return true
  } else {
    return false
  }
});