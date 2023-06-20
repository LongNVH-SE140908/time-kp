import User from "../../models/user";
import {
  collections,
} from "../../services/database.service";
var jwt = require('jsonwebtoken');
export default async function getUser(userName: string, pass: string) {
  let user: User = (await collections.user?.findOne({
    username: userName,
    password: pass,
  })) as User;
  let expdate = new Date(new Date().getTime()+(1*24*60*60*1000))// het han sau 1 ngay

  let token = jwt.sign({ user}, 'superSecrect',{ expiresIn: "1d" })
  user.exptokendate =  expdate;
  user.token = token;
  return user;
}
