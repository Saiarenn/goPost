import { $authHost } from "./index";

export const createPost = async (post) => {
    const { data } = await $authHost.post('posts', post)
    return data
}

export const fetchPosts = async () => {
    const { data } = await $authHost.get('posts')
    return data
}

export const fetchPostById = async (id) => {
    const { data } = await $authHost.get(`posts/${id}`)
    return data
}

export const deletePostById = async (id) => {
    const { data } = await $authHost.delete(`posts/${id}`)
    return data
}

export const updatePostById = async (id, post) => {
    const { data } = await $authHost.put(`posts/${id}`, post)
    return data
}