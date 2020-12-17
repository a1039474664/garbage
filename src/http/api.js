/* 
 * 接口统一集成模块
 */
import * as garbage from './moudules/garbage'
import * as history from './moudules/history'
import * as user from './moudules/user'
import * as tGcCustomerService from './moudules/tGcCustomerService'

// 默认全部导出
export default {
  garbage,
  history,
  user,
  tGcCustomerService
}
