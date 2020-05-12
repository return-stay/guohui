import React from 'react'
import { Modal, Form, Input, message } from 'antd'
import { OrderCancel } from '../../../../config/api'
import request from '../../../../utils/request'
const { TextArea } = Input;
class CancleOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      orderNo: '',
      logisticsList: [],
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  show = (orderNo) => {
    this.setState({
      visible: true,
      orderNo: orderNo
    })
  }

  onOk = (e) => {
    e.preventDefault();
    const that = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const orderNo = that.state.orderNo
        request({
          url: OrderCancel,
          params: {
            ...values,
            orderNo: orderNo,
            token: localStorage.getItem('authed'),
          },
        }).then(res => {
          if (res.code === 100) {
            message.success('取消订单成功');
            that.props.success()
            that.onCancel()
          }
        }).catch((err) => {
          message.error(err.message)
        })
      }
    })
  }

  onCancel = () => {
    this.setState({
      visible: false,
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return <Modal
      visible={visible}
      title='取消订单'
      onOk={this.onOk}
      onCancel={this.onCancel}
    >
      <Form {...formLayout}>
        <Form.Item label="取消原因">
          {getFieldDecorator('reason', { valuePropName: 'value', rules: [{ required: true, message: '请输入取消原因' }] })(
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          )}
        </Form.Item>
      </Form>
    </Modal>
  }
}


export default Form.create()(CancleOrder)