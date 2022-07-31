import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { Auction } from "../model/auction";

const dynamoDBClient = new DynamoDBClient({});

const getAuction = async (id: string) => {
  const params = new GetCommand({
    TableName: process.env.AUCTION_HOUSE_TABLE,
    Key: {
      id,
    }
  });
  const result = await dynamoDBClient.send(params);
  return result.Item as Auction & { id: string };
};

export default getAuction;