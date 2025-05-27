"use client"
import { IAuthContext, IContextUser } from "@/@types";
import { createContext, use, useEffect, useState } from "react";
import { INITIAL_CONTEXT } from "./constants";
import { provideUser } from "./service/provide-user.service";

interface IProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>(INITIAL_CONTEXT);

const AuthProvider = (props: IProps) => {
    const [user, setUser] = useState<IContextUser | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    const revalidateUser = async() => {
        const data = await provideUser();
        setUser(data);
    }
    useEffect(() => {
        provideUser().then((user) => {
            setUser(user);
            setLoading(false);
        })
    }, [])
    
    const value: IAuthContext = {
        user,
        setUser,
        isLoading,
        revalidateUser
    }
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export {
    AuthContext,
    AuthProvider,
}