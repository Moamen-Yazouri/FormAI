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
        try {
            const res = await fetch("/api/auth/provide-logged-user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            })

            if(res.ok) {
                const { user }: { user: IContextUser } = await res.json();
                setUser(user);
            }
            
        }
        catch {
            setUser(null);
        }
        finally {
            setLoading(false); 
        }

    }

    useEffect(() => {
        initUser();
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