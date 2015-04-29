'use strict';

//Event Actions

var Reflux     = require('reflux');
var Q          = require('q');
var superagent = require('superagent');

var actions = Reflux.createActions({
  'load':                 { asyncResult: true },
  'loadCurrentChallange': { asyncResult: true },
  'loadTopics':           { asyncResult: true },
});

//Load
actions.load.listenAndPromise(function(params) {
  return Q.resolve({
    background: "/img/backgrounds/1.jpg",
    "name": "John Doe",
    "token": "<authentication token>"
  });
  //http://private-6cea5-soundofscience.apiary-mock.com/api/v1/session
  //{
  //  "access_token" : "<oauth access token>",
  //  "provider" : "<oauth access provider>",
  //  "device_vendor" : "web",
  //  "notification_key" : "GCM or Push Notification Key"
  //}
});

actions.loadCurrentChallange.listenAndPromise(function() {
  var deferred = Q.defer();

  superagent
    .get("http://private-6cea5-soundofscience.apiary-mock.com/api/v1/challenge")
    .end(function(err, res) {
      var data;

      if (err) {
        //TODO: handle errors here

      }

      data = {
        question: res.body.subject,
        id: res.body.id,
        //icon1: res.body.left.photo_url
        icon1: "http://behance.vo.llnwd.net/profiles11/1341215/projects/5328945/79621783054da6dbee68d2cfa1ff8f1d.jpg",
        //icon1: res.body.right.photo_url
        icon2: "http://behance.vo.llnwd.net/profiles11/1341215/projects/5328945/79621783054da6dbee68d2cfa1ff8f1d.jpg",
        answer1: res.body.left.title,
        answer2: res.body.right.title,
        like1: res.body.left.vote_count,
        like2: res.body.right.vote_count,
        startingAt: res.body.starting_at,
        currentTime: res.body.currentTime
      };
      console.log(res.body);
      deferred.resolve(data);
  });

  return deferred.promise;
});

actions.loadTopics.listenAndPromise(function() {
  var deferred = Q.defer();

  superagent
    .get("http://private-6cea5-soundofscience.apiary-mock.com/api/v1/topics")
    .end(function(err, res) {
      var data;

      if (err) {
        //TODO: handle errors here
      }

      data = res.body.map(function(el) {
        return {
          id: el.id,
          title: el.title,
          views: el.vote_count,
          status: el.liked
        };
      });

      deferred.resolve(data);
  });

  return deferred.promise;
});

module.exports = actions;
