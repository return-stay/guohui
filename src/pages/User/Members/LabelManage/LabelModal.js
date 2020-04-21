import React from 'react'
import { Modal, Form, Input, Icon } from 'antd'
import './index.less'
class LabelModal extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      title: ''
    }
  }

  componentDidMount() {
    this.props.targetRef && this.props.targetRef(this)
  }

  add = (e) => {
    this.setState({
      title: '新增标签'
    })
    this.modalShow()
  }

  edit = (e) => {
    this.setState({
      title: '编辑标签'
    })
    this.modalShow()
  }

  modalShow = () => {
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
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { visible, title } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const { getFieldDecorator } = this.props.form

    return (
      <Modal
        visible={visible}
        title={title}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <h5 className='help-default'>
          <Icon type="info-circle" />
          <span style={{ marginLeft: 10 }}>说明：您可在此处新建会员标签，标签名称不能超过15个字</span>
        </h5>
        <Form {...formItemLayout}>
          <Form.Item label="标签名称">
            {getFieldDecorator('inputName', { valuePropName: 'value', rules: [{ required: true, message: '请输入标签名称' }] })(<Input maxLength={15} />)}
          </Form.Item>

        </Form>
      </Modal>
    )
  }
}

export default Form.create()(LabelModal)