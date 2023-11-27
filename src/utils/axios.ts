import axios from "axios";

const client = axios.create({
    baseURL: "http://172.17.0.3:5000/"
    // baseURL: "http://127.0.0.1:5000/"
});

export default client;