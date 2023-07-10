import Voucher from "../../models/voucher";
import { collections } from "../../services/database.service";
var jwt = require("jsonwebtoken");
var md5 = require("md5");
export default async function getAllVoucher() {
  let vc: Voucher[] = (await collections.voucher
    ?.find({})
    .toArray()) as unknown as Voucher[];
  if (!vc) {
    return [];
  }

  return vc;
}

export async function updateVoucher(voucher: string, newdata: Voucher) {
  await collections.voucher?.updateOne({ voucher: voucher }, { $set: newdata });
  return true;
}
