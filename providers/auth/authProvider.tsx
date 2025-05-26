"use client"
import { IAuthContext, IContextUser } from "@/@types";
import { createContext, use, useEffect, useState } from "react";
import { INITIAL_CONTEXT } from "./constants";
import { getLoggedUser } from "./service/authContext.service";

interface IProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>(INITIAL_CONTEXT);

const AuthProvider = (props: IProps) => {
    const fetchedUser = use(getLoggedUser());
    const [user, setUser] = useState<IContextUser | null>(fetchedUser);
    // const [isLoading, setLoading] = useState<boolean>(true);

    const revalidateUser = async() => {
        const user = await getLoggedUser();
        setUser(user);
    }

    const value: IAuthContext = {
        user,
        setUser,
        revalidateUser
    }
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export {
    AuthContext,
    AuthProvider,
}