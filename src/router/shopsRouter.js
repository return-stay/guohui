import AsyncComponent from '../utils/asyncComponent'
import {
  ShopManage,
  ShopDetail,
  InTheAudit,
  SetMeal,
  StoreManage,
  PeripheryStoreSetting,
  VdianManage,
  FinancialManage,
  SecurityFundManage,
  MerchantsWithdrawalManage,
  AddShop,
} from '../pages/User/Shops'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const shopsRouter = [
  {
    path: '/user/shops',
    component: SecondLevelComponent,
    pathName: 'shops',
    name: '商户管理',
    icon: 'shop',
    redirect: '/user/shops/manage',
    children: [
      {
        path: '/user/shops/manage',
        pathName: 'shops-manage',
        component: ShopManage,
        name: '店铺管理',
        icon: 'shop',
      },
      {
        path: '/user/shops/InTheAudit',
        pathName: 'in-the-audit',
        component: InTheAudit,
        name: '入驻审核',
        icon: 'safety-certificate',
      },
      {
        path: '/user/shops/detail',
        pathName: 'shops-detail',
        component: ShopDetail,
        name: '店铺详情',
        isHide: true,
      },
      {
        path: '/user/shops/add',
        pathName: 'shops-add',
        component: AddShop,
        name: '新增店铺',
        isHide: true,
      },
      {
        path: '/user/shops/setMeal',
        pathName: 'shops-set-meal',
        component: SetMeal,
        name: '店铺套餐',
        isHide: true,
      },
      {
        path: '/user/shops/store',
        pathName: 'shops-store',
        component: StoreManage,
        name: '门店管理',
        isHide: true,
      },
      {
        path: '/user/shops/peripheryStore',
        pathName: 'shops-periphery-store',
        component: PeripheryStoreSetting,
        name: '周边门店管理',
        isHide: true,
      },
      {
        path: '/user/shops/vdian',
        pathName: 'shops-vdian',
        component: VdianManage,
        name: '微店管理',
        isHide: true,
      },
      {
        path: '/user/shops/financial',
        pathName: 'shops-financial',
        component: FinancialManage,
        name: '财务管理',
        isHide: true,
      },
      {
        path: '/user/shops/securityFund',
        pathName: 'shops-security-fund',
        component: SecurityFundManage,
        name: '保证金管理',
        isHide: true,
      },
      {
        path: '/user/shops/merchantsWithdrawal',
        pathName: 'shops-merchants-withdrawal',
        component: MerchantsWithdrawalManage,
        name: '商家提现管理',
        isHide: true,
      },
    ]
  },
]


export default shopsRouter