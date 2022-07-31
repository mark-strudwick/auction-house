import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({});

const deleteAuction = async (id: string) => {
  const params = new DeleteCommand({
    TableName: process.env.AUCTION_HOUSE_TABLE,
    Key: {
      id,
    }
  });
  await dynamoDBClient.send(params);
};

export default deleteAuction;