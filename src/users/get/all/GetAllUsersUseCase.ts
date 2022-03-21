import { DynamoDBRepository } from '../../../database/dynamodb';

const dynamoDBRepository = new DynamoDBRepository();

class GetAllUsersUseCase {
  async execute() {
    return dynamoDBRepository.getAllUsers();
  }
}

export { GetAllUsersUseCase };
