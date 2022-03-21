"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const {
      user,
      email,
      routes
    } = request.body;
    const createUserUseCase = new _CreateUserUseCase.CreateUserUseCase();
    await createUserUseCase.execute({
      user,
      email,
      routes
    });
    return response.status(201).json({
      message: 'User created'
    });
  }

}

exports.CreateUserController = CreateUserController;