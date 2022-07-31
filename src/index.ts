import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'

import httpRouterHandler from '@middy/http-router'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpErrorHandler from "@middy/http-error-handler";

import routes from './router' 

export const handler = middy()
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())
  .handler(httpRouterHandler(routes))
