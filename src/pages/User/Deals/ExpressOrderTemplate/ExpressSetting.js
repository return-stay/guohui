import React from 'react'
import { Form, Input, Button, message } from 'antd'
const FormItem = Form.Item
class ExpressSetting extends React.Component {

  clickToBuy = () => {
    window.open('https://enterprise.wuliu.kuaidiantong.cn/Home/Login?SiteUrl=https://tiyan.himall.kuaidiantong.cn&ProductType=1');
  }

  onSave = () => {
    message.success('保存成功');
    this.reset()
  }

  reset = () => {
    this.props.form.resetFields();
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const { getFieldDecorator } = this.props.form
    const textStyle = { color: '#2481d1', cursor: 'pointer', marginLeft: 12, fontSize: 12 }
    return (
      <div style={{ width: 600 }}>
        <Form {...formItemLayout}>
          <FormItem key='tiaoshu' style={{ color: 'red' }} label={(<span style={{ color: 'red' }}>您的物流查询剩余单数</span>)}>
            <span>0 条</span><span style={textStyle} onClick={this.clickToBuy}>点击购买</span>
          </FormItem>
          <FormItem key='app_key' label='app_key'>
            {getFieldDecorator('app_key')(
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input type="text" style={{ width: '50%', flexShrink: 0 }} />
                <span style={textStyle} onClick={this.clickToBuy}>点击申请</span>
              </div>
            )}
          </FormItem>
          <FormItem key='appSecret' label='appSecret'>
            {getFieldDecorator('appSecret')(
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input type="text" style={{ width: '50%', flexShrink: 0 }} />
              </div>
            )}
          </FormItem>

          <FormItem key='btn' label=' ' colon={false}>
            <Button type="primary" onClick={this.onSave}>保存</Button>
          </FormItem>

        </Form>
      </div>
    )
  }
}

export default Form.create()(ExpressSetting)