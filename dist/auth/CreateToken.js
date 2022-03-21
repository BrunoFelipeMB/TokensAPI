"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateToken = CreateToken;

var _jsonwebtoken = require("jsonwebtoken");

function CreateToken(user, route) {
  const token = (0, _jsonwebtoken.sign)({
    route
  }, "a220c5ef6d83e1afc774b4691f6fad27", {
    subject: user
  });
  return token;
}