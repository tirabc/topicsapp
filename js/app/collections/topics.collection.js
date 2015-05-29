var Topics = Backbone.Collection.extend({

  model: Topic,
  localStorage: new Backbone.LocalStorage("topics"),

  getHistory: function( date ){
    
    var filteredTopics = this.filter( function( topic ){
      var date = moment( topic.get("date") );
      return moment().diff( date , 'minutes') > 1;
    });

    return filteredTopics;


  }

});