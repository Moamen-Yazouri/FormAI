"use client"
import { IAuthContext, IContextUser } from "@/@types";
import { createContext, useEffect, useState } from "react";
import { INITIAL_CONTEXT } from "./constants";

interface IProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>(INITIAL_CONTEXT);

const AuthProvider = (props: IProps) => {
    const [user, setUser] = useState<IContextUser | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const initUser = async() => {
        const res = await fetch("/api/auth/provide-logged-user", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })

        if(res.ok) {
            const { user }: { user: IContextUser } = await res.json();
            return user;
        }

        return null;
    }

    useEffect(() => {
        initUser().then((user) => {
            setUser(user);
            setLoading(false);
        } )
    }, [])
    
    const value: IAuthContext = {
        user,
        setUser,
        isLoading,
    }
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export {
    AuthContext,
    AuthProvider,
}