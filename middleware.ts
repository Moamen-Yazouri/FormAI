import { NextRequest, NextResponse } from "next/server";
import { MATCHERS } from "./routes/constans";
import { getNamePath, getPaths, getRoutePath } from "./routes/utils/handlePaths";
import { getToken } from "./lib/getToken";
import { PageAccessName, protectedRoutes } from "./routes/types";
import { routesAccess } from "./routes/pageAccessRights";
export default async function middleware(req: NextRequest) {
    const fullPath: string = req.nextUrl.pathname;
    const routePath: PageAccessName = getRoutePath(fullPath);
    const name: string | null = getNamePath(fullPath);
    const token = await getToken();
    console.log(routePath);
    const { role } = routesAccess.get(routePath) || { role: [] };
    if (routePath === "/sign-in" || routePath === "/sign-up") {
        const isLogged = Boolean(token);
        if (isLogged) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    if (protectedRoutes.includes(routePath)) {
        if (!token) {
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }
        if (!role.includes(token.role) || name !== token.name) {
            return NextResponse.redirect(new URL("/forbidden", req.url));
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: MATCHERS
};
