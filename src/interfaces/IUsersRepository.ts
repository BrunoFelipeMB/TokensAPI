import { AWSError } from "aws-sdk";
import { PutItemOutput, ScanOutput } from "aws-sdk/clients/dynamodb";
import { PromiseResult } from "aws-sdk/lib/request";
import { ICreateUserDB } from "./ICreateUserDB";

interface IUsersRepository {
  createUser(
    data: ICreateUserDB
  ): Promise<PromiseResult<PutItemOutput, AWSError>>;

  updateUser(id: string, data: ICreateUserDB): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getUserByEmail(email: string): Promise<PromiseResult<ScanOutput, AWSError>>;
  getUserById(id: string): Promise<PromiseResult<ScanOutput, AWSError>>;
  getAllUsers(): Promise<PromiseResult<ScanOutput, AWSError>>;
}

export { IUsersRepository };
