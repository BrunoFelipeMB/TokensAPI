import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";

class GetAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = new GetAllUsersUseCase();
    const users = await createUserUseCase.execute();
    return response.status(200).json({ users: users.Items });
  }
}

export { GetAllUsersController };
