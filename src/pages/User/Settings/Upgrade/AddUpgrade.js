import React from 'react'
import { Modal, Form, Input, Radio, message } from "antd";
import request from "../../../../utils/request";
import { UpgradeAdd } from '../../../../config/api'
import Gupload from '../../../../common/Gupload'
import upload_success from '../../../../asset/home/upload_success.png'
const { TextArea } = Input
class LonghairAddFrom extends React.Component {
  constructor() {
    super()
    this.state = {
      disabled: false,
      visible: false,
      title: '添加',
      address: '',
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

  editorChangeCallback = (html) => {
    this.setState({
      txtHtml: html
    }, () => {
      this.props.form.setFieldsValue({ description: html })
    })
  }

  uploadSuccessCallback = (img) => {
    if (img) {
      this.setState({
        address: upload_success
      })
      this.props.form.setFieldsValue({ address: img })
    } else {
      this.setState({
        address: ''
      })
    }

  }
  render() {
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const { disabled, visible, title, address } = this.state
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
          <Form.Item label="上传APK">
            {getFieldDecorator('address', { valuePropName: 'value', rules: [{ required: true, message: "请上传APK" }] })(
              <Gupload file={address} uploadButtonText="上传APK" success={img => this.uploadSuccessCallback(img)} />
            )}
          </Form.Item>
          <Form.Item label="是否强制升级">
            {getFieldDecorator('mustUp', { valuePropName: 'value', initialValue: 0, rules: [{ required: true }] })(
              <Radio.Group disabled={disabled}>
                <Radio value={0}>否</Radio>
                <Radio value={1}>是</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="适用平台">
            {getFieldDecorator('platform', { valuePropName: 'value', initialValue: 0, rules: [{ required: true }] })(
              <Radio.Group disabled={disabled}>
                <Radio value='ios'>IOS</Radio>
                <Radio value='android'>Android</Radio>
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