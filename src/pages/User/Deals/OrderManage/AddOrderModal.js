import React from 'react'
import { Modal, Button, Form, Card, Input } from 'antd'
const BaseModal = (Comon) => {
  return class extends React.Component {

    constructor() {
      super()
      this.state = {
        visible: false
      }
    }
    componentDidMount() {
      console.log('iiiii')
      this.props.triggerRef(this)
    }
    onShow = (e) => {
      console.log('model show')
      this.setState({
        visible: true
      })
    }
    handleOk = (e) => {
      this.setState({
        visible: false
      })
    }
    handleCancel = (e) => {
      this.setState({
        visible: false
      })
    }

    componentWillUnmount() {
      console.log('unmount')
    }

    render() {
      return (
        <div>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {/* {comon && comon} */}
            <Comon
              {...this.props}
              onShow={this.onShow}
            />
          </Modal>
        </div>
      )
    }
  }
}
@BaseModal
class FromBase extends React.Component {

  componentDidMount() {
    console.log('jjjjjjj')
    this.props.triggerRef(this)
  }

  onShow = () => {
    console.log(this)
    console.log('form show')
    this.props.onShow()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Form {...formItemLayout}>
        <Form.Item label="名称">
          {getFieldDecorator('inputName', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input placeholder='请输入名称' />)}
        </Form.Item>

      </Form>
    )

  }
}
const FormCreate = Form.create()(FromBase)


class AddOrderModal extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  onShow = (e) => {
    this.child.onShow()
  }
  render() {
    // const { getFieldDecorator } = this.props.form;
    // const formItemLayout = {
    //   labelCol: { span: 4 },
    //   wrapperCol: { span: 20 },
    // };
    return (
      <div>
        woshish
        <Button onClick={this.onShow}>aniu</Button>

        <Card>

          <FormCreate triggerRef={(ref) => { this.child = ref }}></FormCreate>
        </Card>
      </div>
    )
  }
}


export default AddOrderModal