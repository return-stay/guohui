import React from 'react'
import { ProductDetail, ProductUpdate, ProductAdd, CategoryFindAllCate,ShopSearch } from '../../../../config/api'
import { Button, Form, Input, InputNumber, Icon, message, Row, Col, Radio, Select, Cascader, Card, DatePicker, PageHeader } from 'antd'
import { getOptionsList } from '../../../../utils'
import request from '../../../../utils/request'
import './index.less'
import { withRouter } from 'react-router-dom'
import GvideoUpload from '../../../../common/Gupload/GvideoUpload'
import Gupload from '../../../../common/Gupload'
import Guploads from '../../../../common/Gupload/Guploads'
import Geditor from '../../../../common/Geditor'
import GeditorOther from '../../../../common/Geditor/GeditorOther'
import moment from 'moment'
class AddGoods extends React.Component {
  constructor() {
    super()
    this.state = {
      showList: [],
      isEdit: false,
      imgLoading: false,
      typeValue: 1,
      skuList: [
        {
          keyId: 0,
          specParam: '',
          status: 0
        }
      ], //商品参数
      freeShipping: 0, //是否包邮， 0 否 1，是
      categoryList: [], //类目集合
      majorLabels: [{ key: 0, value: '' }], //商品主标签
      minorLabels: [{ key: 0, value: '' }], //商品副标题
      videoPic: '', //视频连接
      productPicUrl: '', //商品banner主图
      productPicUrlList: [], //商品banner图集合
      saleStartTime: '',
      saleEndTime: '',
      marketPriceMin: null,
      marketPriceMax: null,
      txtHtml: '',
    }
  }

  getIdOptions = (id) => {
    let list = this.state.categoryList
    for(let i = 0;i<list.length;i++) {
      if(id === list[i].id) {
        return list[i]
      }
    }
  }

  componentDidMount() {
    this.getShowList() 
    this.getCategoryFindAllCate() 
    // let searchObj = dismantleSearch(this)
    const searchObj = this.props
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
      this.add()
      this.setState({
        isEdit: false
      })
    }
  }

  getShowList = () => {
    request({
      url: ShopSearch,
      method: 'post',
      params: { md5Str: localStorage.getItem('authed') },
      data: {
        pageNumber: 1,
        pageSize: 1000,
      }
    }).then(res => {
      if (res.code === 100) {
        let showList = res.data.dataList
        for (let i = 0; i < showList.length; i++) {
          showList[i].id = showList[i].shopId
          showList[i].value = showList[i].shopId
          showList[i].label = showList[i].name
        }
        this.setState({
          showList,
        })
      }
    })
  }

  getCategoryFindAllCate = (parentId, callback) => {
    let obj = {}
    obj.parentId = parentId || 0
    request({
      url: CategoryFindAllCate,
      params: obj
    }).then(res => {
      let list = res.data
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].value = list[i].id
        list[i].label = list[i].name
        if (parentId) {
          list[i].isLeaf = true
        } else {
          list[i].isLeaf = false
        }
      }
      if (parentId) {
        callback && callback(list)
      } else {
        this.setState({
          categoryList: list
        },()=>{
          callback&& callback(list)
        })  
      }
    })
  }

  add = () => { }

  getOption = (productCategoryId) => {
    this.getCategoryFindAllCate(null, (parens)=> {
      const targetOption = this.getIdOptions(productCategoryId[0]);
      targetOption.loading = true;
      this.getCategoryFindAllCate(productCategoryId[0], (list) => {
        targetOption.loading = false;
        targetOption.children = list
        this.setState({
          categoryList: [...this.state.categoryList],
        });
        this.props.form.setFieldsValue({ productCategoryId })
      })
    })
  }

  edit = (id) => {
    request({
      url: ProductDetail,
      params: {
        id: id,
        // token: localStorage.getItem('authed'),
      }
    }).then(res => {
      let resdata = res.data
      let shopData = res.data.shopDTO || {}
      let setData = {
        productCategoryId: [resdata.categoryOneId, resdata.categoryTwoId],
        productName: resdata.productName,
        shopId: shopData.shopId,
        saleType: resdata.saleType,
        freeShipping: resdata.freeShipping,
        recommendation: resdata.recommendation,
      }

      this.getOption([resdata.categoryOneId, resdata.categoryTwoId])

      if (resdata.saleType === 1) {
        setData.saleStartTimeMoment = moment(resdata.saleStartTime, 'YYYY-MM-DD hh:mm:ss')
        setData.saleEndTimeMoment = moment(resdata.saleEndTime, 'YYYY-MM-DD hh:mm:ss')
      }
      let productPicUrl = ''
      let productPicUrlList = []

      let videoPic = ''

      let bannerList = resdata.bannerList

      for (let i = 0; i < bannerList.length; i++) {

        if (bannerList[i].dataType === 0) {
          if (bannerList[i].picCategory === 0) {
            productPicUrl = bannerList[i].picUrl
          } else {
            productPicUrlList.push(bannerList[i].picUrl)
          }
        } else {
          console.log(bannerList[i].picUrl)
          videoPic = bannerList[i].picUrl
        }

      }
      // let marketPriceArr = resdata.marketPrice ? resdata.marketPrice.split('-') : []

      this.setState({
        skuList: resdata.skuList,
        saleStartTime: resdata.saleStartTime,
        saleEndTime: resdata.saleEndTime,
        txtHtml: resdata.productDetail,
        productPicUrl,
        productPicUrlList,
        categoryOneId: resdata.categoryOneId,
        categoryTwoId: resdata.categoryTwoId,
        majorLabels: this.arrReturnNewarr(resdata.majorLabels || []),
        minorLabels: this.arrReturnNewarr(resdata.minorLabels || []),
        // marketPriceMin: marketPriceArr[0] || null,
        // marketPriceMax: marketPriceArr[1] || null,
        saleTypeValue: resdata.saleType,
        videoPic,
      }, () => {
        this.props.form.setFieldsValue({ ...setData })
      })
    })

  }

  arrReturnNewarr = (arr) => {
    let newarr = []
    for (let i = 0; i < arr.length; i++) {
      newarr.push({
        key: i,
        value: arr[i]
      })
    }
    return newarr
  }
  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        delete values.saleStartTimeMoment
        delete values.saleEndTimeMoment
        delete values.productCategoryId
        let params = this.stitchingParameters(values)
        console.log(params)
        if (!this.verifyParams(params)) {
          return false
        }

        let type = e.currentTarget.getAttribute("data-type")
        let url = ProductAdd
        if (type === 'edit') {
          url = ProductUpdate
          params.productId = this.state.id
        }
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: params
        }).then(res => {
          if (res.code === 100) {
            let messageText = type === 'edit' ? '保存成功' : '添加成功'
            message.success(messageText)
            // this.props.history.goBack()
            this.props.successBack()
          } else {
            message.success(res.message)
          }

        }).catch(err => {
          message.error(err.message)
        })
      }
    });
  };

  editOk = e => {
    e.preventDefault();
  }

  imgParams = (type, imgArr, category) => {
    let arr = []
    for (let i = 0; i < imgArr.length; i++) {
      arr.push({
        picType: type,
        picUrl: imgArr[i],
        picCategory: category,
        dataType: 0,
      })
    }
    return arr
  }

  stitchingParameters = (values) => {
    const { productPicUrl, productPicUrlList, majorLabels, minorLabels, txtHtml, saleTypeValue, skuList,
      saleStartTime, saleEndTime, categoryOneId, categoryTwoId, videoPic } = this.state
    values.shopId = Number(values.shopId)

    let piclist = this.imgParams('0', productPicUrlList, '1')
    let imgArr = [...piclist]

    imgArr.push({
      picType: '0',
      picUrl: productPicUrl,
      picCategory: '0',
      dataType: 0,
    })
    if (videoPic) {
      imgArr.push({
        picType: '0',
        picUrl: videoPic,
        picCategory: '1',
        dataType: 1,
      })
    }
    let params = {
      productDetail: txtHtml,
      picList: imgArr,
      skuList,
      // marketPrice: (marketPriceMin || 0) + '-' + (marketPriceMax || 0),
      majorLabels: this.arrayObjToarrstr(majorLabels),
      minorLabels: this.arrayObjToarrstr(minorLabels),
      categoryOneId,
      categoryTwoId,
      ...values,
      operator: 'czz',
      postage: 10,
    }

    if (saleTypeValue === 1) {
      params.saleStartTime = saleStartTime
      params.saleEndTime = saleEndTime
    }
    return params
  }


  verifyParams = (params) => {

    if (!params.majorLabels) {
      message.error('请输入主标签')
      return false
    }

    if (!params.minorLabels) {
      message.error('请输入副标签')
      return false
    }
    if (this.state.saleTypeValue === 1 && !params.saleStartTime) {
      message.error('请选择起售时间')
      return false
    }
    if (this.state.saleTypeValue === 1 && !params.saleEndTime) {
      message.error('请选择起售结束时间')
      return false
    }

    const { productPicUrl } = this.state
    if (!productPicUrl) {
      message.error('请上传商品主图')
      return false
    }

    return true
  }

  arrayObjToarrstr = (arr, str = ',') => {
    let newarr = []
    for (let i = 0; i < arr.length; i++) {
      newarr.push(arr[i].value)
    }
    return newarr.join(str)
  }

  onDateChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    this.setState({
      saleStartTime: dateString
    })
  }
  onDateEndChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    this.setState({
      saleEndTime: dateString
    })
  }

  // 添加标签
  addLabels = (e) => {
    let type = e.currentTarget.getAttribute("data-type")
    this.labelChange({
      status: 'add',
      type,
    })
  }

  inputChange = (e) => {
    let key = Number(e.currentTarget.getAttribute("data-key"))
    let type = e.currentTarget.getAttribute("data-type")
    let value = e.target.value
    this.labelChange({
      type,
      status: 'change',
      index: key,
      value,
    })
  }

  labelDelete = (e) => {
    e.preventDefault();
    let key = Number(e.currentTarget.getAttribute("data-key"))
    let type = e.currentTarget.getAttribute("data-type")
    this.labelChange({
      index: key,
      type,
      status: 'delete'
    })
  }
  //type 标签类型 status 操作类型 add , change, delete , key索引值
  labelChange = ({ type, status, index, value = '' }) => {
    let obj = {}
    let { majorLabels, minorLabels } = this.state;
    let key = (new Date()).valueOf()
    switch (type) {
      case 'majorLabels':
        if (status === 'change') {
          for (let i = 0; i < majorLabels.length; i++) {
            if (index === majorLabels[i].key) {
              majorLabels[i].value = value
              obj.majorLabels = majorLabels
            }
          }
        } else if (status === 'add') {
          majorLabels.push({
            key,
            value: ''
          })
          obj.majorLabels = majorLabels
        } else if (status === 'delete') {
          if (majorLabels.length < 2) return
          for (let i = 0; i < majorLabels.length; i++) {
            if (index === majorLabels[i].key) {
              majorLabels.splice(i, 1)
              obj.majorLabels = majorLabels
            }
          }
        }
        break;
      case 'minorLabels':
        if (status === 'change') {
          for (let i = 0; i < minorLabels.length; i++) {
            if (index === minorLabels[i].key) {
              minorLabels[i].value = value
              obj.minorLabels = minorLabels
            }
          }
        } else if (status === 'add') {
          minorLabels.push({
            key,
            value: ''
          })
          obj.minorLabels = minorLabels
        } else if (status === 'delete') {
          if (minorLabels.length < 2) return
          for (let i = 0; i < minorLabels.length; i++) {
            if (index === minorLabels[i].key) {
              minorLabels.splice(i, 1)
              obj.minorLabels = minorLabels
            }
          }
        }
        break;
      default:
        obj = {}
    }
    this.setState({ ...obj })
  }

  loadData = (selectedOptions) => {
    console.log(selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    const that = this
    this.getCategoryFindAllCate(selectedOptions[0].id, (list) => {
      targetOption.loading = false;
      targetOption.children = list
      that.setState({
        categoryList: [...this.state.categoryList],
      });
    })
  }

  onCascaderChange = (value) => {
    console.log(value)
    this.setState({
      categoryOneId: value[0],
      categoryTwoId: value[1]
    })
  }

  // 市场参考价
  marketPriceChange = (e, key) => {
    if (key === 'marketPriceMin') {
      this.setState({
        marketPriceMin: e,
      })
    } else {
      this.setState({
        marketPriceMax: e,
      })
    }
  }


  priceToast = (item) => {
    if (item.currentPrice === undefined || item.currentPrice === null || item.currentPrice < 0) {
      message.error('请输入现价')
      return false
    }
    if (item.originalPrice === undefined || item.originalPrice === null || item.originalPrice < 0) {
      message.error('请输入原价')
      return false
    }
    if (item.memberPrice === undefined || item.memberPrice === null || item.memberPrice < 0) {
      message.error('请输入会员价')
      return false
    }
    if (item.stock === undefined || item.stock === null || item.stock < 0) {
      message.error('请输入库存')
      return false
    }
    return true
  }

  saleTypeChange = (e) => {
    let value = e.target.value
    console.log(value)
    this.setState({
      saleTypeValue: value
    })
  }
  uploadSuccessCallback = (imgurl, type) => {
    console.log(imgurl)
    let obj = {}
    switch (type) {
      case 'productPicUrl':
        obj.productPicUrl = imgurl
        break;
      case 'productPicUrlList':
        obj.productPicUrlList = imgurl
        break;
      case 'videoPic':
        obj.videoPic = imgurl
        break;
      default:
        obj = {}
    }
    this.setState({
      ...obj
    })
  }

  addSku = () => {
    let key = (new Date()).valueOf()
    let skuList = this.state.skuList

    skuList.push({
      keyId: key
    })

    this.setState({
      skuList
    })
  }

  deleteSku = (e) => {
    let id = e.currentTarget.getAttribute('data-id')
    console.log(id)
  }

  priceChange = (e, id, type) => {
    console.log(e)
    console.log(id, type)
    this.reasonIdSetValue(e, id, type)
  }

  specParamChange = (e, id) => {
    let value = e.target.value
    console.log(value)
    this.reasonIdSetValue(value, id, 'specParam')
  }

  statusChange = (value, id) => {
    this.reasonIdSetValue(value, id, 'status')
  }

  reasonIdSetValue = (value, id, type) => {
    let skuList = this.state.skuList

    for (let i = 0; i < skuList.length; i++) {
      if (skuList[i].keyId === id) {
        skuList[i][type] = value
        if (type === 'productPrice') {
          skuList[i].secKillPrice = value
          skuList[i].newPrice = value
          skuList[i].supplyPrice = value
        }
      }
    }

    this.setState({
      skuList
    })
  }

  closeVideo = () => {
    this.setState({
      videoPic: ''
    })
  }

  editorChangeCallback = (html) => {
    this.setState({
      txtHtml: html
    })
  }

  cancel = () => {
    // this.props.history.goBack()
    this.props.backCallback()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    };

    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
    }

    const { isEdit, majorLabels, minorLabels, showList, txtHtml, skuList,
      categoryList, productPicUrl, productPicUrlList, saleTypeValue, videoPic } = this.state
    console.log(categoryList)
    // console.log(txtHtml)
    return (
      <div className="add-goods-box">
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)', backgroundColor: '#f4f4f4'
          }}
          onBack={this.cancel}
          title={isEdit ? '编辑商品' : '添加商品'}
        />
        <Form {...formLayout}>

          <Card title="基础信息" bordered={false}>
            <Row>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formItemLayout}>
                    <p>商品名称</p>
                    {getFieldDecorator('productName', { valuePropName: 'value', rules: [{ required: true, message: '请输入商品名称' }] })(<Input placeholder='请输入名称' />)}
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formItemLayout}>
                    <p>商品类目</p>
                    {getFieldDecorator('productCategoryId', { valuePropName: 'value', rules: [{ required: true, message: '请选择类目' }] })(
                      <Cascader options={categoryList} changeOnSelect loadData={this.loadData} onChange={this.onCascaderChange} placeholder="请选择类目" />
                    )}
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formItemLayout}>
                    <p>所属店铺</p>
                    {getFieldDecorator('shopId', { valuePropName: 'value', rules: [{ required: true, message: '请选择所属店铺' }] })(
                      <Select placeholder='请选择所属店铺'>
                        {getOptionsList(showList)}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row style={{ marginTop: 10 }}>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formItemLayout}>
                    <p>商品主标签</p>
                    <div style={{ minHeight: 39 }}>
                      {
                        majorLabels.map((item, index) => {
                          let num = index + 1
                          if (index === 0) {
                            return (
                              <span className="label-box" key={item.key}>
                                <Input style={{ width: "100%" }} maxLength={10} value={item.value} placeholder={'主标签' + num} data-key={item.key} data-type="majorLabels" onChange={this.inputChange} />
                                <Icon className="label-delete" type="plus" data-type="majorLabels" data-key={item.key} onClick={this.addLabels} />
                              </span>
                            )
                          } else {
                            return (
                              <span className="label-box" key={item.key}>
                                <Input style={{ width: "100%" }} maxLength={10} value={item.value} placeholder={'主标签' + num} data-key={item.key} data-type="majorLabels" onChange={this.inputChange} />
                                <Icon className="label-delete" type="minus" data-type="majorLabels" data-key={item.key} onClick={this.labelDelete} />
                              </span>
                            )
                          }
                        })
                      }
                    </div>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <Form.Item label=" " colon={false} {...formItemLayout}>
                    <p>商品副标签</p>
                    <div style={{ minHeight: 39, width: "100%", }}>
                      {
                        minorLabels.map((item, index) => {
                          let num = index + 1
                          if (index === 0) {
                            return (
                              <span className="label-box" key={item.key}>
                                <Input style={{ width: "100%" }} maxLength={10} value={item.value} placeholder={'副标签' + num} data-key={item.key} data-type="minorLabels" onChange={this.inputChange} />
                                <Icon className="label-delete" type="plus" data-type="minorLabels" data-key={item.key} onClick={this.addLabels} />
                              </span>
                            )
                          } else {
                            return (
                              <span className="label-box" key={item.key}>
                                <Input style={{ width: "100%" }} maxLength={10} value={item.value} placeholder={'副标签' + num} data-key={item.key} data-type="minorLabels" onChange={this.inputChange} />
                                <Icon className="label-delete" type="minus" data-type="minorLabels" data-key={item.key} onClick={this.labelDelete} />
                              </span>
                            )
                          }
                        })
                      }
                    </div>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width" style={{ display: 'none' }}>
                  <p>商品三级标签</p>
                </div>
              </Col>
            </Row>
          </Card>


          <Card title="商品配置" bordered={false}>
            <Row >
              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">售卖类型：</span>
                  {getFieldDecorator('saleType', { valuePropName: 'value' })(
                    <Radio.Group onChange={this.saleTypeChange}>
                      <Radio value={0}>非预售</Radio>
                      <Radio value={1}>预售</Radio>
                    </Radio.Group>
                  )}
                </div>
              </Col>

              <Col span={8}>
                <div className="col-width col-width-other">
                  <span className="col-title">是否包邮： </span>
                  <div style={{ width: 800, flexShrink: 0 }}>
                    {getFieldDecorator('freeShipping', { valuePropName: 'value', initialValue: 0 })(
                      <Radio.Group >
                        <Radio value={1}>包邮</Radio>
                        <Radio value={0}>不包邮</Radio>
                      </Radio.Group>
                    )}
                  </div>
                </div>
              </Col>

              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">是否推荐：</span>
                  {getFieldDecorator('recommendation', { valuePropName: 'value', initialValue: 0 })(
                    <Radio.Group>
                      <Radio value={0}>不推荐</Radio>
                      <Radio value={1}>推荐</Radio>
                    </Radio.Group>
                  )}
                </div>
              </Col>

            </Row>

            <Row >
              <Col span={16}>
                {
                  saleTypeValue === 1 && <div className="col-width" style={{ display: 'flex' }}>
                    <Form.Item label=" " colon={false} {...formItemLayout}>
                      <span className="col-title">预售时间：</span>
                      {getFieldDecorator('saleStartTimeMoment', { valuePropName: 'value', rules: [{ required: true, message: '请选择起售时间' }] })(
                        <DatePicker size="small" style={{ width: '195px' }} showTime placeholder="开始时间" onChange={this.onDateChange} />
                      )}
                    </Form.Item>
                    <Form.Item label="~" colon={false} >
                      {
                        getFieldDecorator('saleEndTimeMoment', { valuePropName: 'value', rules: [{ required: false, message: '请选择起售时间' }] })(
                          <DatePicker size="small" style={{ width: '195px' }} placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" onChange={this.onDateEndChange} />
                        )
                      }
                    </Form.Item>
                  </div>
                }
              </Col>

            </Row>
          </Card>

          <Card title="商品规格" bordered={false}>
            <Row>
              <Col span={24}>
                <p style={{ width: '100%', color: '#333', fontWeight: 500, marginBottom: 10 }}>商品参数： <span style={{ color: '#999', fontSize: 10 }}>（ 商品规格使用，隔开 例：黑色，36码 ）</span></p>
                <Row>
                  <Col span={24}>
                    {
                      skuList.map((item, index) => {
                        return <div className="sku-box" key={item.keyId}>
                          <span style={{ marginRight: 10, marginBottom: 10 }}>参数{index + 1}:</span>
                          <Input value={item.specParam} className="spec-input" onChange={(e) => this.specParamChange(e, item.keyId)} placeholder="请输入商品规格" />

                          <InputNumber className="price-input" value={item.originalPrice} min={0} placeholder="原价" onChange={e => this.priceChange(e, item.keyId, 'originalPrice')} />
                          <InputNumber className="price-input" value={item.productPrice} min={0} placeholder="售价" onChange={e => this.priceChange(e, item.keyId, 'productPrice')} />
                          <InputNumber className="price-input" value={item.memberPrice} min={0} placeholder="会员价" onChange={e => this.priceChange(e, item.keyId, 'memberPrice')} />
                          <InputNumber className="price-input" value={item.comMemberPrice} min={0} placeholder="企业会员价" onChange={e => this.priceChange(e, item.keyId, 'comMemberPrice')} />
                          <InputNumber className="price-input" value={item.stock} min={0} placeholder="库存" onChange={e => this.priceChange(e, item.keyId, 'stock')} />
                          {
                            item.status === 1 ?
                              <Button className="price-input" type="" onClick={e => this.statusChange(2, item.keyId)} >下架</Button> :
                              <Button className="price-input" type="primary" onClick={e => this.statusChange(1, item.keyId)} >上架</Button>
                          }
                          <Icon className="price-input" type="delete" data-id={item.keyId} onClick={this.deleteSku} />
                        </div>
                      })
                    }
                    <Button type="primary" icon="plus" onClick={this.addSku} style={{ marginTop: 10, marginLeft: 400 }} >添加参数</Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <div className="col-width-other">
                  <span className="col-title" style={{ width: 100 }}>市场参考价： </span>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', minHeight: 39, }}>

                    <InputGroup compact style={{ width: 190 }}>
                      <InputNumber min={0} style={{ width: 80 }} value={marketPriceMin} placeholder="最小值" onChange={(e) => this.marketPriceChange(e, 'marketPriceMin')} />
                      <Input
                        style={{
                          width: 30,
                          borderLeft: 0,
                          pointerEvents: 'none',
                          backgroundColor: '#fff',
                        }}
                        placeholder="~"
                        disabled
                      />
                      <InputNumber min={0} style={{ width: 80, borderLeft: 0 }} value={marketPriceMax} placeholder="最大值" onChange={(e) => this.marketPriceChange(e, 'marketPriceMax')} />
                    </InputGroup>

                    <span>￥</span>
                  </div>
                </div>
              </Col>
            </Row> */}
          </Card>

          <Card title="视频配置" bordered={false}>
            <Row>
              <Col span={24} style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: 500, color: '#333' }}>商品视频上传：</span><span>仅支持 mp4格式，仅支持单个视频</span>
              </Col>
              <Col span={24}>
                <div style={{ display: 'flex' }}>
                  <GvideoUpload file={videoPic} uploadButtonText="上传视频" success={img => this.uploadSuccessCallback(img, 'videoPic')} close={this.closeVideo} />
                </div>
              </Col>
            </Row>
          </Card>
          <Card title="图片配置" bordered={false}>
            <Row>
              <Col span={24} style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: 500, color: '#333' }}>商品banner图：</span><span>请上传图片800*800的图片， 仅支持jpg, png 格式</span>
              </Col>
              <Col span={24}>
                <div style={{ display: 'flex' }}>
                  <Gupload file={productPicUrl} uploadButtonText="上传图片" uploadButtonTopText="主图" success={img => this.uploadSuccessCallback(img, 'productPicUrl')} />

                  <Guploads files={productPicUrlList} fileLength={100} uploadButtonText="上传图片" displayFlex={true} success={imgarr => this.uploadSuccessCallback(imgarr, 'productPicUrlList')} />
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24} style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: 500, color: '#333' }}>商品详情编辑：</span>
              </Col>
              <Col span={24}>
                <div style={{ display: 'flex', paddingBottom: 40 }}>
                  {
                    (txtHtml || !isEdit) ? <Geditor style={{ width: '90%' }} txtHtml={txtHtml} editorChangeCallback={this.editorChangeCallback} /> :
                      <GeditorOther style={{ width: '90%' }} editorChangeCallback={this.editorChangeCallback} />
                  }

                </div>
              </Col>
            </Row>

          </Card>

          <Form.Item label=" " colon={false} labelCol={{ span: 16 }} wrapperCol={{ span: 8 }}>
            <div style={{ paddingLeft: 40 }}>
              {
                isEdit ? <>
                  <Button onClick={this.cancel} style={{ height: 40, lineHeight: '40px', marginRight: 20 }}>取消</Button>
                  <Button data-type="edit" onClick={this.handleOk} type="primary" style={{ height: 40, lineHeight: '40px' }}>保存编辑</Button>
                </> :
                  <>
                    <Button onClick={this.cancel} style={{ height: 40, lineHeight: '40px', marginRight: 20 }}>取消</Button>
                    <Button onClick={this.handleOk} type="primary" style={{ height: 40, lineHeight: '40px' }}>发布商品</Button>
                  </>

              }
            </div>
          </Form.Item>
        </Form>

      </div>
    )
  }
}

let AddForm = Form.create()(AddGoods)
export default withRouter(AddForm)