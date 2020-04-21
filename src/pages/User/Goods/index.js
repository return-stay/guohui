import AsyncComponent from '../../../utils/asyncComponent'
const AddGoods = AsyncComponent(() => import('./GoodsList/AddGoods')) //添加商品
const GoodsClassify = AsyncComponent(() => import('./GoodsClassify')) 
const BrandManage = AsyncComponent(() => import('./BrandManage'))
const CommentManage = AsyncComponent(() => import('./CommentManage'))
const CounselManage = AsyncComponent(() => import('./CounselManage'))
const GoodsList = AsyncComponent(() => import('./GoodsList')) //商品列表
const SortManage = AsyncComponent(() => import('./SortManage'))
const TypeManage = AsyncComponent(() => import('./TypeManage'))

const GoodsRecycleBin = AsyncComponent(() => import('./GoodsRecycleBin')) //商品回收站
const AuctionItemsUpload = AsyncComponent(()=> import('./AuctionItemsUpload')) //拍品上传
const GoodsInfo = AsyncComponent(()=> import('./GoodsInfo'))
export {
  AddGoods,
  BrandManage,
  CommentManage,
  CounselManage,
  GoodsClassify,
  GoodsList,
  SortManage,
  TypeManage,
  GoodsRecycleBin,
  AuctionItemsUpload,
  GoodsInfo,
}