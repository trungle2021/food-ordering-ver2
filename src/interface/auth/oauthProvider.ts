export default interface OAuthProvider {
    provider: string;
    providerId: string;
    profile: {
      name: string;
      profilePicture: string;
    };
}