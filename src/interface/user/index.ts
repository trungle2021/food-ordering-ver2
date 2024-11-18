import { OAuthProvider } from "../auth";

export interface BaseUser {
  _id?: string;
  name: string;
  password?: string;
  phone?: string;
  email: string;
  avatar?: string;
  user_address: UserAddress[];
  oauthProviders: OAuthProvider[];
  is_email_verified: boolean;
  isOAuthUser?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserProfileFormValues {
  name: string;
  email: string;
  user_address: string;
  phone: string;
  avatar?: File;
}

export interface CreateAddressFormValues {
  recipient: string;
  phone: string;
  address: string;
  is_default_address: boolean;
}
export interface UpdateAddressFormValues {
  addressId: string;
  recipient: string;
  phone: string;
  address: string;
  is_default_address: boolean;
}

export interface UserAddress {
  _id: string;
  recipient: string;
  phone: string;
  address: string;
  is_default_address:boolean
}

