import React from 'react'
import { Divider, Modal, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'

import { ProductOnSpec } from '../../../../config/api'
// 商品回收站
export default class GoodsRecycleBin extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '/product/search',
        listMethod: 'POST',
        add: '',
        edit: '',
        delete: '',
      },
    }
  }

  edit = (item) => {
    this.props.history.push('/user/goods/add?id=' + item.productId)
  }

  detail = (item) => {
    this.props.history.push('/user/goods/info?id=' + item.productId)
  }

  // 商品上架或下架
  onoroffShelves = (item) => {
    let url = ProductOnSpec
    let content = '确认上架该商品吗？'
    let thenText = '上架成功'
    let data = {
      productSpecId: item.productSpecId,
      productId: item.productId,
      userId: 0
    }
    this.modalToastRequest({
      url,
      content,
      thenText,
      data,
    })
  }

  modalToastRequest = ({ url, content, thenText, data }) => {
    const that = this
    Modal.confirm({
      content: content,
      onOk: () => {
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: data,
        }).then(res => {
          if (res.code === 100) {
            message.success(thenText);
            that.tableChild.sortingParameters();
          } else {
            message.error(res.message)
          }
        })
      }
    })
  }
  render() {

    let { urls } = this.state;
    const _columns = (that) => {
      return [
        {
          title: '商品信息',
          key: 'productName',
          dataIndex: 'productName',
        },
        {
          title: '类目',
          key: 'key',
          dataIndex: 'key',
        },
        {
          title: '现价',
          key: 'currentPrice',
          dataIndex: 'currentPrice',
        },
        {
          title: '原价',
          key: 'originalPrice',
          dataIndex: 'originalPrice',
        },
        {
          title: '会员价',
          key: 'memberPrice',
          dataIndex: 'memberPrice',
        },
        {
          title: '库存',
          key: 'stock',
          dataIndex: 'stock',
        },
        {
          title: '销量',
          key: 'SeniorsaleCountsity1',
          dataIndex: 'saleCounts',
        },
        {
          title: '状态',
          key: 'style',
          dataIndex: 'saleCounts',
        },
        {
          title: '创建时间',
          key: 'create',
          dataIndex: 'saleCounts',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.edit(item) }}>编辑</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this.detail(item)}>查看详情</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this.onoroffShelves(item, 'on')}>上架</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { that.handleDelete(e, item) }}>删除</span>
              </>
            )
          }
        }
      ]
    }
    return (
      <div>
        <GtableEdit
          rowKey={record => record.productSpecId}
          triggerRef={ref => { this.tableChild = ref }}
          isRowSelection={false}
          urls={urls}
          query={{ deleted: 1 }}
          columns={_columns}
          pagination={true}
        />
      </div>
    )
  }
}