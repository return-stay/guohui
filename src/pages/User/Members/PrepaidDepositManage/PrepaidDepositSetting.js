import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Switch, Icon, Button } from 'antd';
class PrepaidDepositSetting extends React.Component {

  prepaidDepositSettingSubmit = (e) => {
    console.log(e)
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      console.log(err)
      if (!err) {
        console.log(values)
        return;
      }
    })
  }

  AlipayType = () => {
    this.props.history.push('/user/deals/payment');
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };

    const { getFieldDecorator } = this.props.form;
    const textStyle = { color: '#999', fontSize: 12, marginLeft: 20 }
    return (
      <div style={{ marginTop: 20 }}>
        <Form {...formItemLayout} onSubmit={this.prepaidDepositSettingSubmit}>
          <Form.Item label="允许充值">
            {getFieldDecorator('Recharge', { valuePropName: 'checked', initialValue: true })(
              <Switch
                checkedChildren={<Icon type="plus" />}
                unCheckedChildren={<Icon type="minus" />}
              />
            )}
            <span style={textStyle}>关闭后小程序消费者无法充值，可用来快速通过微信审核</span>
          </Form.Item>
          <Form.Item label="允许提现">
            {getFieldDecorator('Withdraw', { valuePropName: 'checked', initialValue: true })(
              <Switch
                checkedChildren={<Icon type="plus" />}
                unCheckedChildren={<Icon type="minus" />}
              />
            )}
            <span style={textStyle}>关闭时，预存款里的金额，用户不可以提现；一旦开启过充值赠送的营销活动，并且用户参与过活动，该用户提现功能将永久关闭</span>
          </Form.Item>
          <Form.Item label="最低提现金额">
            {getFieldDecorator('di', { valuePropName: 'value', initialValue: 100 })(
              <Input style={{ width: 150 }} />
            )}
            <span style={textStyle}>设置最低提现金额.</span>
          </Form.Item>

          <Form.Item label="最高提现金额">
            {getFieldDecorator('gao', { valuePropName: 'value', initialValue: 1000 })(
              <Input style={{ width: 150 }} />
            )}
            <span style={textStyle}>设置最高提现金额(最高不能大于1000000).</span>
          </Form.Item>

          <Form.Item label="开启支付宝提现">
            {getFieldDecorator('Alipay', { valuePropName: 'checked', initialValue: true })(
              <Switch
                checkedChildren={<Icon type="plus" />}
                unCheckedChildren={<Icon type="minus" />}
              />
            )}
            <span style={textStyle}>开启前请配置好 <i style={{ color: '#2481d1',marginLeft: 4, }} onClick={this.AlipayType}>支付宝支付方式 </i></span>
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType='submit'>保存</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(withRouter(PrepaidDepositSetting))