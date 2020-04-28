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
      front: '', //身份证正面
      back: '', //身份证反面
      license: '', //营业执照
      logo: '', //店铺logo
      cover: '', //店铺封面
      tradeList: [], //所属行业列表
      tradeIds: '', //行业ID
      attributeShow: 1, // 店铺类型,
      confirmLoading: false,
    };
  }

  componentDidMount() {
    let searchObj = dismantleSearch(this)
    this.setState({
      ...searchObj
    })
    this.props.triggerRef && this.props.triggerRef(this)

    if (searchObj.shopId) {
      this.edit(searchObj.shopId)
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

  getTradeList = (pId = 0) => {
    request({
      url: CategoryFindAllCateId,
      params: {
        parentId: pId
      }
    }).then(res => {
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

  edit = (shopId) => {
    request({
      url: ShopDetial,
      params: {
        id: shopId,
        // md5Str: localStorage.getItem('authed'),
      }
    }).then(res => {
      let resdata = res.data

      let merchantDTO = resdata.merchantDTO || {}
      let setData = {
        attribute: merchantDTO.attribute,
        legalName: merchantDTO.legalName,
        idCard: merchantDTO.idCard,
        mobile: merchantDTO.mobile,
        bankNum: merchantDTO.bankNum,
        bankOpen: merchantDTO.bankOpen,
        companyName: merchantDTO.name,
        shopName: resdata.name,
        mainBiz: resdata.mainBiz.split(','),
        stars: resdata.stars,
        type: resdata.type,
        shopDesc: resdata.shopDesc,
        tag: resdata.tag,
        shopMobile: resdata.shopMobile,
      }
      this.setState({
        merchantId: merchantDTO.id,
        front: merchantDTO.front,
        back: merchantDTO.back,
        license: merchantDTO.license,
        attributeShow: merchantDTO.attribute,
        shopId: resdata.shopId,
        logo: resdata.logo,
        cover: resdata.cover,
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
        values.mainBiz = values.mainBiz.join(',')

        const { merchantId, shopId, front, back, logo, cover, license } = this.state

        let params = {}

        params.merchant = {
          attribute: values.attribute,
          back: back,
          bankNum: values.bankNum,
          bankOpen: values.bankOpen,
          front: front,
          idCard: values.idCard,
          legalName: values.legalName,
          reason: values.reason,
          state: values.state,
          mobile: values.mobile
        }

        if (values.attribute) {
          params.merchant.license = license
          params.merchant.name = values.companyName
        } else {
          params.merchant.license = ''
          params.merchant.name = ''
        }

        params.shop = {
          attribute: 1,
          name: values.shopName,
          cover: cover,
          followerNum: values.followerNum,
          logo: logo,
          mainBiz: values.mainBiz,
          // mainBiz: tradeIds,
          reason: values.reason,
          recommend: values.recommend,
          shopMobile: values.shopMobile,
          shopDesc: values.shopDesc,
          stars: values.stars,
          tag: values.tag,
          type: values.type,
        }
        // if (values.attribute === 1) {
        //   params.license = license
        // }
        let url = ShopAdd
        if (shopId) {
          url = ShopUpdate
          params.merchant.id = merchantId
          params.shop.shopId = shopId
        }
        request({
          url: url,
          method: 'post',
          // params: { md5Str: localStorage.getItem('authed') },
          data: params
        }).then(res => {
          if (res.code === 100) {
            let messageText = shopId ? '保存成功' : '添加成功'
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
      case 'front':
        obj.front = img
        break;
      case 'back':
        obj.back = img
        break;
      case 'logo':
        obj.logo = img
        break;
      case 'cover':
        obj.cover = img
        break;
      case 'license':
        obj.license = img
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
      attributeShow: value
    })
  }
  tradeChange = (e) => {
    console.log(e)
    // let tradeList = this.state.tradeList
    // let ids = []
    // for (let i = 0; i < tradeList.length; i++) {
    //   for (let j = 0; j < e.length; j++) {
    //     if (e[j] === tradeList[i].value) {
    //       ids.push(tradeList[i].id)
    //     }
    //   }
    // }
    // this.setState({
    //   tradeIds: ids.join(',')
    // })
  }

  render() {
    const inputStyle = { width: 500 }
    const { current, front, back, logo, cover, attributeShow, tradeList, license, confirmLoading } = this.state;
    console.log(logo)
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
              {getFieldDecorator('attribute', { valuePropName: 'value', initialValue: 1, rules: [{ required: true, message: '请选择店铺类型' }] })(
                <Radio.Group onChange={this.shopTypeChange}>
                  <Radio value={0}>个人</Radio>
                  <Radio value={1}>企业</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            {
              attributeShow === 1 && <>
                <Form.Item label="企业名称">
                  {getFieldDecorator('companyName', { valuePropName: 'value', rules: [{ required: true, message: '请输入企业名称' }] })(<Input style={inputStyle} />)}
                </Form.Item>
                <Form.Item label="法人名称">
                  {getFieldDecorator('legalName', { valuePropName: 'value', rules: [{ required: true, message: '请输入姓名' }] })(<Input style={inputStyle} />)}
                </Form.Item>

                <Form.Item label="法人身份证号码">
                  {getFieldDecorator('idCard', { valuePropName: 'value', rules: [{ required: true, message: '请输入身份证号码' }] })(<Input style={inputStyle} />)}
                </Form.Item>
              </>
            }

            {
              attributeShow === 0 && <>
                <Form.Item label="姓名">
                  {getFieldDecorator('legalName', { valuePropName: 'value', rules: [{ required: true, message: '请输入姓名' }] })(<Input style={inputStyle} />)}
                </Form.Item>

                <Form.Item label="身份证号码">
                  {getFieldDecorator('idCard', { valuePropName: 'value', rules: [{ required: true, message: '请输入身份证号码' }] })(<Input style={inputStyle} />)}
                </Form.Item>
              </>
            }

            <Form.Item label="手机号">
              {getFieldDecorator('mobile', { valuePropName: 'value', rules: [{ required: true, message: '请输入手机号' }] })(
                <Input style={{ width: 250, marginRight: 20 }} />
              )}
              {/* <span style={{ fontSize: 12, color: '#f5222d' }}>请慎重填写手机号，不可修改</span> */}
            </Form.Item>
            <Form.Item label="银行卡号">
              {getFieldDecorator('bankNum', { valuePropName: 'value', rules: [{ required: true, message: '请输入银行卡' }] })(<Input style={inputStyle} />)}
            </Form.Item>
            <Form.Item label="开户行">
              {getFieldDecorator('bankOpen', { valuePropName: 'value', rules: [{ required: true, message: '请输入开户行' }] })(<Input style={inputStyle} />)}
            </Form.Item>

            <Row>
              <Col span={5} style={{ textAlign: 'right', color: 'rgba(0, 0, 0, 0.85)' }}>
                身份证信息：
              </Col>
              <Col span={19}>
                <div style={{ display: 'inline-block', width: 240, height: 120, marginRight: 20 }}>
                  <Gupload className="avatar-uploader-card" uploadButtonText="请上传手持身份证正面" file={front} success={(img, imgid) => { this.imgUploadSuccessCallback(img, 'front', imgid) }} />
                </div>
                <div style={{ display: 'inline-block', width: 240, height: 120 }}>
                  <Gupload className="avatar-uploader-card" uploadButtonText="请上传手持身份证反面" file={back} success={(img, imgid) => { this.imgUploadSuccessCallback(img, 'back', imgid) }} />
                </div>
              </Col>
            </Row>

            {
              attributeShow === 1 && <>
                <Form.Item label="营业执照">
                  <Gupload className="avatar-uploader-card" uploadButtonText="请上传营业执照" file={license} success={(img, imgid) => { this.imgUploadSuccessCallback(img, 'license', imgid) }} />
                </Form.Item>
              </>
            }
          </div>

          <div className={steps[current].type === 2 ? '' : 'display-none'}>

            <Form.Item label="店铺名称">
              {getFieldDecorator('shopName', { valuePropName: 'value', rules: [{ required: true, message: '请输入店铺名称' }] })(<Input style={inputStyle} />)}
            </Form.Item>
            <Form.Item label="主营业务">
              {getFieldDecorator('mainBiz', { valuePropName: 'value', rules: [{ required: true, message: '请选择主营业务' }] })(
                <Select mode="multiple" placeholder='请选择主营业务' style={inputStyle} onChange={this.tradeChange}>
                  {getOptionsList(tradeList)}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="店长手机号">
              {getFieldDecorator('shopMobile', { valuePropName: 'value' })(<Input style={inputStyle} />)}
            </Form.Item>
            <Form.Item label="店铺标签">
              {getFieldDecorator('tag', { valuePropName: 'value' })(<Input style={inputStyle} />)}
            </Form.Item>
            <Form.Item label="店铺星级">
              {getFieldDecorator('stars', { valuePropName: 'value' })(<Rate />)}
            </Form.Item>
            <Form.Item label="店铺等级">
              {getFieldDecorator('type', { valuePropName: 'value' })(
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
                  <Gupload uploadButtonText="上传logo（200*200）" file={logo} success={(img) => { this.imgUploadSuccessCallback(img, 'logo') }} />
                </Form.Item>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginLeft: '-30%' }}>
                  <Form.Item label="店铺封面" {...formItemLayoutTwo}>
                    <Gupload uploadButtonText="上传封面（686*280）" file={cover} success={(img) => { this.imgUploadSuccessCallback(img, 'cover') }} />
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