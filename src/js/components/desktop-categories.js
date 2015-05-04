'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var $ = require('jquery');

var DesktopCategories = React.createClass({
  render: function() {
    return (
        <div className="categories">
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
        </div>
    );
  },

});

module.exports = DesktopCategories;
