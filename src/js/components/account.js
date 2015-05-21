'use strict';

var React = require('react/addons');
var $     = require('jquery');
var Router = require('react-router');

var HeaderMobile = require('../components/header-mobile');
var HeaderDesktop = require('../components/header-desktop');
var Footer = require('../components/footer');
var DesktopMmenu = require('../components/desktop-menu');
var Slideshow = require('../components/slideshow');
var ProductList = require('../components/product-list');

var cookie = require('react-cookie');

var Account = React.createClass({
    mixins: [ Router.State ],
    
    getInitialState: function() {
        return {
              nume:'',
              prenume:'',
              adresa:'',
              email: cookie.load('user'),
              password1:'',
              password2:'',
              password:'',
              telefon:''
        };
    },
    
     componentWillMount: function()
    {
       $(document.body).toggleClass('menu-right'); 
    },
    
   componentDidMount: function() 
    {
        var self=this;
        $.post('/', {type: "user"}).then(function(status) {
            if (status!="failed") 
            {
                var obj=JSON.parse(status);
                self.setState({
                    nume:obj.nume,
                    prenume:obj.prenume,
                    adresa:obj.adresa,
                    password:obj.password,
                    telefon: obj.telefon
                });
            }
            else alert("Nu se pot incarca informatiile dumneavoastra. Ne cerem scuze!"); 
        });
        
        if (!$(".desktop-menu-list li ul").hasClass('hide-categories-menu'))   
            $(".desktop-menu-list li ul").toggleClass('hide-categories-menu');
  },
    
  render: function() {
        return (
            <div className="container">
                <h1>Contul meu:<span className="my-account"> {this.state.email} </span></h1>
                <p className="account-info">Nume: {this.state.prenume}{this.state.nume}</p>
                <p className="address-info">Adresa de livrare:</p>
                    <form onSubmit={this.submitAddress} className="account-address">
                        <input type="text" value={this.state.adresa} onChange={this.changeAddress} placeholder={this.state.adresa} required /><br/>
                        <button>Salveaza</button>
                    </form>
                
                <p className="change-password">Schimbare parola (Optional)</p>
                <form onSubmit={this.changePass} className="account-form">
                    <input type="password" value={this.state.password1} onChange={this.changePass1} required /><br/>
                    <p>Parola noua*</p>
                    <input type="password" value={this.state.password2} onChange={this.changePass2} required /><br/>
                    <p>Rescrie parola noua*</p>
                    <div className="account-error"></div>
                    <button>Salveaza</button>
                </form>   
            </div>
        );
  },
    changeAddress: function(event)
    {
        this.setState({ adresa: event.target.value });
    },
    
    changePass1: function(event)
    {
        this.setState({ password1: event.target.value });
    },
    
    changePass2: function(event)
    {
        this.setState({ password2: event.target.value });
    },
    
    changePass: function()
    {
        if (this.state.password1===this.state.password2)
        {
            $.post('/mod_user', {nume:this.state.nume, password: this.state.password1, prenume:this.state.prenume, adresa:this.state.adresa, telefon:this.state.telefon, type: "mod_user"})
                .then(function(status) {
                    $(".account-error").text('');
                    if (status!="Failed to modify!") alert("Parola modificata cu succes");
                    else alert("Operatia a esuat, incercati din nou"); 
            });
        }
        else {
            $(".account-error").text("Cele 2 parole nu se potrivesc");
        }
    },
    
    submitAddress: function()
    {
        $.post('/mod_user', {nume:this.state.nume, password: this.state.password, prenume:this.state.prenume, adresa:this.state.adresa, telefon:this.state.telefon, type: "mod_user"})
            .then(function(status) {
                if (status!="Failed to modify!") alert("Adresa modificata cu succes!");
                else alert("Operatia a esuat, incercati din nou"); 
        });
    },
    
});

module.exports = Account;
