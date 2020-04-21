import AsyncComponent from '../utils/asyncComponent'

import {
  DealComplaint,
  DealEvaluate,
  DealSetting,
  ExpressOrderTemplate,
  InvoiceManage,
  OrderManage,
  Payment,
  RefundManage,
  SalesReturnManage,
  VerificationCodeLog,
  OrderDetail
} from '../pages/User/Deals'

const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const dealsRouter = [
  {
    path: '/user/deals',
    component: SecondLevelComponent,
    pathName: 'deals',
    name: '订单管理',
    icon: 'swap',
    redirect: '/user/deals/order',
    children: [
      {
        path: '/user/deals/order',
        pathName: 'order-manage',
        component: OrderManage,
        name: '订单管理',
        icon: 'profile',
      },
      {
        path: '/user/deals/refundManage',
        pathName: 'refund-manage',
        component: RefundManage,
        name: '退款处理',
        isHide: true,
      },
      {
        path: '/user/deals/salesReturn',
        pathName: 'deals-sales-return-manage',
        component: SalesReturnManage,
        name: '退货处理',
        isHide: true,
      },
      {
        path: '/user/deals/evaluate',
        pathName: 'deals-evaluate',
        component: DealEvaluate,
        name: '交易评价',
        isHide: true,
      },
      {
        path: '/user/deals/complaint',
        pathName: 'deals-complaint',
        component: DealComplaint,
        name: '交易投诉',
        isHide: true,
      },
      {
        path: '/user/deals/payment',
        pathName: 'payment',
        component: Payment,
        name: '支付方式',
        isHide: true,
      },
      {
        path: '/user/deals/expressOrderTemplate',
        pathName: 'deals-express-rder-template',
        component: ExpressOrderTemplate,
        name: '快递单模板',
        isHide: true,
      },
      {
        path: '/user/deals/setting',
        pathName: 'deals-setting',
        component: DealSetting,
        name: '交易设置',
        isHide: true,
      },
      {
        path: '/user/deals/invoiceManage',
        pathName: 'deals-invoice-manage',
        component: InvoiceManage,
        name: '发票管理',
        isHide: true,
      },
      {
        path: '/user/deals/verificationCodeLog',
        pathName: 'deals-verification-code-log',
        component: VerificationCodeLog,
        name: '核销码记录',
        isHide: true,
      },
      {
        path: '/user/deals/orderDetail',
        pathName: 'deals-order-detail',
        component: OrderDetail,
        name: '订单详情',
        isHide: true,
      },
    ]
  },
]


export default dealsRouter