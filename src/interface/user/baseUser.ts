import OAuthProvider from "../auth/oauthProvider";
import UserAddress from "./userAddress";

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

