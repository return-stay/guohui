import React from 'react'
import { Divider, Modal, message } from 'antd'
import {withRouter} from 'react-router-dom'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
import Gimage from '../../../../common/Gimage'
import { ProductCheckState } from '../../../../config/api'
// 商品回收站
class GoodsRecycleBin extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '/product/v1/search',
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

  checkDetiai = (item) => {
    this.props.history.push('/user/goods/info?id=' + item.productId)
  }

  // 商品上架或下架
  onoroffShelves = (item, type) => {
    let url = ''
    let content = ''
    let thenText = ''
    let state = 0
    if (type === 'off') {
      url = ProductCheckState
      content = '确认要下架该商品吗？'
      thenText = '下架成功'
      state = 2
    } else {
      url = ProductCheckState
      content = '确认上架该商品吗？'
      thenText = '上架成功'
      state = 1
    }
    let data = {
      state: state,
      productId: item.productId,
      operator: 'admin'
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
          width: 300,
          render(item) {
            return (
              <div className="gl-table-th">
                <Gimage style={{ height: 30, marginRight: 4, display: 'inline-block' }} src={item.coverImage} alt="图片" />
                <span className="gl-table-text">{item.productName}</span>
              </div>
            )
          }
        },
        {
          title: "商品主标签",
          key: 'majorLabels',
          dataIndex: 'majorLabels',
          width: 100,
          render(majorLabels) {
            let str = majorLabels.join("/")
            return <span>{str}</span>
          }
        },
        {
          title: '类目',
          key: 'categoryOneName',
          dataIndex: 'categoryOneName',
          width: 100,
          render(categoryOneName) {
            return <span>{categoryOneName}</span>
          }
        },
        {
          title: '库存',
          key: 'pstock',
          width: 100,
          dataIndex: 'pstock',
        },
        {
          title: '商品单位',
          key: 'unit',
          dataIndex: 'unit',
          width: 100,
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
          width: 100,
          render(status) {
            let str = ''
            switch (status) {
              case 0:
                str = '待上架'
                break;
              case 1:
                str = '以上架'
                break;
              case 2:
                str = '以下架'
                break;
              default:
                str = '删除'
            }
            return <span>{str}</span>
          }
        },
        {
          title: '创建时间',
          key: 'createTimeStr',
          dataIndex: 'createTimeStr',
          width: 200,
        },

        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 300,
          render: (item) => {
            const spanStyle = { color: '#1890ff', cursor: 'pointer' }
            return (
              <>
                <span style={spanStyle} onClick={() => { this.checkDetiai(item) }}>查看详情</span>
                <Divider type="vertical" />
                <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'on')}>上架</span>
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
          query={{ state: 3 }}
          columns={_columns}
          pagination={true}
        />
      </div>
    )
  }
}


export default withRouter(GoodsRecycleBin)