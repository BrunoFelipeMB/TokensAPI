import { DynamoDBRepository } from "../../database/dynamodb";
import { ICreateUserDTO } from "../../interfaces/ICreateUserDTO";
import { v4 as uuidv4 } from "uuid";
import uuidAPIKey from "uuid-apikey";
import { AppError } from "../../errors/AppError";
import { hash } from "bcrypt";

const dynamoDBRepository = new DynamoDBRepository();

class CreateUserUseCase {
  async execute({ username, email, password, routes }: ICreateUserDTO) {
    const { Count } = await dynamoDBRepository.getUserByEmail(email);

    if (Count! > 0) {
      throw new AppError("Usuário já cadastrado");
    }

    const id = uuidv4();
    const apiKey = uuidAPIKey.toAPIKey(id);
    const password_hash = await hash(password, 8);

    const created_at = new Date();
    await dynamoDBRepository.createUser({
      id,
      apiKey,
      username,
      password: password_hash,
      email,
      routes,
      created_at: created_at.toString(),
      updated_at: created_at.toString(),
    });
  }
}

export { CreateUserUseCase };
