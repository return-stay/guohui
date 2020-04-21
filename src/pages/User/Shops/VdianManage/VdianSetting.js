import React from 'react'

import { Form, Switch, Icon, Button, message } from 'antd'

class VdianSetting extends React.Component {


  submitVdianSetting = (e) => {
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

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>

        <Form {...formItemLayout}>

          <Form.Item label="启用入驻微店">
            {getFieldDecorator('Name', { valuePropName: 'checked', initialValue: true})(
              <Switch
                checkedChildren={<Icon type="plus" />}
                unCheckedChildren={<Icon type="minus" />}
              />
              )}
          </Form.Item>

          <div style={{ fontSize: 12 }}>
            <span style={{ display: 'flex', backgroundColor: '#f9f9f9', color: '#999', padding: '5px 20px', width: 250, marginLeft: 30 }}>
              <Icon type="info-circle" style={{ fontSize: 20, marginRight: 10 }} />
              <span style={{ display: 'inline-block', height: 20, lineHeight: '20px' }}>说明：此开关仅对小程序生效；</span>
            </span>
            <span style={{ backgroundColor: '#f9f9f9', color: '#999', padding: '5px 20px', marginTop: 10, width: 600, marginLeft: 80 }}>
              关闭开关后，只会保留官方自营的微店。快速通过小程序审核时请关闭此开关，审核通过后再开启。
          </span>
          </div>


          <Form.Item label=" " colon={false}>
            <Button style={{ marginTop: 20 }} type="primary" onClick={this.submitVdianSetting}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(VdianSetting)