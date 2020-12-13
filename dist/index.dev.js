"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var bodyParser = require('body-parser'); // const users = require('./routers/users')


var app = express();
var port = process.env.PORT || 5500; // app.use(users)

var _require = require('./state'),
    users = _require.users;

var usersCount = users.length;
/* BEGIN - create routes here */
///GET /users

app.get('/users', function (req, res) {
  return res.json(users);
}); ///GET users/1

app.get('/users/1', function (req, res) {
  return res.json(users[0]);
}); ///GET users/:userId

app.get('/users/:userId', function (req, res) {
  var id = req.params.userId;
  console.log(id);
  var filteredUsers = users.filter(function (user) {
    return user._id === Number(id);
  });
  res.json(filteredUsers);
}); /// POST /users

app.post('/users/:userId'), function (req, res) {
  var newUser = _objectSpread({
    _id: usersCount + 1
  }, req.body);

  users.push(newUser);
  res.json(newUser);
}; ///PUT /users/1

app.put('/users/1', function (req, res) {
  users.forEach(function (user) {
    if (user._id == 1) {
      user.name = req.body.name;
      user.occupation = req.body.occupation;
      user.avatar = req.body.avatar;
    }

    res.json(users);
  });
}); //PUT users/:userId

app.put('/users/:userId', function (req, res) {
  var found = users.some(function (user) {
    return user._id === Number(req.params.id);
  });

  if (found) {
    var updatedUser = req.body;
    users.forEach(function (user) {
      if (user._id === Number(req.params.id)) {
        user.name = updatedUser.name ? updatedUser.name : user.name;
        user.occupation = updatedUser.occupation ? updatedUser.occupation : user.occupation;
        user.avatar = updatedUser.avatar ? updatedUser.avatar : user.avatar;
      }

      ;
    });
  }

  ;
}); /// DELETE /users/1

app["delete"]('/users/1', function (req, res) {
  var newUsers = users.slice(1); // return res.send({ msg: `Deleted`})

  res.json(newUsers);
}); /// DELETE /users/:userId

app["delete"]('/users/:userId', function (req, res) {
  var id = req.params.userId;
  var filteredUsers = users.filter(function (user) {
    return user._id === Number(id);
  });

  if (filteredUsers) {
    filteredUsers.isActive = "false"; //  res.send({msg: 'Deleted' });

    res.json(filteredUsers);
  }
});
/* END - create routes here */

app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
});