import AsyncComponent from '../utils/asyncComponent'

import {
    IntegralManage,
    IntegralDetail,
    IntegralRule,
} from '../pages/User/Integral'

const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const integralRouter = [
  {
    path: '/user/integral',
    component: SecondLevelComponent,
    pathName: 'integral',
    name: '积分管理',
    icon: 'dollar',
    redirect: '/user/integral/manage',
    children: [
      {
        path: '/user/integral/manage',
        pathName: 'integral-manage',
        component: IntegralManage,
        name: '积分列表',
      },
      {
        path: '/user/integral/detail',
        pathName: 'integral-detail',
        component: IntegralDetail,
        name: '积分详情',
        isHide: true,
      },
      {
        path: '/user/integral/rule',
        pathName: 'integral-rule',
        component: IntegralRule,
        name: '积分规则',
      },
    ]
  },
]


export default integralRouter