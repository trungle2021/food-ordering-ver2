export interface GetNewAccessTokenPayload {
    refreshToken: string;
}

export interface LoginOAuthPayload {
    provider: string;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface OAuthProvider {
    provider: string;
    providerId: string;
    profile: {
      name: string;
      profilePicture: string;
    };
}

export interface RegisterPayload {
    email: string;
    password: string;
    cpassword: string;
    name: string;
    phone: string;
}