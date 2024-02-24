import {SET_AUTH_CHECKED, SET_USER} from "../constants";

interface ISetAuthChecked {
    readonly type: typeof SET_AUTH_CHECKED
    data: boolean
}

interface ISetUser {
    readonly type: typeof SET_USER
    data: {
        accessToken: string,
        refreshToken: string,
        success: boolean,
        user: {
            name: string,
            email: string
        }
    }
}

export type TUserAction = ISetUser | ISetAuthChecked;