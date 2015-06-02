var TopicView = Backbone.View.extend({

  template: $("#tpl-topic-details").html(),
  events: {
    "click [data-action='edit-description']": "editDescription",
    "keyup [data-action='update-description']": "updateDescription"
  },

  initialize: function( options ){

    this.options = options || {};

    this.user = TopicsApp.user;
    this.topic = TopicsApp.topics.get( this.options.id );

    var splittedKeywords = this.topic.get( "keywords" ).split( " " );
    this.topic.set( "splittedKeywords" , splittedKeywords );

    this.topic.on( "sync", this.render , this);

    _.bindAll(
      this,
      "render"
    );

  },

  render: function(){

    var tpl = this.template;
    var json = {
      topic: this.topic.toJSON(),
      user: this.user.toJSON()
    } || {};
    var output = Mustache.to_html( tpl , json );
    this.$el.html( output );

    return this;
  },

  editDescription: function(e){

    var $current = $(e.currentTarget);

    $current.addClass("uk-hidden");

    this.$el.find( "[data-action='update-description']" ).removeClass("uk-hidden");

  },

  updateDescription: function(e){


    if( e.which != 13 || e.shiftKey ) return false;

    e.preventDefault();

    var $current = $(e.currentTarget);

    var newText = $current.val();

    this.topic.set( "description" , newText );

    this.topic.save();

    

  }


});
