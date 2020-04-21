import React from 'react'

import { Form, Input, Button, message } from 'antd'

class SettlementPeriodSetting extends React.Component {


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
      <div style={{marginTop: 30}}>

        <Form {...formItemLayout}>

          <Form.Item label="当前结算周期(天)">
            15
          </Form.Item>
          <Form.Item label="新结算周期(天)">
            {getFieldDecorator('mx', { valuePropName: 'value' })(
              <Input style={{ width: 300 }} />
            )}
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button style={{ marginTop: 20 }} type="primary" onClick={this.submitVdianSetting}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(SettlementPeriodSetting)