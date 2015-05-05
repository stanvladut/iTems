'use strict';

var React = require('react/addons');
var $     = require('jquery');
var Router = require('react-router');
var Link = Router.Link;


var Login = React.createClass({
 getInitialState: function() {
    return {
      email: '',
      password: '',
    };
  },
  render: function() {

    return (
        <div className="login-page">
            <header>
                <figure className="header-logo">
                    <img className="logo-big" src="img/logo.png"/>
                </figure>
            </header>
            <section className="pure-g login">
                <div className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-2">
                    <div className="login-content">
                        <p>Log In</p>
                        <hr/>
                        <form>
                            <section className="form-row">
                                <label>EMAIL <span className="required">*</span></label><br/>
                                <input value={this.state.email} onChange={this.onChangeE} type="text" name="email" required/>
                            </section>
                            <section className="form-row">
                                <label>PASSWORD <span className="required">*</span></label><br/>
                                <input type="password" name="password" value={this.state.password} onChange={this.onChangeP} required/>
                            </section>
                            <section className="form-row">
                                <Link to="home" params={{this.state.email} pass={this.state.password}}><button>Log In</button></Link>
                            </section>
                        </form>
                    </div>
                </div>
                <div className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-2">
                    <div className="signup-content">
                        <p>Nu ai cont?</p>
                        <p>Creaza-ti unul usor</p>
                        <button>Sign up</button>
                    </div>
                </div>
            </section>
        </div>
    );
  },
     
    onChangeE: function(event) 
    {
        this.setState({ email: event.target.value });
    },
    onChangeP: function(event)
    {
        this.setState({ password: event.target.value });
    },
});

module.exports = Login;
