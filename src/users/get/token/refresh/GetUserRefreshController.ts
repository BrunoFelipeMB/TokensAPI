import { Request, Response } from "express";
import { GetUserRefreshUseCase } from "./GetUserRefreshUseCase";

class GetUserRefreshController {
  async handle(request: Request, response: Response) {
    const email = request.user;
    const { refreshToken } = request.body;

    const getUserRefreshUseCase = new GetUserRefreshUseCase();

    const user = await getUserRefreshUseCase.execute(email, refreshToken);

    return response.status(200).json(user);
  }
}

export { GetUserRefreshController };
