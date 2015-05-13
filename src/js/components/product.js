'use strict';

var React = require('react/addons');
var $ = require('jquery');
var Router = require('react-router');

var HeaderMobile = require('../components/header-mobile');
var HeaderDesktop = require('../components/header-desktop');
var Footer = require('../components/footer');
var DesktopMmenu = require('../components/desktop-menu');
var ProductList = require('../components/product-list');

var Info=React.createClass({
    getInitialState: function() {
        return {
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            descriere: '',
            miniDesc: '',
            titlu: '',
            pret: ''
        }
    },
    
    componentDidMount: function() {
        var String = '/'+this.props.id+".json";
        $.get('http://www.json-generator.com/api/json/get/ceqJdnrcQy?indent=2', function(result){
            if (this.isMounted()) {
                this.setState({
                    img1: result.img1,
                    img2: result.img2,
                    img3: result.img3,
                    img4: result.img4,
                    titlu: result.titlu,
                    descriere: result.descriere,
                    miniDesc: result.miniDesc,
                    pret: result.pret
                });
            }
        }.bind(this));
        
        var self=this;
        
        $('.mini-img').mouseenter(function(){
            var source=$(this).attr('src');
            $('.big-img').attr('src',source);
        });
        
        $('.mini-img').mouseleave(function(){
            var source=self.state.img1;
            $('.big-img').attr('src',source);
        });
  },
    
   render:function()
    {
        return(
        <div className="pure-g">
            <div className="pure-u-1-1 pure-u-sm-1-2 product-images">
                <img src={this.state.img1} className="big-image-product big-img"/>
                <div className="pure-g">
                    <div className="pure-u-1-3">
                        <img src={this.state.img2} className="big-image-product mini-img"/>
                    </div>
                    <div className="pure-u-1-3">
                        <img src={this.state.img3} className="big-image-product mini-img"/>
                    </div>
                    <div className="pure-u-1-3">
                        <img src={this.state.img4} className="big-image-product mini-img"/>
                    </div>
                </div>
            </div>
            <div className="pure-u-1-1 pure-u-sm-1-2 product-info">
                <h1>{this.state.titlu}</h1>
                <p className="product-miniDesc">{this.state.miniDesc}</p>
                <div className="pure-g product-price-button">
                    <div className="pure-u-1-2">
                        <p className="product-price">{this.state.pret}</p>
                    </div>
                    <div className="pure-u-1-2">
                        <button onClick={this.addToCart}>Add to cart</button> 
                    </div>
                </div>
                <p className="product-desc">{this.state.descriere}</p>
                
            </div>
        </div>
            );
    },
    
    addToCart: function(event)
    {
        $.post('/add_cart', {id:this.props.id, type: "add_cart"})
            .then(function(status) {
                alert(status);
        });
        
        event.preventDefault();
    }
});


var ProductInfo = React.createClass({
    mixins: [ Router.State ],
    componentDidMount: function(){
        if (!$(".desktop-menu-list li ul").hasClass('hide-categories-menu'))   
            $(".desktop-menu-list li ul").toggleClass('hide-categories-menu');
    },
    render: function() {
    return (
        <div className="container">
            {this.renderInfo()}
        </div>
    );
  },
    
   renderInfo: function()
    {
        return <Info id={this.getParams().productId}/>;
    },
      
});

module.exports = ProductInfo;
