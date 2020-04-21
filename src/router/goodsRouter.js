import AsyncComponent from '../utils/asyncComponent'
import { GoodsList, BrandManage, CommentManage, CounselManage, TypeManage, AddGoods, GoodsRecycleBin, AuctionItemsUpload, GoodsInfo } from '../pages/User/Goods'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const SortManage = AsyncComponent(() => import('../pages/User/Goods/SortManage'))


const goodsRouter = [
  {
    path: '/user/goods',
    component: SecondLevelComponent,
    pathName: 'goods',
    name: '商品管理',
    icon: 'shopping',
    redirect: '/user/goods/list',
    children: [
      // {
      //   path: '/user/goods/classify',
      //   pathName: 'goods-classify',
      //   component: GoodsClassify,
      //   name: '产品分类',
      // },
      {
        path: '/user/goods/list',
        pathName: 'goods-list',
        icon: 'shopping',
        component: GoodsList,
        name: '商品列表',
      },
      {
        path: '/user/goods/info',
        pathName: 'goods-info',
        component: GoodsInfo,
        name: '商品详情',
        isHide: true,
      },
      {
        path: '/user/goods/brandManage',
        pathName: 'goods-brandManage',
        component: BrandManage,
        name: '品牌管理',
        isHide: true,
      },
      {
        path: '/user/goods/sortManage',
        pathName: 'goods-sortManage',
        component: SortManage,
        name: '分类管理',
        icon:'appstore',
        isHide: false,
      },
      {
        path: '/user/goods/typeManage',
        pathName: 'goods-typeManage',
        component: TypeManage,
        icon: 'bars',
        name: '属性管理',
        isHide: false,
      },
      {
        path: '/user/goods/counselManage',
        pathName: 'goods-counselManage',
        component: CounselManage,
        name: '咨询管理',
        icon: 'customer-service',
        isHide: true,
      },
      {
        path: '/user/goods/commentManage',
        pathName: 'goods-commentManage',
        component: CommentManage,
        name: '评论管理',
        isHide: true,
      },
      {
        path: '/user/goods/recycleBin',
        pathName: 'add-recycle-bin',
        component: GoodsRecycleBin,
        name: '商品回收站',
        icon: 'delete',
      },
      {
        path: '/user/goods/auctionItemsUpload',
        pathName: 'auction-items-upload',
        component: AuctionItemsUpload,
        name: '拍品上传',
        isHide: true,
      },
      // 不显示菜单栏
      {
        path: '/user/goods/add',
        pathName: 'add-goods',
        component: AddGoods,
        name: '添加商品',
        isHide: true,
      },
    ]
  },
]


export default goodsRouter