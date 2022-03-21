"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAllUsersController = void 0;

var _GetAllUsersUseCase = require("./GetAllUsersUseCase");

class GetAllUsersController {
  async handle(request, response) {
    const createUserUseCase = new _GetAllUsersUseCase.GetAllUsersUseCase();
    const users = await createUserUseCase.execute();
    return response.status(200).json({
      users: users.Items
    });
  }

}

exports.GetAllUsersController = GetAllUsersController;