'use strict';

var React = require('react/addons');
var $     = require('jquery');
var Router = require('react-router');
var Config = require('../config');

var HeaderMobile = require('../components/header-mobile');
var HeaderDesktop = require('../components/header-desktop');
var Footer = require('../components/footer');
var DesktopMmenu = require('../components/desktop-menu');
var ProductList = require('../components/product-list');

var Info=React.createClass({
    getInitialState: function() {
  	return {
  		img1: Config[this.props.id].img1,
  		titlu: Config[this.props.id].titlu,
        pret: Config[this.props.id].pret,
  	}

  },
    
    render:function()
    {
        return(
        <div className="pure-g">
            <div className="pure-u-1-2">
                <img src={this.state.img1} className="big-image-product"/>
            </div>
            <div className="pure-u-1-2">
                <p>{this.state.titlu}</p>
                <p>{this.state.pret}</p>
            </div>
        </div>
            );
    },
});


var ProductInfo = React.createClass({
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
            {this.renderInfo()}
        </div>
     
    <Footer/>
    </div>
    );
  },
    
   renderInfo: function()
    {
        return <Info id={this.getParams().productId}/>;
    },
      
});

module.exports = ProductInfo;
