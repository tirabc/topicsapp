var UserView = Backbone.View.extend({

  template: $("#tpl-user-details").html(),
  events: {
  },

  initialize: function( options ){

    this.options = options || {};

    this.user = TopicsApp.users.get( this.options.id );

    _.bindAll(
      this,
      "render",
      "doAfterRender"
    );

  },

  render: function(){

    var tpl = this.template;
    var json = this.user.toJSON() || {};
    var output = Mustache.to_html( tpl , json );
    this.$el.html( output );

    return this;
  },

  doAfterRender: function(){

    var self = this;
    
    this.modal = UIkit.modal( this.$el.find( ".uk-modal" ) );
    this.modal.show();

    this.$el.find( ".uk-modal" ).on( "hide.uk.modal" , function(){
      self.remove();
    });
  
  }

});
