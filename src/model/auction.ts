export type Auction = {
  item: string;
  level: number,
  expiry: Date,
  seller: string;
  startingPrice: number;
  buyOut: number
}