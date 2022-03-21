"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAllUsersUseCase = void 0;

var _dynamodb = require("../../../database/dynamodb");

const dynamoDBRepository = new _dynamodb.DynamoDBRepository();

class GetAllUsersUseCase {
  async execute() {
    return dynamoDBRepository.getAllUsers();
  }

}

exports.GetAllUsersUseCase = GetAllUsersUseCase;