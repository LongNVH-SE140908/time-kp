import * as mongoDB from "mongodb";

export const collections: {
  [x: string]: any;
  user?: mongoDB.Collection;
  timekeeping?: mongoDB.Collection;
  product?: mongoDB.Collection;
} = {};
export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://admin:000000Long@jinnie.shop"
  );

  await client.connect();

  const db: mongoDB.Db = client.db("swd");

  const usersCollection: mongoDB.Collection = db.collection("user");
  const productsCollection: mongoDB.Collection = db.collection("product");
  const timekeepingCollection: mongoDB.Collection =
    db.collection("timekeeping");
  collections.user = usersCollection;
  collections.product = productsCollection;
  collections.timekeeping = timekeepingCollection;
}
