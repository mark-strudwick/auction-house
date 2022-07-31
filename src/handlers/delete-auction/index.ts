import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import deleteAuction from '../../store/get-auction';

const deleteAuctionHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await deleteAuction(event?.pathParameters?.id!);

  return {
    statusCode: 204,
    body: JSON.stringify({
      message: 'Auction deleted',
      id: event?.pathParameters?.id,
    }),
  }
}

export default deleteAuctionHandler;