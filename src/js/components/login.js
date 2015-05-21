'use strict';

var React = require('react/addons');
var $     = require('jquery');
var Router = require('react-router');
var cookie = require('react-cookie');

var LoginComponent = React.createClass({
    mixins:[Router.Navigation],
    getInitialState: function() {
        return {
              email: '',
              password: '',
        };
    },
    render : function()
    {
        return(
            <div className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-2">
                <div className="login-content">
                    <p>Log In</p>
                    <hr/>
                    <form onSubmit={this.LogIn}>
                        <section className="form-row">
                            <label>EMAIL<br/>
                                <input value={this.state.email} type="text" onChange={this.onChangeE} required/>
                            </label>
                        </section>
                        <section className="form-row">
                            <label>PAROLA<br/>
                                <input type="password" value={this.state.password} onChange={this.onChangeP} required/>
                            </label>
                        </section>
                        <section className="form-row">
                            <button>Log In</button>
                        </section>
                    </form>
                </div>
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
    LogIn: function(event)
    {
        var self = this; 
        $.post('/', { username: this.state.email, password: this.state.password, type: "login"})
            .then(function(status) {
            if (status==='succes') self.props.logged(true, self.state.email);
            else alert(status); 
        });
        
        event.preventDefault();
  },
});

var RegisterComponent = React.createClass({
    getInitialState: function() {
        return {
              nume: '',
              prenume: '',
              email: '',
              password: '',
              adresa:'',
              telefon: '',
        };
    },
    render: function() {
        return(
         <div className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-2">
                    <div className="login-content">
                        <p>Nu ai cont? Inregistreaza-te!</p>
                        <hr/>
                        <form onSubmit={this.Register}>
                            <section className="form-row">
                                <label>Nume<br/>
                                    <input value={this.state.nume} type="text" onChange={this.onChangeNume} required/>
                                </label>
                            </section>
                            <section className="form-row">
                                <label>Prenume  <br/>
                                    <input value={this.state.prenume} type="text" onChange={this.onChangePrenume} required/>
                                </label>
                            </section>
                            <section className="form-row">
                                <label>Email </label><br/>
                                <input value={this.state.email} type="text" onChange={this.onChangeE} required/>
                            </section>
                            <section className="form-row">
                                <label>Parola <br/>
                                    <input type="password" value={this.state.password} onChange={this.onChangeP} required/>
                                </label>
                            </section>
                            <section className="form-row">
                                <label>Adresa <br/>
                                    <input value={this.state.adresa} type="text" onChange={this.onChangeAdress} required/>
                                </label>
                            </section>
                            <section className="form-row">
                                <label>Telefon<br/>
                                    <input value={this.state.telefon} type="text" onChange={this.onChangeTelephone} required/>
                                </label>
                            </section>
                            <section className="form-row">
                                <button>Sign up</button>
                            </section>
                    </form>
                    </div>
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
    onChangeNume: function(event) 
    {
        this.setState({ nume: event.target.value });
    },
    onChangePrenume: function(event)
    {
        this.setState({ prenume: event.target.value });
    },
    onChangeAdress: function(event) 
    {
        this.setState({ adresa: event.target.value });
    },
    onChangeTelephone: function(event)
    {
        this.setState({ telefon: event.target.value });
    },
    Register: function(event)
    {
        $.post('/', { nume: this.state.nume, prenume: this.state.prenume, adresa:this.state.adresa, password: this.state.password, telefon: this.state.telefon, email: this.state.email, type:"register"}).then(function(status) {
            alert(status);
        });
        event.preventDefault();
  },
});

var Login = React.createClass({
    mixins: [ Router.State ],
    getInitialState: function() {
        return {
              isLogged: 'false',
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
                <LoginComponent logged={this.isLogged}/>
                <span className="login-separator"></span>
                <RegisterComponent />
            </section>
        </div>
        );
    }, 

    isLogged: function(loginComponentIsLogged, username)
    {
        this.props.status(loginComponentIsLogged, username); 
    }
});

module.exports = Login;
