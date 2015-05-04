'use strict';

var React = require('react/addons');
var Config = require('../config');

var Router = require('react-router');
var Link          = Router.Link;

var Product = React.createClass({
    render: function()
    {
        return (
            <div className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4">
                <Link to="example" params={ { productId: this.props.id } }><img src={this.props.img}/></Link>
                <Link to="example" params={ { productId: this.props.id } }><p>{this.props.titlu}</p></Link>
                <Link to="example" params={ { productId: this.props.id } }><p>{this.props.pret}</p></Link>
            </div>
           
        );
    }
});

var ProductList = React.createClass({
  render: function() {

    return (
        <div className="pure-g produse">
            {this.renderProducts()}
        </div>
    );
  },
                                    
    renderProducts: function()
    {
        return Config[this.props.categoryName].map(this.renderProduct);
    },

    renderProduct: function(info)
    {   
        return <Product {...info}/>
    }
});

module.exports = ProductList;


