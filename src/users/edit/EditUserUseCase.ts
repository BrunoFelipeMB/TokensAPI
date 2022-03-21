import { CreateToken } from "../../auth/CreateToken";
import { DynamoDBRepository } from "../../database/dynamodb";
import { ICreateUserDTO } from "../../interfaces/ICreateUserDTO";
import { decode } from "jsonwebtoken";

interface JwtPayload {
  routes: string[];
}

const equals = (a: string[], b: string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const dynamoDBRepository = new DynamoDBRepository();

class EditUserUseCase {
  async execute(id: string, { username, email, routes }: ICreateUserDTO) {
    const user = await dynamoDBRepository.getUserById(id);

    const userString = JSON.stringify(user);
    const userJSON = JSON.parse(userString);

    const actualToken = decode(userJSON.Item.userToken) as JwtPayload;

    const userToken = equals(actualToken.routes, routes)
      ? userJSON.JSON.userToken
      : CreateToken(username, routes);

    await dynamoDBRepository.updateUser(id, { username, email, userToken });
  }
}

export { EditUserUseCase };
