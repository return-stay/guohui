import React from 'react'
import { Form, Row, Col, Card } from 'antd'
import { dismantleSearch } from '../../../../utils'
import Gimage from '../../../../common/Gimage'
import request from '../../../../utils/request'
import { ProductDetail } from '../../../../config/api'
import '../GoodsList/index.less'

class GoodsInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      info: { shopDTO: {} },
      title: 'lll',
      majorLabels: [], //商品主标签
      minorLabels: [], //商品副标题
      commonSpecList: [],
      skuList: [],
      productPicUrl: '',
      productPicUrlList: [],
      videoPic: '',//视频地址
    }
  }
  componentDidMount() {
    let searchObj = dismantleSearch(this)
    this.setState({
      ...searchObj
    })

    console.log(searchObj)

    let id = searchObj.id
    request({
      url: ProductDetail,
      params: {
        id: id,
        token: localStorage.getItem('authed'),
      }
    }).then(res => {
      console.log(res)
      let resdata = res.data

      let productPicUrl = ''
      let productPicUrlList = []

      let bannerList = resdata.bannerList

      for (let i = 0; i < bannerList.length; i++) {
        if (bannerList[i].dataType === 0) {
          if (bannerList[i].picCategory === 0) {
            productPicUrl = bannerList[i].picUrl
          } else {
            productPicUrlList.push(bannerList[i])
          }
        } else {
          this.setState({
            videoPic: bannerList[i].picUrl
          })
        }
      }
      this.setState({
        info: resdata,
        majorLabels: resdata.majorLabels || [],
        minorLabels: resdata.minorLabels || [],
        skuList: resdata.skuList,
        productPicUrl,
        productPicUrlList,
      })
    })
  }

  render() {
    const formInfoLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    }
    const { info, majorLabels, minorLabels, skuList, productPicUrlList, productPicUrl, videoPic } = this.state
    return (
      <div className="goods-info add-goods-box">
        <Form>

          <Card title="基础信息" bordered={false}>
            <Row>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formInfoLayout}>
                    <p>商品名称：</p>
                    <span>{info.productName}</span>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formInfoLayout}>
                    <p>商品类目：</p>
                    {/* <span>{info.categoryOneName} / {info.childCateName}</span> */}
                    <span>{info.categoryOneName}</span>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formInfoLayout}>
                    <p>所属店铺：</p>
                    <span>{info.shopDTO.shopName}</span>
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row style={{ marginTop: 10 }}>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formInfoLayout}>
                    <p>商品主标签：</p>
                    <div style={{ minHeight: 39 }}>
                      {
                        majorLabels.map((item, index) => {
                          return (
                            <span className="label-box" key={index}>{item}</span>
                          )
                        })
                      }
                    </div>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formInfoLayout}>
                    <p>商品副标签：</p>
                    <div style={{ minHeight: 39, width: "100%", }}>
                      {
                        minorLabels.map((item, index) => {
                          return (
                            <span className="label-box" key={index}>{item}</span>
                          )
                        })
                      }
                    </div>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formInfoLayout}>
                    <p>商品名称：</p>
                    <span>{info.unit}</span>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Card>

          <Card title="商品配置" bordered={false}>
            <Row >
              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">售卖类型：</span>
                  <span>{info.saleType === 0 ? '非预售' : '预售'}</span>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">推荐类型：</span>
                  <span>{info.recommendation === 0 ? '不推荐' : '推荐'}</span>
                </div>
              </Col>

              <Col span={8}>
                <div className="col-width col-width-other">
                  <span className="col-title">运费： </span>
                  <span>{info.freeShipping === 0 ? '不包邮' : '包邮'}</span>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={16}>
                {
                  info.saleType === 1 && <span>{info.saleStartTime}~{info.saleEndTime}</span>
                }
              </Col>
            </Row>
          </Card>

          <Card title="商品规格" bordered={false}>
            <Row>
              <Col span={24}>
                <p style={{ width: '100%', color: '#333', fontWeight: 500 }}>商品参数：</p>
                <Row>
                  <Col span={24}>
                    <div className="params-box">
                      {
                        skuList.map((item, index) => {

                          return item && (
                            <div className="params-item" key={item.indexes}>
                              <span className="params-item-title">参数{index + 1}：</span>
                              <span className="label-class">{item.specParam}</span>
                              <span className="params-item-bd"></span>
                              <span className="label-class">原价 ￥{item.originalPrice}</span>
                              <span className="label-class price-class">售价 ￥{item.productPrice}</span>
                              {/* <span className="label-class price-class">现价 ￥{item.currentPrice}</span>
                              <span className="label-class">原价 ￥{item.originalPrice}</span>
                              <span className="label-class">会员价 ￥{item.memberPrice}</span> */}
                              <div className="params-item-repertory">
                                <span>商品库存：</span>
                                <span>{item.stock || null}</span>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div></Col>
                </Row>
              </Col>
            </Row>
            {/* <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <div className="col-width-other">
                  <span className="col-title" style={{ width: 100 }}>市场参考价： </span>
                  <span>￥{info.marketPrice}</span>
                </div>
              </Col>
            </Row> */}
          </Card>

          {
            videoPic && <Card title="视频配置" bordered={false} >
              <Row>
                <Col span={24} style={{ marginBottom: 24 }}>
                  <span style={{ fontWeight: 500, color: '#333' }}>商品视频：</span><span>仅支持 mp4格式，仅支持单个视频</span>
                </Col>
                <Col span={24}>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <video style={{ height: 200, width: 300, border: '1px solid #ccc' }} src={videoPic} autoPlay />
                  </div>
                </Col>
              </Row>
            </Card>
          }


          <Card title="图片配置" bordered={false}>
            <Row>
              <Col span={24} style={{ marginBottom: 24 }}>
                <span style={{ fontWeight: 500, color: '#333' }}>商品banner图：</span><span>请上传图片800*800的图片/视频， 仅支持jpg, png 格式</span>
              </Col>
              <Col span={24}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Gimage style={{ width: 100, marginRight: 20, marginBottom: 20 }} src={productPicUrl} />
                  {
                    productPicUrlList.length > 0 && productPicUrlList.map(item => {
                      return <Gimage style={{ width: 100, marginRight: 20, marginBottom: 10 }} key={item.productPicId} src={item.picUrl} />
                    })
                  }
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24} style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: 500, color: '#333' }}>商品详情：</span>
              </Col>
              <Col span={24}>
                <div style={{ display: 'flex', paddingBottom: 40 }}>
                  <div dangerouslySetInnerHTML={{ __html: info.productDetail }}></div>
                </div>
              </Col>
            </Row>

          </Card>

          <div style={{ height: 40 }}></div>

        </Form>


      </div>
    )
  }
}

export default GoodsInfo