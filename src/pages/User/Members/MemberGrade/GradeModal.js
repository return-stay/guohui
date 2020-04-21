import React from 'react'
import { Modal, Form, Icon, Input } from 'antd'

import '../LabelManage/index.less'

const { TextArea } = Input
class GradeModal extends React.Component {

  constructor() {
    super()
    this.state = {
      visible: false,
      title: ''
    }
  }

  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  add = () => {
    this.setState({
      title: '添加'
    })

    this.show()
  }

  edit = () => {
    this.setState({
      title: '编辑会员等级'
    })

    this.show()
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  onCancel = () => {
    this.setState({
      visible: false,
    })
  }

  onOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.onCancel()
      }
    });
  }
  render() {
    const { visible, title } = this.state
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Modal
        title={title}
        visible={visible}
        width={700}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <h5 className='help-default'>
          <Icon type="info-circle" />
          <span style={{ marginLeft: 10 }}>注意事项： 请谨慎设置会员等级；建议设置第一级别所需积分为0； 级别逐层递增，如二级比一级所需的积分更高； 等级名称与需要的积分不能重复。</span>
        </h5>
        <Form {...formItemLayout}>
          <Form.Item label="等级名称">
            {getFieldDecorator('VipGrade', { valuePropName: 'value', initialValue: '白银会员', rules: [{ required: true, message: '此项为必填项' }] })(<Input style={{ width: 300 }} maxLength={15} />)}
          </Form.Item>

          <Form.Item label="需要积分">
            {getFieldDecorator('NeededPoints', { valuePropName: 'value',initialValue: 1000, rules: [{ required: true, message: '此项为必填项' }] })(<Input style={{ width: 300 }} maxLength={15} />)}
          </Form.Item>


          <Form.Item label="可享受折扣率">
            {getFieldDecorator('DiscountRate', { valuePropName: 'value',initialValue: 8.50, rules: [{ required: true, message: '此项为必填项' }] })(<Input style={{ width: 70, marginRight: 4 }} maxLength={15} />)}
            折
            <span style={{ color: '#999', fontSize: 12, marginLeft: 20 }}>会员购买商品时，满足会员等级享受的折扣（仅适用官方自营店）</span>
          </Form.Item>

          <Form.Item label="备注(选填)">
            {getFieldDecorator('remark', { valuePropName: 'value' })(<TextArea style={{ width: 300 }} rows={5} />)}
          </Form.Item>

        </Form>

      </Modal>
    )
  }
}


export default Form.create()(GradeModal)