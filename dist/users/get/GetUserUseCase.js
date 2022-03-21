"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserUseCase = void 0;

var _dynamodb = require("../../database/dynamodb");

const dynamoDBRepository = new _dynamodb.DynamoDBRepository();

class GetUserUseCase {
  async execute(user_id) {
    return dynamoDBRepository.getUserById(user_id);
  }

}

exports.GetUserUseCase = GetUserUseCase;