import getProduct, { removeProduct } from "./controller/product/productController";
import getTimeKeeping, {
  UpdateTimeKeeping,
  getAllTimeKeeping,
  timeKeepingCheckOut,
  timeKeepingCheckin,
} from "./controller/timekeeping/timekeepingController";

import getUser from "./controller/user/userController";
import { Product } from "./models/product";
import { TimeKeeping } from "./models/timekeeping";
import User from "./models/user";
import { ResPonses } from "./models/utils";
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
    if (user.username) {
      user.password = "";
      var response: ResPonses = {
        isError: false,
        message: "Login Success",
        data: user
      };
      return res.status(200).send({ response });
    } else {
      var response: ResPonses = {
        isError: true,
        message: "Error UserName or Password",
        data: undefined
      };
      return res.status(200).send({ response });
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
app.get("/keepingtime", async (req: any, res: any) => {
  try {
    var data = {
      token: req.query.token,
    };
    //valid jwt

    var decode = jwt.verify(data.token, "superSecrect");
    var userDecode = decode.user as User;
    var temp;
    var message = await getTimeKeeping(userDecode.username || "", userDecode.role || "").then((responses) => {
      temp = responses as TimeKeeping[];

    })
    console.log(temp);
    var response: ResPonses = {
      isError: false,
      message: "",
      data: temp
    };
    res.status(200).send(response);
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
app.post("/keepingtimecheckout", async (req: any, res: any) => {
  try {
    var data = {
      token: req.body.token,
    };

    //valid jwt
    var decode = jwt.verify(data.token, "superSecrect");
    var userDecode = decode.user as User;

    var message = await timeKeepingCheckOut(
      userDecode.username,
      userDecode.role
    );
    res.status(200).send(message);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
app.get("/allkeepingtime", async (req: any, res: any) => {
  try {
    var data = {
      token: req.query.token,
    };
    //valid jwt

    var decode = jwt.verify(data.token, "superSecrect");
    var userDecode = decode.user as User;
    var temp;
    console.log(userDecode);

    if (userDecode.role != "admin") {
      var response: ResPonses = {
        isError: true,
        message: "Not at Admin",
        data: null
      };
      res.status(200).send(response);
    }
    var message = await getAllTimeKeeping(userDecode.lstManagerUser as []).then((responses) => {
      temp = responses as TimeKeeping[];

    })

    var response: ResPonses = {
      isError: false,
      message: "",
      data: temp
    };
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
app.post("/updatekeepingtime", async (req: any, res: any) => {
  try {
    var data = {
      token: req.body.token,
      username: req.body.username,
      newdata: JSON.parse(req.body.newdata) as TimeKeeping
    };
    //valid jwt
    console.log(data.newdata.clock_time);


    var decode = jwt.verify(data.token, "superSecrect");
    var userDecode = decode.user as User;
    var temp: boolean = false;
    if (userDecode.role != "admin") {
      var response: ResPonses = {
        isError: true,
        message: "Not at Admin",
        data: null
      };
      res.status(200).send(response);
    }
    console.log(data.newdata.clock_time);

    var message = await UpdateTimeKeeping(data.username, data.newdata).then((responses) => {
      temp = responses as unknown as boolean;

    })

    var response: ResPonses = {
      isError: !temp,
      message: "",
      data: null
    };
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
app.get("/products", async (req: any, res: any) => {
  try {
    var data = {
      token: req.query.token,
    };
    //valid jwt

    var decode = jwt.verify(data.token, "superSecrect");
    var userDecode = decode.user as User;
    var temp;
    var message = await getProduct().then((responses) => {
      temp = responses as Product[];

    })
    console.log(temp);
    var response: ResPonses = {
      isError: false,
      message: "",
      data: temp
    };
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
app.delete("/products", async (req: any, res: any) => {
  try {
    var data = {
      token: req.query.token,
      id: req.query.id
    };
    //valid jwt

    var decode = jwt.verify(data.token, "superSecrect");
    var userDecode = decode.user as User;
    if (userDecode.role != "admin") {
      var response: ResPonses = {
        isError: true,
        message: "Not at Admin",
        data: null
      };
      res.status(200).send(response);
    }

    var temp;
    var message = await removeProduct(data.id).then((responses) => {
      temp = responses as unknown as boolean;

    })
    console.log(temp);
    var response: ResPonses = {
      isError: false,
      message: "",
      data: temp
    };
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.listen(port, async function () {
  var connect = await connectToDatabase();

  console.log("Your app running on port " + port);
});
