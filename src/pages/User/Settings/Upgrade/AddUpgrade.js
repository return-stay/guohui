import React from 'react'
import { Modal, Form, Input, Radio, message } from "antd";
import connect from '../../../../utils/connect'
import request from "../../../../utils/request";
import { UpgradeAdd } from '../../../../config/api'
const { TextArea } = Input
@connect
class LonghairAddFrom extends React.Component {
  constructor() {
    super()

    this.state = {
      disabled: false,
      visible: false,
      title: '添加'
    }
  }

  show = () => {
    this.setState({
      visible: true,
    })
  }
  onCancel = () => {
    this.setState({
      visible: false,
    })
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }
  save = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          ...values,
        }
        let url = UpgradeAdd
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: data
        }).then(res => {
          if (res.code === 100) {
            message.success('添加成功')
            this.props.successCallback()
            this.onCancel()
          } else {
            message.error(res.message)
          }
        })
      }
    })
  }


  houseSateChange = (e) => {
    this.props.form.setFieldsValue({ paramContent: e })
  }

  terminalTypeChange = (e) => {
    this.setState({
      terminalTypeShow: e.target.value
    })
  }


  editorChangeCallback = (html) => {
    this.setState({
      txtHtml: html
    }, () => {
      this.props.form.setFieldsValue({ description: html })
    })
  }

  uploadSuccessCallback = (img, type) => {
    console.log(img)
    let obj = {}
    switch (type) {
      case 'portrait':
        obj.portrait = img
        break;
      case 'videoUrl':
        obj.videoUrl = img
        break;
      default:
        obj = {}
    }
    this.setState({
      ...obj
    })
    // this.props.form.setFieldsValue({ portrait: img })
  }
  render() {
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const { disabled, visible, title } = this.state
    const { getFieldDecorator } = this.props.form;
    return (

      <Modal
        destroyOnClose={true}
        title={title}
        visible={visible}
        width={700}
        onCancel={this.onCancel}
        onOk={this.save}
      >
        <Form {...formLayout}>

          <Form.Item label="APP名称">
            {getFieldDecorator('appName', { valuePropName: 'value', rules: [{ required: true, message: "请输入APP名称" }] })(
              <Input style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>
          <Form.Item label="系统版本号">
            {getFieldDecorator('appVersion', { valuePropName: 'value', rules: [{ required: true, message: "请输入系统版本号" }] })(
              <Input style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>
          <Form.Item label="下载地址">
            {getFieldDecorator('address', { valuePropName: 'value', rules: [{ required: true, message: "请输入下载地址" }] })(
              <Input style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>

          <Form.Item label="是否强制升级">
            {getFieldDecorator('mustUp', { valuePropName: 'value', initialValue: 0, rules: [{ required: true }] })(
              <Radio.Group onChange={this.terminalTypeChange} disabled={disabled}>
                <Radio value={0}>否</Radio>
                <Radio value={1}>是</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="升级说明">
            {getFieldDecorator('detail', { valuePropName: 'value' })(
              <TextArea style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>

        </Form>
      </Modal>
    )
  }
}


const AddUpgrade = Form.create()(LonghairAddFrom)

export default AddUpgrade