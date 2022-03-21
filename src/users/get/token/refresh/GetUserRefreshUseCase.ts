import { GenerateTokenAndRefresh } from "../../../../auth/GenerateTokenAndRefresh";
import { DynamoDBRepository } from "../../../../database/dynamodb";
import { AppError } from "../../../../errors/AppError";

const dynamoDBRepository = new DynamoDBRepository();

class GetUserRefreshUseCase {
  async execute(email: string, refreshToken: string) {
    const user = await dynamoDBRepository.getUserByEmail(email);

    if (user.Count === 0) {
      throw new AppError("User not found.", 401);
    }

    if (!refreshToken) {
      throw new AppError("Refresh token is required.", 401);
    }

    const userJSON = JSON.parse(JSON.stringify(user.Items));

    const { token, refreshToken: newRefreshToken } = GenerateTokenAndRefresh(
      email,
      userJSON[0].routes
    );

    return {
      token,
      newRefreshToken,
    };
  }
}

export { GetUserRefreshUseCase };
