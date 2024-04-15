import axios from './axios.js'
import useLocalStorage from '../utils/localStorage';

// 使用自定义 hook 获取 LocalStorage 中的值
const { storedValue: storedData } = useLocalStorage<string>('token', '');
const token = storedData.value

/**
 * 功能：更新列表数据
 */
export const updateConsumption = async (id: string, payload: object): Promise<any> => {
    const { data } = await axios.patch(
        `/api/tracker/${id}`, { ...payload, token })
    return data
}

/**
 * 功能：获取列表数据
 */
export const getConsumptions = async (): Promise<any> => {
    const { data } = await axios.get(`/api/tracker`)
    return data
}

/**
 * 功能：创建健康记录
 */
export const createConsumptions = async (payload: object): Promise<any> => {
    const { data } = await axios.post(
        `/api/tracker`, { ...payload, token })
    return data
}

/**
 * 功能：删除某条列表数据
 */
export const deleteConsumption = async (id: string): Promise<any> => {
    const { data } = await axios.delete(`/api/tracker/${id}`)
    return data
}