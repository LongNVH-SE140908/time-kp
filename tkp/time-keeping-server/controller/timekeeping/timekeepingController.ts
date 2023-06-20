import { Timekeeping } from "../../models/timekeeping";
import { collections } from "../../services/database.service";
export default async function getTimeKeeping(userName: string) {
  let ts = Date.now();

  let date_ob: Date = new Date(ts);
  // lay danh sach cham cong 3 thang gan day
  let year = date_ob.getFullYear();
  let month = (date_ob.getMonth() + 1 - 3).toString().padStart(2, "0");
  let day = 1;
  console.log(year + "-" + month + "-" + day);

  let tm: Timekeeping = (await collections.timekeeping?.findOne({
    user_name: userName,
    "clock_time.date": { $gte: year + "-" + month + "-" + day },
  })) as unknown as Timekeeping;
  console.log(tm);
  return tm;
}
export async function timeKeepingCheckin(userName: string, role: string) {
  let ts = Date.now();

  let date_ob: Date = new Date(ts);
  // lay danh sach cham cong 3 thang gan day
  let year = date_ob.getFullYear();
  let month = (date_ob.getMonth() + 1).toString().padStart(2, "0");
  let day = date_ob.getDate();
  let hour = date_ob.getHours();
  console.log(year + "-" + month + "-" + day);
  //lay cham cong hom nay
  let tm: Timekeeping = (await collections.timekeeping?.findOne({
    user_name: userName,
    "clock_time.date": { $gte: year + "-" + month + "-" + day },
  })) as unknown as Timekeeping;

  let tempckin = "";
  let temprole = "";
  let isExistDate = "";



  tm.clock_time.forEach((v, i) => {
    if (new Date(v.date) == date_ob) {
      if (role == "emp") {
        temprole = "emp"
        if (0 < hour && hour <= 6) {
          tempckin = "12AM_to_6AM";
        } else if (6 < hour && hour <= 12) {
          tempckin = "6AM_to_12PM";
        } else if (12 < hour && hour <= 18) {
          tempckin = "12PM_to_18PM";
        } else {
          tempckin = "18PM_to_12AM";
        }
      } else if (role == "guard") {
        temprole = "guard"
        if (0 < hour && hour <= 6) {
          tempckin = "12AM_to_6AM";
        } else if (6 < hour && hour <= 18) {
          tempckin = "6AM_to_18PM";
        } else {
          tempckin = "18PM_to_12AM";
        }
      }
    } else {

    }
  })
  console.log(tm);
  return tm;
}