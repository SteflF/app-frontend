import axios from "./AxiosApiConfig"

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    all: axios.all,
    spread: axios.spread
};