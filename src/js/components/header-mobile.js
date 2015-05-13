'use strict';

var React = require('react/addons');
var $ = require('jquery');
var Router = require('react-router');
var Link = Router.Link;

var HeaderMobile = React.createClass({
    render: function() {
    return (
        <header className="mobile-header">
            <div className="header-item-left" onClick={this.left}></div>
            <div className="header-item-center"><Link to="home"><img src="img/mini-logo.png"/></Link></div>
            <div className="header-item-right" onClick={this.right}></div>
        </header>
        );
    },
    
    left: function()
    {
        $(document.body).toggleClass('menu-left'); 
    },
    
    right : function()
    {
        $(document.body).toggleClass('menu-right'); 
    },
});

module.exports = HeaderMobile;
