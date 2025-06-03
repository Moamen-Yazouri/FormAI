import { PageAccessName } from "../types";

export const getPaths = (pathname: string) => {
    return pathname.split("/").filter((path) => path !== "");
}

export const getRoutePath = (pathname: string): PageAccessName => {
    const paths = getPaths(pathname);
    return `/${paths[0]}` as PageAccessName;
}