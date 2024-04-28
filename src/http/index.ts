import axios from "axios";

export const $host = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
})