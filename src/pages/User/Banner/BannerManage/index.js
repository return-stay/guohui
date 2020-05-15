import React from 'react'
import { Modal, message, Divider, Tabs } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
import BannerAdd from './BannerAdd'
import Gimage from '../../../../common/Gimage'
import { ConfigDelete } from '../../../../config/api'
const { TabPane } = Tabs
class BannerManage extends React.Component {
  state = {
    isDetail: false,
    tabKey: '1',
    tabValue: '新增广告',
    typeValue: 1,
    bannerType: 'carousel',
    urls: {
      list: '/config/search',
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
      tabValue: '编辑广告',
      bannerid: item.id
    })
  }

  tabChange = (e) => {
    this.setState({
      tabKey: e,
      tabValue: '新增广告',
      formType: 'add',
      bannerid: '',
    })
  }

  successCallback = () => {
    this.setState({
      tabKey: '1',
      tabValue: '新增广告'
    })

    this.tableChild.sortingParameters();
  }

  closed = (item, type) => {
    const that = this
    let url = ''
    let actionType = 0
    let contentText = '确定开启吗？'
    if (type === 'close') {
      url = ConfigDelete
      actionType = 1
      contentText = '确定关闭吗？'
    }
    url = ConfigDelete
    Modal.confirm({
      title: '提示',
      content: contentText,
      onOk() {
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: {
            id: item.id,
            type: actionType,
            userId: 0,
          }
        }).then(res => {
          if (res.code === 100) {
            message.success(type === 'close' ? '关闭成功' : '开启成功')
            that.tableChild.sortingParameters();
          }
        })
      }
    })
  }

  onRadioChange = (e) => {
    let value = e.target.value

    let bannerType = ''
    // 轮播=carousel,金刚区=diamond,卡片区=card,广告位=advert
    switch (value) {
      case 1:
        bannerType = 'advert'
        break;
      case 2:
        bannerType = 'mallAdvert'
        break;
      case 3:
        bannerType = 'carouse'
        break;
      case 4:
        bannerType = 'mallCarousel'
        break;
      case 5:
        bannerType = 'openImage'
        break;
      case 6:
        bannerType = 'popupImage'
        break;
      default:
        bannerType = ''
    }

    this.setState({
      typeValue: value,
      bannerType,
    }, () => {
      this.tableChild.sortingParameters();
    })
  }

  render() {
    const { urls, tabKey, tabValue, bannerid, typeValue, bannerType } = this.state
    const _columns = (that) => {
      let obj = []

      if (typeValue === 3 || typeValue === 4) {
        obj = [
          {
            title: '开始时间',
            key: 'startTime',
            dataIndex: 'startTime',
          },
          {
            title: '结束时间',
            key: 'endTime',
            dataIndex: 'endTime',
          },
        ]
      }
      return [
        {
          title: '广告名称',
          key: 'title',
          dataIndex: 'title',
        },
        {
          title: '广告图片',
          key: 'pic',
          dataIndex: 'pic',
          render(pic) {
            return <Gimage src={pic} alt="图片" style={{ height: 30 }} />
          }
        },
        {
          title: '广告类型',
          key: 'id',
          dataIndex: 'id',
          render() {
            let text = ''
            if (bannerType === 'advert') {
              text = '首页广告'
            } else if (bannerType === 'mallAdvert') {
              text = '商城广告'
            } else if (bannerType === 'carouse') {
              text = '首页轮播图'
            } else if (bannerType === 'mallCarousel') {
              text = '商城轮播图'
            } else if (bannerType === 'openImage') {
              text = '启动图'
            } else if (bannerType === 'popupImage') {
              text = '弹窗广告'
            }
            return <span>{text}</span>
          }
        },
        {
          title: '广告状态',
          key: 'status',
          dataIndex: 'status',
          render(status) {
            return (
              <span>{status === 1 ? '关闭' : '开启'}</span>
            )
          }
        },
        ...obj,
        {
          title: '权重',
          key: 'sort',
          dataIndex: 'sort',
        },
        {
          title: '点击次数',
          key: 'count',
          dataIndex: 'count',
        },
        {
          title: '操作',
          key: 'action',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.checkDetail(item) }}>编辑广告</span>
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
      { type: 'input', field: 'name', label: '广告名称', placeholder: '请输入名称' },
      {
        type: 'select', field: 'status', width: '170px', label: '状态', placeholder: '请选择状态', list: [
          { id: 0, value: 0, label: '开启' },
          { id: 1, value: 1, label: '关闭' },
        ]
      },
      { type: 'chooseTime', field: 'createTime', label: '创建时间', beginTime: 'startTime', EndTime: 'endTime' },
    ]
    return (
      <div className="om-box user-box">
        <div>
          <Tabs activeKey={tabKey} onChange={this.tabChange}>
            <TabPane tab="广告列表" key="1">
              {/* <Radio.Group onChange={this.onRadioChange} value={typeValue} style={{ marginBottom: 20, marginLeft: 30 }}>
                <Radio value={1}>首页广告</Radio>
                <Radio value={2}>商城广告</Radio>

                <Radio value={3}>首页轮播图</Radio>
                <Radio value={4}>商城轮播图</Radio>

                <Radio value={5}>启动图</Radio>
                <Radio value={6}>弹窗广告</Radio>
              </Radio.Group> */}

              <GtableEdit
                urls={urls}
                rowKey={record => record.id}
                searchData={searchData}
                columns={_columns}
                bordered={false}
                isRowSelection={false}
                pagination={true}
                query={{ type: bannerType }}
                triggerRef={ref => { this.tableChild = ref }}
              />
            </TabPane>
            <TabPane tab={tabValue} key="2">
              {
                tabKey === '2' && <BannerAdd triggerRef={ref => this.addChild = ref} successCallback={this.successCallback} bannerid={bannerid} />
              }
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default BannerManage