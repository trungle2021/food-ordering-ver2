import { AddressResponse } from "../address/addressResponse";

export interface BaseUser {
  _id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  user_address: AddressResponse[];
}

