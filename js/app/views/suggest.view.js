var SuggestView = Backbone.View.extend({

  template: $("#tpl-topic-suggest").html(),
  events: {
    "submit form": "save"
  },

  initialize: function( options ){

    this.options = options || {};

    this.user = TopicsApp.user;

    _.bindAll(
      this,
      "render",
      "doAfterRender"
    );

  },

  save: function( e ){
    
    var data = $("form").serializeObject();
    data.author = this.user.get('id');
    data.votes = Math.floor( Math.random() * (100 - 0 + 1) );
    data.date = new Date();
    var topic = new Topic(data);
    TopicsApp.topics.create(topic);

    this.modal.hide();

    e.preventDefault();

  },

  render: function(){

    var tpl = this.template;
    var json = {
      user: this.user.toJSON()
    } || {};
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
