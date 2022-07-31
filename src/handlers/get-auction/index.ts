import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import getAuction from '../../store/get-auction';

const getAuctionHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const auction = await getAuction(event?.pathParameters?.id!);
  if (!auction) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Auction not found'
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  }
}

export default getAuctionHandler;