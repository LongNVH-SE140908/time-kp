export class TimeKeeping {
  user_name: string;
  clock_time: ClockTime[];
  constructor(user_name: string, clock_time: ClockTime[]) {
    this.user_name = user_name;
    this.clock_time = clock_time;
  }
}

export class ClockTime {
  date: string;
  info: Info;
  constructor(date: string, info: Info) {
    this.date = date;
    this.info = info;
  }
}

export class Info {
  detail: Detail[];
  constructor(detail: Detail[]) {
    this.detail = detail;
  }
}

export class Detail {
  role: string;
  time_name: string;
  check_in: string;
  check_out: string;
  total_minute: number;
  rate: string;
  isValid: number;
  constructor(
    role: string,
    time_name: string,
    check_in: string,
    check_out: string,
    total_minute: number,
    rate: string,
    isValid: number
  ) {
    this.role = role;
    this.time_name = time_name;
    this.check_in = check_in;
    this.check_out = check_out;
    this.total_minute = total_minute;
    this.rate = rate;
    this.isValid = isValid;
  }
}
