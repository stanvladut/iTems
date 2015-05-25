'use strict';

var React = require('react/addons');
var Router = require('react-router');
var $ = require('jquery');
var Link = Router.Link;

var HeaderMobile = require('../components/header-mobile');
var HeaderDesktop = require('../components/header-desktop');
var Footer = require('../components/footer');
var DesktopMmenu = require('../components/desktop-menu');
var Slideshow = require('../components/slideshow');
var ProductList = require('../components/product-list');


var CartItem = React.createClass({
     renderPrice:function()
    {
        if (this.props.reducere!='null')
            return this.props.reducere+" LEI";
        else return this.props.pret+" LEI";
    },
    render: function()
    {   
        return (
            <div className="pure-g cart-item">
                <div className="pure-u-1-2 pure-u-sm-1-5">
                    <Link to="product" params={ { productId: this.props.id } }><img src={this.props.location} className="cart-image" /></Link>
                </div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-title">
                    <Link to="product" params={ { productId: this.props.id } }>{this.props.titlu}</Link>
                </div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-price">
                    {this.renderPrice()}
                </div>
                <div className="pure-u-1-2 pure-u-sm-1-5 cart-count">
                    {this.props.nr_bucati} bucăți
                </div>
                <div className="pure-u-1-2 pure-u-sm-1-5">
                    <button onClick={this.removeItem}>Remove</button>
                </div>
            </div>
        );
    },
        
    removeItem: function()
    {
        var self=this;
        $.post('/iTems/', {id:this.props.id, type: "remove_cart"})
                .then(function(status) {
                    alert(status);
                    if (status==="Deleted cart!") location.reload();
            });
    },
});


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
        $.post('/iTems/', {type: "cart"}).then(function(result) {
                if (status!="failed") self.setState({array:JSON.parse(result)});
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
            return(
                <div>
                    {this.state.array.map(this.renderProduct)}
                    <button className="cart-comanda" onClick={this.placeCommand}>Comandă !</button>
                </div>
                );
        }
    },
     
    renderProduct: function(info)
    {
        return <CartItem {...info} />;
    },
        
    placeCommand:function()
    {
        var self=this;
        $.post('/iTems/', {type: "order"})
            .then(function(status) {
            alert(status);
            if (status==='succes') {self.setState({array:[]});window.reload();}
        });
    }
});

module.exports = Cart;
