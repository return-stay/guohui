import baseURL from '../utils/baseUrl'

const ImageApi = 'https://' // 图片资源
const RequestApi = '' //接口路径

//上传文件路径 http://39.97.231.232:8805/attachment/upload/image
// http://39.97.231.232:8806/file/upload
// const UploadApi = 'http://39.97.231.232:8806/attachment/upload/image'
const UploadApi = baseURL + '/common/upload'
const UploadRemove = '/attachment/remove'

const Login = '/sso/login'; //登录接口

const QueryByOwenerIdAndOwnerType = '/api/productCategory/listByParentId'; //获取商户支持的支付方式

const CategoryFindAllCate = '/cate/queryCate' //商品类目GET /category/findAllCate
const CateAddCate = '/cate/addCate' //商品类目添加
const CateUpdateCate = '/cate/updateCate' //删除类目
const CateUpDownCate= '/cate/upDownCate' //类目上下线

const CategoryFindAllCateId = '/cate/queryCate' //商品类目

const LogisticsList = '/common/logistics/search' //获取物流公司
const ShipDetail = '/ship/v1/detail' //物流详情

const CategoryQueryProductTypeAttributes =  '/category/queryProductTypeAttributes' //根据类目查询商品属性
const CategoryQueryProductIdAttributes = '/category/queryProductIdAttributes' //根据id 查询数据


// 控制台数据
const ConsoleDeskQueryCalDataCenter = '/data/center'
const ConsoleDeskQueryCalDataOrder = '/data/mouthOrder' //控制台订单数据
const DataHotUser = '/data/hotUser' //热门用户
const DataHotProduct = '/data/hotProduct' //热门商品
const ConsoleDeskQueryOrderMap = '/data/regionOrder'
// 商品管理相关接口
const ProductAdd = '/product/v1/add' //商品添加
const ProductList = 'product/search'
const ProductDetail = '/product/v1/detail' //商品详情
const ProductUpdate = '/product/v1/update' //更新商品
const ProductspecDelete = '/productspec/delete' //删除
const DeleteSku = '/product/v1/deleteSku' // 删除sku
const ProductCheckState = '/product/v1/checkState'
const ProductBatchDeleteSpec = '/product/batchDeleteSpec' //批量删除商品规格
const ProductUpDownSku = '/product/v1/upDownSku' //sku上下架
const ProductOnSpec = '/product/onSpec' //上架
const ProductOffSpec = '/product/offSpec' //下架
const ProductBatchOffSpec = '/product/batchOffSpec' //批量下架
const ProductBatchOnSpec = '/product/batchOnSpec' //批量上架

// 商铺相关接口
const ShopAdd = '/shop/v1/add' //添加商铺
const ShopDelete = '/shop/delete' //删除商铺
const ShopDetial = '/shop/v1/info' //商铺详情
const ShopSearch = '/shop/v1/list' //商铺列表 搜索商铺
const ShopUpdate = '/shop/v1/edit' //更新商铺
const ShopStatus = '/shop/v1/status'
const ShopRecommendShop = '/shop/recommendShop' //推荐店铺
const ShopRecommendShopCancel = '/shop/recommendShopCancel' //取消店铺推荐

// 订单相关接口
const OrderAgree = '/order/agree' // 同意退款
const OrderDelivery = '/order/v1/deliver' // 发货
const OrderMainDetail = '/order/v1/mainDetail' //主订单详情 
const OrderDetailApi = '/order/v1/detail' // 子订单订单详情
const OrderReject = '/order/reject' // 拒绝退款
const OrderDelete = '/order/v1/delete' //删除订单
const OrderCancel = '/order/v1/cancel' //取消订单

// 商户管理
const MerchantAuditReject  = '/merchant/audit/reject' //不通过审核
const MerchantAuditPass = '/merchant/audit/pass' //通过审核
const MerchantBatchDel = '/merchant/batch/del' // 批量删除
const MerchantDetail = '/merchant/detail' // 商户详情


//消息
const AddMessage = '/message/add' //消息添加
const MessageDetail = '/message/detail' //消息详情

//广告
const ConfigAdd = '/config/add'  //广告添加
const ConfigDelete = '/config/delete' //删除配置
const ConfigDetail = '/config/detail' //广告详情
const ConfigUpdate = 'config/update' //更新配置

const RecommendDeleteRecommend = '/recommend/deleteRecommend' //删除推荐商品
const RecommendDownRecommend = '/recommend/downRecommend' //下线推荐商品
const RecommendConfigRecommendProduct = '/recommend/configRecommendProduct' //添加推荐商品

// 一口价
const RecommendAdd = '/recommend/add' // 推荐数据添加
const RecommendDetail = '/recommend/detail' //推荐数据详情
const RecommendUpdate = '/recommend/update' //更新推荐数据
const RecommendDelete = '/recommend/delete' //删除推荐数据

const AuctionGetHouseSateList = '/auction/getHouseSateList' //获取专场列表

// 用户管理
const UserSetUserLabel = '/user/v1/addTag'

// 设置
const UpgradeAdd = '/grade/add'

export {
  ImageApi,
  RequestApi,
  UploadApi,
  UploadRemove,
  Login,
  LogisticsList,
  ShipDetail,
  QueryByOwenerIdAndOwnerType,

  ConsoleDeskQueryCalDataCenter,
  ConsoleDeskQueryCalDataOrder,
  DataHotUser,
  DataHotProduct,
  ConsoleDeskQueryOrderMap,

  CategoryFindAllCate,
  CateAddCate,
  CateUpdateCate,
  CateUpDownCate,
  CategoryFindAllCateId,
  CategoryQueryProductTypeAttributes,
  CategoryQueryProductIdAttributes,

  ProductAdd,
  ProductList,
  ProductUpdate,
  ProductDetail,
  ProductBatchDeleteSpec,
  ProductUpDownSku,
  ProductspecDelete,
  DeleteSku,
  ProductCheckState,
  ProductOnSpec,
  ProductOffSpec,
  ProductBatchOffSpec,
  ProductBatchOnSpec,

  ShopAdd,
  ShopDelete,
  ShopDetial,
  ShopSearch,
  ShopUpdate,
  ShopStatus,
  ShopRecommendShop,
  ShopRecommendShopCancel,

  OrderAgree,
  OrderDelivery,
  OrderMainDetail,
  OrderDetailApi,
  OrderReject,
  OrderDelete,
  OrderCancel,

  MerchantAuditReject,
  MerchantAuditPass,
  MerchantBatchDel,
  MerchantDetail,

  AddMessage,
  MessageDetail,

  ConfigAdd,
  ConfigDelete,
  ConfigDetail,
  ConfigUpdate,
  RecommendDeleteRecommend,
  RecommendDownRecommend,
  RecommendConfigRecommendProduct,

  RecommendAdd,
  RecommendDetail,
  RecommendUpdate,
  RecommendDelete,
  AuctionGetHouseSateList,

  UserSetUserLabel,

  UpgradeAdd,
}