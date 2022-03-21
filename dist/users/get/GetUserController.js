"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserController = void 0;

var _GetUserUseCase = require("./GetUserUseCase");

class GetUserController {
  async handle(request, response) {
    const {
      user_id
    } = request.params;
    const userId = user_id.toString();
    const getUserUseCase = new _GetUserUseCase.GetUserUseCase();
    const user = await getUserUseCase.execute(userId);
    return response.status(201).json(user);
  }

}

exports.GetUserController = GetUserController;