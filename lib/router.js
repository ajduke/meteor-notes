// routes for app

Router.route('/',  {
  name: "home",
  onBeforeAction: function(){
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
  },
  subscriptions: function(){
    this.subscribe('notes')
    this.subscribe('tags')
  },
  action:function(){
    this.render();
  }

})


