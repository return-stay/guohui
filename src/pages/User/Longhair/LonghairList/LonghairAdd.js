import React from 'react'
import { Form, Input, Radio, Button, DatePicker, Cascader } from "antd";
import connect from '../../../../utils/connect'
import request from "../../../../utils/request";
import Gupload from '../../../../common/Gupload'
import GvideoUpload from '../../../../common/Gupload/GvideoUpload'
import { ArtistAdd, ArtistDetail, ArtistModify, CategoryFindAllCate } from '../../../../config/api'
import Geditor from '../../../../common/Geditor'
import GeditorOther from '../../../../common/Geditor/GeditorOther'
import './index.less'
import moment from 'moment'
@connect
class LonghairAdd extends React.Component {
  constructor() {
    super()

    this.state = {
      portrait: 'https://icouncil.oss-cn-beijing.aliyuncs.com/b93e5376-91b6-4b14-bee0-fdf852782cb2.png',
      txtHtml: '',
      categoryList: [],
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
    this.getCategoryFindAllCate()
    let { artistid } = this.props
    console.log(artistid)
    this.setState({
      disabled: false
    }, () => {
      if (artistid) {
        this.getMessageDetail(artistid)
      }
    })
  }

  getCategoryFindAllCate = () => {
    request(
      {
        url: CategoryFindAllCate,
        params: {
          md5Str: localStorage.getItem('authed')
        }
      }
    ).then(res => {
      let list = res.data[0].childList
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].value = list[i].id
        list[i].label = list[i].name
        // if (list[i].childList && list[i].childList.length > 0) {
        //   let childList = list[i].childList
        //   for (let j = 0; j < childList.length; j++) {
        //     childList[j].value = childList[j].id
        //     childList[j].label = childList[j].name
        //   }
        //   list[i].children = childList
        // }
        list[i].children = null
      }
      this.setState({
        categoryList: list
      })
    })
  }

  getMessageDetail = (id) => {
    request({
      url: ArtistDetail,
      method: 'get',
      params: {
        artistId: id
      }
    }).then(res => {
      console.log(res)

      let data = res.data
      let setData = {
        artistName: data.artistName,
        birthday: moment(data.birthday),
        showTag: data.showTag,
        cateId: [data.cateOneId, data.optional],
        recommend: data.recommend,
        available: data.available,
        description: data.description,
      }
      this.setState({
        portrait: data.portrait || 'https://icouncil.oss-cn-beijing.aliyuncs.com/b93e5376-91b6-4b14-bee0-fdf852782cb2.png',
        videoUrl: data.videoUrl,
        txtHtml: data.description,
      }, () => {
        this.props.form.setFieldsValue({ ...setData })
      })
    })
  }

  save = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let url = ''
        values.portrait = this.state.portrait
        values.videoUrl = this.state.videoUrl
        values.birthday = moment(values.birthday).format('YYYY-MM-DD')
        values.cateOneId = values.cateId[0]
        // values.cateTwoId = values.cateId[1]
        delete values.cateId
        let data = {
          ...values,
        }
        if (this.props.artistid) {
          url = ArtistModify
          data.artistId = this.props.artistid
        } else {
          url = ArtistAdd
        }
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: data
        }).then(res => {
          if (res.code === 100) {
            this.props.successCallback()
          }
        })
      }
    })
  }


  houseSateChange = (e) => {
    this.props.form.setFieldsValue({ paramContent: e })
  }

  terminalTypeChange = (e) => {
    this.setState({
      terminalTypeShow: e.target.value
    })
  }


  editorChangeCallback = (html) => {
    this.setState({
      txtHtml: html
    }, () => {
      this.props.form.setFieldsValue({ description: html })
    })
  }

  uploadSuccessCallback = (img, type) => {
    console.log(img)
    let obj = {}
    switch (type) {
      case 'portrait':
        obj.portrait = img
        break;
      case 'videoUrl':
        obj.videoUrl = img
        break;
      default:
        obj = {}
    }
    this.setState({
      ...obj
    })
    // this.props.form.setFieldsValue({ portrait: img })
  }
  render() {
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };
    const { portrait, disabled, videoUrl, txtHtml, categoryList } = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="la-box">
        <Form {...formLayout}>

          <Form.Item label="艺术家名称">
            {getFieldDecorator('artistName', { valuePropName: 'value', rules: [{ required: true, message: "请输入广告名称" }] })(
              <Input style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>
          <Form.Item label="艺术家生日">
            {getFieldDecorator('birthday', { valuePropName: 'value', rules: [{ required: true, message: "请选择艺术家生日" }] })(
              <DatePicker />
            )}
          </Form.Item>
          <Form.Item label="艺术家头像">
            {getFieldDecorator('portrait', { valuePropName: 'value', initialValue:'https://icouncil.oss-cn-beijing.aliyuncs.com/b93e5376-91b6-4b14-bee0-fdf852782cb2.png' })(
              <Gupload file={portrait} uploadButtonText="上传图片(80*80)" success={img => this.uploadSuccessCallback(img, 'portrait')} />
            )}
          </Form.Item>

          <Form.Item label="艺术家标签">
            {getFieldDecorator('showTag', { valuePropName: 'value' })(
              <Input style={{ width: 400 }} disabled={disabled} />
            )}
          </Form.Item>

          <Form.Item label="所属分类">
            {getFieldDecorator('cateId', { valuePropName: 'value', rules: [{ required: true, message: "请输入所属分类" }] })(
              <Cascader style={{ width: 400 }} options={categoryList} placeholder="Please select" />
            )}
          </Form.Item>
          <Form.Item label="是否推荐">
            {getFieldDecorator('recommend', { valuePropName: 'value', initialValue: 0, rules: [{ required: true }] })(
              <Radio.Group onChange={this.terminalTypeChange} disabled={disabled}>
                <Radio value={1}>否</Radio>
                <Radio value={0}>是</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item label="是否签约艺术家">
            {getFieldDecorator('available', { valuePropName: 'value', initialValue: 1, rules: [{ required: true }] })(
              <Radio.Group onChange={this.terminalTypeChange} disabled={disabled}>
                <Radio value={1}>否</Radio>
                <Radio value={0}>是</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="艺术家视频">
            {getFieldDecorator('videoUrl', { valuePropName: 'value' })(
              <GvideoUpload file={videoUrl} uploadButtonText="上传视频" success={img => this.uploadSuccessCallback(img, 'videoUrl')} close={this.closeVideo} />
            )}
          </Form.Item>

          <Form.Item label="艺术家简介">
            {getFieldDecorator('description', { valuePropName: 'value', rules: [{ required: true, message: "请上传消息图片" }] })(
              <div style={{ display: 'flex', paddingBottom: 40 }}>
                {
                  txtHtml ? <Geditor style={{ width: '90%' }} txtHtml={txtHtml} editorChangeCallback={this.editorChangeCallback} /> :
                    <GeditorOther style={{ width: '90%' }} editorChangeCallback={this.editorChangeCallback} />
                }

              </div>
            )}
          </Form.Item>
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


const LonghairAddFrom = Form.create()(LonghairAdd)

export default LonghairAddFrom