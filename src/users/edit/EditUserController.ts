import { Request, Response } from "express";
import { EditUserUseCase } from "./EditUserUseCase";

const editUserUseCase = new EditUserUseCase();

class EditUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.params;
    const { username, email, routes } = request.body;

    await editUserUseCase.execute(user_id, { username, email, routes });

    return response.status(200).json({ message: "Ok" });
  }
}

export { EditUserController };
