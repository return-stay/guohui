import AsyncComponent from '../../../utils/asyncComponent'

const ShopManage = AsyncComponent(() => import('./ShopManage'))
const ShopDetail = AsyncComponent(()=> import('./ShopManage/ShopDetail'))
const AddShop = AsyncComponent(()=> import('./ShopManage/AddShop'))
const InTheAudit = AsyncComponent(()=> import('./ShopManage/InTheAudit'))
const SetMeal = AsyncComponent(() => import('./SetMeal'))
const StoreManage = AsyncComponent(() => import('./StoreManage'))

const PeripheryStoreSetting = AsyncComponent(() => import('./PeripheryStoreSetting'))
const VdianManage = AsyncComponent(() => import('./VdianManage'))
const FinancialManage = AsyncComponent(() => import('./FinancialManage'))
const SecurityFundManage = AsyncComponent(() => import('./SecurityFundManage'))
const MerchantsWithdrawalManage = AsyncComponent(() => import('./MerchantsWithdrawalManage'))


export {
  ShopManage,
  ShopDetail,
  AddShop,
  InTheAudit,
  SetMeal,
  StoreManage,
  PeripheryStoreSetting,
  VdianManage,
  FinancialManage,
  SecurityFundManage,
  MerchantsWithdrawalManage,
}