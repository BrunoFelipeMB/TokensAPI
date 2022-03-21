import { Request, Response } from "express";
import { CreateToken } from "../../auth/CreateToken";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password, routes } = request.body;
    const createUserUseCase = new CreateUserUseCase();
    await createUserUseCase.execute({
      username,
      email,
      password,
      routes,
    });

    return response.status(201).json({
      message: "User created",
    });
  }
}

export { CreateUserController };
