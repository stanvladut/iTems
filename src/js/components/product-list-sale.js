'use strict';

var React = require('react/addons');

var Router = require('react-router');
var $ = require('jquery');
var Link = Router.Link;

var ProductSale = React.createClass({
    render: function()
    {
        
        return (  
            <div className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4">
                <Link to="product-sale" params={ { productId: this.props.id } }><img src={this.props.img}/></Link>
                <div className="produse-info">
                    <Link to="product-sale" params={ { productId: this.props.id } }><p className="produse-title">{this.props.titlu}</p></Link>
                    <Link to="product-sale" params={ { productId: this.props.id } }><p className="produse-minDesc">{this.props.miniDesc}</p></Link>
                    <Link to="product-sale" params={ { productId: this.props.id } }>
                      {this.renderPrice()}
                    </Link>
                    <button onClick={this.addToCart}>Add to cart</button>
                </div>
            </div>
           
        );
    },
    renderPrice:function()
    {
        if (this.props.reducere!='null')
            return (
                <p className="produse-pret">
                     <span>{this.props.pret}</span>
                     <span>{this.props.reducere}</span>
                     LEI
                </p>
            )
        else return (
            <p className="produse-pret">stoc epuizat</p>
            );
    },
   
    
    addToCart: function(event)
    {
        if (this.props.reducere!='null'){
            $.post('/iTems/', {id:this.props.id, type: "add_cart"})
                .then(function(status) {
                    alert(status);
            });
        }
        else alert("stoc epuizat");
        
        event.preventDefault();
    }

});

var ProductListSale = React.createClass({
  
  getInitialState: function() {
      return {
          array:[],
      };
  },
     
  componentDidMount: function() {
     var String = '/iTems/'+this.props.categoryName+".json";
     $.get(String, function(result)      {
      if (this.isMounted()) {
          this.setState({array:result});
      }
    }.bind(this));
     
  },
    
  render: function() {

    return (
        <div className="pure-g produse">
            {this.renderProducts()}
        </div>
    );
  },
                                    
    renderProducts: function()
    {
        return this.state.array.map(this.renderProduct);
    },

    renderProduct: function(info)
    {   
        return <ProductSale {...info} />
    }
});

module.exports = ProductListSale;


