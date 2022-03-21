import { Router } from "express";
import { CreateUserController } from "../users/create/CreateUserController";
import { DeleteUserController } from "../users/delete/DeleteUserController";
import { EditUserController } from "../users/edit/EditUserController";
import { GetAllUsersController } from "../users/get/all/GetAllUsersController";
import { GetUserController } from "../users/get/GetUserController";
import { GetUserTokenController } from "../users/get/token/GetUserTokenController";
import { ensureUUID } from "../middlewares/ensureUUID";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetUserRefreshController } from "../users/get/token/refresh/GetUserRefreshController";
import { addUserInformation } from "../middlewares/addUserInformation";

const usersRouter = Router();

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();
const getUserController = new GetUserController();
const getUserRefreshController = new GetUserRefreshController();
const getUserTokenController = new GetUserTokenController();
const editUserController = new EditUserController();
const deleteUserController = new DeleteUserController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/", getAllUsersController.handle);
usersRouter.post(
  "/me/refresh",
  addUserInformation,
  getUserRefreshController.handle
);
usersRouter.post("/session", getUserTokenController.handle);
usersRouter.get("/me", ensureAuthenticated, getUserController.handle);
usersRouter.delete("/:user_id", ensureUUID, deleteUserController.handle);
usersRouter.patch("/edit/:user_id", ensureUUID, editUserController.handle);

export { usersRouter };
