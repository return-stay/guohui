import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import { Modal, Button } from 'antd'
export default class Wechat extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 28,
          MessageType: 2,
          MsgType: "优惠券",
          SendTime: "2019-11-05 10:33:50",
          SendToUser: "标签:全部",
          CurrentCouponCount: 715,
          CurrentUseCouponCount: 4,
          SendState: "发送成功",
          ShopName: "风华电子店铺",
          Price: 50,
          CouponName: "倒萨大",
          strEndTime: "2019-12-04",
          strStartTime: "2019-11-04",
          IsUse: '不限制'
        }
      ]
    }
  }

  checkContent = (item) => {
    this.sendChild.show(item)
  }
  render() {

    let { urls, dataSource } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      return [
        {
          title: '类型',
          key: 'MsgType',
          dataIndex: 'MsgType',
        },
        {
          title: '整体使用率',
          key: 'CurrentCouponCount',
          render(item) {
            let num = item.CurrentUseCouponCount / item.CurrentCouponCount * 100
            num = num.toFixed(2)

            return (
              <span>{num}%</span>
            )
          }
        },
        {
          title: '发送时间',
          key: 'SendTime',
          dataIndex: 'SendTime',
        },
        {
          title: '发送对象',
          key: 'SendToUser',
          dataIndex: 'SendToUser',
        },
        {
          title: '发送状态',
          key: 'SendState',
          dataIndex: 'SendState',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.checkContent(item) }}>查看内容</div>
              </>
            )
          }
        }
      ]
    }
    const searchData = [
      {
        type: 'select', field: 'MsgType', width: '170px', label: '类型', list: [
          { id: 'all', value: 'all', label: '全部' },
          { id: 'weixin', value: 'weixin', label: '微信' },
          { id: 'email', value: 'email', label: '邮件' },
          { id: 'coupon', value: 'coupon', label: '优惠券' },
          { id: 'sent', value: 'sent', label: '短信' },
        ]
      },
      {
        type: 'select', field: 'SendState', width: '170px', label: '发送状态', list: [
          { id: 'all', value: 'all', label: '全部' },
          { id: 'success', value: 'success', label: '发送成功' },
          { id: 'error', value: 'error', label: '发送失败' },
        ]
      },
      { type: 'chooseTime', field: 'fasongshijian', label: '发送时间', },
    ]
    return (
      <div>
        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
          isRowSelection={false}
        />

        <SentModal targetRef={ref => this.sendChild = ref} />
      </div>
    )
  }
}


class SentModal extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      title: '查看内容',
      sentItem: {},
    }
  }
  componentDidMount() {
    this.props.targetRef(this)
  }

  show = (item) => {
    console.log(item)
    this.setState({
      visible: true,
      sentItem: item
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  onOk = () => {
    this.onCancel()
  }
  render() {
    const { visible, title, sentItem } = this.state

    const titleStyle = { display: 'inline-block', width: 120, textAlign: 'right', color: '#494e52', marginRight: 30, fontSize: 14 }
    const contStyle = { display: 'inline-block', color: '#6b6c6e', fontSize: 14 }
    const footer =(
      <Button type="primary" onClick={this.onCancel}>确定</Button>
    )
    return (
      <Modal
        title={title}
        visible={visible}
        footer={footer}
        onCancel={this.onCancel}
      >
        <div style={{ padding: '0 40px' }}>
          <div style={{ height: 30 }}>
            <span style={titleStyle}>群发对象：</span>
            <span style={contStyle}>{sentItem.SendToUser}</span>
          </div>

          <div style={{ height: 30 }}>
            <span style={titleStyle}>优惠券名称：</span>
            <span style={contStyle}>{sentItem.CouponName}</span>
          </div>

          <div style={{ height: 30 }}>
            <span style={titleStyle}>商家：</span>
            <span style={contStyle}>{sentItem.ShopName}</span>
          </div>
          <div style={{ height: 30 }}>
            <span style={titleStyle}>面额：</span>
            <span style={contStyle}>{sentItem.Price}</span>
          </div>

          <div style={{ height: 30 }}>
            <span style={titleStyle}>使用条件：</span>
            <span style={contStyle}>{sentItem.IsUse}</span>
          </div>

          <div style={{ height: 30 }}>
            <span style={titleStyle}>有效期：</span>
            <span style={contStyle}>{sentItem.strStartTime}-{sentItem.strEndTime}</span>
          </div>
        </div>

      </Modal>
    )
  }
}