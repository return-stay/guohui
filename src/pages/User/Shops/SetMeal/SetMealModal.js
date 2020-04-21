import React from 'react'
import { Modal, Form, Input, message } from 'antd'

class SetMealModal extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      title: ''
    }

  }

  componentDidMount() {
    this.props.triggerRef(this)
  }

  add = () => {
    this.setState({
      title: '新增'
    })
    this.show()
  }

  edit = (item) => {
    this.setState({
      title: '编辑'
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
      visible: false
    })
  }
  onOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);

        message.success('保存成功')
      }
    });
  }
  render() {
    const { visible, title } = this.state

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        width={700}
        title={title}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.onOk}
        destroyOnClose={true}
      >

        <Form {...formItemLayout}>
          <Form.Item label="套餐名称">
            {getFieldDecorator('Name', { valuePropName: 'value', rules: [{ required: true, message: '请输入套餐名称' }] })(<Input style={{ width: '80%' }} />)}
          </Form.Item>

          <Form.Item label="可发布商品数">
            {getFieldDecorator('ProductLimit', { valuePropName: 'value', rules: [{ required: true, message: '请输入可发布商品数' }] })(<Input style={{ width: '80%' }} />)}
          </Form.Item>
          <Form.Item label="可用空间（M）">
            {getFieldDecorator('ImageLimit', { valuePropName: 'value', rules: [{ required: true, message: '请输入可用空间' }] })(<Input style={{ width: '80%' }} />)}
          </Form.Item>
          <Form.Item label="年费">
            {getFieldDecorator('ChargeStandard', { valuePropName: 'value', rules: [{ required: true, message: '请输入年费' }] })(<Input style={{ width: '80%', marginRight: 20 }} />)}
            元
          </Form.Item>
        </Form>


      </Modal>
    )
  }
}


export default Form.create()(SetMealModal)