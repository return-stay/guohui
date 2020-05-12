import AsyncComponent from '../utils/asyncComponent'

import { UserManage } from '../pages/User/Longhair'


const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const integralRouter = [
  {
    path: '/user/longhair',
    component: SecondLevelComponent,
    pathName: 'longhair',
    name: '用户管理',
    icon: 'user',
    redirect: '/user/longhair/user',
    children: [
      {
        path: '/user/longhair/user',
        pathName: 'longhair-user',
        component: UserManage,
        icon: 'team',
        name: '用户管理',
      }
    ]
  },
]


export default integralRouter