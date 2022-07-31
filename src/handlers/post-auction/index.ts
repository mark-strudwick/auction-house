import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Auction } from '../../model/auction';
import createAuction from '../../store/create-auction';

const postAuctionHandler = async (event: PostAuctionEvent): Promise<APIGatewayProxyResult> => {
  const id  = await createAuction(event.body);
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Auction created', id }),
  }
}

type PostAuctionEvent = APIGatewayProxyEvent & { body: Auction; }

export default postAuctionHandler;