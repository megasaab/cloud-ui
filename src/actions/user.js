import axios from "axios";
import { TEST_URL } from "../constant";
import { setUser } from "../reducers/userReducer";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${TEST_URL}/auth/registration`, {email, password});
        alert(response.data.message);
    } catch (error) {
        alert(error.response.data.message);
    }

}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${TEST_URL}/auth/login`, {email, password});
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
}