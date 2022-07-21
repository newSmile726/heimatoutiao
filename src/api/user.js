// 用户模块请求封装
import request from '@/utils/request'
/**
 *  登录验证
 * @param {string} mobile  手机号
 * @param {string} code   验证码
 * @returns  promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 * 短信验证
 * @param {String} mobile 手机号
 * @returns promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户个人信息
 * @returns promise
 */
export const getUserInMy = () => {
  return request({
    url: '/v1_0/user'
    // headers: { Authorization: `Bearer ${store.state.user.token}` }
  })
}
/**
 *  关注用户
 * @param {string} id  用户的id
 * @returns  promise
 */
export const followUsers = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
/**
 *  取消关注用户
 * @param {string} id 用户id
 * @returns  promise
 */
export const cancelFollowing = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}
