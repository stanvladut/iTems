'use strict';

var React = require('react/addons');
var $     = require('jquery');

/*
var Api = require('api');

Api = {
    users: require('api/users')
}

Api.users.load = function(fn) {
    fn([
        { name: 'Robert', value: 3 },
        { name: 'Tananana.ro', value: 5 }
    ]);
    // In the future, when the backend is done, you switch to real AJAX requests, for examples
    // $.get('/users', function(response) {
    //    fn(response.users);
    // });
};
*/

var Example = React.createClass({
  /*
  getInitialState: function() {
      return { users: [], loading: true, };
  },
    
  componentWillMount: function() {
      var self = this;
      Api.users.load(function(users) {
        self.setState({ users: response.users, loading: false });
      });
  },
  */
  render: function() {
      /*
      if (this.state.loading) {
          return <div>Loading!</div>;
      }
      */
    return (
      <div>
        Example world!
      </div>
    );
  },
  /*
  onClick: function() {
      $.post('/users', { active: false });
  }
  */
});

module.exports = Example;
