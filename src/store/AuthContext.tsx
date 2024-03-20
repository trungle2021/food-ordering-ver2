import { createContext } from 'react'

const AuthContext = createContext();


function AuthProvider({children}) {
    const userId = '65741dbdc65e820e07b382bf'
    return (
        <AuthContext.Provider value={userId}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }