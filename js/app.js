var TopicsApp = {

  init: function() {

    // create a pub sub that extends Backbone.Events
    _.extend( TopicsApp.pubsub , Backbone.Events );
    
    // instantiate the router
    TopicsApp.router = new Router();

    // API parameters
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;

    // start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();

  },

  load: function(){

    var self = this;

    this.topics = new Topics();
    this.users = new Users();

    $.when( this.topics.fetch(), this.users.fetch() ).then(function(){
      
      self.init();

    });

    this.users.on( "add reset" , this.setCurrentUser , this );

  },

  setCurrentUser: function(){
    this.user = this.users.at( Math.round(Math.random()*(this.users.length-1)) );
  },

  getCurrentUser: function(){
    return this.user;
  }

};

$(document).ready(function() {

  TopicsApp.load();

});