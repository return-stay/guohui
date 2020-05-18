import AsyncComponent from '../utils/asyncComponent'

import {
  Upgrade, } from '../pages/User/Settings'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const settingRouter = [
  {
    path: '/user/setting',
    component: SecondLevelComponent,
    pathName: 'setting',
    name: '设置',
    icon: 'setting',
    redirect: '/user/setting/upgrade',
    children: [
      {
        path: '/user/setting/upgrade',
        pathName: 'setting-upgrade',
        component: Upgrade,
        name: '升级系统',
      },
    ]
  },
]


export default settingRouter