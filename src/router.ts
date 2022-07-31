import middy from '@middy/core';
import validator from '@middy/validator'
import { Method } from '@middy/http-router';

import getAuctionHandler from "./handlers/get-auction/index"
import postAuctionHandler from "./handlers/post-auction/index"
import deleteAuctionHandler from "./handlers/delete-auction/index"

import getAuctionSchema from './handlers/get-auction/event-schema';
import postAuctionSchema from './handlers/post-auction/event-schema';
import deleteAuctionSchema from './handlers/delete-auction/event-schema';

const getAuctionLambda = middy()
.use(validator({
  eventSchema: getAuctionSchema
}))
.handler(getAuctionHandler)

const postAuctionLambda = middy()
  .use(validator({
    eventSchema: postAuctionSchema
  }))
  .handler(postAuctionHandler)

const deleteAuctionLambda = middy()
  .use(validator({
    eventSchema: deleteAuctionSchema
  }))
  .handler(deleteAuctionHandler)

const routes = [
  {
    method: 'GET' as Method,
    path: '/auction/{id}',
    handler: getAuctionLambda,
  },
  {
    method: 'POST' as Method,
    path: '/auction',
    handler: postAuctionLambda,
  },
  {
    method: 'DELETE' as Method,
    path: '/auction/{id}',
    handler: deleteAuctionLambda,
  }
]

export default routes;