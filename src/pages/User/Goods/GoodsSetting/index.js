import React from 'react'

import {
  Form,
  Button,
  Switch,
  Icon,
  message,
} from 'antd';

// import heijiao from '../../../../asset/goods/hint.png';

import './index.less'
class GoodsSetting extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        message.success('保存成功')
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        
        <Form.Item label="是否发起审核">
          {getFieldDecorator('switch', { valuePropName: 'checked' })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
        </Form.Item>
        <div className="hint-box">
          <Icon type="info-circle" /> 说明：当您关闭商品审核后，商家可自由发布、编辑商品，上架商品及上架后修改商品均不再需要通过平台审核； 当关闭审核后，被平台违规下架的商品不可以再次上架
        </div>
        

        <Form.Item label="是否开启商品销量显示">
          {getFieldDecorator('shoppingNumber', { valuePropName: 'checked' })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
        </Form.Item>

        <div className="hint-box"><Icon type="info-circle" /> 说明：当您开启销量显示后，前台页面显示商品销量；当关闭后，前台不显示商品销量</div>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create()(GoodsSetting)