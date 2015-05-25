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
            <div className="header-item-center"><img onClick={this.renderHome} src="img/mini-logo.png"/></div>
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
        
    renderHome : function()
    {
         window.location.href = '/iTems';
    }
});

module.exports = HeaderMobile;
