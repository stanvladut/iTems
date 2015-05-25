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
            reducere:''
        }
    },
    
    componentDidMount: function() {
        var String = '/iTems/'+this.props.id+".json";
        $.get(String, function(result){
            if (this.isMounted()) {
                this.setState({
                    img1: result.img1,
                    img2: result.img2,
                    img3: result.img3,
                    img4: result.img4,
                    reducere: result.reducere,
                    titlu: result.titlu,
                    descriere: result.descriere,
                    miniDesc: result.miniDesc,
                });
            }
        }.bind(this));
  },
    
    mouseEnter:function()
    {
        $('.mini-img').mouseenter(function(){
            var source=$(this).attr('src');
            $('.big-img').attr('src',source);
        });
    },
    
    mouseLeave:function()
    {
        var self=this;
        $('.mini-img').mouseleave(function(){
            var source=self.state.img1;
            $('.big-img').attr('src',source);
        });
    },
    
    returnImg2:function()
    {
        if (this.state.img2!='')
            return(<div className="pure-u-1-3">
                        <img src={this.state.img2} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="big-image-product mini-img"/>
                    </div>
                  );
    },
                   
     returnImg3:function()
    {
        if (this.state.img3!='')
            return(<div className="pure-u-1-3">
                        <img src={this.state.img3} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="big-image-product mini-img"/>
                    </div>
                  );
    },
    returnImg4:function()
    {
        if (this.state.img4!='')
            return(<div className="pure-u-1-3">
                        <img src={this.state.img4} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="big-image-product mini-img"/>
                    </div>
                  );
    },
   render:function()
    {
        return(
        <div className="pure-g">
            <div className="pure-u-1-1 pure-u-sm-1-2 product-images">
                <img src={this.state.img1} className="big-image-product big-img"/>
                <div className="pure-g">
                    {this.returnImg2()}
                    {this.returnImg3()}
                    {this.returnImg4()}
                </div>
            </div>
            <div className="pure-u-1-1 pure-u-sm-1-2 product-info">
                <h1>{this.state.titlu}</h1>
                <p className="product-miniDesc">{this.state.miniDesc}</p>
                <div className="pure-g product-price-button">
                    <div className="pure-u-1-2">
                        <p className="product-price">{this.renderPrice()}</p>
                    </div>
                    <div className="pure-u-1-2">
                        <button onClick={this.addToCart}>Add to cart</button> 
                    </div>
                </div>
                <h1>Descriere</h1>
                <p className="product-desc">{this.state.descriere}</p>
                
            </div>
        </div>
            );
    },
        
     renderPrice:function()
    {
        if (this.state.reducere!='null') return this.state.reducere+" LEI";
        else return "Stoc epuizat (reduceri)";
    },
    
    addToCart: function(event)
    {
        if (this.state.reducere!='null'){
            $.post('/iTems/', {id:this.props.id, type: "add_cart"})
                .then(function(status) {
                    alert(status);
            });
        }
        else alert("stoc epuizat");
        
        event.preventDefault();
    }
});


var ProductInfoSale = React.createClass({
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
        return <Info id={this.getParams().productId} />;
    },
      
});

module.exports = ProductInfoSale;
