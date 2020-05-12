import React from 'react'
import { PageHeader, Form } from "antd";
import request from "../../../../utils/request";
import { ArtistDetail } from '../../../../config/api'
export default class LonghairDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      info: {},
    }
  }
  componentDidMount() {
    let { artistid } = this.props
    this.getMessageDetail(artistid)
  }

  getMessageDetail = (id) => {
    const that = this
    request({
      url: ArtistDetail,
      method: 'get',
      params: {
        artistId: id
      }
    }).then(res => {
      console.log(res)

      let data = res.data
      that.setState({
        info: data
      })
    })
  }
  cancel = () => {
    this.props.goback()
  }
  render() {
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };
    const { info } = this.state
    return (
      <div>

        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)', backgroundColor: '#f4f4f4'
          }}
          onBack={this.cancel}
          subTitle='艺术家详情'
        />

        <Form {...formLayout}>

          <Form.Item label="艺术家名称">
            <div>{info.artistName}</div>
          </Form.Item>
          <Form.Item label="艺术家生日">
            <div>{info.birthday}</div>
          </Form.Item>
          <Form.Item label="艺术家头像">
            <img style={{ width: 50 }} src={info.portrait} alt="艺术家头像" />
          </Form.Item>

          <Form.Item label="艺术家标签">
            <div>{info.showTag}</div>
          </Form.Item>

          <Form.Item label="所属分类">
            <div>{info.cateOneStr}</div>
          </Form.Item>
          <Form.Item label="是否推荐">
            <div>{info.recommend === 0 ? '推荐' : "未推荐"}</div>
          </Form.Item>

          <Form.Item label="是否签约艺术家">
            <div>{info.available === 0 ? '是签约艺术家' : '不是签约艺术家'}</div>
          </Form.Item>
          <Form.Item label="艺术家视频">
            <video style={{ height: 200, width: 300 }} src={info.videoUrl} controls="controls" />
          </Form.Item>

          <Form.Item label="艺术家简介">
            <div dangerouslySetInnerHTML={{ __html: info.description }}></div>
          </Form.Item>
        </Form>

      </div>
    )
  }
}