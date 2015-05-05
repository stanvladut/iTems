'use strict';

var React = require('react/addons');
var $     = require('jquery');
var p = require('./test2.json') 

/*var Api = {
    users: {}
}

Api.users.load = function(fn,String) {
     $.get(String, function(response) {
        fn(response.users);
     });
};
*/

var Example = React.createClass({
  
  getInitialState: function() {
      return { users: [], loading: true, };
  },
    
  componentDidMount: function() {
    /*  $.get('http://www.json-generator.com/api/json/get/bPDYxeYOoO?indent=2', function(result)      {
      var lastGist = result[0].img;
      if (this.isMounted()) {
          this.setState({
          users: lastGist,
          loading : false
        });
      }
    
    }.bind(this));*/
      this.setState({
        users : p[0].img,
        loading : false
      });
  },

  render: function() {
      
      if (this.state.loading) {
          return <div>Loading!</div>
      }
      else return <div>{this.state.users}</div>
  },
      
   
  
  onClick: function() {
      $.post('/users', { active: false });
  },
  
});

module.exports = Example;
