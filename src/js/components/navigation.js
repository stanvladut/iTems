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
                    <Link to="category" params={ { categoryName: "gadgets"} }><li>Gadget-uri</li></Link>
                    <Link to="category" params={ { categoryName: "cadouriTrasnite"} }><li>Cadouri trasnite</li></Link>
                    <Link to="category" params={ { categoryName: "pentruCasa"} }><li>Pentru casa</li></Link>
                    <Link to="category" params={ { categoryName: "wtf"} }><li>Wtf?!</li></Link>
                    <Link to="category" params={ { categoryName: "lifestyle"} }><li>Lifestyle</li></Link>
                    <Link to="category" params={ { categoryName: "comestibile"} }><li>Comestibile</li></Link>
                    <Link to="category" params={ { categoryName: "pentruEl"} }><li>Pentru EL</li></Link>
                    <Link to="category" params={ { categoryName: "pentruEa"} }><li>Pentru EA</li></Link>
                    <Link to="category" params={ { categoryName: "pentruCopii"} }><li>Pentru Copii</li></Link>
                </ul>
            </li>
            <Link to="contact"><li className="nav-item"><a>CONTACT</a></li></Link>
            </ul>

            <ul className="navigation nav-shopping">
                <div className="navigation-header">
                    <p>SHOPPING</p>
                </div>
                <Link to="account"><li className="nav-item"><a>CONT</a></li></Link>
                <Link to="cart"><li className="nav-item"><a>COS DE CUMPARATURI</a></li></Link>
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
