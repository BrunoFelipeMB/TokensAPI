import { compare } from "bcrypt";
import { GenerateTokenAndRefresh } from "../../../auth/GenerateTokenAndRefresh";
import { DynamoDBRepository } from "../../../database/dynamodb";
import { AppError } from "../../../errors/AppError";

const dynamoDBRepository = new DynamoDBRepository();

class GetUserTokenUseCase {
  async execute(email: string, password: string) {
    const user = await dynamoDBRepository.getUserByEmail(email);

    const userJSON = JSON.parse(JSON.stringify(user.Items));
    const passwordHash = userJSON[0].password;
    const passwordIsEqual = await compare(password, passwordHash);

    if (passwordIsEqual) {
      const username = userJSON[0].username;
      const routes = userJSON[0].routes;
      const apiKey = userJSON[0].apiKey;
      const tokens = GenerateTokenAndRefresh(email, routes);
      const tokensReturn = {
        username,
        email,
        routes,
        token: tokens.token,
        refreshToken: tokens.refreshToken,
        apiKey,
      };
      return tokensReturn;
    } else {
      throw new AppError("E-mail ou senha incorretos");
    }
  }
}

export { GetUserTokenUseCase };
