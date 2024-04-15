import axios from './axios.js'

/**
 * 功能：注册账号
 * 入参: username&password
 */
export const toReg = async (payload: { username: string, password: string }): Promise<any> => {
    const { data } = await axios.post(
        `/api/register`, { ...payload })
    return data
}

/**
 * 功能：登录账号
 * 入参: username&password
 */
export const toLogin = async (payload: { username: string, password: string }): Promise<any> => {
    const { data } = await axios.post(
        `/api/login`, { ...payload })
    return data
}

/**
 * 功能：退出登录
 */
export const toLogout = async (): Promise<any> => {
    const { data } = await axios.post(
        `/api/logout`)
    return data
}
