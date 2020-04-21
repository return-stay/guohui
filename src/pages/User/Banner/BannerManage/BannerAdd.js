import React from 'react'
import { Form, Select, Input, Radio, Button, InputNumber, DatePicker } from "antd";
import connect from '../../../../utils/connect'
import { getOptionsList } from "../../../../utils";
import Gupload from '../../../../common/Gupload'
import { ConfigAdd, ConfigDetail, ConfigUpdate, AuctionGetHouseSateList } from '../../../../config/api'
import request from '../../../../utils/request'
import moment from 'moment'
import '../index.less'

@connect
class BannerAdd extends React.Component {
  constructor() {
    super()

    this.state = {
      visible: false,
      title: '编辑',
      terminalTypeShow: '',
      imgtext: '',
      isCarouseShow: false,//是否是轮播图广告
      contentTypeValue: null,
      houseSateList: [],
      houseSateValue: null,
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)

    let { bannerid, messageText } = this.props
    const that = this
    this.getAuctionGetHouseSateList(()=> {
      that.setState({
        disabled: messageText === "查看详情" ? true : false,
        bannerid,
      }, () => {
        if (bannerid) {
          that.getConfigDetail(bannerid)
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
      let terminalType = data.terminalType;
      let setData = {
        title: data.title,
        pic: data.image,
        type: data.type,
        status: data.status,
        terminalType: terminalType,
        accessUrl: data.accessUrl,
        sort: data.sort,
      }
      if (data.contentType) {
        setData.contentType = data.contentType
      }
      if (data.paramContent) {
        setData.paramContent = data.paramContent
      }

      if (data.type === 'carouse' || data.type === 'mallCarousel') {
        setData.startTime = data.startTime ? moment(data.startTime) : null
        setData.endTime = data.endTime ? moment(data.endTime) : null
      }

      this.setState({
        gridInfo: data,
        pic: data.image,
        terminalTypeShow: data.terminalType,
        pushPic: data.pushPic,
        isCarouseShow: data.type === 'carouse' || data.type === 'mallCarousel',
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
        values.startTime = moment(values.startTime).format('YYYY-MM-DD HH:mm:ss')
        values.endTime = moment(values.endTime).format('YYYY-MM-DD HH:mm:ss')
        values.name = values.title
        request({
          url: url,
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
  uploadSuccessCallback = (img) => {
    this.setState({
      pic: img
    })
    this.props.form.setFieldsValue({ pic: img })
  }

  terminalTypeChange = (e) => {
    let value = e.target.value
    this.setState({
      terminalTypeShow: value
    }, () => {
      if (value === 'program' || value === 'inner') {
        this.props.form.setFieldsValue({
          contentType: null,
          paramContent: '',
          accessUrl: ''
        })
      }
    })
  }

  slectTypeChange = (e) => {
    let text = ''
    let bool = false
    switch (e) {
      case 'advert':
        text = '首页广告（685*140）'
        break;
      case 'mallAdvert':
        text = '商城广告（685*140）'
        break;
      case 'carouse':
        text = '首页轮播图（680*406）'
        bool = true
        break;
      case 'mallCarousel':
        text = '商城轮播图（680*406）'
        bool = true
        break;
      case 'openImage':
        text = '启动图（1920*1080）'
        break;
      case 'popupImage':
        text = '弹窗广告图（564*890）'
        break;
      default:
        text = ''
    }

    this.setState({
      imgtext: text,
      isCarouseShow: bool,
    })
  }
  render() {
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };

    const { pic, disabled, terminalTypeShow, imgtext, isCarouseShow, contentTypeValue, houseSateList,houseSateValue } = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="ba-box">
        <Form {...formLayout}>

          <Form.Item label="广告名称">
            {getFieldDecorator('title', { valuePropName: 'value', rules: [{ required: true, message: "请输入广告名称" }] })(
              <Input style={{ width: 400 }} />
            )}
          </Form.Item>

          <Form.Item label="广告位置">
            {getFieldDecorator('type', { valuePropName: 'value', rules: [{ required: true, message: '请选择广告位置' }] })(
              <Select placeholder='请选择广告位置' style={{ width: 400 }} onChange={this.slectTypeChange}>
                {getOptionsList([
                  { id: 'advert', value: 'advert', label: '首页广告（685*140）' },
                  { id: 'mallAdvert', value: 'mallAdvert', label: '商城广告（685*140）' },
                  { id: 'carouse', value: 'carouse', label: '首页轮播图（680*406）' },
                  { id: 'mallCarousel', value: 'mallCarousel', label: '商城轮播图（680*406）' },
                  { id: 'openImage', value: 'openImage', label: '启动图（1920*1080）' },
                  { id: 'popupImage', value: 'popupImage', label: '弹窗广告图（564*890）' },
                ])}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="广告图片">
            {getFieldDecorator('pic', { valuePropName: 'value', rules: [{ required: true, message: "请上传金刚区图片" }] })(
              <Gupload className="avatar-uploader-card" file={pic} uploadButtonText={'请上传' + (imgtext || '图片')} success={img => this.uploadSuccessCallback(img, 'productPicUrl')} />
            )}
          </Form.Item>
          <Form.Item label="广告状态">
            {getFieldDecorator('status', { valuePropName: 'value', rules: [{ required: true, message: "请输入广告名称" }] })(
              <Radio.Group>
                <Radio value={0}>开启</Radio>
                <Radio value={1}>关闭</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          {
            isCarouseShow && <>
              <Form.Item label="开始时间">
                {getFieldDecorator('startTime', { valuePropName: 'value', rules: [{ required: true, message: "请选择开始时间" }] })(
                  <DatePicker showTime={true} placeholder='开始时间' format="YYYY-MM-DD HH:mm:ss" />
                )}
              </Form.Item>
              <Form.Item label="结束时间">
                {getFieldDecorator('endTime', { valuePropName: 'value', rules: [{ required: true, message: "请选择结束时间" }] })(
                  <DatePicker showTime={true} placeholder='结束时间' format="YYYY-MM-DD HH:mm:ss" />
                )}
              </Form.Item>
            </>
          }


          <Form.Item label="权重">
            {getFieldDecorator('sort', { valuePropName: 'value', initialValue: 1, rules: [{ required: true, message: "请输入广告名称" }] })(
              <InputNumber style={{ width: 120 }} min={0} />
            )}
            <span style={{ color: '#777', marginLeft: 20, fontSize: 13 }}>数值越大，排序越靠前</span>
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


const BannerAddFrom = Form.create()(BannerAdd)

export default BannerAddFrom