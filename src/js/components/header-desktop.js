'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link          = Router.Link;

var HeaderDesktop = React.createClass({
  render: function() {

    return (
        <div>
        <header className="header-desktop">
            <figure className="header-logo">
                <Link to="home"><img className="logo-big" src="img/logo.png"/></Link>
            </figure>

            <div className="emg-user-box">
                <figure>
                    <img src="img/user%20icon.png"/>
                    <figcaption>
                        <p>Bun venit,</p>
                        <span>Contul meu</span>
                    </figcaption>
                </figure>
                
                <div className="emg-user-checkout" onclick="window.open('http://www.emag.ro/shopping-cart','_self');">
                    <div className="emg-cart-icon">
                       <img className="cart-icon" src="img/shopping%20cart%20white.png"/>
                    </div>
                    <p>Cosul meu</p>
                </div>
            </div>
        </header>
        </div>
    );
  }
});

module.exports = HeaderDesktop;
