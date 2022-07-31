const postAuctionSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        item: { type: "string" },
        level: { type: "number" },
        expiry: { type: "date" },
        seller: { type: "string" },
        startingPrice: { type: "number" },
        buyOut: { type: "number" },
      },
      required: ["item", "level", "expiry", "seller", "startingPrice", "buyOut"],
      additionalProperties: false,
    },
  },
  additionalProperties: false
};

export default postAuctionSchema;