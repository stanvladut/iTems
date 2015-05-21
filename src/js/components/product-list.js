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
        $.post('/', {id:this.props.id, type: "add_cart"})
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
    
   componentWillReceiveProps: function(nextProps) {
        this.mountThings(nextProps.categoryName)
    },
    
    
  componentWillMount: function()
    {
       this.setState({categoryName:this.props.categoryName});
       $(document.body).toggleClass('menu-left');
    },
    
   componentDidMount: function() {
        this.mountThings(this.state.categoryName);
    },
    
    mountThings: function(category)
    {
        var String = '/'+category+".json";
        $.get(String, function(result){
            if (this.isMounted()) {
              this.setState({array:result});
            }
        }.bind(this));
    },

  render: function() {

    return (
        <div className="pure-g produse">
            {this.state.array.map(this.renderProduct)}
        </div>
    );
  },

    renderProduct: function(info)
    {   
        return <Product {...info} />
    }
});

module.exports = ProductList;


