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
