import {$host} from "./index.ts";
import {IPost} from "../types/IPost.ts";

export async function fetchNewPostsId() {
    const {data} = await $host.get<number[]>('/newstories.json?print=pretty')
    return data
}

export async function fetchOnePost(id: number) {
    const {data} = await $host.get<IPost>(`/item/${id}.json?print=pretty`)
    return data
}