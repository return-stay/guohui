import React from 'react'
import { Modal, message, Divider, Tabs } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
import FunctionGridAddFrom from './FunctionGridAdd'
import { ConfigDelete } from '../../../../config/api'
import Gimage from '../../../../common/Gimage'
const { TabPane } = Tabs
class FunctionGrid extends React.Component {
  state = {
    isDetail: false,
    typeValue: 1,
    tabKey: '1',
    tabValue: '新增金刚区',
    gridType: 'diamond',
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
      tabValue: '编辑金刚区',
      bannerid: item.id
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

  tabChange = (e) => {
    this.setState({
      tabKey: e,
      tabValue: '新增金刚区',
      formType: 'add',
    })
  }

  successCallback = () => {
    this.setState({
      tabKey: '1',
      tabValue: '新增金刚区'
    })
    this.tableChild.sortingParameters();
  }

  onRadioChange = (e) => {
    let value = e.target.value

    this.setState({
      typeValue: value,
      gridType: value === 2 ? 'mallDiamond' : 'diamond'
    }, () => {
      this.tableChild.sortingParameters();
    })
  }


  render() {
    const _columns = (that) => {
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
          render() {
            return <span>{typeValue === 2 ? '商城金刚区' : '首页金刚区'}</span>
          }
        },
        {
          title: '广告状态',
          key: 'status',
          dataIndex: 'status',
          render(status) {
            return <span>{status === 0 ? '开启' : '关闭'}</span>
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          dataIndex: 'createTime',
          width: 200,
        },
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
          width: 150,
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.checkDetail(item) }}>编辑金刚区</span>
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

    const { urls, tabKey, tabValue, bannerid, typeValue, gridType } = this.state

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
            <TabPane tab="金刚区列表" key="1">
              {/* <Radio.Group onChange={this.onRadioChange} value={typeValue} style={{ marginBottom: 20, marginLeft: 30 }}>
                <Radio value={1}>首页金刚区</Radio>
                <Radio value={2}>商城金刚区</Radio>
              </Radio.Group> */}

              <GtableEdit
                urls={urls}
                rowKey={record => record.id}
                searchData={searchData}
                columns={_columns}
                bordered={false}
                isRowSelection={false}
                query={{ type: gridType }}
                pagination={true}
                triggerRef={ref => { this.tableChild = ref }}
              />
            </TabPane>
            <TabPane tab={tabValue} key="2">
              {
                tabKey === '2' && <FunctionGridAddFrom triggerRef={ref => this.addChild = ref} successCallback={this.successCallback} bannerid={bannerid} />
              }
            </TabPane>
          </Tabs>
        </div>

      </div>
    )
  }
}


export default FunctionGrid