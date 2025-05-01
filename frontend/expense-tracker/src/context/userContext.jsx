import React, {createContext, useState } from "react"

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);


    //update userdata
    const updateUser = (userData) => {
        setUser(userData);
    }

    //clear user data(e.g. on logout)
    const clearUser = () => {
        setUser(null);
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