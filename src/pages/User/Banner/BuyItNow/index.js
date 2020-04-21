import React from 'react'
import { Modal, message, Divider, Tabs } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
import BuyItNowAdd from './BuyItNowAdd'
import Gimage from '../../../../common/Gimage'
import { RecommendDelete } from '../../../../config/api'
const { TabPane } = Tabs
const { confirm } = Modal;
class BuyItNow extends React.Component {
  state = {
    isDetail: false,
    tabKey: '1',
    tabValue: '新增一口价',
    bannerType: 'advert',
    urls: {
      list: '/recommend/search',
      listMethod: 'post',
    },
  }

  goGoodsRecycleBin = () => {
    this.props.history.push('/user/goods/recycleBin')
  }

  // url请求地址  content 提示文案  thenText 成功之后提示文案  data 参数
  modalToastRequest = ({ url, content, thenText, data, method }) => {
    const that = this
    Modal.confirm({
      content: content,
      onOk: () => {
        request({
          url: url,
          method: method || 'get',
          params: { md5Str: localStorage.getItem('authed') },
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

  checkDetail = (item) => {
    this.setState({
      tabKey: '2',
      tabValue: '编辑一口价',
      bannerid: item.id
    })
  }

  tabChange = (e) => {
    this.setState({
      tabKey: e,
      tabValue: '新增一口价',
      formType: 'add',
      bannerid: '',
    })
  }

  successCallback = () => {
    this.setState({
      tabKey: '1',
      tabValue: '新增一口价'
    })
    this.tableChild.sortingParameters();
  }

  closed = (item, type) => {
    let url = ''
    let modalText = '您确定要开启吗？开启后将展示此条数据。'
    const that = this
    if (type === 'close') {
      url = RecommendDelete
      modalText = '您确定要关闭吗？关闭后一口价模块将隐藏'
    }
    url = RecommendDelete
    confirm({
      title: '提示',
      content: modalText,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: {
            id: item.id,
          }
        }).then(res => {
          that.tableChild.sortingParameters();
        })
      },
    });
  }

  render() {
    const { urls, tabKey, tabValue, bannerid, bannerType } = this.state
    const _columns = () => {
      return [
        {
          title: '序号',
          key: 'key',
          dataIndex: 'key',
          render(key) {
            return (<span>{key + 1}</span>)
          }
        },
        {
          title: '一口价名称',
          key: 'title',
          dataIndex: 'title',
        },
        {
          title: '一口价图片',
          key: 'pic',
          dataIndex: 'pic',
          render(pic) {
            return <Gimage src={pic} alt="图片" style={{ maxHeight: '30px' }} />
          }
        },
        {
          title: '一口价类型',
          key: 'id',
          dataIndex: 'id',
          render() {
            let text = ''
            if (bannerType === 'advert') {
              text = '首页一口价'
            } else if (bannerType === 'mallAdvert') {
              text = '商城一口价'
            } else if (bannerType === 'carouse') {
              text = '首页轮播图'
            } else if (bannerType === 'mallCarousel') {
              text = '商城轮播图'
            } else if (bannerType === 'openImage') {
              text = '启动图'
            } else if (bannerType === 'popupImage') {
              text = '弹窗一口价'
            }
            return <span>{text}</span>
          }
        },
        {
          title: '一口价状态',
          key: 'status',
          dataIndex: 'status',
          render(status) {
            return (
              <span>{status === 1 ? '关闭' : '开启'}</span>
            )
          }
        },
        {
          title: '申请时间',
          key: 'createTime',
          dataIndex: 'createTime',
        },
        {
          title: '操作',
          key: 'action',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.checkDetail(item) }}>编辑</span>
                <Divider type="vertical" />
                {
                  item.status === 1 ?
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.closed(item, 'open') }}>开启</span>
                    :
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.closed(item, 'close') }}>关闭</span>
                }
              </>
            )
          }
        }
      ]
    }

    const searchData = [
      { type: 'input', field: 'title', label: '一口价名称', placeholder: '请输入名称' },
      {
        type: 'select', field: 'status', width: '170px', label: '状态', placeholder: '请选择状态', list: [
          { id: 0, value: 0, label: '开启' },
          { id: 1, value: 1, label: '关闭' },
        ]
      },
      { type: 'chooseTime', field: 'createTime', label: '创建时间', beginTime: 'startTime', EndTime: 'endTime' },
    ]
    return (
      <div className="om-box">
        <div>
          <Tabs activeKey={tabKey} onChange={this.tabChange}>
            <TabPane tab="一口价列表" key="1">

              <GtableEdit
                urls={urls}
                rowKey={record => record.id}
                searchData={searchData}
                columns={_columns}
                bordered={false}
                isRowSelection={false}
                pagination={true}
                query={{ modelType: 'yiKouJia' }}
                triggerRef={ref => { this.tableChild = ref }}
              />
            </TabPane>
            <TabPane tab={tabValue} key="2">
              {
                tabKey === '2' && <BuyItNowAdd triggerRef={ref => this.addChild = ref} successCallback={this.successCallback} bannerid={bannerid} />
              }

            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default BuyItNow