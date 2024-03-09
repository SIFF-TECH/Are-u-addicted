import newRequest from "../utils/newRequest.js";
import { loginFailure, loginStart, loginSuccess, signout } from "./userRedux"


export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        newRequest.post("/auth/login", user).then((res) => {
            dispatch(loginSuccess(res.data));
            return res.data;
        });
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const logout = async (dispatch) => {
    try {
        newRequest.post("/auth/logout").then(() => {
            dispatch(signout())
        })
    } catch (err) {
        console.log(err)
    }
}
