import * as mongoDB from "mongodb";

export const collections: {
  [x: string]: any;
  user?: mongoDB.Collection;
  timekeeping?: mongoDB.Collection;
} = {};
export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://admin:000000Long@27.64.211.48"
  );

  await client.connect();

  const db: mongoDB.Db = client.db("swd");

  const usersCollection: mongoDB.Collection = db.collection("user");
  const timekeepingCollection: mongoDB.Collection =
    db.collection("timekeeping");
  collections.user = usersCollection;
  collections.timekeeping = timekeepingCollection;
}
