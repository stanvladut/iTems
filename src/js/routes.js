'use strict';

var React  = require('react/addons');
var Router = require('react-router');

var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./app');
var Home = require('./components/home');
var Category = require('./components/category');
var ProductInfo = require('./components/product');
var ProductInfoSale = require('./components/product-sale');
var Contact = require('./components/contact');
var Login = require('./components/login');
var Cart = require('./components/cart');
var Account = require('./components/account');

module.exports = (
        <Route name="app" path="/" handler={App}>
            <Route name="home" parh="/" handler={Home}/>
            <Route name="category" path="/category/:categoryName" handler={Category} />
            <Route name="product" path="/product/:productId" handler={ProductInfo} />
            <Route name="product-sale" path="/product-sale/:productId" handler={ProductInfoSale} />
            <Route name="contact" parth="/contact" handler={Contact} />
            <Route name="cart" parth="/cart" handler={Cart} /> 
            <Route name="account" parth="/account" handler={Account} />
            <DefaultRoute handler={Home}/>
        </Route>
    
);

