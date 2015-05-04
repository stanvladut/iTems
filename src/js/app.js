'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Navigation = require('./components/navigation');

var App = React.createClass({

  render: function() {
        return (
            <div>
                <Navigation/>
                <Router.RouteHandler {...this.state} />;
            </div>
        );
   
    /*  
    return <Router.RouteHandler {...this.state} />;
    */
  }
});

module.exports = App;
