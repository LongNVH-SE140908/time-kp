import axios from "axios";
import Voucher from "../../models/voucher";

export async function getAllVoucher(token: string) {
  let result: Voucher[] = [];
  var URL: string;

  URL = "http://localhost:8080/allvoucher/";
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
