import React from 'react'
import { Modal, Form, Input } from 'antd'

class TrustTheLoginModal extends React.Component {

  constructor() {
    super()
    this.state = {
      visible: false,
      title: '',
      formItemInput: {}
    }
  }

  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  edit = (item) => {
    let formItemInput = {}
    switch (item.TrustLogin) {
      case "京东云":
        formItemInput = {
          title: '京东云',
          AppId: true,
          AppKey: true,
          ProtectedContent: true,
        }
        break;
      case "QQ":
        formItemInput = {
          title: 'QQ',
          AppId: true,
          AppKey: true,
          ProtectedContent: true,
        }
        break;
      case "新浪微博":
        formItemInput = {
          title: '新浪微博',
          AppKey: true,
          AppSecret: true,
          ProtectedContent: true,
        }
        break;
      case "微信":
        formItemInput = {
          title: '微信',
          AppId: true,
          AppSecret: true,
        }
        break;
      default:
        formItemInput = {}
    }
    this.setState({
      title: '编辑',
      formItemInput,
    }, () => {
      this.show()
    })
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
    const { visible, title, formItemInput } = this.state
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
        <Form {...formItemLayout}>
          <Form.Item label="信任登录">
            微信登录
          </Form.Item>

          {
            formItemInput.AppId && (
              <Form.Item label="AppId">
                {getFieldDecorator('AppId', { valuePropName: 'value', rules: [{ required: true, message: '此项为必填项' }] })(<Input style={{ width: 300 }} maxLength={15} />)}
              </Form.Item>
            )
          }

          {
            formItemInput.AppKey && (
              <Form.Item label="AppKey">
                {getFieldDecorator('AppKey', { valuePropName: 'value', rules: [{ required: true, message: '此项为必填项' }] })(<Input style={{ width: 300 }} maxLength={15} />)}
              </Form.Item>
            )
          }

          {
            formItemInput.AppSecret && (
              <Form.Item label="AppSecret">
                {getFieldDecorator('AppSecret', { valuePropName: 'value', rules: [{ required: true, message: '此项为必填项' }] })(<Input style={{ width: 300 }} maxLength={15} />)}
              </Form.Item>
            )
          }


          {
            formItemInput.ProtectedContent && (
              <Form.Item label="验证内容">
                {getFieldDecorator('ProtectedContent', { valuePropName: 'value' })(<Input style={{ width: 300 }} maxLength={15} />)}
              </Form.Item>
            )
          }

        </Form>
      </Modal>
    )
  }
}


export default Form.create()(TrustTheLoginModal)