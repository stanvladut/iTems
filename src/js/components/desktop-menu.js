'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var $ = require('jquery');

var DesktopMmenu = React.createClass({
  render: function() {
      
      
      
    return (
        <div>
          <section className="desktop-menus">
                <div className="menu-bar">
                    <ul className="desktop-menu-list">
                        <li><strong>CATEGORII</strong>
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
                        <Link to="contact"><li><strong><a>CONTACT</a></strong></li></Link>
                    </ul>
                </div>
            </section>
        </div>
    );
  },
    componentDidMount : function()
    {
        if(this.props.show==="false") $(".desktop-menu-list li ul").toggleClass('hide-categories-menu');
    }
});

module.exports = DesktopMmenu;
