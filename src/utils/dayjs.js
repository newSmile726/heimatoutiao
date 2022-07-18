// 配置显示时间格式
import dayjs from 'dayjs'
// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// 引入中文包，默认是英文的
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用

export default dayjs
