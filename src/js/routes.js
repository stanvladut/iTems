'use strict';

var React  = require('react/addons');
var Router = require('react-router');

var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./app');
var Home = require('./components/home');
var Category = require('./components/category');
var ProductInfo = require('./components/product');
var Contact = require('./components/contact');
var Example = require('./components/example');
var Login = require('./components/login');

module.exports = (
        <Route name="login" path="/" handler={App}>
            <Route name="home" path="/home" handler={Home} />
            <Route name="category" path="/category/:categoryName" handler={Category} />
            <Route name="product" path="/product/:productId" handler={ProductInfo} />
            <Route name="example" path="/example" handler={Example} />
            <Route name="contact" parth="/contact" handler={Contact} />
        <DefaultRoute handler={Login} />
    </Route>
    
);
