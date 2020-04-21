import React from 'react'
import { Form, Input, Radio, Button, Select } from "antd";
import connect from '../../../../utils/connect'
import request from "../../../../utils/request";
import Gupload from '../../../../common/Gupload'
import { ConfigDetail, ConfigAdd, ConfigUpdate,AuctionGetHouseSateList } from '../../../../config/api'
import { getOptionsList } from '../../../../utils'
import '../index.less'

@connect
class OperationAdd extends React.Component {
  constructor() {
    super()

    this.state = {
      gridInfo: {},
      pushPic: '',
      terminalTypeShow: '',
      imgtext: '',
      contentTypeValue: null,
      houseSateList: [],
      houseSateValue: null,
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
    let { bannerid, messageText } = this.props
    this.getAuctionGetHouseSateList(()=> {
      this.setState({
        disabled: messageText === "查看详情" ? true : false,
        bannerid: Number(bannerid),
      }, () => {
        if (bannerid) {
          this.getConfigDetail(bannerid)
        } else {
          this.props.form.resetFields();
        }
      })
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
    }).catch(()=> {
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

  getConfigDetail = (id) => {
    request({
      url: ConfigDetail,
      method: 'get',
      params: {
        id: id
      }
    }).then(res => {
      let data = res.data
      let terminalType = data.terminalType
      let remarkMap =data.remarkMap
      let setData = {
        title: remarkMap.title,
        name: remarkMap.title,
        subTitle: remarkMap.subTitle,
        pic: data.image,
        sort: data.sort,
        terminalType: terminalType,
        accessUrl: data.accessUrl,
      }
      if (data.contentType) {
        setData.contentType = data.contentType
      }
      if (data.paramContent) {
        setData.paramContent = data.paramContent
      }
      this.setState({
        gridInfo: data,
        pic: data.image,
        terminalTypeShow: data.terminalType,
        pushPic: data.pushPic,
        houseSateValue: data.contentType === 13 ? Number(data.paramContent) : null,
        contentTypeValue: data.contentType,
      }, () => {
        this.props.form.setFieldsValue({ ...setData })
      })
    })
  }

  save = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { name } = this.props.state
        let url = ConfigAdd
        const bannerid = this.state.bannerid
        if (bannerid) {
          url = ConfigUpdate
          values.id = bannerid
        }
        values.type = 'card'
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: {
            ...values,
            createUser: name,
            name: values.title,
          }
        }).then(res => {
          if (res.code === 100) {
            this.props.successCallback()
          }
        })
      }
    })
  }

  terminalTypeChange = (e) => {
    this.setState({
      terminalTypeShow: e.target.value
    }, () => {
      this.props.form.setFieldsValue({
        contentType: null,
        paramContent: '',
        accessUrl: '',
      })
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
    this.setState({
      pic: img
    })
    this.props.form.setFieldsValue({ pic: img })
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
  selectSortChange = (e) => {
    let text = ''
    if (e === 1 || e === 4) {
      text = '（335*182）'
    } else {
      text = '（335*238）'
    }
    this.setState({
      imgtext: text
    })
  }
  render() {
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };

    const { pic, terminalTypeShow, disabled, imgtext,contentTypeValue,houseSateList,houseSateValue } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className="ba-box">
        <Form {...formLayout}>

          <Form.Item label="主标题">
            {getFieldDecorator('title', { valuePropName: 'value', rules: [{ required: true, message: "请输入主标题" }] })(
              <Input style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>

          <Form.Item label="副标题">
            {getFieldDecorator('subTitle', { valuePropName: 'value', rules: [{ required: true, message: "请输入副标题" }] })(
              <Input style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>
          <Form.Item label="选择位置">
            {getFieldDecorator('sort', { valuePropName: 'value', rules: [{ required: true, message: "请选择位置" }] })(
              <Select placeholder='请选择所在位置' style={{ width: 400 }} onChange={this.selectSortChange}>
                {getOptionsList([
                  { id: '1', value: 1, label: '第一张（335*182）' },
                  { id: '2', value: 2, label: '第二张（335*238）' },
                  { id: '3', value: 3, label: '第三张（335*238）' },
                  { id: '4', value: 4, label: '第四张（335*182）' },
                ])}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="运营区图片">
            {getFieldDecorator('pic', { valuePropName: 'value', rules: [{ required: true, message: "请上传运营区图片" }] })(
              <Gupload file={pic} uploadButtonText={"上传图片" + imgtext} success={img => this.uploadSuccessCallback(img, 'productPicUrl')} />
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
                {getFieldDecorator('contentType', { valuePropName: 'value', rules: [{ required: true, message: "请输入跳转类型" }] })(
                  <Radio.Group disabled={disabled} onChange={this.contentTypeChange}>
                    <Radio value={11}>商品</Radio>
                    <Radio value={12}>拍品</Radio>
                    <Radio value={13}>专场</Radio>
                    <Radio value={10}>分类</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              {
                contentTypeValue === 13 && <>
                  <Form.Item label="选择专场">
                    <Select style={{ width: 400 }} defaultValue={houseSateValue} onChange={this.houseSateChange}>
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
              <Form.Item label="跳转链接">
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


const OperationAddFrom = Form.create()(OperationAdd)

export default OperationAddFrom