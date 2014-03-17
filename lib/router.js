// routes for app

Router.map(function () {
  // provide a String to evaluate later
  this.route('inputNote', {
    path: '/',
    layoutTemplate: 'notesLayout'
  });

  // provide the actual controller symbol if it's already defined
  this.route('inputNote', {
    path: '/notes',
    layoutTemplate: 'notesLayout'
  });
});