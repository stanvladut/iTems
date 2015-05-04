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
    
    render: function() {
    return (
    <div className="page">
       
        <HeaderMobile/>
       
        <section className="desktop">
            <HeaderDesktop/>
            <DesktopMmenu show="false"/>
        </section>
     
        <div className="container">
            <ProductList categoryName={this.getParams().categoryName}/>
        </div>
     
    <Footer/>
    </div>
    );
  },
    
      
});

module.exports = Category;
