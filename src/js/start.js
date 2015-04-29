'use strict';

var React = require('react/addons');
var Router = require('react-router');
var routes = require('./routes');

// render app
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
