
import { createContext, useEffect, useState } from "react";
import getFromSessionStorage from "../storage/storage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(getFromSessionStorage("user", JSON.stringify({ userName: "", password: "" }))));
    const [saved, setSaved] = useState(JSON.parse(getFromSessionStorage("saved", JSON.stringify([]))));
    // console.log(auth, saved);
    return (
        <AuthContext.Provider value={{ auth, setAuth, saved, setSaved }}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContext;