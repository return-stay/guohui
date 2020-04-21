import AsyncComponent from '../../../utils/asyncComponent'

const DistributionSettings = AsyncComponent(() => import('./DistributionSettings'))
const DistributionsGoods = AsyncComponent(() => import('./DistributionsGoods'))
const SalespersonManage = AsyncComponent(() => import('./SalespersonManage'))
const SalespersonGrade = AsyncComponent(() => import('./SalespersonGrade'))
const DistributionsPerformance = AsyncComponent(() => import('./DistributionsPerformance'))
const CommissionWithdrawalManage = AsyncComponent(() => import('./CommissionWithdrawalManage'))
export {
  DistributionSettings,
  DistributionsGoods,
  SalespersonManage,
  SalespersonGrade,
  DistributionsPerformance,
  CommissionWithdrawalManage,
}