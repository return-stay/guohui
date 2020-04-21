import React from 'react'

import { Form, InputNumber, Button, message } from 'antd'

class WithdrawAmountSetting extends React.Component {


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
          <Form.Item label="最低提现金额">
            {getFieldDecorator('min', { valuePropName: 'value'})(
              <InputNumber min={0} max={1000000} precision={0} style={{width: 200}} />
            )}
            <span style={{fontSize: 12, color: '#999',marginLeft: 20 }}>设置最高提现金额(最高不能大于1000000).</span>
          </Form.Item>
          <Form.Item label="最高提现金额">
            {getFieldDecorator('mx', { valuePropName: 'value' })(
              <InputNumber min={0} max={1000000}  precision={0} style={{width: 200}}/>
            )}

            <span style={{fontSize: 12, color: '#999',marginLeft: 20 }}>设置最高提现金额(最高不能大于1000000).</span>
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button style={{ marginTop: 20 }} type="primary" onClick={this.submitVdianSetting}>保存</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(WithdrawAmountSetting)