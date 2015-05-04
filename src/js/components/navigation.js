'use strict';

var React = require('react/addons');

var Navigation = React.createClass({
  render: function() {

    return (
        <div>
          <ul className="navigation nav-menu">
            <div className="navigation-header">
                <p>MENU</p>
            </div>
            <li className="nav-item"><a href="#"><span>CATEGORII</span></a>
                <ul>
                    <li><a href="produse-test.html">Gadget-uri</a></li>
                    <li><a href="produse-test.html">Cadouri trasnite</a></li>
                    <li><a href="produse-test.html">Pentru casa</a></li>
                    <li><a href="produse-test.html">Wtf?!</a></li>
                    <li><a href="produse-test.html">Lifestyle</a></li>
                    <li><a href="produse-test.html">Comestibile</a></li>
                    <li><a href="produse-test.html">Pentru EL</a></li>
                    <li><a href="produse-test.html">Pentru EA</a></li>
                    <li><a href="produse-test.html">Pentru copii</a></li>
                </ul>
            </li>
            <li className="nav-item"><a href="contact.html">CONTACT</a></li>
            </ul>

            <ul className="navigation nav-shopping">
                <div className="navigation-header">
                    <p>SHOPPING</p>
                </div>
                <li className="nav-item"><a href="account.html">CONT</a></li>
                <li className="nav-item"><a href="cart.html">COS DE CUMPARATURI</a></li>
                <li className="nav-item"><a href="whishlist.html">WISHLIST</a></li>
                <li className="nav-item"><a href="#">LOG OUT</a></li>
            </ul>
        </div>
    );
  }
});

module.exports = Navigation;
