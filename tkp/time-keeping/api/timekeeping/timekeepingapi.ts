import axios from "axios";
import { TimeKeeping } from "../../models/timekeeping";

export default async function getUserTimekeeping(token: string) {
  let result: TimeKeeping = {
    user_name: "",
    clock_time: [],
  };
  var URL: string;
  let a = Object.create(TimeKeeping);

  URL = "http://localhost:8080/keepingtime/";
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
  console.log(result);

  return result;
}

export async function getUsersTimekeeping(token: string) {
  let result: TimeKeeping[] = [];
  var URL: string;
  let a = Object.create(TimeKeeping);

  URL = "http://localhost:8080/allkeepingtime/";
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
export async function UpdateTimeskeeping(token: string, username: string, newdata: TimeKeeping) {
  let result;
  var URL: string;

  URL = "http://localhost:8080/updatekeepingtime/";
  await axios
    .post(
      URL,
      {
        token: token,
        username: username,
        newdata: JSON.stringify(newdata),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}
export async function checkinTimekeeping(token: string) {
  let result = "";
  var URL: string;

  URL = "http://localhost:8080/keepingtimecheckin/";
  await axios
    .post(
      URL,
      {
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}
export async function checkOutTimekeeping(token: string) {
  let result = "";
  var URL: string;

  URL = "http://localhost:8080/keepingtimecheckout/";
  await axios
    .post(
      URL,
      {
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}
