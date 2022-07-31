import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { nanoid } from 'nanoid'
import { Auction } from "../model/auction";

const dynamoDBClient = new DynamoDBClient({});

const createAuction = async (auction: Auction) => {
  const randomId = nanoid();
  const auctionWithId = {
    ...auction,
    id:  `#auction#${auction.seller}#${randomId}`,
  };

  const params = new PutCommand({
    TableName: process.env.AUCTION_HOUSE_TABLE,
    Item: auctionWithId,
  });
  await dynamoDBClient.send(params);

  return randomId;
};

export default createAuction;