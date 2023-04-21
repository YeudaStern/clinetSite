import axios from "axios";
export const API_URL = "http://localhost:3002";

export const KEY_TOKEN = "HB_token";


export const doApiGet = async (_url) => {
    try {
        const resp = await axios({
            method: "GET",
            url: _url,
            headers: {
                "x-api-key": localStorage[KEY_TOKEN]
            }
        })
        return resp.data;
    }
    catch (err) {
        throw err;
    }
}


//post, put, delete, patch
export const doApiMethod = async (_url, _method, _body = {}) => {
    try {
        const resp = await axios({
            method: _method,
            url: _url,
            data: _body,
            headers: {
                "x-api-key": localStorage[KEY_TOKEN]
            }
        })
        return resp.data;
    }
    catch (err) {
        throw err;
    }
}