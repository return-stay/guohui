import AsyncComponent from '../../../utils/asyncComponent'

const SiteSetting = AsyncComponent(() => import('./SiteSetting'))
const Admin = AsyncComponent(() => import('./Admin'))

const PermissionGroup = AsyncComponent(() => import('./PermissionGroup'))
const ULog = AsyncComponent(() => import('./ULog'))
const MessageSetting = AsyncComponent(() => import('./MessageSetting'))
const EnterSetting = AsyncComponent(() => import('./EnterSetting'))
const AreaManage = AsyncComponent(() => import('./AreaManage'))
const ServiceSetting = AsyncComponent(() => import('./ServiceSetting'))

export {
  SiteSetting,
  Admin,
  PermissionGroup,
  MessageSetting,
  EnterSetting,
  ULog,
  AreaManage,
  ServiceSetting,
}