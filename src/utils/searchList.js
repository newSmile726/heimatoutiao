// Authorization
import storeage from './storage'

const SEARCH_LIST = 'TOUTIAO_SEARCH'
export const getSearch = () => storeage.get(SEARCH_LIST)

export const setSearch = (key) => storeage.set(SEARCH_LIST, key)

export const removeSearch = () => storeage.remove(SEARCH_LIST)
