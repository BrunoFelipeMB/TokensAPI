import { Request, Response } from "express";
import { GetUserTokenUseCase } from "./GetUserTokenUseCase";

class GetUserTokenController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const getUserUseCase = new GetUserTokenUseCase();
    const user = await getUserUseCase.execute(email, password);

    return response.status(200).json(user);
  }
}

export { GetUserTokenController };
