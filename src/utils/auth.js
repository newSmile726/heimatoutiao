// Authorization
import storeage from './storage'

const TOKEN = 'TOUTIAO_TOKEN'
export const getToken = () => storeage.get(TOKEN)

export const setToken = (key) => storeage.set(TOKEN, key)

export const removeToken = () => storeage.remove(TOKEN)
