import React from 'react'

import { Form, Input, Select, Button } from 'antd'

const { TextArea } = Input
const { Option } = Select;
const InputGroup = Input.Group
class PointsSetting extends React.Component {
  constructor() {
    super()
    this.state = {
      btnText: '保存',
      isActionPopText: false,
      isUserName: false
    }
  }
  componentDidMount() {
    this.props.trageRef && this.props.trageRef()
  }

  handleSubmit = (e) => {
    console.log(e)
    this.props.pointsOkCallback(e)
  }

  focusAction = (e) => {
    console.log(e)
    let type = e.currentTarget.getAttribute('data-type')
    let obj = {}
    if(type === 'user') {
      obj.isUserName = true
    }else {
      obj.isActionPopText = true
    }
    this.setState(obj)
  }

  bulrAction = (e) => {
    this.setState({
      isActionPopText: false,
      isUserName: false
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };

    const ActionStyle = { color: '#00be00', fontSize: 12, marginLeft: 20, height: 32, lineHeight: '32px', display: 'inline-block' }

    const { getFieldDecorator } = this.props.form;
    const { btnText, isActionPopText ,isUserName} = this.state
    return (
      <div style={{ marginTop: 14 }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label="会员账号">
            {getFieldDecorator('userName', { valuePropName: 'value', rules: [{ required: true, message: '此项为必填项' }] })(
              <Input data-type="user" style={{ width: 150 }} onFocus={this.focusAction} onBlur={this.bulrAction} />
            )}
            {isUserName && <span style={ActionStyle}>该信息为必填项，请填写!</span>}
          </Form.Item>
          <Form.Item label="操作">

            <InputGroup compact>
              <>
                {getFieldDecorator('action', { initialValue: 'add', rules: [{ required: true, message: '此项为必填项' }] })(
                  <Select style={{ width: 80 }}>
                    <Option value="add">增加</Option>
                    <Option value="lessen">减少</Option>
                  </Select>
                )}
                <Input style={{ width: 150 }} data-type="action" onFocus={this.focusAction} onBlur={this.bulrAction} />
                {isActionPopText && <span style={ActionStyle}>该信息为必填项，请输入积分数!</span>}
              </>
            </InputGroup>

          </Form.Item>

          <Form.Item label="备注（选填）">
            {getFieldDecorator('remark', { valuePropName: 'value' })(<TextArea rows={4} style={{ width: 400 }} />)}
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">{btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const PointsSettingForm = Form.create()(PointsSetting)

export default PointsSettingForm