'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var cookie = require('react-cookie');
var $ = require ('jquery');

var HeaderDesktop = React.createClass({
    
    getInitialState: function() {
    return {
      username: '',
        };
    },
    
    componentWillMount: function()
    {
        $.post('/', {type: "user"})
            .then(function(result) {
                this.setState({username:result});
        });
    },
    
    render: function() {
    return (
        <header className="header-desktop">
            <figure className="header-logo">
                <Link to="home"><img className="logo-big" src="img/logo.png"/></Link>
            </figure>

            <div className="emg-user-box">
                <Link to="account">
                    <figure>
                        <img src="img/user%20icon.png"/>
                        <figcaption>
                            <p>Bun venit,</p>
                            <span>{this.state.username}</span>
                        </figcaption>
                    </figure>
                </Link>
                
                <Link to="cart">
                    <div className="emg-user-checkout">
                        <div className="emg-cart-icon">
                           <img className="cart-icon" src="img/shopping%20cart%20white.png"/>
                        </div>
                        <p>Cosul meu</p>
                    </div>
                </Link>
            </div>
        </header>
    );
  }
});

module.exports = HeaderDesktop;
