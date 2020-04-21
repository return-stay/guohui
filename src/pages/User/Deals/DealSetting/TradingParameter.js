import React from 'react'
import { Form, Input, Button, message } from 'antd'

import '../Payment/index.less'
const FormItem = Form.Item
class TradingParameter extends React.Component {


  onSave = (e)=> {
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
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...formItemLayout} >

        <div className="st-title" style={{marginTop: 20}}>订单参数</div>

        <FormItem key='xiadanhou' label='下单后，超过'>
          {getFieldDecorator('xiadanhou')(
            <div className="form-item">
              <Input type="text" style={{ marginTop: 4, width: '20%'}} />
              <div>
                <span className="st-form-text">小时未付款，订单关闭</span>
                <span className="st-form-text st-form-text-color">自动取消订单，订单状态从待付款变为已关闭</span>
              </div>
            </div>
          )}
        </FormItem>
        <FormItem key='fahuohou' label='发货后，超过'>
          {getFieldDecorator('fahuohou')(
            <div className="form-item">
              <Input type="text" style={{ marginTop: 4, width: '20%' }} />
              <div>
                <span className="st-form-text">天未收货，订单自动完成</span>
                <span className="st-form-text st-form-text-color">自动确认收货，订单状态从待收货变为已完成</span>
              </div>
            </div>
          )}
        </FormItem>
        <FormItem key='shouhuohou' label='收货后，超过'>
          {getFieldDecorator('shouhuohou')(
            <div className="form-item">
              <Input type="text" style={{ marginTop: 4, width: '20%' }} />
              <div>
                <span className="st-form-text">天未评价，关闭评价通道</span>
                <span className="st-form-text st-form-text-color">评价通道关闭后用户可发起追加评论</span>
              </div>
            </div>
          )}
        </FormItem>

        <div className="st-title">售后参数</div>

        <FormItem key='dingdanwancheng' label='订单完成后'>
          {getFieldDecorator('dingdanwancheng')(
            <div className="form-item">
              <Input type="text" style={{ marginTop: 4, width: '20%' }} />
              <div>
                <span className="st-form-text">天后关闭售后通道</span>
                <span className="st-form-text st-form-text-color">会员只能在售后维权期发起退款/退货申请</span>
              </div>
            </div>
          )}
        </FormItem>
        <FormItem key='yuqi' label='提交申请后商家/门店逾期'>
          {getFieldDecorator('yuqi')(
            <div className="form-item">
              <Input type="text" style={{ marginTop: 4, width: '20%' }} />
              <div>
                <span className="st-form-text">天未处理，流程自动进入下一环节</span>
                <span className="st-form-text st-form-text-color">商家/门店逾期未处理，视为同意售后</span>
              </div>
            </div>
          )}
        </FormItem>
        <FormItem key='tuihuoyuqi' label='退货申请买家逾期'>
          {getFieldDecorator('tuihuoyuqi')(
            <div className="form-item">
              <Input type="text" style={{ marginTop: 4, width: '20%' }} />
              <div>
                <span className="st-form-text">天未寄货，自动关闭退货流程</span>
                <span className="st-form-text st-form-text-color">买家逾期未寄货，视为放弃售后申请</span>
              </div>
            </div>
          )}
        </FormItem>
        <FormItem key='jihuoyuqi' label='买家寄货后卖家逾期'>
          {getFieldDecorator('jihuoyuqi')(
            <div className="form-item">
              <Input type="text" style={{ marginTop: 4, width: '20%' }} />
              <div>
                <span className="st-form-text">天未处理，流程自动进入下一环节</span>
                <span className="st-form-text st-form-text-color">卖家逾期未处理，视为同意售后，等待平台确认退款</span>
              </div>
            </div>
          )}
        </FormItem>

        <FormItem key='' label=' ' colon={false}>
          <Button type="primary" onClick={this.onSave}>保存</Button>
        </FormItem>
      </Form>
    )
  }
}



export default Form.create()(TradingParameter)