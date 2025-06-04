import mongoose from "mongoose";
import { PageAccessName, protectedRoutes } from "../types";

export const getPaths = (pathname: string) => {
    return pathname.split("/").filter((path) => path !== "");
}

export const getRoutePath = (pathname: string): PageAccessName => {
    const paths = getPaths(pathname);
    return `/${paths[0]}` as PageAccessName;
}

export const generateMatchers = () => {
    const matchers = protectedRoutes.map((route) => `${route}/:path*`);
    return matchers;
}

export const getNamePath = (pathname: string) => {
    const paths = getPaths(pathname);
    if(paths[0] === "admin") return null;
    if(["user", "creator"].includes(paths[0])) {
        return paths[1];
    }
    if(paths.length > 1) {
        const isValid = mongoose.Types.ObjectId.isValid(paths[1]);
        if(!isValid) {
            return paths[1];
        }
    }
    return null;
}