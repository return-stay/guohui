import React from 'react'
import { Divider, Modal, Button, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import shopManageData from './shopManageData'
import { withRouter } from 'react-router-dom'
import { searchJoint } from '../../../../utils'
import request from '../../../../utils/request'
import BaseForm from '../../../../common/BaseForm'
import { ShopDelete, ShopRecommendShop, ShopRecommendShopCancel } from '../../../../config/api'
import moment from 'moment'
const { confirm } = Modal;
class ShopManageTable extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '/shop/search',
        listMethod: 'post',
      },
      dataSource: shopManageData,
    }
  }

  handleAdd = () => {
    this.histroyPush({
      type: 'add',
    })
  }
  handleEdit = (id) => {
    this.histroyPush({
      type: 'edit',
      id: id,
    })
  }

  histroyPush = (params) => {
    this.props.history.push({
      pathname: '/user/shops/add',
      search: searchJoint(params)
    })
  }
  // 店铺商品管理
  goodsManage = (item) => {
    console.log(item)
    this.props.history.push({
      pathname: '/user/goods/list',
      search: searchJoint({
        shopId: item.shopId,
      })
    })
  }

  selectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys)
  }

  editCallback = (item) => {
    this.props.editCallback(item)
  }
  goShopWebPage = (e) => {
    let shopid = e.currentTarget.getAttribute('data-shopid')
    console.log(shopid)
  }

  goStoreList = (e) => {
    let shopid = e.currentTarget.getAttribute('data-shopid')
    console.log(shopid)

    this.props.history.push({ pathname: '/user/shops/store', query: { name: 'sunny' } })
  }

  checkShopInfo = (item, type) => {
    this.props.checkShopInfo(item, type)
  }
  // 经营类目
  businessCategory = (item) => {
    console.log(item)
  }
  // 冻结
  freeze = (item) => {
    confirm({
      title: '冻结店铺将导致商家无法登陆后台,商品会自动下架，请谨慎操作！',
      onOk() {
        console.log(item);
      },
    });
  }

  // 对比query 的参数是否改变
  isQueryChange = (nexQuery) => {
    let propsQuery = this.state.query || {}
    for (const key in nexQuery) {
      if (nexQuery[key] !== propsQuery[key]) {
        return true
      }
    }
    return false
  }

  formSearch = (e) => {
    console.log(e)
    if (this.isQueryChange(e)) {
      this.setState({
        query: e
      }, () => {
        e.startTime = e.startTime && moment(e.startTime).format('YYYY-MM-DD HH:mm:ss')
        e.endTime = e.endTime && moment(e.endTime).format('YYYY-MM-DD HH:mm:ss')
        e.pageNumber = 1
        this.tableChild.sortingParameters(e);
      })
    }
  }

  detele = (item) => {
    const that = this
    Modal.confirm({
      title: '确认',
      content: '您确认要删除此条数据吗？',
      onOk: () => {
        request({
          url: ShopDelete,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: {
            shopId: item.shopId,
            userId: 0
          }
        }).then(res => {
          if (res.code === 100) {
            message.success('删除成功')
            that.tableChild.sortingParameters();
          }
        })
      }
    })
  }
  // 推荐或者取消推荐
  recommend = (item, type) => {
    const that = this
    let url = ''
    if (type === 'add') {
      url = ShopRecommendShop
    } else {
      url = ShopRecommendShopCancel
    }
    request({
      url: url,
      method: 'post',
      params: {
        md5Str: localStorage.getItem('authed'),
        shopid: item.shopId,
        userid: '0',
      },
    }).then(res => {
      if (res.code === 100) {
        that.tableChild.sortingParameters();
      } else {
        message.error(res.message || '失败')
      }
    })
  }
  render() {
    let { urls } = this.state;
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '店铺编号',
          key: 'shopId',
          dataIndex: 'shopId',
        },
        {
          title: '店铺logo',
          key: 'shopLogo',
          dataIndex: 'shopLogo',
          render(shopLogo) {
            return <img src={shopLogo} style={{ width: 30 }} alt="图片" />
          }
        },
        {
          title: '店铺名称',
          key: 'shopName',
          dataIndex: 'shopName',
        },
        {
          title: '店铺级别',
          key: 'authLevel',
          dataIndex: 'authLevel',
          render(authLevel) {
            return (<span>{authLevel === 1 ? '优选' : '普通'}店铺</span>)
          }
        },
        {
          title: '店主名称',
          key: 'userName',
          dataIndex: 'userName',
        },
        {
          title: '店铺类型',
          key: 'shopType',
          dataIndex: 'shopType',
          render(shopType) {
            let text = (shopType === 0) ? '个人' : '企业'
            return <span>{text}</span>
          }
        },
        {
          title: '所属商户',
          key: 'merchantName',
          dataIndex: 'merchantName',
        },
        {
          title: '关注量',
          key: 'followerNum',
          dataIndex: 'followerNum',
        },
        {
          title: '申请时间',
          key: 'createTime',
          dataIndex: 'createTime',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.handleEdit(item.shopId) }}>编辑店铺</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.goodsManage(item) }}>商品管理</span>
                <Divider type="vertical" />
                {
                  item.authLevel === 1 && (
                    <>
                      {
                        item.recommend === 0 ? <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.recommend(item, 'add') }}>推荐</span>
                          : <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.recommend(item, 'cancel') }}>取消推荐</span>
                      }
                      <Divider type="vertical" />
                    </>
                  )
                }
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.detele(item) }}>删除</span>
              </>
            )
          }
        }
      ]
    }
    const searchData = [
      { type: 'input', field: 'shopName', label: '店铺信息' },
      { type: 'chooseTime', field: 'createTime', label: '创建时间', beginTime: 'startTime', EndTime: 'endTime' },
      {
        type: 'select', field: 'shopType', width: '170px', label: '类型', placeholder: '请选择店铺类型', list: [
          { id: 0, value: 0, label: '个人' },
          { id: 1, value: 1, label: '企业' }
        ]
      },
      {
        type: 'select', field: 'excellent', width: '170px', label: '店铺级别', placeholder: '请选择店铺级别', list: [
          { id: 0, value: 0, label: '普通' },
          { id: 1, value: 1, label: '优选' }
        ]
      },
      {
        type: 'select', field: 'available', width: '170px', label: '店铺状态', placeholder: '请选择店铺状态', list: [
          { id: 0, value: 0, label: '有效' },
          { id: 1, value: 1, label: '删除' }
        ]
      },
    ]

    return (
      <>
        <div style={{ padding: '10px' }}>
          <BaseForm data={searchData} handleSearch={this.formSearch} />
        </div>

        <Button icon="plus" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增
        </Button>
        <Button onClick={this.batchDelete} style={{ marginBottom: 16, marginLeft: 10 }}>
          批量操作
        </Button>
        <GtableEdit
          rowKey={record => record.shopId}
          triggerRef={ref => this.tableChild = ref}
          urls={urls}
          pagination={true}
          columns={_columns}
          editCallback={this.editCallback}
          selectChange={this.selectChange}
        />
      </>
    )
  }
}

export default withRouter(ShopManageTable)