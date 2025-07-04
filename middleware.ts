import { NextRequest, NextResponse } from "next/server";
import { getRoutePath } from "./routes/utils/handlePaths";
import { getToken } from "./lib/getToken";
import { PageAccessName, protectedRoutes } from "./routes/types";
import { routesAccess } from "./routes/pageAccessRights";
import { withCORS } from "./routes/utils/withCORS";

export default async function middleware(req: NextRequest) {
    const fullPath: string = req.nextUrl.pathname;
    const routePath: PageAccessName = getRoutePath(fullPath);
    const token = await getToken();
    const { role } = routesAccess.get(routePath) || { role: [] };
    const isLogged = Boolean(token);

    if(routePath === "/already-logged" || routePath === "/forbidden") {
        if (!isLogged) {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    if(String(routePath) === "/unauthorized") {
        if (isLogged) {
            return NextResponse.redirect(new URL("/already-logged", req.url));
        }
    }

    if (routePath === "/sign-in" || routePath === "/sign-up") {
        
        if (isLogged) {
            return NextResponse.redirect(new URL("/already-logged", req.url));
        }
    }
    if (protectedRoutes.includes(routePath)) {
        if (!token) {
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }
        if (!role.includes(token.role)) {
            return NextResponse.redirect(new URL("/forbidden", req.url));
        }   
    }
    return withCORS(NextResponse.next());
}
export const config = {
    matcher: [
        "/sign-in/:path*",
        "/sign-up/:path*",
        "/admin/:path*",
        "/creator/:path*",
        "/user/:path*",
        "/answer-form/:path*",
        "/available-forms/:path*",
        "/review-response/:path*",
        "/form-answers/:path*",
        "/form-generator/:path*",
        "/my-forms/:path*",
        "/profile/:path*",
        "/view-form/:path*",
        "/unauthorized/:path*",
        "/forbidden/:path*",
        "/already-logged/:path*",
    ]
};
