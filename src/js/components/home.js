'use strict';

var React = require('react/addons');
var $     = require('jquery');
var Router = require('react-router');

var Slideshow = require('../components/slideshow');
var ProductListSale = require('../components/product-list-sale');

var Home = React.createClass({
    
    componentDidMount: function()
    {    
        if ($(".desktop-menu-list li ul").hasClass('hide-categories-menu'))
            $(".desktop-menu-list li ul").toggleClass('hide-categories-menu');
    },
    
    render: function() {
    return (
        <div>
            <Slideshow/>
            <div className="container">
                <h1>On sale</h1>
                <ProductListSale categoryName="gadgets" />
            </div>
        </div>
    );
  },    
});

module.exports = Home;
