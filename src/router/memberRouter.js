import AsyncComponent from '../utils/asyncComponent'

import {
  Affiliate,
  LabelManage,
  MemberSetting,
  MemberGrade,
  MemberPoints,
  IntegrationRule,
  Packet,
  PrepaidDepositManage,
  TrustTheLogin,
} from '../pages/User/Members'

const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const memberRouter = [
  {
    path: '/user/members',
    component: SecondLevelComponent,
    pathName: 'members',
    name: '会员',
    icon: 'sketch',
    redirect: '/user/members/setting',
    children: [
      {
        path: '/user/members/setting',
        pathName: 'members-setting',
        component: MemberSetting,
        name: '会员管理',
      },
      {
        path: '/user/members/packet',
        pathName: 'members-packet',
        component: Packet,
        name: '会员分组',
      },
      {
        path: '/user/members/label',
        pathName: 'members-label',
        component: LabelManage,
        name: '标签管理',
      },
      {
        path: '/user/members/affiliate',
        pathName: 'members-affiliate',
        component: Affiliate,
        name: '会员营销',
      },
      {
        path: '/user/members/points',
        pathName: 'members-points',
        component: MemberPoints,
        name: '会员积分',
      },
      {
        path: '/user/members/integrationRule',
        pathName: 'members-integration-rule',
        component: IntegrationRule,
        name: '积分规则',
      },
      {
        path: '/user/members/grade',
        pathName: 'members-grade',
        component: MemberGrade,
        name: '会员等级',
      },
      {
        path: '/user/members/login',
        pathName: 'members-login',
        component: TrustTheLogin,
        name: '信任登录',
      },
      {
        path: '/user/members/prepaidDepositManage',
        pathName: 'members-prepaid-deposit-manage',
        component: PrepaidDepositManage,
        name: '预存款管理',
      },
    ]
  }
]


export default memberRouter