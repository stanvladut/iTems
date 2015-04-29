'use strict';

var React = require('react/addons');
var Router = require('react-router');

var App = React.createClass({

  render: function() {
    /*
        return (
            <div>
                <Header/>
                <Router.RouteHandler {...this.state} />;
                <Footer/>
            </div>
        );
    */
    return <Router.RouteHandler {...this.state} />;
  }
});

module.exports = App;
