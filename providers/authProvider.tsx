"use client"
import { IUser } from "@/@types";
import { createContext, useState } from "react";
export interface IContextUser {
    user: Pick<IUser, "email" | "role">;
}
interface IAuthContext {
    user: IContextUser | null;
    setUser: React.Dispatch<React.SetStateAction<IContextUser | null>>
}

interface IProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {}
});

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