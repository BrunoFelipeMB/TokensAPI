"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _dynamodb = require("../../database/dynamodb");

var _uuid = require("uuid");

var _CreateToken = require("../../auth/CreateToken");

var _AppError = require("../../errors/AppError");

const dynamoDBRepository = new _dynamodb.DynamoDBRepository();

class CreateUserUseCase {
  async execute({
    user,
    email,
    routes
  }) {
    let id;
    const rotas = [...routes];
    const {
      Items,
      Count
    } = await dynamoDBRepository.getUserByEmail(email);

    if (Count > 0) {
      throw new _AppError.AppError('Usuário já cadastrado');
    }

    if (Items.length > 0) {
      id = Items[0].id;
    } else {
      id = (0, _uuid.v4)();
    } // if (Items!.length > 0) {
    //   Items?.forEach((item) => {
    //     if (item.route === route) {
    //       throw new Error("Usuário já cadastrado para essa rota");
    //     }
    //   });
    // }
    // console.log(Items);
    // if (Count === 0) {


    const token = (0, _CreateToken.CreateToken)(user, routes);
    const created_at = new Date();
    dynamoDBRepository.createUser({
      id,
      user,
      email,
      routes: rotas,
      token,
      created_at: created_at.toString()
    });
  }

}

exports.CreateUserUseCase = CreateUserUseCase;