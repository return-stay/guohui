import AsyncComponent from '../utils/asyncComponent'

import {
  DistributionSettings,
  DistributionsGoods,
  SalespersonManage,
  SalespersonGrade,
  DistributionsPerformance,
  CommissionWithdrawalManage,
} from '../pages/User/Distributions'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const distributionsRouter = [
  {
    path: '/user/distributions',
    component: SecondLevelComponent,
    pathName: 'distributions',
    name: '分销',
    icon: 'deployment-unit',
    redirect: '/user/distributions/setting',
    children: [
      {
        path: '/user/distributions/setting',
        pathName: 'distributions-setting',
        component: DistributionSettings,
        name: '分销设置',
      },
      {
        path: '/user/distributions/goods',
        pathName: 'distributions-goods',
        component: DistributionsGoods,
        name: '分销商品',
      },
      {
        path: '/user/distributions/salespersonManage',
        pathName: 'distributions-salesperson-manage',
        component: SalespersonManage,
        name: '销售员管理',
      },
      {
        path: '/user/distributions/salespersonGrade',
        pathName: 'distributions-salesperson-grade',
        component: SalespersonGrade,
        name: '销售员等级',
      },
      {
        path: '/user/distributions/distributionsPerformance',
        pathName: 'distributions-distributions-performance',
        component: DistributionsPerformance,
        name: '分销业绩',
      },
      {
        path: '/user/distributions/commissionWithdrawalManage',
        pathName: 'distributions-commission-withdrawal-manage',
        component: CommissionWithdrawalManage,
        name: '佣金提现管理',
      },
    ]
  },
]


export default distributionsRouter