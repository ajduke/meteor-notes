// routes for app
nProgressHook= function () {
  if (this.ready()) {
    setTimeout(function(){
      $('#noteTag').tagsinput('refresh');
    },200)
    NProgress.done();
    this.next();
  } else {
    NProgress.start();
    this.stop();
  }

}

Router.onBeforeAction(nProgressHook);

Router.map(function () {
  // provide a String to evaluate later
  this.route('home', {
    path: '/',
    template: 'notesLayout',
    subscriptions: function(){
      this.subscribe('notes')
      this.subscribe('tags')
    },
    action:function(){
      Session.set('current_template','inputForm');
      this.render();
    }
  });

  //// provide the actual controller symbol if it's already defined
  //this.route('input_note', {
  //  path: '/notes',
  //  layoutTemplate: 'notesLayout',
  //  waitOn:function(){
  //    return [Meteor.subscribe('notes'),Meteor.subscribe('tags')]
  //  }
  //});
});


