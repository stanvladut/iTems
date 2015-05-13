'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Navigation = require('./components/navigation');

var Login = require('./components/login');
var cookie = require('react-cookie');
var HeaderMobile = require('./components/header-mobile');
var HeaderDesktop = require('./components/header-desktop');
var Footer = require('./components/footer');
var DesktopMmenu = require('./components/desktop-menu');
var Slideshow = require('./components/slideshow');
var ProductList = require('./components/product-list');
var ProductListSale = require('./components/product-list-sale');

var $ = require('jquery');

var App = React.createClass({
  getInitialState: function() {
        return {
            isLogged : false,
            username : ''
        };
    }, 
    componentWillMount: function()
    {
        if (cookie.load('user')) this.setState({isLogged:true});
    },
  render: function() {
        if (this.state.isLogged)
            return (
                <div>
                    <Navigation />
                    <div className="page">
                        
                        <section className="desktop">
                            <HeaderDesktop/>
                            <DesktopMmenu/>
                        </section>
                    
                        <div className="pure-g all-page">
                            <div className="pure-u-1">
                                <HeaderMobile/>
                            </div>
                            <div className="pure-u-1">
                                <Router.RouteHandler {...this.state} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        else return <Login status={this.LogIn}/>
  },
  
    LogIn: function(loginStatus,username)
    {
        this.setState({isLogged:loginStatus, username:username});
    }
});

module.exports = App;


/*to do:

login:
    -verificare cookie pe langa baza de date (yes)
    
produse:
    -add to cart
    -marire imagini mici (yes)
    
acoount page(yes)

desktop-version :
    -Bun venit, Nume utilizator(yes)
    
menu-header:
    -link to home (yes)
    -svg to png (yes)
    
mobile version
    -revenire .page dupa apasare item menu
    
log out (yes)

cart (yes)

*/