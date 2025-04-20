"use client"
import { IAuthContext, IContextUser, IUserFromDB } from "@/@types";
import { createContext, useState } from "react";
import { INITIAL_CONTEXT } from "./constants";

interface IProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>(INITIAL_CONTEXT);

const AuthProvider = (props: IProps) => {
    const [user, setUser] = useState<IContextUser | null>(null);
    const value = {
        user,
        setUser
    }
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export {
    AuthContext,
    AuthProvider,
}