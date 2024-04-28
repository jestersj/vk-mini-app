import {fetchNewPostsId, fetchOnePost} from "../http/postsApi.ts";

export async function getLatestNews() {
    const postsId = await fetchNewPostsId()
    const promises = postsId.slice(0, 100)
        .map(id => fetchOnePost(id))
    return await Promise.all(promises)
}

export async function getComments(idArray: number[]) {
    const promises = idArray.map(id => fetchOnePost(id))
    return await Promise.all(promises)
}