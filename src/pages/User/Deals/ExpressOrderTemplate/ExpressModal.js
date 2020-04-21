import React from 'react'

import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item
class ExpressModal extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      title: '添加物流公司'
    }
  }
  componentDidMount() {
    this.props.targetRef && this.props.targetRef(this)
  }
  add = () => {
    this.setState({
      title: "添加物流公司"
    })
    this.show()
  }
  edit = (e) => {
    this.setState({
      title: "编辑物流公司"
    })
    this.show()
  }
  show = () => {
    this.setState({
      visible: true,
    })
  }

  onOk = (e) => { }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { visible, title } = this.state

    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form {...formItemLayout} className="express-modal-form">

          <FormItem key='CourierServicesCompany' label='公司名称'>
            {getFieldDecorator('CourierServicesCompany')(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem key='Kdniao' label='快递鸟code'>
            {getFieldDecorator('Kdniao')(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem key='Kuaidi100' label='快递100code'>
            {getFieldDecorator('Kuaidi100')(
              <Input type="text" />
            )}
          </FormItem>
        </Form>

      </Modal>
    )
  }
}

export default Form.create()(ExpressModal)