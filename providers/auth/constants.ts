import { IAuthContext } from "@/@types";

export const INITIAL_CONTEXT: IAuthContext = {
    user: null,
    setUser: () => { },
    isLoading: true,
    revalidateUser: async() => {},

}