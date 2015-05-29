var HeaderView = Backbone.View.extend({

  el: "header",
  template: $("#tpl-header").html(),
  events: {
  },

  initialize: function( options ){

    this.options = options || {};

    this.user = TopicsApp.user;
    
    _.bindAll(
      this,
      "render"
    );

  },

  render: function(){

    var tpl = this.template;
    var json = {
      user: this.user.toJSON()
    } || {};
    var output = Mustache.to_html( tpl , json );
    this.$el.html( output );

    return this;
  }

});
