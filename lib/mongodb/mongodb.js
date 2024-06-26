import { MongoClient } from "mongodb";
require('dotenv').config();

const uri = process.env.NEXT_PUBLIC_MONGOGB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectMongoDB = async () => {
  const client = new MongoClient(uri, options);
  await client.connect();
  const db = client.db("market");
  return { db, client };
};


