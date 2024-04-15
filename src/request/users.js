import axios from './axios.js'

/**
 * 功能：注册账号
 * 入参: username&password
 */
export const toReg = async (payload) => {
    const { data } = await axios.post(
        `/api/reg`, { ...payload })
    return data
}