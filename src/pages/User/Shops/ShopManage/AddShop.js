import React from 'react'
import { Form, Steps, Button, message, Radio, Input, Row, Col, Rate, Select } from 'antd';
import { ShopAdd, ShopDetial, ShopUpdate, CategoryFindAllCateId } from '../../../../config/api'
import { dismantleSearch, getOptionsList } from '../../../../utils'
import request from '../../../../utils/request'
import Gupload from '../../../../common/Gupload'
import './addshop.less'
const { Step } = Steps;
const { TextArea } = Input

const steps = [
  {
    title: '填写申请信息',
    content: 'First-content',
    type: 1,
  },
  {
    title: '填写店铺信息',
    content: 'Second-content',
    type: 2,
  },
];

class AddShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      idCardFrontPic: '', //身份证正面
      idCardBackPic: '', //身份证反面
      businessLicenseFront: '', //营业执照
      shopLogo: '', //店铺logo
      shopCover: '', //店铺封面
      tradeList: [], //所属行业列表
      tradeIds: '', //行业ID
      shopTypeShow: 1, // 店铺类型,
      confirmLoading: false,
    };
  }

  componentDidMount() {
    let searchObj = dismantleSearch(this)
    this.setState({
      ...searchObj
    })
    this.props.triggerRef && this.props.triggerRef(this)

    if (searchObj.id) {
      this.edit(searchObj.id)
      this.setState({
        isEdit: true
      })
    } else {
      this.setState({
        isEdit: false
      })
    }

    this.getTradeList()
  }

  getTradeList = () => {
    request({
      url: CategoryFindAllCateId,
    }).then(res => {
      console.log(res)
      let tradeList = res.data
      for (let i = 0; i < tradeList.length; i++) {
        tradeList[i].value = tradeList[i].name
        tradeList[i].label = tradeList[i].name
      }
      this.setState({
        tradeList
      })
    })
  }

  edit = (id) => {
    request({
      url: ShopDetial,
      params: {
        shopId: id,
        md5Str: localStorage.getItem('authed'),
      }
    }).then(res => {
      let resdata = res.data
      let setData = {
        shopType: resdata.shopType,
        userName: resdata.userName,
        idCard: resdata.idCard,
        mobile: resdata.mobile,
        bankCard: resdata.bankCard,
        bankName: resdata.bankName,
        shopName: resdata.shopName,
        trade: resdata.trade.split(','),
        shopOwnerAccount: resdata.shopOwnerAccount,
        stars: resdata.stars,
        authLevel: resdata.authLevel,
        shopDesc: resdata.shopDesc,
      }
      if (resdata.companyName) {
        setData.companyName = resdata.companyName
      }
      this.setState({
        idCardFrontPic: resdata.idCardFrontPic,
        idCardFrontPicId: resdata.idCardFrontPicId,
        idCardBackPic: resdata.idCardBackPic,
        idCardBackPicId: resdata.idCardBackPicId,
        shopLogo: resdata.shopLogo,
        businessLicenseFront: resdata.businessLicenseFront,
        businessLicenseFrontId: resdata.businessLicenseFrontId,
        shopCover: resdata.shopCover,
        shopTypeShow: resdata.shopType,
        tradeIds: resdata.tradeIds,
      }, () => {
        this.props.form.setFieldsValue({ ...setData })
      })
    })
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  saveOk = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.setState({
          confirmLoading: true,
        })
        values.trade = values.trade.join(',')

        const { id, idCardFrontPic, idCardBackPic, shopLogo, shopCover, businessLicenseFront, businessLicenseBack, tradeIds
          , idCardFrontPicId, idCardBackPicId, businessLicenseFrontId } = this.state

        let params = {
          ...values,
          idCardFrontPic: idCardFrontPic,
          idCardBackPic: idCardBackPic,
          businessLicenseFront: businessLicenseFront,
          idCardFrontPicId,
          idCardBackPicId,
          businessLicenseFrontId,
          businessLicenseBack: businessLicenseBack,
          shopLogo: shopLogo,
          shopCover: shopCover,
          tradeIds: tradeIds,
        }
        // if (values.shopType === 1) {
        //   params.businessLicenseFront = businessLicenseFront
        //   params.businessLicenseFrontId = businessLicenseFrontId
        // }
        let url = ShopAdd
        if (id) {
          url = ShopUpdate
          params.shopId = this.state.id
        }

        params.userId = '0'
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: params
        }).then(res => {
          if (res.code === 100) {
            let messageText = id ? '保存成功' : '添加成功'
            message.success(messageText)
            setTimeout(() => {
              this.props.history.goBack()
            }, 1000);
          } else {
            message.success(res.message)
          }
          this.setState({
            confirmLoading: false,
          })
        }).catch(err => {
          message.error(err.message)
          this.setState({
            confirmLoading: false,
          })
        })
      } else {
        message.error('有未填写信息')
      }
    })
  }

  imgUploadSuccessCallback = (img, type, imgid) => {
    console.log(img)
    console.log(imgid)
    let obj = {}
    switch (type) {
      case 'idCardFrontPic':
        obj.idCardFrontPic = img
        obj.idCardFrontPicId = imgid
        break;
      case 'idCardBackPic':
        obj.idCardBackPic = img
        obj.idCardBackPicId = imgid
        break;
      case 'shopLogo':
        obj.shopLogo = img
        break;
      case 'shopCover':
        obj.shopCover = img
        break;
      case 'businessLicenseFront':
        obj.businessLicenseFront = img
        obj.businessLicenseFrontId = imgid
        break;
      default:
        obj = {}
    }
    console.log(obj)
    this.setState({
      ...obj
    })
  }

  shopTypeChange = (e) => {
    console.log(e.target.value)
    let value = e.target.value
    this.setState({
      shopTypeShow: value
    })
  }
  tradeChange = (e) => {
    console.log(e)
    let tradeList = this.state.tradeList
    let ids = []
    for (let i = 0; i < tradeList.length; i++) {
      for (let j = 0; j < e.length; j++) {
        if (e[j] === tradeList[i].value) {
          ids.push(tradeList[i].id)
        }
      }
    }
    this.setState({
      tradeIds: ids.join(',')
    })
  }

  render() {
    const inputStyle = { width: 500 }
    const { current, idCardFrontPic, idCardBackPic, shopLogo, shopCover, shopTypeShow, tradeList, businessLicenseFront, confirmLoading, id } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    const formItemLayoutTwo = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
    };
    const formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    return (
      <div className="add-shop-box">

        <Row>
          <Col span={4} style={{ textAlign: 'right', color: 'rgba(0, 0, 0, 0.85)' }}></Col>
          <Col span={19}>

            <div style={{ width: 500, margin: '20px 0 30px' }}>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
          </Col>
        </Row>


        <Form {...formLayout}>

          <div className={steps[current].type === 1 ? '' : 'display-none'}>
            <Form.Item label="商户类型">
              {getFieldDecorator('shopType', { valuePropName: 'value', initialValue: 1, rules: [{ required: true, message: '请选择店铺类型' }] })(
                <Radio.Group onChange={this.shopTypeChange}>
                  <Radio value={0}>个人</Radio>
                  <Radio value={1}>企业</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            {
              shopTypeShow === 1 && <>
                <Form.Item label="企业名称">
                  {getFieldDecorator('companyName', { valuePropName: 'value', rules: [{ required: true, message: '请输入企业名称' }] })(<Input style={inputStyle} />)}
                </Form.Item>
                <Form.Item label="法人名称">
                  {getFieldDecorator('userName', { valuePropName: 'value', rules: [{ required: true, message: '请输入姓名' }] })(<Input style={inputStyle} />)}
                </Form.Item>

                <Form.Item label="法人身份证号码">
                  {getFieldDecorator('idCard', { valuePropName: 'value', rules: [{ required: true, message: '请输入身份证号码' }] })(<Input style={inputStyle} />)}
                </Form.Item>
              </>
            }

            {
              shopTypeShow === 0 && <>
                <Form.Item label="姓名">
                  {getFieldDecorator('userName', { valuePropName: 'value', rules: [{ required: true, message: '请输入姓名' }] })(<Input style={inputStyle} />)}
                </Form.Item>

                <Form.Item label="身份证号码">
                  {getFieldDecorator('idCard', { valuePropName: 'value', rules: [{ required: true, message: '请输入身份证号码' }] })(<Input style={inputStyle} />)}
                </Form.Item>
              </>
            }

            <Form.Item label="手机号">
              {getFieldDecorator('mobile', { valuePropName: 'value', rules: [{ required: true, message: '请输入手机号' }] })(
                <Input style={{ width: 250, marginRight: 20 }} disabled={id} />
              )}
              <span style={{ fontSize: 12, color: '#f5222d' }}>请慎重填写手机号，不可修改</span>
            </Form.Item>
            <Form.Item label="银行卡号">
              {getFieldDecorator('bankCard', { valuePropName: 'value', rules: [{ required: true, message: '请输入银行卡' }] })(<Input style={inputStyle} />)}
            </Form.Item>
            <Form.Item label="开户行">
              {getFieldDecorator('bankName', { valuePropName: 'value', rules: [{ required: true, message: '请输入开户行' }] })(<Input style={inputStyle} />)}
            </Form.Item>

            <Row>
              <Col span={5} style={{ textAlign: 'right', color: 'rgba(0, 0, 0, 0.85)' }}>
                身份证信息：
              </Col>
              <Col span={19}>
                <div style={{ display: 'inline-block', width: 240, height: 120, marginRight: 20 }}>
                  <Gupload className="avatar-uploader-card" uploadButtonText="请上传手持身份证正面" file={idCardFrontPic} success={(img, imgid) => { this.imgUploadSuccessCallback(img, 'idCardFrontPic', imgid) }} />
                </div>
                <div style={{ display: 'inline-block', width: 240, height: 120 }}>
                  <Gupload className="avatar-uploader-card" uploadButtonText="请上传手持身份证反面" file={idCardBackPic} success={(img, imgid) => { this.imgUploadSuccessCallback(img, 'idCardBackPic', imgid) }} />
                </div>
              </Col>
            </Row>

            {
              shopTypeShow === 1 && <>
                <Form.Item label="营业执照">
                  <Gupload className="avatar-uploader-card" uploadButtonText="请上传营业执照" file={businessLicenseFront} success={(img, imgid) => { this.imgUploadSuccessCallback(img, 'businessLicenseFront', imgid) }} />
                </Form.Item>
              </>
            }
          </div>

          <div className={steps[current].type === 2 ? '' : 'display-none'}>

            <Form.Item label="店铺名称">
              {getFieldDecorator('shopName', { valuePropName: 'value', rules: [{ required: true, message: '请输入店铺名称' }] })(<Input style={inputStyle} />)}
            </Form.Item>
            <Form.Item label="主营业务">
              {getFieldDecorator('trade', { valuePropName: 'value', rules: [{ required: true, message: '请选择主营业务' }] })(
                <Select mode="multiple" placeholder='请选择主营业务' style={inputStyle} onChange={this.tradeChange}>
                  {getOptionsList(tradeList)}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="店长账号">
              {getFieldDecorator('shopOwnerAccount', { valuePropName: 'value' })(<Input style={inputStyle} />)}
            </Form.Item>

            <Form.Item label="店铺星级">
              {getFieldDecorator('stars', { valuePropName: 'value' })(<Rate />)}
            </Form.Item>
            <Form.Item label="店铺等级">
              {getFieldDecorator('authLevel', { valuePropName: 'value' })(
                <Radio.Group>
                  <Radio value={0}>普通店铺</Radio>
                  <Radio value={1}>优选店铺</Radio>
                  <Radio value={2}>自营店铺</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <div style={{ width: '100%', display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <Form.Item label="店铺logo" {...formItemLayout}>
                  <Gupload uploadButtonText="上传logo（200*200）" file={shopLogo} success={(img) => { this.imgUploadSuccessCallback(img, 'shopLogo') }} />
                </Form.Item>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginLeft: '-30%' }}>
                  <Form.Item label="店铺封面" {...formItemLayoutTwo}>
                    <Gupload uploadButtonText="上传封面（686*280）" file={shopCover} success={(img) => { this.imgUploadSuccessCallback(img, 'shopCover') }} />
                  </Form.Item>
                </div>
              </div>
            </div>
            <Form.Item label="店铺简介">
              {getFieldDecorator('shopDesc', { valuePropName: 'value' })(<TextArea style={{ width: 500, minHeight: 100 }} />)}
            </Form.Item>
          </div>

          <Form.Item label=" " colon={false}>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" style={{ width: 200 }} onClick={() => this.next()}>下一步</Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" style={{ width: 200 }} onClick={() => this.prev()}>上一步</Button>
              )}
              {current > 0 && (
                <Button style={{ marginLeft: 8, width: 200 }} loading={confirmLoading} type="primary" onClick={this.saveOk}>提交</Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}


export default Form.create()(AddShop)