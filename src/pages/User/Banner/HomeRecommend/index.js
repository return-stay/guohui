import React from 'react'
import { Modal, message, Divider, Tabs } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
// import BannerAdd from './BannerAdd'
import Gimage from '../../../../common/Gimage'
import { RecommendDeleteRecommend, RecommendDownRecommend } from '../../../../config/api'
import '../index.less'
const { TabPane } = Tabs

class BannerManage extends React.Component {
  state = {
    isDetail: false,
    tabKey: '1',
    tabValue: '添加推荐',
    typeValue: 1,
    bannerType: 'carousel',
    urls: {
      list: '/recommend/search',
      listMethod: 'post',
    },
  }

  goGoodsRecycleBin = () => {
    this.props.history.push('/user/goods/recycleBin')
  }

  // url请求地址  content 提示文案  thenText 成功之后提示文案  data 参数
  modalToastRequest = ({ url, content, thenText, data, params, method }) => {
    const that = this
    
    Modal.confirm({
      content: content,
      onOk: () => {
        request({
          url: url,
          method: method || 'get',
          params: params,
          data: data,
        }).then(res => {
          if (res.code === 100) {
            message.success(thenText);
            that.tableSortingParameters();
          }
        }).catch((err) => {
          message.error(err.message)
        })
      }
    })
  }

  soldOut = (item) => {
    this.modalToastRequest({
      url: RecommendDownRecommend,
      content: '确定下线改推荐商品吗？',
      thenText: '下线成功',
      params: {
        idStr: item.id,
        token: localStorage.getItem('authed'),
      }
    })
  }

  delete = (item) => {
    this.modalToastRequest({
      url: RecommendDeleteRecommend,
      content: '确定删除改推荐商品吗？',
      thenText: '删除成功',
      params: {
        idStr: item.id,
        token: localStorage.getItem('authed'),
      }
    })
  }

  tabChange = (e) => {
    this.setState({
      tabKey: e,
      tabValue: '添加推荐',
      formType: 'add',
    })
  }

  successCallback = () => {
    this.setState({
      tabKey: '1',
      tabValue: '添加推荐'
    })
    this.tableChild.sortingParameters();
  }

  render() {
    const { urls, tabKey, tabValue } = this.state
    const _columns = (that) => {
      return [
        {
          title: '商品信息',
          key: 'productCover',
          width: 400,
          render(item) {
            return <div className="gl-table-th">
            <Gimage style={{ height: 30, marginRight: 4, display: 'inline-block' }} src={item.productCover} alt="图片" />
            <span className="gl-table-text">{item.productName}</span>
        </div>
          }
        },
        {
          title: '商品售价',
          key: 'productPrice',
          dataIndex: 'productPrice',
        },
        {
          title: '首页数据类型',
          key: 'modelType',
          dataIndex: 'modelType',
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
          render(status) {
            return (
              <span>{status === 1 ? '无效' : '有效'}</span>
            )
          }
        },
        {
          title: '权重',
          key: 'sort',
          dataIndex: 'sort',
        },
        {
          title: '操作人',
          key: 'operator',
          dataIndex: 'operator',
        },
        {
          title: '操作',
          key: 'action',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.soldOut(item) }}>下线</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.delete(item, 'open') }}>删除</span>

              </>
            )
          }
        }
      ]
    }

    const searchData = [
      { type: 'input', field: 'modelType', label: '推荐类型' },
      {
        type: 'select', field: 'state', width: '170px', label: '状态', placeholder: '请选择状态', list: [
          { id: 0, value: 0, label: '有效' },
          { id: 1, value: 1, label: '无效' },
        ]
      },
    ]
    return (
      <div className="om-box user-box">
        <div>
          <Tabs activeKey={tabKey} onChange={this.tabChange}>
            <TabPane tab="推荐列表" key="1">
              <GtableEdit
                urls={urls}
                rowKey={record => record.id}
                searchData={searchData}
                columns={_columns}
                bordered={false}
                isRowSelection={false}
                pagination={true}
                triggerRef={ref => { this.tableChild = ref }}
              />
            </TabPane>
            <TabPane tab={tabValue} key="2">
              
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default BannerManage