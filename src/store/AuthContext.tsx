import { createContext } from "react";

const AuthContext = createContext<string>("");
function AuthProvider({ children }: { children: React.ReactNode }) {
  const userId: string = "65741dbdc65e820e07b382bf";
  return <AuthContext.Provider value={userId}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
