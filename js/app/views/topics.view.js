var TopicsView = Backbone.View.extend({

  template: $("#tpl-topics").html(),
  events: {
    "click a[data-action='see-user']": "seeUser",
    "click button[data-action='suggest-topic']": "suggestTopic",
    "click button[data-action='vote']": "vote"
  },

  initialize: function( options ){

    this.options = options || {};

    this.users = TopicsApp.users;
    this.user = TopicsApp.user;

    // TODO
    if( this.options.history == true ){

      this.topics = new Topics( TopicsApp.topics.getHistory() );

    }else{

      this.topics = TopicsApp.topics;

    }

    this.topics.on( "add reset change" , this.render , this );

    _.bindAll(
      this,
      "render",
      "seeUser",
      "suggestTopic",
      "vote"
    );

  },

  seeUser: function(e){

    var $current = $(e.currentTarget);
    var id = $current.data( "id" );
    TopicsApp.router.user( id );

  },

  suggestTopic: function(e){

    TopicsApp.router.suggest();

  },

  vote: function(e){

    var $current = $(e.currentTarget);
    var id = $current.data("id");
    var topic = this.topics.get( id );
    var votes = topic.get( "votes" );
    topic.set( "votes" , votes+1 );
    topic.save();

  },

  render: function(){

    var self = this;

    this.topics.each(function(t,i){
      var user = self.users.get( t.get("author") );
      t.set( "owner" , user.toJSON() );
      t.set( "splittedKeywords" , t.get("keywords").split(" ") );
      t.set( "timeago" , moment( t.get("date") ).fromNow() );
    });

    var tpl = this.template;
    var json = {
      topics: this.topics.toJSON(),
      user: this.user.toJSON()
    } || {};
    var output = Mustache.to_html( tpl , json );
    this.$el.html( output );

    return this;
  }

});
