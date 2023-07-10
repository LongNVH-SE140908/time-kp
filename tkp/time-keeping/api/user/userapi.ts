import axios from "axios";
import User from "../../models/user";

import ReqUser from "../types/CallPropsUser";

export default async function checkLoginUser(args: ReqUser) {
  let result: User = new User();
  var URL: string;

  if (args.userName && args.passWord) {
    URL = "http://localhost:8080/checkuserlogin/";
    await axios
      .get(URL, {
        params: {
          user: args.userName,
          pass: args.passWord,
        },
      })
      .then(function (response) {
        result = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  console.log(result);

  return result;
}

export async function getAllUser(token: string) {
  let result: User[] = [];
  var URL: string;

  URL = "http://localhost:8080/alluser/";
  await axios
    .get(URL, {
      params: {
        token: token,
      },
    })
    .then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}
