import AsyncComponent from '../../../utils/asyncComponent'

const MemberSetting = AsyncComponent(() => import('./MemberSetting'))
const Affiliate = AsyncComponent(() => import('./Affiliate'))
const LabelManage = AsyncComponent(() => import('./LabelManage'))
const MemberGrade = AsyncComponent(() => import('./MemberGrade'))
const MemberPoints = AsyncComponent(() => import('./MemberPoints'))
const IntegrationRule = AsyncComponent(() => import('./IntegrationRule'))
const Packet = AsyncComponent(() => import('./Packet'))
const PrepaidDepositManage = AsyncComponent(() => import('./PrepaidDepositManage'))
const TrustTheLogin = AsyncComponent(() => import('./TrustTheLogin'))


export {
  MemberSetting,
  Affiliate,
  LabelManage,
  MemberGrade,
  MemberPoints,
  IntegrationRule,
  Packet,
  PrepaidDepositManage,
  TrustTheLogin,
}