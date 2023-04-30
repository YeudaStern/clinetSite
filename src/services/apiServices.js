import axios from "axios";
import { API_KEY } from "../constant/constants";

const apiGet = async (url, body) => {
    try {
        let { data } = await axios({
            method: "GET",
            url,
            data: body,
            headers: {
                apiKey: localStorage[API_KEY],
            },

        })
        return data;
    }
    catch (err) {
        throw err;
    }
}

const apiPost = async (url, body) => {
    try {
        let { data } = await axios({
            method: "POST",
            url,
            data: body,
            headers: {
                "apiKey": localStorage[API_KEY],
            },

        })
        return data;
    }
    catch (err) {
        throw err;
    }
}


const apiPut = async (url, body) => {
    try {
        let { data } = await axios({
            method: "PUT",
            url,
            data: body,
            headers: {
                "apiKey": localStorage[API_KEY],
            },

        })
        return data;
    }
    catch (err) {
        throw err;
    }
}
const apiDelete = async (url, body) => {
    try {
        let { data } = await axios({
            method: "DELETE",
            url,
            data: body,
            headers: {
                "apiKey": localStorage[API_KEY],
            },

        })
        return data;
    }
    catch (err) {
        throw err;
    }
}

export { apiGet, apiPost, apiDelete, apiPut}
