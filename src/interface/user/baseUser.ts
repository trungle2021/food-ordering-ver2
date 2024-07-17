import { Address } from "../address/addressProps";

export interface BaseUser {
  _id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  user_address: Address[];
}

