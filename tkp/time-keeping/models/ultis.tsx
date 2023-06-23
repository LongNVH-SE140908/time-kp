export class ResPonses {
    isError?: boolean;
    message?: string;
    data?: any;
    public constructor(init: Partial<ResPonses>) { Object.assign(this, init); }
  }
  