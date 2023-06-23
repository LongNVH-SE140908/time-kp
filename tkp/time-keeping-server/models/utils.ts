export default class ReturnOj {
  isError: boolean;
  message: string;
  constructor(isError: boolean, message: string) {
    this.isError = isError;
    this.message = message;
  }

}
export class ResPonses {
  isError?: boolean;
  message?: string;
  data?: any;
  public constructor(init: Partial<ResPonses>) { Object.assign(this, init); }
}
