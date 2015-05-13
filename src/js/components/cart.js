'use strict';

var React = require('react/addons');
var $     = require('jquery');
var Router = require('react-router');

var HeaderMobile = require('../components/header-mobile');
var HeaderDesktop = require('../components/header-desktop');
var Footer = require('../components/footer');
var DesktopMmenu = require('../components/desktop-menu');
var Slideshow = require('../components/slideshow');
var ProductList = require('../components/product-list');

var CartItem = React.createClass({
    render: function(){
        return (
            <div className="pure-g cart-item">
                <div className="pure-u-1-2 pure-u-sm-1-5"><img src={this.props.img} className="cart-image" /></div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-title">{this.props.titlu} lei</div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-price">500</div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-count">{this.props.nr_bucati} bucăți</div>
                <div className="pure-u-1-2 pure-u-sm-1-5"><button>Remove</button></div>
            </div>
        );
    }
});

var Cart = React.createClass({
    mixins: [ Router.State ],
    
    getInitialState: function() {
        return {
             array:[],
        };
    },
    
   componentDidMount: function() {
       var self=this;
        $.post('/cart', {type: "cart"}).then(function(result) {
                if (status!="failed") self.setState({array:result});
                else alert(result); 
            });
       
        if (!$(".desktop-menu-list li ul").hasClass('hide-categories-menu'))   
            $(".desktop-menu-list li ul").toggleClass('hide-categories-menu');
        
        if (this.state.array.length===0) $('.cart-comanda').hide();
        else $('.cart-comanda').show();
  },
    
  render: function() {
        return (
            <div className="container">
                <h1>Cosul de cumparaturi</h1>
                {this.renderCart()}
                <button className="cart-comanda">Comandă !</button>
            </div>  
        );
  },
                             
  renderCart: function()
  {
      if (this.state.array.length===0) 
      {
          return <p>Cosul este gol</p>
      }
      else 
      {
          return this.state.array.map(this.renderProduct);
      }
  },
      renderProduct: function(info)
    {   
        return <CartItem {...info} />
    } 
});

module.exports = Cart;
