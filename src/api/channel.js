import request from '@/utils/request'
import storeage from '@/utils/storage'
/**
 * 获取我的频道列表
 * @returns promise
 */
export const getMychennels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道列表
 * @returns promise
 */
export const getAllchennels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * 删除用户指定频道
 * @param {string||number} target 删除用户指定频道
 * @returns promise
 */
export const delMychennel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
/**
 * 添加频道
 * @param {Number} id  频道的id
 * @param {Number} seq  添加的位置
 * @returns promise
 */
export const addMychennel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}

const TOUTIAO_PINGDAO = 'TOUTIAO_PINGDAO'
export const getMychennelsCal = () => storeage.get(TOUTIAO_PINGDAO)
export const setMychennelsCal = (chennel) =>
  storeage.set(TOUTIAO_PINGDAO, chennel)
