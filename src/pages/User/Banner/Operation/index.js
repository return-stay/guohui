import React from 'react'
import { Modal, message, Divider, Tabs } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
import OperationAddFrom from './OperationAdd'
import { ConfigDelete } from '../../../../config/api'

const { TabPane } = Tabs
class Operation extends React.Component {
  state = {
    isDetail: false,
    tabKey: '1',
    tabValue: '新增运营区',
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
      tabValue: '编辑运营区',
      bannerid: item.id
    })
  }
  closed = (item, type) => {
    let url = ''
    let actionType = 0
    if (type === 'close') {
      url = ConfigDelete
      actionType = 1
    }
    url = ConfigDelete
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
      this.tableChild.sortingParameters();
    })

  }

  tabChange = (e) => {
    this.setState({
      tabKey: e,
      tabValue: '新增运营区',
      formType: 'add',
      bannerid: '',
    })
  }

  successCallback = () => {
    this.setState({
      tabKey: '1',
      tabValue: '新增运营区'
    })
  }


  render() {
    const _columns = (that) => {
      return [
        {
          title: '图标',
          key: 'pic',
          dataIndex: 'pic',
          render(pic) {
            return <img src={pic} alt="图片" style={{ width: 30 }} />
          }
        },
        {
          title: '主标题',
          key: 'title',
          render(item) {
            return (<span>{item.title || item.remarkMap.title}</span>)
          }
        },
        {
          title: '副标题',
          key: 'subTitle',
          render(item) {
            return (<span>{item.subTitle || item.remarkMap.subTitle}</span>)
          }
        },
        {
          title: '类型',
          key: 'id',
          dataIndex: 'id',
          render() {
            return <span>运营区</span>
          }
        },
        {
          title: '图标状态',
          key: 'status',
          dataIndex: 'status',
          render(status) {
            return <span>{status === 0 ? '开启' : '关闭'}</span>
          }
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
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.checkDetail(item) }}>编辑运营区</span>
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

    const { urls, tabKey, tabValue, bannerid } = this.state
    const searchData = [
      { type: 'input', field: 'name', label: '运营区名称', placeholder: '请输入名称' },
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
            <TabPane tab="运营区列表" key="1">
              <GtableEdit
                urls={urls}
                rowKey={record => record.id}
                searchData={searchData}
                columns={_columns}
                bordered={false}
                isRowSelection={false}
                query={{ type: 'card' }}
                pagination={true}
                triggerRef={ref => { this.tableChild = ref }}
              />
            </TabPane>
            <TabPane tab={tabValue} key="2">
              {
                tabKey === '2' && <OperationAddFrom triggerRef={ref => this.addChild = ref} successCallback={this.successCallback} bannerid={bannerid} />
              }
            </TabPane>
          </Tabs>
        </div>

      </div>
    )
  }
}


export default Operation