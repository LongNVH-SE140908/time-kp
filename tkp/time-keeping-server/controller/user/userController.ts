import User from "../../models/user";
import { collections } from "../../services/database.service";
var jwt = require("jsonwebtoken");
var md5 = require("md5");
export default async function getUser(userName: string, pass: string) {
  let user: User = (await collections.user?.findOne({
    username: userName,
    password: md5(pass),
  })) as User;
  if (!user) {
    return undefined;
  }
  let expdate = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000); // het han sau 1 ngay

  let token = jwt.sign({ user }, "superSecrect", { expiresIn: "1d" });
  user.exptokendate = expdate;
  user.token = token;
  return user;
}

export async function getAllUser(userName: string[]) {
  let user: User[] = (
    await collections.user?.find({
      username: { $in: userName },
    })
  )?.toArray() as unknown as User[];
  if (!user) {
    return [];
  }
  return user;
}

export async function updateUser(username: string, newdata: User) {
  console.log(newdata);

  await collections.user?.updateOne({ username: username }, { $set: newdata });
  return true;
}
