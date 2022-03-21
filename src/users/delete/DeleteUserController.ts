import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const deleteUserUseCase = new DeleteUserUseCase();

    await deleteUserUseCase.execute(user_id);

    return response.status(202).json({ message: "User deleted" });
  }
}

export { DeleteUserController };
