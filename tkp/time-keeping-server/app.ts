import getTimeKeeping, {
  timeKeepingCheckin,
} from "./controller/timekeeping/timekeepingController";

import getUser from "./controller/user/userController";
import User from "./models/user";
import { connectToDatabase } from "./services/database.service";

const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
var cors = require("cors");
var jwt = require("jsonwebtoken");
// use it before all route definitions
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/checkuserlogin", async function (req: any, res: any) {
  try {
    var data = {
      userName: req.query.user,
      pass: req.query.pass,
    };
    let user: User = new User();

    await getUser(data.userName, data.pass).then((responses) => {
      if (responses) {
        user = responses;
      }
    });
    if (user) {
      user.password = "";
    }

    res.status(200).send({ user });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
app.get("/keepingtime", async (req: any, res: any) => {
  try {
    var data = {
      userName: req.query.user,
      token: req.query.token,
    };
    //valid jwt
    jwt.verify(data.token, "superSecrect");

    res.status(500).send("a");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post("/keepingtimecheckin", async (req: any, res: any) => {
  try {
    var data = {
      token: req.body.token,
    };

    //valid jwt
    var decode = jwt.verify(data.token, "superSecrect");
    var userDecode = decode.user as User;

    var message = await timeKeepingCheckin(
      userDecode.username,
      userDecode.role
    );
    res.status(200).send(message);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.listen(port, async function () {
  var connect = await connectToDatabase();

  console.log("Your app running on port " + port);
});
