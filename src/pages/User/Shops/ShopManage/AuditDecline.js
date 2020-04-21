import React from 'react'
import request from '../../../../utils/request'
import { Modal, Input, message } from 'antd'
import { MerchantAuditReject } from '../../../../config/api'
const { TextArea } = Input
export default class AuditDecline extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      merchantId: 0,
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  show = (merchantId) => {
    this.setState({
      visible: true,
      merchantId,
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  textAreaChange = (e) => {
    console.log(e.target.value)
    let value = e.target.value
    this.setState({
      textareaText: value
    })
  }

  onOk = () => {
    let text = this.state.textareaText
    text = text.replace(/(^\s*)|(\s*$)/g, "");
    if (text) {
      let merchantId = this.state.merchantId

      request({
        url: MerchantAuditReject,
        method: 'post',
        params: { md5Str: localStorage.getItem('authed') },
        data: {
          merchantId,
          reason: text
        }
      }).then(res => {
        message.success('不通过审核设置成功')
        this.props.successCallback()
        this.onCancel()
      }).catch(err => {
        message.error(err.message)
      })
    } else {
      message.error('请输入不通过审核的原因')
    }
  }
  render() {
    const { visible } = this.state
    return (
      <Modal
        visible={visible}
        title="店铺审核"
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <TextArea placeholder='请填写审核未通过原因.' onChange={this.textAreaChange} autoSize={{ minRows: 5 }} />
      </Modal>
    )
  }
}