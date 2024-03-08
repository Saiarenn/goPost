import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (name, email, password) => {
    const { data } = await $host.post('signup', { name, email, password, isAdmin: false })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const login = async (email, password) => {
    const { data } = await $host.post('login', { email, password })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

// export const check = async () => {
//     const { data } = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token)
//     return jwtDecode(data.token)
// }

export const getAllUsers = async () => {
    const {data} = await $authHost.get('admin')
    return data
}

export const updateUser = async (id, user) => {
    const {data} = await $authHost.put('update/' + id, user)
    return data
}

export const deleteUser = async (id) => {
    const {data} = await $authHost.delete('delete/' + id)
    return data
}