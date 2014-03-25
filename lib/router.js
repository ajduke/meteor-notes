// routes for app

nProgressHook= function () {
  if (this.ready()) {
    setTimeout(function(){
      $('#noteTag').tagsinput('refresh');
    },200)
    NProgress.done();
  } else {
    NProgress.start();
    this.stop();
  }
}

Router.before(nProgressHook)

Router.map(function () {
  // provide a String to evaluate later
  this.route('inputNote', {
    path: '/',
    layoutTemplate: 'notesLayout',
    waitOn:function(){
      return [Meteor.subscribe('notes'),Meteor.subscribe('tags')]
    }
  });

  // provide the actual controller symbol if it's already defined
  this.route('inputNote', {
    path: '/notes',
    layoutTemplate: 'notesLayout',
    waitOn:function(){
      return [Meteor.subscribe('notes'),Meteor.subscribe('tags')]
    }
  });
});