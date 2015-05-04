'use strict';

var React = require('react/addons');
var $     = require('jquery');

var HeaderMobile = require('../components/header-mobile');
var HeaderDesktop = require('../components/header-desktop');
var Footer = require('../components/footer');
var DesktopMmenu = require('../components/desktop-menu');
var Slideshow = require('../components/slideshow');
var ProductList = require('../components/product-list');

var Home = React.createClass({
  render: function() {

    return (
    <div className="page">
       
        <HeaderMobile/>
       
        <section className="desktop">
            <HeaderDesktop/>
            <DesktopMmenu/>
            <Slideshow/>
        </section>
     
        <div className="container">
            container
        </div>
     
    <Footer/>
    </div>
    );
  },
     
});

module.exports = Home;
