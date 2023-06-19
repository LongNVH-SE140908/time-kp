import User from "../../models/user";
import {
  collections,
} from "../../services/database.service";

export default async function getUser(userName: string, pass: string) {
  let user: User = (await collections.user?.findOne({
    username: userName,
    password: pass,
  })) as User;
  return user;
}
