var TopicView = Backbone.View.extend({

  template: $("#tpl-topic-details").html(),
  events: {},

  initialize: function( options ){

    this.options = options || {};

    this.user = TopicsApp.user;
    this.topic = TopicsApp.topics.get( this.options.id );

    var splittedKeywords = this.topic.get( "keywords" ).split( " " );
    this.topic.set( "splittedKeywords" , splittedKeywords );

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
  }


});
