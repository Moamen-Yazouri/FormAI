import { IAuthContext } from "@/@types";

export const INITIAL_CONTEXT: IAuthContext = {
    user: null,
    isLoading: false,
    setUser: () => { },
    revalidateUser: async() => {},
}