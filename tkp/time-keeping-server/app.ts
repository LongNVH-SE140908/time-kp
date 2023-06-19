import getTimeKeepingToday from "./controller/timekeeping/timekeepingController";
import getUser from "./controller/user/userController";
import { Timekeeping } from "./models/timekeeping";
import User from "./models/user";
import { collections, connectToDatabase } from "./services/database.service";

const express = require("express");
const app = express();
const port = 8080;
var cors = require("cors");

// use it before all route definitions
app.use(cors({ origin: "*" }));
app.get("/checkuserlogin", async function (req: any, res: any) {
  try {
    var data = {
      userName: req.query.user,
      pass: req.query.pass,
    };

    let user: User = await getUser(data.userName, data.pass);
    if (user) {
      user.password = "";
    }

    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
app.get("/keepingtimetoday", async (req: any, res: any) => {
  try {
    var a: Timekeeping = await getTimeKeepingToday("Danila Bulward");
    console.log(a);
  } catch (error) {}
});
app.listen(port, async function () {
  var connect = await connectToDatabase();

  console.log("Your app running on port " + port);
});
