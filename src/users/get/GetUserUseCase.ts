import { DynamoDBRepository } from "../../database/dynamodb";
import { AppError } from "../../errors/AppError";

const dynamoDBRepository = new DynamoDBRepository();
class GetUserUseCase {
  async execute(email: string) {
    return await dynamoDBRepository.getUserByEmail(email);
  }
}

export { GetUserUseCase };
