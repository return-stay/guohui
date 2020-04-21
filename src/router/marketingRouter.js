import AsyncComponent from '../utils/asyncComponent'


import {
  MessageManage,
} from '../pages/User/Marketings'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))
const marketingRouter = [
  {
    path: '/user/marketing',
    component: SecondLevelComponent,
    pathName: 'marketings',
    name: '营销',
    icon: 'notification',
    redirect: '/user/marketing/message',
    children: [
      {
        path: '/user/marketing/message',
        pathName: 'marketing-message',
        component: MessageManage,
        name: '消息管理',
        icon: 'message'
      },
    ]
  },
]


export default marketingRouter