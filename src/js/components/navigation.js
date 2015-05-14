'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var cookie = require('react-cookie');
var App = require('../app');

var Navigation = React.createClass({
  render: function() {

    return (
        <div>
          <ul className="navigation nav-menu">
            <div className="navigation-header">
                <p>MENU</p>
            </div>
            <li className="nav-item"><a><span>CATEGORII</span></a>
                <ul>
                    <li><Link to="category" params={ { categoryName: "gadgets"} }>Gadget-uri</Link></li>
                    <li><Link to="category" params={ { categoryName: "cadouriTrasnite"} }>Cadouri trasnite</Link></li>
                    <li><Link to="category" params={ { categoryName: "pentruCasa"} }>Pentru casa</Link></li>
                    <li><Link to="category" params={ { categoryName: "wtf"} }>Wtf?!</Link></li>
                    <li><Link to="category" params={ { categoryName: "lifestyle"} }>Lifestyle</Link></li>
                    <li><Link to="category" params={ { categoryName: "comestibile"} }>Comestibile</Link></li>
                    <li><Link to="category" params={ { categoryName: "pentruEl"} }>Pentru EL</Link></li>
                    <li><Link to="category" params={ { categoryName: "pentruEa"} }>Pentru EA</Link></li>
                    <li><Link to="category" params={ { categoryName: "pentruCopii"} }>Pentru Copii</Link></li>
                </ul>
            </li>
            <li className="nav-item"><Link to="contact">CONTACT</Link></li>
            </ul>

            <ul className="navigation nav-shopping">
                <div className="navigation-header">
                    <p>SHOPPING</p>
                </div>
                <li className="nav-item"><Link to="account">CONT</Link></li>
                <li className="nav-item"><Link to="cart">COS DE CUMPARATURI</Link></li>
                <li className="nav-item" onClick={this.logOut}><a>LOG OUT</a></li>
            </ul>
        </div>
    );
  },
    
    logOut: function()
    {
        cookie.remove('user');
        alert("You've been logged out!");
        location.reload();
        <App/>
    }
});

module.exports = Navigation;
