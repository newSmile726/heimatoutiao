import request from '@/utils/request'
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
