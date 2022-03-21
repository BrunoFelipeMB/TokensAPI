"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamoDBRepository = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DynamoDBRepository {
  constructor() {
    this.TABLE_NAME = void 0;
    this.dynamoClient = void 0;

    _awsSdk.default.config.update({
      region: 'sa-east-1',
      accessKeyId: 'AKIA54WKV4WSKZM3WG3R',
      secretAccessKey: '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'
    });

    this.dynamoClient = new _awsSdk.default.DynamoDB.DocumentClient();
    this.TABLE_NAME = 'token-api-mobile';
  }

  async getUserById(id) {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        id
      }
    };
    const user = await this.dynamoClient.get(params).promise();
    return user;
  }

  async getAllUsers() {
    const params = {
      TableName: this.TABLE_NAME
    };
    const users = await this.dynamoClient.scan(params).promise();
    return users;
  }

  async getUserByEmail(email) {
    const params = {
      TableName: this.TABLE_NAME,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    };
    return await this.dynamoClient.scan(params).promise();
  }

  async createUser(data) {
    const params = {
      TableName: this.TABLE_NAME,
      Item: data
    };
    return await this.dynamoClient.put(params).promise();
  }

}

exports.DynamoDBRepository = DynamoDBRepository;