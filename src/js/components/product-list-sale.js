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
                <Link to="product" params={ { productId: this.props.id } }><img src={this.props.img}/></Link>
                <Link to="product" params={ { productId: this.props.id } }><p>{this.props.titlu}</p></Link>
                <Link to="product" params={ { productId: this.props.id } }><p>{this.props.minDesc}</p></Link>
                <Link to="product" params={ { productId: this.props.id } }><p>{this.props.pret}</p></Link>
                <button onClick={this.addToCart}>Add to cart</button>
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

var ProductListSale = React.createClass({
  
  getInitialState: function() {
      return {
          array:[],
      };
  },
     
  componentDidMount: function() {
     var String = '/'+this.props.categoryName+".json";
     $.get('http://www.json-generator.com/api/json/get/ctOpaTIdea?indent=2', function(result)      {
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

