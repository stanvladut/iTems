'use strict';

var React  = require('react/addons');
var Router = require('react-router');

var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./app');
var Home = require('./components/home');
var Example = require('./components/example');

module.exports = (
  <Route name="home" path="/" handler={App}>
    <Route name="example" path="/example" handler={Example} />
    <DefaultRoute handler={Home} />
  </Route>
);
