import React from 'react'
import { Form, Icon, InputNumber, Button } from 'antd'

import '../LabelManage/index.less'
class Explain extends React.Component {


  onExplainSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ marginTop: 10 }}>
        <h5 className='help-default'>
          <Icon type="info-circle" />
          <span style={{ marginLeft: 10 }}>在订单结算时，会员可直接用积分抵扣订单金额（到分）。该部分抵扣金额，由平台承担。当配置为0时，表示积分不能抵扣金额。</span>
        </h5>


        <Form {...formItemLayout}>
          <Form.Item label="兑换规则">
            <div>每
            {getFieldDecorator('explain', { valuePropName: 'value', initialValue: 1000 })(
              <InputNumber precision={0} style={{ margin: '0 4px', width: 100 }} />
            )}
              积分可抵扣一元</div>
          </Form.Item>


          <Form.Item label="最高可抵扣比例">
            <div>&nbsp;&nbsp;&nbsp;
            {getFieldDecorator('bili', { valuePropName: 'value', initialValue: 50 })(
              <InputNumber precision={0} style={{ margin: '0 4px', width: 70 }} />
            )}
              %</div>
          </Form.Item>

          <Form.Item label=" " colon={false}>
            &nbsp;&nbsp;&nbsp;<Button onClick={this.onExplainSubmit} type="primary">保存</Button>
          </Form.Item>

        </Form>
      </div>
    )
  }
}


export default Form.create()(Explain)