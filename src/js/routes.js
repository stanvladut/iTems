'use strict';

var React  = require('react/addons');
var Router = require('react-router');

var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./app');
var Home = require('./components/home');
var Example = require('./components/example');
var Category = require('./components/category');

module.exports = (
    <Route name="home" path="/" handler={App}>
        <Route name="example" path="/example/:productId" handler={Example} />
        <Route name="category" path="/category/:categoryName" handler={Category} />
        <DefaultRoute handler={Home} />
    </Route>
);
