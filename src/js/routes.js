'use strict';

var React  = require('react/addons');
var Router = require('react-router');

var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./app');
var Home = require('./components/home');
var Category = require('./components/category');
var ProductInfo = require('./components/product');

module.exports = (
    <Route name="home" path="/" handler={App}>
        <Route name="category" path="/category/:categoryName" handler={Category} />
        <Route name="product" path="/product/:productId" handler={ProductInfo} />
        <DefaultRoute handler={Home} />
    </Route>
);
