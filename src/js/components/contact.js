'use strict';

var React = require('react/addons');

var HeaderMobile = require('../components/header-mobile');
var HeaderDesktop = require('../components/header-desktop');
var Footer = require('../components/footer');
var DesktopMmenu = require('../components/desktop-menu');
var Slideshow = require('../components/slideshow');
var ProductList = require('../components/product-list');

var $ = require('jquery');

var ContactStanga = React.createClass({
    render: function(){
        return(
            <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-2">
                <article className="details">
                    <h2><strong>ADDRESS & DIRECTIONS:</strong></h2>
                    <p>
                        Splaiul Independentei, nr. 204
                        Bucuresti - Sector 6
                        Romania
                    </p>     
                    <p>
                        Telefon : 0762760796
                    </p>
                    <p>
                        office@iTems.ro
                    </p>
                </article>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1424.244590358934!2d26.06426684999999!3d44.443639550000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201e6007aebe9%3A0x555b9d5d101c349!2zQ2FtaW4gQywgQ29tcGxleHVsIFN0dWRlbsibZXNjIEdyb3rEg3ZlyJl0aSwgQnVjdXJlyJl0aQ!5e0!3m2!1sro!2sro!4v1430822677672"></iframe>
    
            </div>
        );
    },
});

var ContactDreapta = React.createClass({
    getInitialState: function() {
        return {
              name: '',
              email: '',
              message:'',
              telephone: ''
        };
    },
    render: function(){
        return(
            <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-2">
                    <h2 className="contact-us"><strong>CONTACT US:</strong></h2>
                    <form onSubmit={this.Contact}>
                        <section className="form-row">
                            <label>NUME <span className="required">*</span></label><br/>
                            <input type="text" name="name" value={this.state.name} onChange={this.onChangeName} required/>
                        </section>
                        <section className="form-row">
                            <label>EMAIL ADRESS <span className="required">*</span></label><br/>
                            <input type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} required/>
                        </section>
                        <section className="form-row">
                            <label>TELEFON</label><br/>
                            <input type="text" name="telephone" value={this.state.telephone} onChange={this.onChangeTelephone} required placeholder="Pentru a fi contactat"/>
                        </section>
                        <section className="form-row">
                            <label>MESAJ <span className="required">*</span></label>
                            <textarea name="message" cols="25" rows="5" value={this.state.message} onChange={this.onChangeMessage}></textarea>
                        </section>
                        <section className="form-row">
                            <button>SEND</button>
                        </section>
                    </form>
                </div>
        );
    },
    onChangeMessage: function(event) 
    {
        this.setState({ message: event.target.value });
    },
    onChangeName: function(event) 
    {
        this.setState({ name: event.target.value });
    },
    onChangeEmail: function(event) 
    {
        this.setState({ email: event.target.value });
    },
    onChangeTelephone: function(event)
    {
        this.setState({ telephone: event.target.value });
    },
    Contact: function(event)
    {
        alert("Va multumim!");
        $.post('/iTems/', { name: this.state.name, message:this.state.message, telephone: this.state.telephone, email: this.state.email, type:"contact"}).then(function(status) {
            alert(status);
        });
  },
});


var Contact = React.createClass({
     componentWillMount: function()
    {
       $(document.body).toggleClass('menu-left'); 
    },
    componentDidMount: function(){
        if (!$(".desktop-menu-list li ul").hasClass('hide-categories-menu'))   
            $(".desktop-menu-list li ul").toggleClass('hide-categories-menu');
    },
    render: function() {
    return (
        <div className="container">
            <section className="contact-content pure-g">
                <ContactStanga/>
                <span className="contact-separator"></span>
                <hr/>
                <ContactDreapta/>
            </section>
        </div>
    );
  }
});

module.exports = Contact;
