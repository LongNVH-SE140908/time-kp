import { Timekeeping } from "../../models/timekeeping";
import { collections } from "../../services/database.service";
export default async function getTimeKeepingToday(userName: string) {
  let ts = Date.now();

  let date_ob: Date = new Date(ts);

  let year = date_ob.getFullYear();
  let month = (date_ob.getMonth() + 1).toString().padStart(2, "0");
  +1;
  let day = date_ob.getDate();
  console.log(year + "-" + month + "-" + day);

  let tm: Timekeeping = (await collections.timekeeping?.findOne({
    user_name: userName,
    "clock_time.date": { $gte: year + "-" + month + "-" + day },
  })) as unknown as Timekeeping;
  console.log(tm);
  return tm;
}
