import React from 'react'
import { Tabs, Divider, Modal, message, Form, Select, Input } from 'antd'

import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
import { OrderAgree, OrderDelivery, OrderReject, LogisticsList, OrderDelete, } from '../../../../config/api'
// import AddOrderModal from './AddOrderModal'
// import FormDemo from './formDemo'
import CancleOrder from './CancleOrder'
import Gimage from '../../../../common/Gimage'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './index.less'
const { TabPane } = Tabs;
const { Option } = Select;
export default class OrderManage extends React.Component {
  state = {
    isDetail: false,
    orderType: 0,
    orderStatus: '-1',
    urls: {
      list: '/order/v1/search',
      listMethod: 'post',
    },
    titleList: [
      { label: '所有订单', id: -1, type: -1, value: -1 },
      { label: '待付款', id: 0, type: 0, value: 0 },
      { label: '待发货', id: 1, type: 1, value: 1 },
      { label: '待收货', id: 2, type: 2, value: 2, num: 8, style: { color: 'red' } },
      // { label: '售后', id: 4, type: 4, value: 4 },
      { label: '已完成', id: 4, type: 4, value: 4 },
      { label: '已取消', id: 5, type: 5, value: 5 },
    ]
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
          data: data,
          params: params
        }).then(res => {
          if (res.code === 100) {
            message.success(thenText);
            that.tableChild.sortingParameters();
          }
        }).catch((err) => {
          message.error(err.message)
        })
      }
    })
  }

  checkDetail = (item) => {
    this.props.history.push('/user/deals/orderDetail?id=' + item.orderNo)
  }

  consignmentModalShow = (item) => {
    this.consignmentChild.show(item)
  }
  modalSuccess = () => {
    this.tableChild.sortingParameters();
  }
  // 取消
  cancle = (item) => {
    this.cancleChild.show(item.orderMainNo)
  }
  // 删除
  delete = (item) => {
    console.log(item.orderNo)
    this.modalToastRequest({
      url: OrderDelete,
      params: {
        orderNo: item.orderNo,
        token: localStorage.getItem('authed')
      },
      content: '确定删除该订单吗？',
      thenText: '删除成功'
    })
  }
  // 同意
  agreement = (item) => {
    this.modalToastRequest({
      url: OrderAgree + '/' + item.orderId,
      content: '确认同意退款吗？',
      thenText: '同意退款成功'
    })
  }
  // 拒绝
  decline = (item) => {
    this.modalToastRequest({
      url: OrderReject + '/' + item.orderId,
      content: '确认要决绝退款吗？',
      thenText: '决绝退款成功'
    })
  }
  // 确认可打款
  confirmPaymentAvailable = (item) => {
    // this.modalToastRequest({
    //   url: OrderReject,
    // })
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


  render() {
    const _columns = (that) => {
      return [
        {
          title: '订单编号',
          key: 'orderNo',
          dataIndex: 'orderNo',
          width: 170,
        },
        {
          title: '支付商户号',
          key: 'orderMainNo',
          dataIndex: 'orderMainNo',
          width: 170,
        },
        {
          title: '商品信息',
          key: 'orderId',
          width: 300,
          render(item) {
            let arr = item.productList || []
            return <div>
              {
                arr.map((item, i) => {
                  return <div key={i}>
                    <Gimage style={{ height: 30, }} src={item.productCover} alt="图片" />
                    <p>{item.productName}</p>
                  </div>
                })
              }
            </div>
          }
        },
        {
          title: '收货人信息',
          key: 'consignee',
          width: 230,
          render(item) {
            let addItem = item.addressDTO
            let orderMessage = `订单编号：${addItem.orderNo}， 收货人信息：${addItem.consignee}， 收货人手机号：${addItem.mobile || ''}， 收货人地址:${addItem.address}。`
            return <CopyToClipboard text={orderMessage}
              onCopy={() => message.success('复制成功')}>
              <div style={{ cursor: 'pointer' }}>
                <div>{addItem.consignee} {addItem.orderPhone}</div>
                <div>{addItem.orderAddress}</div>
              </div>
            </CopyToClipboard>
          }
        },
        {
          title: '购买数量',
          key: 'count',
          width: 90,
          render(item) {
            let arr = item.productList
            let num = 0
            for (let i = 0; i < arr.length; i++) {
              num += arr[i].count
            }
            return (
              <span>X {num}</span>
            )
          }
        },
        {
          title: '订单价格（实付）',
          key: 'orderPrice',
          dataIndex: 'orderPrice',
          width: 140,
        },

        {
          title: '所属店铺',
          key: 'shopId',
          width: 100,
          render(item) {
            let shopItem = item.shopDTO
            return <span>{shopItem.shopName}</span>
          }
        },
        // {
        //   title: '支付类型',
        //   key: 'payType',
        //   dataIndex: 'payType',
        //   width: 120,
        //   render(payType) {
        //     let text = ''
        //     if (payType === 'WX-JSAPI') {
        //       text = '微信支付'
        //     } else if (payType === 'WX-APP') {
        //       text = '微信APP支付'
        //     } else if (payType === 'ALI-PAY') {
        //       text = '支付宝'
        //     } else if (payType === 'BALANCE') {
        //       text = '余额'
        //     } else if (payType === 'TRANSFER') {
        //       text = '转账'
        //     }
        //     return text
        //   }
        // },
        {
          title: '下单时间',
          key: 'createTimeStr',
          dataIndex: 'createTimeStr',
          width: 200,
        },
        {
          title: '订单状态',
          key: 'stateStr',
          dataIndex: 'stateStr',
          width: 90,
          render(stateStr) {
            return stateStr
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.checkDetail(item) }}>查看</span>
                {
                  (item.state === 1) && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.consignmentModalShow(item) }}>发货</span>
                  </>
                }
                {
                  (item.state === 6) && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.agreement(item) }}>同意</span>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.decline(item) }}>拒绝</span>
                  </>
                }
                {
                  (item.state === 8) && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.confirmPaymentAvailable(item) }}>确认打款</span>
                  </>
                }
                {
                  (item.cancelFlag === 0) && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.cancle(item) }}>取消</span>
                  </>
                }
                {
                  item.available === 0 && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.delete(item) }}>删除</span>
                  </>
                }
              </>
            )
          }
        }
      ]
    }

    const { urls, titleList, orderStatus } = this.state
    const searchData = [
      { type: 'input', field: 'orderNo', label: '订单编号' },
      { type: 'input', field: 'orderMainNo', label: '支付商户号' },
      { type: 'chooseTime', field: 'shangpinleixingsss', beginTime: 'startTime', EndTime: 'endTime', label: '提交日期' },
      { type: 'input', field: 'productName', label: '商品名称' },
      { type: 'input', field: 'consignee', label: '收货人姓名' },
      {
        type: 'select', field: 'available', width: '170px', label: '是否删除', placeholder: '请选择是否删除', list: [
          { id: 0, value: 0, label: '有效' },
          { id: 1, value: 1, label: '删除' }
        ]
      },
    ]

    return (
      <div className="om-box">
        <div>
          <Tabs defaultActiveKey={orderStatus} onChange={this.orderTabChange}>
            {
              titleList.map(item => {
                const tabLabel = (
                  // <div>{item.label}{item.num > 0 && <span style={item.style} >（{item.num}）</span>}</div>
                  <div>{item.label}</div>
                )
                return <TabPane tab={tabLabel} key={item.id} style={item.style}> </TabPane>
              })
            }
          </Tabs>

          <GtableEdit
            urls={urls}
            rowKey={record => record.orderNo}
            searchData={searchData}
            columns={_columns}
            bordered={false}
            isRowSelection={false}
            pagination={true}
            query={{ state: Number(orderStatus) }}
            triggerRef={ref => { this.tableChild = ref }}
          />
        </div>
        <ConsignmentModalForm triggerRef={ref => { this.consignmentChild = ref }} success={this.modalSuccess} />

        <CancleOrder triggerRef={ref => { this.cancleChild = ref }} success={this.modalSuccess} />
      </div>
    )
  }
}



class ConsignmentModal extends React.Component {
  constructor() {
    super()

    this.state = {
      orderId: 0,
      visible: false,
      logisticsList: [],
    }
  }

  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
    this.getLogisticsList()
  }

  getLogisticsList = () => {
    request({
      url: LogisticsList,
      params: { token: localStorage.getItem('authed') },
    }).then(res => {
      console.log(res)
      this.setState({
        logisticsList: res.data
      })
    })
  }

  show = (item) => {
    console.log(item)
    this.setState({
      visible: true,
      orderNo: item.orderNo,
    })
  }
  onCancel = () => {
    this.setState({
      visible: false,
    })
  }
  onOk = (e) => {
    e.preventDefault();
    const that = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const orderNo = that.state.orderNo
        request({
          url: OrderDelivery,
          method: 'post',
          params: { token: localStorage.getItem('authed') },
          data: { orderNo: orderNo, ...values },
        }).then(res => {
          if (res.code === 100) {
            message.success('发货成功');

            that.props.success()
            that.onCancel()
          }
        }).catch((err) => {
          message.error(err.message)
        })
      }
    })
  }
  render() {
    const { visible, logisticsList } = this.state
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="发货"
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form {...formLayout}>
          <Form.Item label="物流公司">
            {getFieldDecorator('shipChannel', { valuePropName: 'value', initialValue: 8, rules: [{ required: true, message: '请选择物流公司' }] })(
              <Select style={{ width: '100%' }}>
                {
                  logisticsList.map(item => {
                    return <Option key={item.id} value={item.id}>{item.logisticsName}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="物流单号">
            {getFieldDecorator('shipNo', { valuePropName: 'value', rules: [{ required: true, message: '请输入物流单号' }] })(
              <Input maxLength={20} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const ConsignmentModalForm = Form.create()(ConsignmentModal)
