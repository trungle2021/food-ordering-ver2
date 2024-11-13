import { useSelector } from "react-redux";
import OAuthProvider from "~/interface/auth/oauthProvider";
import { RootState } from "~/store/store";

export const useAvatar = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const oauthProvider = useSelector((state: RootState) => state.auth.oauthProvider);
    const oauthAvatar = oauthProvider ? user?.oauthProviders.find((provider: OAuthProvider) => provider.provider === oauthProvider)?.profile.profilePicture : user?.avatar;
    return oauthAvatar;
}