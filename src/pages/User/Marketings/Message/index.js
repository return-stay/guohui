import React from 'react'
import { Modal, message, Tabs } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
import MessageAdd from './MessageAdd'
import Gimage from '../../../../common/Gimage'
const { TabPane } = Tabs
class MessageManage extends React.Component {
  state = {
    isDetail: false,
    orderType: 0,
    orderStatus: '0',
    urls: {
      list: '/message/search',
      listMethod: 'post',
    },
    tabValue: '1',
    messageText: '新增消息'
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
    this.props.history.push('/user/deals/orderDetail?id=' + item.orderId)
  }
  orderTabChange = (e) => {
    console.log(e)
    this.setState({
      orderStatus: e,
    }, () => {
      this.tableChild.sortingParameters();
    })
  }

  orderRadioChange = (e) => {
    console.log(e)
    let type = e.target.value
    this.setState({
      orderStatus: 0,
      orderType: type
    }, () => {
      this.tableChild.sortingParameters();
    })
  }

  tabChange = (e) => {
    this.setState({
      tabValue: e,
      messageText: '新增消息',
    })
  }

  successCallback = () => {
    console.log('jjjjjjj')
    this.setState({
      tabValue: '1',
      messageText: '新增消息'
    })
    this.tableChild.sortingParameters();
  }

  showMessage = (item, str) => {
    this.setState({
      tabValue: '2',
      messageid: item.id,
      messageText: str === 'edit' ? '编辑消息' : '查看详情'
    })
  }

  render() {
    const _columns = (that) => {
      return [
        {
          title: '序号',
          key: 'key',
          dataIndex: 'key',
        },
        {
          title: '缩略图',
          key: 'pushPic',
          dataIndex: 'pushPic',
          render(pushPic) {
            return <Gimage style={{ width: 30 }} src={pushPic} alt='图片' />
          }
        },
        {
          title: '标题',
          key: 'pushTitle',
          dataIndex: 'pushTitle',
        },
        {
          title: '摘要',
          key: 'pushDesc',
          dataIndex: 'pushDesc',
        },
        {
          title: '已读人数',
          key: 'readCount',
          dataIndex: 'readCount',
        },
        {
          title: '操作',
          key: 'action',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.showMessage(item, 'detail') }}>查看详情</span>
                {/* <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.showMessage(item, 'edit') }}>编辑</span> */}
              </>
            )
          }
        }
      ]
    }

    const { urls, orderStatus, orderType, tabValue, messageText,messageid } = this.state
    const searchData = [
      {
        type: 'input', field: 'title', width: '170px', label: '消息标题', placeholder: '请输入消息标题'
      },
    ]
    return (
      <div className="om-box">
        <div>
          <Tabs activeKey={tabValue} onChange={this.tabChange}>
            <TabPane tab="消息列表" key="1">
              <GtableEdit
                urls={urls}
                rowKey={record => record.id}
                searchData={searchData}
                columns={_columns}
                bordered={false}
                pagination={true}
                isRowSelection={false}
                query={{ queryStatus: Number(orderStatus), orderType: Number(orderType) }}
                triggerRef={ref => { this.tableChild = ref }}
              />
            </TabPane>
            <TabPane tab={messageText} key="2">
              {tabValue === '2' && <MessageAdd triggerRef={ref => this.addChild = ref} successCallback={this.successCallback} messageText={messageText} messageid={messageid} />}
            </TabPane>
          </Tabs>
        </div>

      </div>
    )
  }
}


export default MessageManage