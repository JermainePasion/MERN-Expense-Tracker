import React, {createContext, useState } from "react"

export const UserContext = createContext();


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 🆕

    const updateUser = (userData) => {
    setUser(userData);
    setLoading(false);
    };

    const clearUser = () => {
    setUser(null);
    setLoading(false);
    };

    return(
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser
            }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;