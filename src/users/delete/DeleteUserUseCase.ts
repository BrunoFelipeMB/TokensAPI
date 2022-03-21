import { DynamoDBRepository } from "../../database/dynamodb";

const dynamoDBRepository = new DynamoDBRepository();

class DeleteUserUseCase {
  async execute(user_id: string) {
    await dynamoDBRepository.deleteUser(user_id);
  }
}

export { DeleteUserUseCase };
