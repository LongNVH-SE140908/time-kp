import { ObjectId } from "mongodb";
export default class User {
  constructor(
    username?: string,
    email?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    age?: number,
    address?: string,
    city?: string,
    country?: string,
    phone_number?: string,
    zip_code?: string,
    gender?: string,
    date_of_birth?: string,
    registration_date?: string,
    last_login?: string,
    subscription_status?: boolean,
    account_balance?: number,
    loyalty_points?: number,
    preferred_language?: string,
    newsletter_subscription?: boolean,
    role?: string,
    public id?: ObjectId
  ) {}
}
