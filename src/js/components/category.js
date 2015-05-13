'use strict';

var React = require('react/addons');
var $     = require('jquery');
var Router = require('react-router');

var HeaderMobile = require('../components/header-mobile');
var HeaderDesktop = require('../components/header-desktop');
var Footer = require('../components/footer');
var DesktopMmenu = require('../components/desktop-menu');
var ProductList = require('../components/product-list');

var Category = React.createClass({
    mixins: [ Router.State ],
    
    componentDidMount: function(){
        if (!$(".desktop-menu-list li ul").hasClass('hide-categories-menu'))   
            $(".desktop-menu-list li ul").toggleClass('hide-categories-menu');
    },
    
    render: function() {
    return (
        <div className="container">
            <ProductList categoryName={this.getParams().categoryName}/>
        </div>
    );
  },
    
      
});

module.exports = Category;
