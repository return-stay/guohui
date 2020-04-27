import React from 'react'
import { Tabs, Divider, Modal, message, Form, Select, Input } from 'antd'

import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
import { OrderAgree, OrderDelivery, OrderReject, LogisticsList } from '../../../../config/api'
// import AddOrderModal from './AddOrderModal'
// import FormDemo from './formDemo'
import Gimage from '../../../../common/Gimage'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './index.less'
const { TabPane } = Tabs;
const { Option } = Select;
export default class OrderManage extends React.Component {
  state = {
    isDetail: false,
    orderType: 0,
    orderStatus: '0',
    urls: {
      list: '/order/list',
      listMethod: 'post',
    },
    titleList: [
      { label: '所有订单', id: 0, type: 0, value: 0 },
      { label: '待付款', id: 1, type: 1, value: 1 },
      { label: '待发货', id: 2, type: 2, value: 2 },
      { label: '待收货', id: 3, type: 3, value: 3, num: 8, style: { color: 'red' } },
      // { label: '售后', id: 4, type: 4, value: 4 },
      { label: '已完成', id: 5, type: 5, value: 5 },
      { label: '已取消', id: 6, type: 6, value: 6 },
    ]
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
            that.tableChild.sortingParameters();
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

  consignmentModalShow = (item) => {
    this.consignmentChild.show(item)
  }
  consignModalSuccess = () => {
    this.tableChild.sortingParameters();
  }
  // 发货
  consignment = (item) => {
    this.modalToastRequest({
      url: OrderDelivery,
      content: '确定要发货吗？',
      method: 'post',
      data: { orderId: item.orderId },
      thenText: '发货成功'
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
          width: 160,
        },
        {
          title: '商品信息',
          key: 'orderId',
          width: 300,
          render(item) {
            let arr = item.orderDetails || []
            return <div>
              {
                arr.map((item, i) => {
                  return <div key={item.orderId + i}>
                    <Gimage style={{ height: 30, }} src={item.picUrl} alt="图片" />
                    <p>{item.goodsName}</p>
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
            let orderMessage = `订单编号：${item.orderNo}， 收货人信息：${item.consignee}， 收货人手机号：${item.mobile || ''}， 收货人地址:${item.address}。`
            return <CopyToClipboard text={orderMessage}
              onCopy={() => message.success('复制成功')}>
              <div style={{ cursor: 'pointer' }}>
                <div>{item.consignee} {item.mobile}</div>
                <div>{item.address}</div>
              </div>
            </CopyToClipboard>
          }
        },
        {
          title: '单价',
          key: 'goodsPrice',
          dataIndex: 'goodsPrice',
          width: 60,
        },
        {
          title: '购买数量',
          key: 'buyNum',
          dataIndex: 'buyNum',
          width: 90,
          render(buyNum) {
            return (
              <span>X {buyNum}</span>
            )
          }
        },
        {
          title: '优惠',
          key: 'couponPrice',
          dataIndex: 'couponPrice',
          width: 60,
        },
        {
          title: '应付金额',
          key: 'actualPrice',
          dataIndex: 'actualPrice',
          width: 90,
        },
        {
          title: '支付商户号',
          key: 'payFlowNumber',
          dataIndex: 'payFlowNumber',
          width: 160,
        },
        {
          title: '所属店铺',
          key: 'shopName',
          dataIndex: 'shopName',
          width: 100,
        },

        {
          title: '支付类型',
          key: 'payType',
          dataIndex: 'payType',
          width: 120,
          render(payType) {
            let text = ''
            if(payType === 'WX-JSAPI') {
              text = '微信支付'
            }else if(payType === 'WX-APP') {
              text = '微信APP支付'
            }else if(payType === 'ALI-PAY') {
              text = '支付宝'
            }else if(payType === 'BALANCE') {
              text = '余额'
            }else if(payType === 'TRANSFER') {
              text = '转账'
            }
            return text
          }
        },
        {
          title: '下单时间',
          key: 'createTime',
          dataIndex: 'createTime',
          width: 120,
        },
        {
          title: '订单状态',
          key: 'orderStatus',
          dataIndex: 'orderStatus',
          width: 90,
          render(orderStatus) {
            const config = {
              0: '待付款',
              1: '待发货',
              2: '已发货',
              4: '已完成',
              5: '已关闭',
              6: '已申请退款，等待商家确认',
              7: '商家已同意退款，办理中',
              8: '商家已拒绝退款',
              9: '用户已填写物流编号',
              10: '退款已完成'
            }
            return config[orderStatus]
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 100,
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.checkDetail(item) }}>查看</span>
                {
                  (item.orderStatus === 1) && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.consignmentModalShow(item) }}>发货</span>
                  </>
                }
                {
                  (item.orderStatus === 6) && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.agreement(item) }}>同意</span>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.decline(item) }}>拒绝</span>

                  </>
                }
                {
                  (item.orderStatus === 8) && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.confirmPaymentAvailable(item) }}>确认打款</span>
                  </>
                }
              </>
            )
          }
        }
      ]
    }

    const { urls, titleList, orderStatus, orderType } = this.state
    const searchData = [
      { type: 'input', field: 'orderNo', label: '订单编号' },
      { type: 'chooseTime', field: 'shangpinleixingsss', beginTime: 'startTime', EndTime: 'endTime', label: '提交日期' },
      { type: 'input', field: 'goodsName', label: '商品名称' },
      { type: 'input', field: 'consignee', label: '收货人姓名' },
      { type: 'input', field: 'consigneeMobile', label: '收货人手机号' }
    ]

    return (
      <div className="om-box">

        {/* <Radio.Group defaultValue={orderType} buttonStyle="solid" style={{ width: '100%' }} onChange={this.orderRadioChange}>
          <Radio.Button style={{ width: '50%', textAlign: 'center' }} value={0}>商品订单</Radio.Button>
          <Radio.Button style={{ width: '50%', textAlign: 'center' }} value={1}>拍品订单</Radio.Button>
        </Radio.Group> */}

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
            rowKey={record => record.orderId}
            searchData={searchData}
            columns={_columns}
            bordered={false}
            isRowSelection={false}
            pagination={true}
            query={{ queryStatus: Number(orderStatus), orderType: Number(orderType) }}
            triggerRef={ref => { this.tableChild = ref }}
          />
        </div>
        <ConsignmentModalForm triggerRef={ref => { this.consignmentChild = ref }} success={this.consignModalSuccess} />

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
      params: { md5Str: localStorage.getItem('authed') },
      method: 'post'
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
      orderId: item.orderId,
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
        const orderId = that.state.orderId
        request({
          url: OrderDelivery,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: { orderId: orderId, ...values },
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
            {getFieldDecorator('logisticsCompanyId', { valuePropName: 'value', initialValue: 8, rules: [{ required: true, message: '请选择物流公司' }] })(
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
            {getFieldDecorator('shipNo', { valuePropName: 'value', rules: [{ required: true, message: '请选择类目' }] })(
              <Input />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const ConsignmentModalForm = Form.create()(ConsignmentModal)
