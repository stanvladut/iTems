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

var Cart = React.createClass({
    mixins: [ Router.State ],
    
    getInitialState: function() {
        return {
             array:[],
        };
    },
     componentWillMount: function()
    {
       $(document.body).toggleClass('menu-right'); 
    },
    
   componentDidMount: function() {
       var self=this;
        $.post('/', {type: "cart"}).then(function(result) {
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
                <button className="cart-comanda" onClick={this.placeCommand}>Comandă !</button>
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
        var self=this;
        return (
            <div className="pure-g cart-item">
                <div className="pure-u-1-2 pure-u-sm-1-5"><img src={info.img} className="cart-image" /></div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-title">{info.titlu} lei</div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-price">{info.pret}</div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-count">{info.nr_bucati} bucăți</div>
                <div className="pure-u-1-2 pure-u-sm-1-5"><button onCLick={self.removeItem}>Remove</button></div>
            </div>
        );
    },
        
    removeItem: function()
    {
        var self=this;
        $.post('/', {type: "remove_item"})
            .then(function(result) {
            alert(result);
            if (result!='failed') self.setState({array:result});
        });
    },
        
    placeCommand:function()
    {
        var self=this;
        $.post('/', {type: "order"})
            .then(function(status) {
            alert(status);
            if (status==='succes') self.setState({array:[]});
        });
    }
});

module.exports = Cart;
