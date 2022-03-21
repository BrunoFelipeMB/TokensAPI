import AWS, { AWSError } from "aws-sdk";
import { PutItemOutput, ScanOutput } from "aws-sdk/clients/dynamodb";
import { PromiseResult } from "aws-sdk/lib/request";
import { ICreateUserDB } from "../interfaces/ICreateUserDB";
import { IUsersRepository } from "../interfaces/IUsersRepository";

class DynamoDBRepository implements IUsersRepository {
  private TABLE_NAME: string;
  private dynamoClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    AWS.config.update({
      region: "sa-east-1",
      accessKeyId: "AKIA54WKV4WSKZM3WG3R",
      secretAccessKey: "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",
    });

    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
    this.TABLE_NAME = "token-api-mobile";
  }

  async deleteUser(id: string): Promise<void> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        id,
      },
    };

    await this.dynamoClient.delete(params).promise();
  }

  async getUserById(
    id: string
  ): Promise<PromiseResult<AWS.DynamoDB.ScanOutput, AWS.AWSError>> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        id,
      },
    };
    const user = await this.dynamoClient.get(params).promise();

    return user;
  }

  async getAllUsers(): Promise<PromiseResult<ScanOutput, AWSError>> {
    const params = {
      TableName: this.TABLE_NAME,
    };

    const users = await this.dynamoClient.scan(params).promise();
    return users;
  }

  async getUserByEmail(
    email: string
  ): Promise<PromiseResult<ScanOutput, AWSError>> {
    const params = {
      TableName: this.TABLE_NAME,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    return await this.dynamoClient.scan(params).promise();
  }

  async createUser(
    data: ICreateUserDB
  ): Promise<PromiseResult<PutItemOutput, AWSError>> {
    const params = {
      TableName: this.TABLE_NAME,
      Item: data,
    };
    return await this.dynamoClient.put(params).promise();
  }

  async updateUser(
    id: string,
    { username, email, userToken }: ICreateUserDB
  ): Promise<void> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        id,
      },
      UpdateExpression:
        "set email = :email, username = :username, userToken = :userToken",
      ExpressionAttributeValues: {
        ":email": `${email}`,
        ":username": `${username}`,
        ":userToken": `${userToken}`,
      },
      ReturnValues: "UPDATED_NEW",
    };

    await this.dynamoClient.update(params).promise();
  }
}

export { DynamoDBRepository };
