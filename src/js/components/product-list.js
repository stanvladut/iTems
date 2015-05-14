'use strict';

var React = require('react/addons');

var Router = require('react-router');
var $ = require('jquery');
var Link = Router.Link;

var Product = React.createClass({
    render: function()
    {
        return (
            
            <div className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4">
                <Link to="product" params={ { productId: this.props.id } }><img src={this.props.img}/></Link>
                <div className="produse-info">
                    <Link to="product" params={ { productId: this.props.id } }><p className="produse-title">{this.props.titlu}</p></Link>
                    <Link to="product" params={ { productId: this.props.id } }><p className="produse-minDesc">{this.props.miniDesc}</p></Link>
                    <Link to="product" params={ { productId: this.props.id } }><p className="produse-price">{this.props.pret} LEI</p></Link>
                    <button onClick={this.addToCart}>Add to cart</button>
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

var ProductList = React.createClass({
  
  getInitialState: function() {
      return {
          array:[],
      };
  },
    
  componentWillMount: function()
    {
       $(document.body).toggleClass('menu-left'); 
    },
    
  componentDidMount: function() {
     var String = '/'+this.props.categoryName+".json";
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
        return <Product {...info} />
    }
});

module.exports = ProductList;


