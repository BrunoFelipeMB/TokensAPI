import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response) {
    const email = request.user;
    const getUserUseCase = new GetUserUseCase();

    const user = await getUserUseCase.execute(email);

    if (!user) {
      return response
        .status(400)
        .json({ error: true, message: "User not found." });
    }

    const userJSON = JSON.parse(JSON.stringify(user.Items));
    return response.json({
      username: userJSON[0].username,
      email: userJSON[0].email,
      routes: userJSON[0].routes,
      apiKey: userJSON[0].apiKey,
    });
  }
}

export { GetUserController };
