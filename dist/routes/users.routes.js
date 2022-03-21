"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRouter = void 0;

var _express = require("express");

var _CreateUserController = require("../users/create/CreateUserController");

var _GetAllUsersController = require("../users/get/all/GetAllUsersController");

var _GetUserController = require("../users/get/GetUserController");

const usersRouter = (0, _express.Router)();
exports.usersRouter = usersRouter;
const createUserController = new _CreateUserController.CreateUserController();
const getAllUsersController = new _GetAllUsersController.GetAllUsersController();
const getUserController = new _GetUserController.GetUserController();
usersRouter.post('/', createUserController.handle);
usersRouter.get('/', getAllUsersController.handle);
usersRouter.get('/:user_id', getUserController.handle);