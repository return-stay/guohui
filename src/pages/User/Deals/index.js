import AsyncComponent from '../../../utils/asyncComponent'


const OrderManage  = AsyncComponent(()=> import('./OrderManage'))
const OrderDetail = AsyncComponent(()=> import('./OrderManage/OrderDetail'))
const DealComplaint =  AsyncComponent(()=> import('./DealComplaint'))
const DealEvaluate =  AsyncComponent(()=> import('./DealEvaluate'))
const DealSetting =  AsyncComponent(()=> import('./DealSetting'))
const ExpressOrderTemplate =  AsyncComponent(()=> import('./ExpressOrderTemplate'))
const InvoiceManage=  AsyncComponent(()=> import('./InvoiceManage'))
const Payment =  AsyncComponent(()=> import('./Payment'))
const RefundManage =  AsyncComponent(()=> import('./RefundManage'))
const SalesReturnManage =  AsyncComponent(()=> import('./SalesReturnManage'))
const VerificationCodeLog =  AsyncComponent(()=> import('./VerificationCodeLog'))

export {
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
  OrderDetail,
}