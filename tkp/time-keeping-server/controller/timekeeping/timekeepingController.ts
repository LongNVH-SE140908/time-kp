import { ClockTime, Detail, Info, TimeKeeping } from "../../models/timekeeping";
import ReturnOj from "../../models/utils";
import Enumerable from "linq";
import { collections } from "../../services/database.service";
export default async function getTimeKeeping(userName: string) {
  let ts = Date.now();

  let date_ob: Date = new Date(ts);
  // lay danh sach cham cong 3 thang gan day
  let year = date_ob.getFullYear();
  let month = (date_ob.getMonth() + 1 - 3).toString().padStart(2, "0");
  let day = 1;

  return null;
}
export async function timeKeepingCheckin(
  userName?: string,
  role?: string
): Promise<ReturnOj> {
  try {
    let ts = Date.now();
    let date_now: Date = new Date(ts);
    const year = date_now.getFullYear();
    const month = (date_now.getMonth() + 1).toString().padStart(2, "0");
    const day = date_now.getDate();
    const day_in_week = date_now.getDay();
    let hour = date_now.getHours();
    let ymd = year + "-" + month + "-" + day;
    console.log(year + "-" + month + "-" + day);

    let time_name = "";
    let rate = "";

    if (role == "employee") {
      if (0 <= hour && hour < 6) {
        time_name = "0-6";
        if (day_in_week == 6) {
          rate = "2";
        } else {
          rate = "1.5";
        }
      } else if (6 <= hour && hour < 12) {
        time_name = "6-12";
        rate = "1";
      } else if (12 <= hour && hour < 18) {
        time_name = "12-18";
        rate = "1";
      } else if (18 <= hour && hour < 24) {
        time_name = "18-24";
        if (day_in_week == 6) {
          rate = "2";
        } else {
          rate = "1.5";
        }
      }
    } else if (role == "guard") {
      if (0 <= hour && hour < 6) {
        time_name = "0-6";
        rate = "1.5";
      } else if (6 <= hour && hour < 18) {
        time_name = "6-18";
        rate = "1";
      }
    } else if (18 <= hour && hour < 24) {
      time_name = "18-24";
      rate = "1.5";
    }

    if (time_name == undefined || time_name == "") {
      return new ReturnOj(true, "Undetected time");
    }

    //lay cham cong hom nay
    let timekeeping: TimeKeeping = (await collections.timekeeping?.findOne({
      user_name: userName,
    })) as unknown as TimeKeeping;

    // check hom nay da cham cong chua de add ngay vao db
    var isCheckintoday = false;
    timekeeping.clock_time.forEach(async (value, index) => {
      if (new Date(ymd).getTime() == new Date(value.date).getTime()) {
        // duoi db co ngay hom nay roi
        isCheckintoday = true;
      }
    });
    if (!isCheckintoday) {
      // neu chua chekin homnay

      var detailTemp: Detail[] = [
        {
          role: role || "",
          check_in: date_now.toISOString(),
          check_out: "",
          isValid: 0,
          time_name: time_name,
          rate: rate,
          total_minute: 0,
        },
      ];
      var info: Info = {
        detail: detailTemp,
      };

      timekeeping.clock_time.push(new ClockTime(ymd, info));
      await collections.timekeeping
        ?.updateOne(
          { user_name: userName },
          { $set: { clock_time: timekeeping.clock_time } }
        )
        .catch((ms) => {
          console.log(ms);
        });
      new ReturnOj(false, "Checkin Success");
    } else {
      // da check in roi
      var timecheckintoday = timekeeping.clock_time
        .find((x) => new Date(x.date).getTime() == new Date(ymd).getTime())
        ?.info.detail.find((y) => y.time_name == time_name);
      if (
        (timecheckintoday?.check_in != "" &&
          timecheckintoday?.check_in != undefined) ||
        timecheckintoday?.time_name == time_name
      ) {
        new ReturnOj(true, "Adreadly Checkin");
      } else {
        timekeeping.clock_time
          .find((x) => new Date(x.date).getTime() == new Date(ymd).getTime())
          ?.info.detail.push(
            new Detail(
              role || "",
              time_name,
              date_now.toISOString(),
              "",
              0,
              (rate = rate),
              0
            )
          );
        await collections.timekeeping
          ?.updateOne(
            { user_name: userName },
            { $set: { clock_time: timekeeping.clock_time } }
          )
          .catch((ms) => {
            console.log(ms);
          });
        new ReturnOj(false, "Checkin in Success");
      }
    }

    return new ReturnOj(true, "undetect error");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function timeKeepingCheckOut(
  userName?: string,
  role?: string
): Promise<ReturnOj> {
  try {
    let ts = Date.now();
    let date_now: Date = new Date(ts);
    const year = date_now.getFullYear();
    const month = (date_now.getMonth() + 1).toString().padStart(2, "0");
    const day = date_now.getDate();
    const day_in_week = date_now.getDay();
    let hour = date_now.getHours();
    let ymd = year + "-" + month + "-" + day;
    let time_name = "";
    let rate = "";
    if (role == "employee") {
      if (0 <= hour && hour < 6) {
        time_name = "0-6";
      } else if (6 <= hour && hour < 12) {
        time_name = "6-12";
      } else if (12 <= hour && hour < 18) {
        time_name = "12-18";
      } else if (18 <= hour && hour < 24) {
        time_name = "18-24";
      }
    } else if (role == "guard") {
      if (0 <= hour && hour < 6) {
        time_name = "0-6";
      } else if (6 <= hour && hour < 18) {
        time_name = "6-18";
      }
    } else if (18 <= hour && hour < 24) {
      time_name = "18-24";
    }
    if (time_name == undefined || time_name == "") {
      return new ReturnOj(true, "undetect time");
    }

    //lay cham cong
    let timekeeping: TimeKeeping = (await collections.timekeeping?.findOne({
      user_name: userName,
    })) as unknown as TimeKeeping;

    //check xem co check out duoc khong
    let temptimekeeping;
    timekeeping.clock_time.forEach((value, index) => {
      if (new Date(value.date).getTime() == new Date(date_now).getTime()) {
        //co cham cong hom nay roi
        // check xem check in co giong voi checkout khong

        value.info.detail.forEach(async (v, i) => {
          if (v.time_name == time_name) {
            // check xem da checkin chua
            if (v.check_out != "") {
              return new ReturnOj(true, "adready checkout");
            } else {
              let tempdetail = timekeeping.clock_time[index].info.detail[i];
              tempdetail.check_out = date_now.toISOString();
              tempdetail.total_minute = new Date(
                new Date(tempdetail.check_out).getTime() -
                  new Date(tempdetail.check_in).getTime()
              ).getMinutes();
              timekeeping.clock_time[index].info.detail[i] = tempdetail;

              await collections.timekeeping
                ?.updateOne(
                  { user_name: userName },
                  { $set: { clock_time: timekeeping.clock_time } }
                )
                .catch((ms) => {
                  console.log(ms);
                });
            }
          }
        });
        return new ReturnOj(true, "not found checkin");
      } else {
        // khong co cham cong hom nay ma da check out
        return new ReturnOj(true, "not found checkin");
      }
    });

    return new ReturnOj(true, "undetect error");
  } catch (error) {
    console.log(error);

    throw error;
  }
}
