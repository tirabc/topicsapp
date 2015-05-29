
var Router = Backbone.Router.extend({

  /**
   * Routes
   */
  routes: {
    "history":      "history",
    "topics":       "topics",
    "topics/:id":   "topic",
    "users/:id":    "user",
    "suggest/:id":  "suggest",
    "*page":        "topics"
  },

  initialize: function(){

    this.headerView = new HeaderView();
    this.headerView.render();

  },

  topics: function(){

    this._cleanup();
    this.view = new TopicsView();
    $("#app").html( this.view.render().el );

  },

  history: function(){

    this._cleanup();
    this.view = new TopicsView( {history: true} );
    $("#app").html( this.view.render().el );

  },

  topic: function( id ){

    this._cleanup();
    this.view = new TopicView( {id: id} );
    $("#app").html( this.view.render().el );

  },

  user: function( id ){

    this.userView = new UserView( {id: id} );
    $("#app").append( this.userView.render().el );
    this.userView.doAfterRender();

  },

  suggest: function( id ){

    this.suggestView = new SuggestView( {id: id} );
    $("#app").append( this.suggestView.render().el );
    this.suggestView.doAfterRender();

  },

  _cleanup: function(){
    if( this.view )
      this.view.remove();
  }

});