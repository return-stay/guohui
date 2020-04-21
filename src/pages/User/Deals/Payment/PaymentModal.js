import React from 'react'
import { Modal, Form, Input, Switch, Icon } from 'antd'
import './index.less'
const FormItem = Form.Item


class PaymentModalForm extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      isShowType: false,
    }
  }

  componentDidMount() {
    this.props.triggerRef(this)
  }
  showModal = (item) => {
    console.log(item)
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  showTypeChange = (bool) => {
    console.log(bool)
    this.setState({
      isShowType: bool,
    })
  }
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);

        this.handleCancel()
      }
    });
  }
  render() {
    const { visible, isShowType } = this.state
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        width={840}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} className="pay-modal-form">
          <FormItem key='payStyle' label='支付放肆'>
            <span>商城小程序支付</span>
          </FormItem>

          <FormItem key='AppId' label='AppId'>
            {getFieldDecorator('AppId')(
              <div className="form-item">
                <Input type="text" style={{ marginTop: 4 }} />
                <span className="form-text">微信中的AppId</span>
              </div>
            )}
          </FormItem>
          <FormItem key='AppSecret' label='AppSecret'>
            {getFieldDecorator('AppSecret')(
              <div className="form-item">
                <Input type="text" style={{ marginTop: 4 }} />
                <span className="form-text">微信中的AppSecret</span>
              </div>
            )}
          </FormItem>
          <FormItem key='Key' label='Key'>
            {getFieldDecorator('Key')(
              <div className="form-item">
                <Input type="text" style={{ marginTop: 4 }} />
                <span className="form-text">商户自己申请时，填写自己申请的商户平台的32位密钥；服务商申请时，填写服务商提供的32位密钥</span>
              </div>
            )}
          </FormItem>
          <FormItem key='MCHID' label='MCHID'>
            {getFieldDecorator('MCHID')(
              <div className="form-item">
                <Input type="text" style={{ marginTop: 4 }} />
                <span className="form-text">商户自己申请时，填写自己申请的微信支付商户号；服务商申请时，填写服务商提供的微信支付商户号</span>
              </div>
            )}
          </FormItem>
          <FormItem key='shanghuzhengshu' label='商户证书'>
            {getFieldDecorator('shanghuzhengshu')(
              <div className="form-item">
                <Input type="text" style={{ marginTop: 4 }} />
                <span className="form-text">商户自己申请时，填写自己在商户平台下载的证书；服务商申请时，填写服务商提供的证书</span>
              </div>
            )}
          </FormItem>

          <FormItem key='fuwumoshi' label='服务商模式开启'>
            {getFieldDecorator('fuwumoshi', {
              initialValue: false,
              valuePropName: 'checked',
            })(
              <Switch
                checkedChildren={<Icon type="plus" />}
                unCheckedChildren={<Icon type="minus" />}
                onChange={this.showTypeChange}
              />
            )}
          </FormItem>


          {
            isShowType ? (
              <>
                <FormItem key='shanghuId' label='服务商商户ID'>
                  {getFieldDecorator('shanghuId')(
                    <div className="form-item">
                      <Input type="text" style={{ marginTop: 4 }} />
                      <span className="form-text">服务商的总商户号</span>
                    </div>
                  )}
                </FormItem>
                <FormItem key='fuwushangAppID' label='服务商AppID'>
                  {getFieldDecorator('fuwushangAppID')(
                    <div className="form-item">
                      <Input type="text" style={{ marginTop: 4 }} />
                      <span className="form-text">服务商商户对应的公众号AppId</span>
                    </div>
                  )}
                </FormItem>
              </>
            ) : ''
          }


        </Form>

      </Modal>
    )
  }
}

const PaymentModal = Form.create()(PaymentModalForm);
export default PaymentModal