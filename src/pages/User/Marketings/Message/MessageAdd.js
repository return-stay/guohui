import React from 'react'
import { Form, Input, Radio, Button,Select } from "antd";
import connect from '../../../../utils/connect'
import request from "../../../../utils/request";
import Gupload from '../../../../common/Gupload'
import { AddMessage, MessageDetail, AuctionGetHouseSateList } from '../../../../config/api'
import '../index.less'
import { getOptionsList } from "../../../../utils";
const { TextArea } = Input

@connect
class MessageAdd extends React.Component {
  constructor() {
    super()

    this.state = {
      pushPic: '',
      terminalTypeShow: '',
      houseSateList: [],
      houseSateValue: null,
      contentTypeValue: null,
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)

    let { messageid, messageText } = this.props
    this.getAuctionGetHouseSateList()
    this.setState({
      disabled: messageText === "查看详情" ? true : false
    }, () => {
      if (messageid) {
        this.getMessageDetail(messageid)
      }
    })
  }

  getMessageDetail = (id) => {
    const that = this
    request({
      url: MessageDetail,
      method: 'get',
      params: {
        messageId: id
      }
    }).then(res => {
      console.log(res)

      let data = res.data
      let type = data.terminalType
      let setData = {
        pushTitle: data.pushTitle,
        pushDesc: data.pushDesc,
        pushPic: data.pushPic,
        terminalType: type,
        accessUrl: data.accessUrl,
      }
      if (data.contentType) {
        setData.contentType = data.contentType
      }
      if (data.paramContent) {
        setData.paramContent = data.paramContent
      }
      this.setState({
        terminalTypeShow: data.terminalType,
        pushPic: data.pushPic,
        houseSateValue: data.contentType === 13 ? that.returnHouseStateValue(data.paramContent) : null,
        contentTypeValue: data.contentType,
      }, () => {
        this.props.form.setFieldsValue({ ...setData })
      })
    })
  }

  returnHouseStateValue = (str) => {
    let obj = JSON.parse(str)
    let num = obj.id || obj.orderId
    return num
  }

  save = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { name } = this.props.state
        request({
          url: AddMessage,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: {
            ...values,
            createUser: name,
          }
        }).then(res => {
          if (res.code === 100) {
            this.props.successCallback()
          }
        })
      }
    })
  }

  // 获取专场列表
  getAuctionGetHouseSateList = (callback) => {
    request({
      url: AuctionGetHouseSateList,
      loading: false,
      params: {
        md5Str: localStorage.getItem('authed')
      },
    }).then(res => {
      if (res.code === 100 && res.data) {
        let arr = res.data.auctionHouseList
        for (let i = 0; i < arr.length; i++) {
          arr[i].label = arr[i].name
          arr[i].value = arr[i].id
        }
        callback && callback()
        this.setState({
          houseSateList: arr
        })
      }
    }).catch(() => {
      callback && callback()
    })
  }

  houseSateChange = (e) => {
    this.props.form.setFieldsValue({ paramContent: e })
  }

  contentTypeChange = (e) => {
    this.setState({
      contentTypeValue: e.target.value
    })
  }

  terminalTypeChange = (e) => {
    this.setState({
      terminalTypeShow: e.target.value
    })
  }
  addBannerItem = () => {
    let bannerImgList = this.state.bannerImgList
    let timeId = (new Date()).valueOf()
    bannerImgList.push({
      id: timeId,
      bannerSrc: '',
      bannerUrl: '',
      bannerName: '',
    })
    this.setState({
      bannerImgList
    })
  }

  uploadSuccessCallback = (img) => {
    console.log(img)
    this.setState({
      pushPic: img
    })
    this.props.form.setFieldsValue({ pushPic: img })
  }
  closeBannerItem = (e) => {
    let id = Number(e.currentTarget.getAttribute('data-key'))
    let bannerImgList = this.state.bannerImgList
    if (bannerImgList.length > 1) {
      for (let i = 0; i < bannerImgList.length; i++) {
        if (id === bannerImgList[i].id) {
          bannerImgList.splice(i, 1)
        }
      }
      this.setState({
        bannerImgList
      })
    }

  }
  render() {
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };

    const { pushPic, terminalTypeShow, disabled, contentTypeValue,houseSateList ,houseSateValue} = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="ba-box">
        <Form {...formLayout}>

          <Form.Item label="消息标题">
            {getFieldDecorator('pushTitle', { valuePropName: 'value', rules: [{ required: true, message: "请输入广告名称" }] })(
              <Input style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>
          <Form.Item label="摘要">
            {getFieldDecorator('pushDesc', { valuePropName: 'value', rules: [{ required: true, message: '请输入消息内容' }] })(
              <TextArea style={{ width: 400 }} disabled={disabled}> </TextArea>
            )}
          </Form.Item>
          <Form.Item label="消息图片">
            {getFieldDecorator('pushPic', { valuePropName: 'value', rules: [{ required: true, message: "请上传消息图片" }] })(
              <Gupload file={pushPic} uploadButtonText="上传图片(80*80)" success={img => this.uploadSuccessCallback(img, 'productPicUrl')} />
            )}
          </Form.Item>
          <Form.Item label="跳转页面">
            {getFieldDecorator('terminalType', { valuePropName: 'value', rules: [{ required: true, message: "请选择跳转页面" }] })(
              <Radio.Group onChange={this.terminalTypeChange} disabled={disabled}>
                <Radio value='inner'>内部跳转</Radio>
                <Radio value='H5'>外部跳转</Radio>
                <Radio value='program'>小程序跳转</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          {
            terminalTypeShow === 'inner' && <>
              <Form.Item label="跳转类型">
                {getFieldDecorator('contentType', { valuePropName: 'value', initialValue: 11,  rules: [{ required: true, message: "请输入跳转类型" }] })(
                  <Radio.Group disabled={disabled} onChange={this.contentTypeChange}>
                    <Radio value={11}>商品</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              {
                contentTypeValue === 13 && <>
                  <Form.Item label="选择专场">
                    <Select disabled={disabled} style={{ width: 400 }} defaultValue={houseSateValue} onChange={this.houseSateChange}>
                      {getOptionsList(houseSateList)}
                    </Select>
                  </Form.Item>
                </>
              }
              <Form.Item label="小程序链接">
                {getFieldDecorator('accessUrl', { valuePropName: 'value' })(
                  <Input style={{ width: 400 }} disabled={disabled} />
                )}
              </Form.Item>
              <Form.Item label="APPID">
                {getFieldDecorator('paramContent', { valuePropName: 'value' })(
                  <Input style={{ width: 400 }} disabled={disabled} />
                )}
              </Form.Item>
            </>
          }
          {
            terminalTypeShow === 'H5' && <>
              <Form.Item label="消息链接">
                {getFieldDecorator('accessUrl', { valuePropName: 'value' })(
                  <Input style={{ width: 400 }} disabled={disabled} />
                )}
              </Form.Item>
            </>
          }
          {
            terminalTypeShow === 'program' && <>
              <Form.Item label="小程序链接">
                {getFieldDecorator('accessUrl', { valuePropName: 'value' })(
                  <Input style={{ width: 400 }} disabled={disabled} />
                )}
              </Form.Item>
              <Form.Item label="APPID">
                {getFieldDecorator('paramContent', { valuePropName: 'value' })(
                  <Input style={{ width: 400 }} disabled={disabled} />
                )}
              </Form.Item>
            </>
          }

          {
            !disabled && <Form.Item label=" " colon={false}>
              <Button type="primary" onClick={this.save}>保存</Button>
            </Form.Item>
          }
        </Form>
      </div>

    )
  }
}


const MessageAddFrom = Form.create()(MessageAdd)

export default MessageAddFrom