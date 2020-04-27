import React from 'react'
import { Divider, Modal, Button, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import shopManageData from './shopManageData'
import { withRouter } from 'react-router-dom'
import { searchJoint } from '../../../../utils'
import request from '../../../../utils/request'
import BaseForm from '../../../../common/BaseForm'
import Gimage from '../../../../common/Gimage'
import { ShopStatus, ShopRecommendShop, ShopRecommendShopCancel } from '../../../../config/api'
import moment from 'moment'
const { confirm } = Modal;
class ShopManageTable extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '/shop/v1/list',
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
      shopId: id,
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
        shopId: item.merchantId,
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
          url: ShopStatus,
          method: 'post',
          data: {
            shopId: item.shopId,
            state: 3,
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
          key: 'merchantId',
          dataIndex: 'merchantId',
        },
        {
          title: '店铺logo',
          key: 'logo',
          dataIndex: 'logo',
          render(logo) {
            return <Gimage src={logo} style={{ height: 30 }} />
          }
        },
        {
          title: '店铺名称',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '店铺级别',
          key: 'type',
          dataIndex: 'type',
          render(type) {
            let str = ''
            switch (type) {
              case 0:
                str = '普通店铺'
                break;
              case 1:
                str = '优选店铺'
                break;
              case 2:
                str = '自营店铺'
                break;
              default:
                str = ''
            }
            return (<span>{str}</span>)
          }
        },
        {
          title: '店铺类型',
          key: 'attribute',
          dataIndex: 'attribute',
          render(shopType) {
            let text = (shopType === 0) ? '个人' : '企业'
            return <span>{text}</span>
          }
        },
        {
          title: '所属商户',
          key: 'key',
          dataIndex: 'merchantDTO',
          render(merchantDTO) {
            console.log(merchantDTO)
            let str = ''
            let strType = ''
            if (merchantDTO) {
              str = merchantDTO.name || merchantDTO.legalName
              strType = merchantDTO.attribute === 1 ? '企业' : '个人'
            }

            return (<span>{strType + ' ' + str}</span>)
          }
        },
        {
          title: '商品数量',
          key: 'productNum',
          dataIndex: 'productNum',
        },
        {
          title: '关注量',
          key: 'followerNum',
          dataIndex: 'followerNum',
        },
        {
          title: '审核状态',
          key: 'state',
          dataIndex: 'state',
          render(state) {
            let str = ''
            switch (state) {
              case 0:
                str = '待审核'
                break;
              case 1:
                str = '审核不通过'
                break;
              case 2:
                str = '审核通过'
                break;
              default:
                str = '删除'
            }
            return (<span>{str}</span>)
          }
        },
        {
          title: '操作',
          width: 200,
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.handleEdit(item.shopId) }}>编辑店铺</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.goodsManage(item) }}>商品管理</span>
                {
                  item.authLevel === 1 && (
                    <>
                      <Divider type="vertical" />
                      {
                        item.recommend === 0 ? <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.recommend(item, 'add') }}>推荐</span>
                          : <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.recommend(item, 'cancel') }}>取消推荐</span>
                      }
                    </>
                  )
                }
                {
                  item.state !== 3 && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.detele(item) }}>删除</span>
                  </>
                }

              </>
            )
          }
        }
      ]
    }
    const searchData = [
      { type: 'input', field: 'keyword', label: '店铺名称' },
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
        type: 'select', field: 'state', width: '170px', label: '店铺状态', placeholder: '请选择店铺状态', list: [
          { id: 0, value: 0, label: '待审核' },
          { id: 1, value: 1, label: '审核不通过' },
          { id: 2, value: 2, label: '审核通过' },
          { id: 3, value: 3, label: '删除' }
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