import AsyncComponent from '../utils/asyncComponent'

import {
  SiteSetting,
  Admin,
  PermissionGroup,
  MessageSetting,
  EnterSetting,
  ULog,
  AreaManage,
  ServiceSetting } from '../pages/User/Systems'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const systemsRouter = [
  {
    path: '/user/systems',
    component: SecondLevelComponent,
    pathName: 'systems',
    name: '系统',
    icon: 'setting',
    redirect: '/user/systems/site',
    children: [
      {
        path: '/user/systems/site',
        pathName: 'systems-site',
        component: SiteSetting,
        name: '站点设置',
      },
      {
        path: '/user/systems/admin',
        pathName: 'systems-admin',
        component: Admin,
        name: '管理员',
      },
      {
        path: '/user/systems/permissionGroup',
        pathName: 'systems-permission-group',
        component: PermissionGroup,
        name: '权限组',
      },
      {
        path: '/user/systems/ulog',
        pathName: 'systems-ulog',
        component: ULog,
        name: '操作日志',
      },
      {
        path: '/user/systems/message',
        pathName: 'systems-message',
        component: MessageSetting,
        name: '消息设置',
      },
      {
        path: '/user/systems/enter',
        pathName: 'systems-enter',
        component: EnterSetting,
        name: '入驻设置',
      },
      {
        path: '/user/systems/area',
        pathName: 'systems-area',
        component: AreaManage,
        name: '区域管理',
      },
      {
        path: '/user/systems/service',
        pathName: 'systems-service',
        component: ServiceSetting,
        name: '客服设置',
      },
    ]
  },
]


export default systemsRouter