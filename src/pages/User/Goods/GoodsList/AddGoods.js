import React from 'react'
import { ProductDetail, ProductUpdate, ProductAdd, CategoryFindAllCate, CategoryQueryProductTypeAttributes, CategoryQueryProductIdAttributes } from '../../../../config/api'
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
const InputGroup = Input.Group;
class AddGoods extends React.Component {
  constructor() {
    super()
    this.state = {
      showList: [],
      isEdit: false,
      imgLoading: false,
      typeValue: 1,
      freeShipping: 0, //是否包邮， 0 否 1，是
      categoryList: [], //类目集合
      majorLabels: [{ key: 0, value: '' }], //商品主标签
      minorLabels: [{ key: 0, value: '' }], //商品副标题
      groupSpecsPrams: [{ key: 0, value: '' }], //商品规格
      videoPic: '', //视频连接
      productPicUrl: '', //商品banner主图
      productPicUrlList: [], //商品banner图集合
      productDetailPicUrl: '', //商品详情主图
      productPicList: [], //图片集合
      saleStartTime: '',
      saleEndTime: '',
      marketPriceMin: null,
      marketPriceMax: null,
      txtHtml: '',
      commodityParameters: [
        {
          id: 0,
          specsParamsArr: [],
          isAdd: false,
          originalPrice: 0,
          memberPrice: 0,
          deleted: 0,
          status: 0,
        }
      ],
      productAttribute: [],
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
      url: '/shop/search',
      method: 'post',
      params: { md5Str: localStorage.getItem('authed') },
      data: {
        pageNumber: 1,
        pageSize: 1000,
      }
    }).then(res => {
      if (res.code === 100) {
        let showList = res.data.datas
        for (let i = 0; i < showList.length; i++) {
          showList[i].id = showList[i].shopId
          showList[i].value = showList[i].shopId
          showList[i].label = showList[i].shopName
        }
        this.setState({
          showList,
        })
      }
    })
  }

  getCategoryFindAllCate = () => {
    let parentId = 0
    let obj = {}
    if (parentId) {
      obj.parentId = parentId
    }
    request(
      {
        url: CategoryFindAllCate,
        params: obj
      }
    ).then(res => {
      let list = res.data[0].childList
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].value = list[i].id
        list[i].label = list[i].name
        if (list[i].childList && list[i].childList.length > 0) {
          let childList = list[i].childList
          for (let j = 0; j < childList.length; j++) {
            childList[j].value = childList[j].id
            childList[j].label = childList[j].name
          }
          list[i].children = childList
        }
      }
      this.setState({
        categoryList: list
      })
    })
  }

  add = () => { }

  edit = (id) => {
    request({
      url: ProductDetail,
      params: {
        productId: id
      }
    }).then(res => {
      let resdata = res.data

      let specDetailList = resdata.specDetailList

      let commodityParameters = []

      for (let i = 0; i < specDetailList.length; i++) {
        commodityParameters.push({
          id: i,
          indexes: specDetailList[i].indexes.split('_'),
          stock: specDetailList[i].stock,
          originalPrice: specDetailList[i].originalPrice,
          currentPrice: specDetailList[i].currentPrice,
          memberPrice: specDetailList[i].memberPrice,
          marketPrice: specDetailList[i].marketPrice,
          productSpecId: specDetailList[i].productSpecId,
          specsParamsArr: specDetailList[i].specsParams.split(',')
        })
      }

      let setData = {
        productCategoryId: [resdata.cateId, resdata.childCateId],
        productName: resdata.productName,
        shopId: resdata.shopId,
        saleType: resdata.saleType,
        choice: resdata.choice,
        freeShipping: resdata.freeShipping,
        sole: resdata.sole,
        rookie: resdata.rookie,
        quality: resdata.quality,
        recommendation: resdata.recommendation,
        famous: resdata.famous,
        selfSupport: resdata.selfSupport,
      }

      if (resdata.saleType === 1) {
        setData.saleStartTimeMoment = moment(resdata.saleStartTime, 'YYYY-MM-DD hh:mm:ss')
        setData.saleEndTimeMoment = moment(resdata.saleEndTime, 'YYYY-MM-DD hh:mm:ss')
      }

      let commonSpecList = resdata.commonSpecList
      let groupSpecsPrams = []
      for (let j = 0; j < commonSpecList.length; j++) {
        groupSpecsPrams.push({
          key: j,
          value: commonSpecList[j].groupName
        })
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
      let marketPriceArr = resdata.marketPrice ? resdata.marketPrice.split('-') : []

      this.setState({
        saleStartTime: resdata.saleStartTime,
        saleEndTime: resdata.saleEndTime,
        txtHtml: resdata.detail,
        productPicUrl,
        productPicUrlList,
        cateId: resdata.cateId,
        childCateId: resdata.childCateId,
        majorLabels: this.arrReturnNewarr(resdata.majorLabels || []),
        minorLabels: this.arrReturnNewarr(resdata.minorLabels || []),
        marketPriceMin: marketPriceArr[0] || null,
        marketPriceMax: marketPriceArr[1] || null,
        groupSpecsPrams,
        commodityParameters,
        saleTypeValue: resdata.saleType,
        videoPic,
      }, () => {
        this.props.form.setFieldsValue({ ...setData })
        // this.getCategoryQueryProductTypeAttributes()
        this.goodsParamsConfirmed(false)
      })
    })

    this.getCategoryQueryProductIdAttributes(id)
  }

  getCategoryQueryProductIdAttributes = (id) => {
    request({
      url: CategoryQueryProductIdAttributes,
      params: {
        productid: id
      }
    }).then(res => {
      this.setState({
        productAttribute: res.data || []
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
    const { productPicUrl, productPicUrlList, majorLabels, minorLabels, groupSpecsPrams, txtHtml,
      saleStartTime, saleEndTime, cateId, childCateId, commodityParameters, commonSpec, productAttribute, videoPic, marketPriceMin, marketPriceMax } = this.state
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
      detail: txtHtml,
      picList: imgArr,
      commonSpec,
      marketPrice: (marketPriceMin || 0) + '-' + (marketPriceMax || 0),
      majorLabels: this.arrayObjToarrstr(majorLabels),
      minorLabels: this.arrayObjToarrstr(minorLabels),
      specsKeys: this.arrayObjToarrstr(groupSpecsPrams),
      productSpecs: this.commodityParametersFunc(commodityParameters),
      saleStartTime,
      saleEndTime,
      cateId,
      childCateId,
      productAttribute,
      ...values,
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
    if (!params.specsKeys) {
      message.error('请输入规格')
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

    if (params.productSpecs.length < 1) {
      message.error('请先添加商品参数')
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

  commodityParametersFunc = (arr) => {

    let commonSpec = this.state.commonSpec
    let newarr = []
    for (let i = 0; i < arr.length; i++) {

      let paraseArr = arr[i].specsParamsArr
      let indexes = []
      for (let m = 0; m < paraseArr.length; m++) {
        indexes.push(commonSpec[m].params.indexOf(paraseArr[m]))
      }
      arr[i].indexes = indexes

      newarr.push({
        specsParams: arr[i].specsParamsArr.join(','),
        indexes: indexes.join("_"),
        stock: arr[i].stock,
        originalPrice: arr[i].originalPrice,
        currentPrice: arr[i].currentPrice,
        memberPrice: arr[i].memberPrice,
        marketPrice: arr[i].marketPrice,
        deleted: arr[i].deleted || 0,
        status: arr[i].status || 0,
      })
    }
    console.log(newarr)
    return newarr
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
    let { majorLabels, minorLabels, groupSpecsPrams } = this.state;
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
      case 'groupSpecsPrams':
        if (status === 'change') {
          for (let i = 0; i < groupSpecsPrams.length; i++) {
            if (index === groupSpecsPrams[i].key) {
              groupSpecsPrams[i].value = value
              obj.groupSpecsPrams = groupSpecsPrams
            }
          }
        } else if (status === 'add') {
          groupSpecsPrams.push({
            key,
            value: ''
          })
          obj.groupSpecsPrams = groupSpecsPrams
        } else if (status === 'delete') {
          if (groupSpecsPrams.length < 2) return
          for (let i = 0; i < groupSpecsPrams.length; i++) {
            if (index === groupSpecsPrams[i].key) {
              groupSpecsPrams.splice(i, 1)
              obj.groupSpecsPrams = groupSpecsPrams
              this.deletegoodsParamsConfirmedProductSpec(i)
            }
          }
        }
        // this.goodsParamsConfirmed(false)
        console.log(this.state.commodityParameters)
        break;
      default:
        obj = {}
    }
    this.setState({ ...obj })
  }

  deletegoodsParamsConfirmedProductSpec = (i) => {
    let commodityParameters = this.state.commodityParameters
    console.log(commodityParameters)
    for (let j = 0; j < commodityParameters.length; j++) {
      commodityParameters[j].specsParamsArr.splice(i, 1)
      commodityParameters[j].indexes && commodityParameters[j].indexes.splice(i, 1)
    }
    this.setState({
      commodityParameters,
    })
  }

  onCascaderChange = (value) => {
    this.setState({
      cateId: value[0],
      childCateId: value[1]
    }, () => {
      this.getCategoryQueryProductTypeAttributes()
    })
  }

  addCommodityParameters = () => {
    let commodityParameters = this.state.commodityParameters
    let key = (new Date()).valueOf()
    commodityParameters.push(
      {
        id: key,
        specsParamsArr: [],
        isAdd: false,
        originalPrice: 0,
        memberPrice: 0,
        // deleted: 0,
        // status: 0,
      }
    )
    this.setState({
      commodityParameters,
    })
  }

  // 商品参数输入框 change事件
  groupItemChange = (e) => {
    let id = Number(e.currentTarget.getAttribute("data-id"))
    let gropIndex = Number(e.currentTarget.getAttribute('data-gropindex'))
    let value = e.target.value
    this.commodityParametersItemEdit(id, 'specsParamsArr', value, gropIndex)
  }

  // 商品参数修改  根据 id元素id  key：属性名  value 修改的值 gropIndex规格索引
  commodityParametersItemEdit = (id, key, value, gropIndex) => {
    let commodityParameters = this.state.commodityParameters
    console.log(commodityParameters)

    for (let i = 0; i < commodityParameters.length; i++) {
      if (commodityParameters[i].id === id) {
        if (key === 'specsParamsArr') {
          commodityParameters[i][key][gropIndex] = value
        } else {
          commodityParameters[i][key] = value
        }
      }
    }
    this.setState({
      commodityParameters,
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

  commodityPriceChange = (e, id, key) => {
    console.log(e)
    let value = Number(e || 0)
    this.commodityParametersItemEdit(id, key, value)
  }

  subStock = (e) => {
    let id = Number(e.currentTarget.getAttribute("data-id"))
    let key = e.currentTarget.getAttribute('data-key')
    let value = Number(e.currentTarget.getAttribute("data-value") || 0)
    this.commodityParametersItemEdit(id, key, --value)
  }

  addStock = (e) => {
    let id = Number(e.currentTarget.getAttribute("data-id"))
    let key = e.currentTarget.getAttribute('data-key')
    let value = Number(e.currentTarget.getAttribute("data-value") || 0)
    this.commodityParametersItemEdit(id, key, ++value)
  }

  deleteCommodityParamet = (e) => {
    let id = Number(e.currentTarget.getAttribute("data-id"))
    console.log(id)
    let commodityParameters = this.state.commodityParameters

    for (let i = 0; i < commodityParameters.length; i++) {
      if (commodityParameters[i].id === id) {
        commodityParameters.splice(i, 1)
      }
    }
    this.setState({
      commodityParameters,
    })
  }

  // 确认商品参数
  goodsParamsConfirmed = (isToast = true) => {
    let paramseList = this.state.commodityParameters //商品参数集合
    let groupSpecsPrams = this.state.groupSpecsPrams //商品规格
    let commonSpec = []
    for (let m = 0; m < groupSpecsPrams.length; m++) {
      groupSpecsPrams[m].specsArr = []
      for (let i = 0; i < paramseList.length; i++) {
        let itemSpecsParamsArr = paramseList[i].specsParamsArr
        for (let j = 0; j < itemSpecsParamsArr.length; j++) {
          if (groupSpecsPrams[m].specsArr.indexOf(itemSpecsParamsArr[m]) < 0) {
            groupSpecsPrams[m].specsArr.push(itemSpecsParamsArr[m])
          }
        }
      }
      commonSpec.push({
        groupName: groupSpecsPrams[m].value,
        params: groupSpecsPrams[m].specsArr,
      })
    }

    if (isToast) {
      for (let n = 0; n < paramseList.length; n++) {
        if (!this.priceToast(paramseList[n])) {
          return false
        }
      }
      message.success('商品参数设置完成')
    }
    // console.log(groupSpecsPrams)
    this.setState({
      commonSpec,
      groupSpecsPrams,
    })
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
  //根据分类获取底卡信息
  getCategoryQueryProductTypeAttributes = () => {
    request({
      url: CategoryQueryProductTypeAttributes,
      params: {
        category: this.state.childCateId,
      }
    }).then(res => {
      this.setState({
        productAttribute: res.data
      })
    })
  }
  // 底卡信息的输入
  bottomCardChange = (e) => {
    let id = Number(e.currentTarget.getAttribute("data-id"))
    let value = e.target.value
    let productAttribute = this.state.productAttribute
    for (let i = 0; i < productAttribute.length; i++) {
      if (productAttribute[i].id === id) {
        productAttribute[i].value = value
      }
    }
    this.setState({
      productAttribute
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

    const { isEdit, majorLabels, minorLabels, groupSpecsPrams, commodityParameters, showList, txtHtml,
      categoryList, productPicUrl, productPicUrlList, saleTypeValue, productAttribute, videoPic, marketPriceMin, marketPriceMax } = this.state
    console.log(marketPriceMin)
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
                      <Cascader options={categoryList} onChange={this.onCascaderChange} placeholder="请选择类目" />
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
                <div className="col-width">
                  <span className="col-title">推荐类型：</span>
                  {getFieldDecorator('choice', { valuePropName: 'value', initialValue: 0 })(
                    <Radio.Group>
                      <Radio value={0}>非精选</Radio>
                      <Radio value={1}>精选</Radio>
                    </Radio.Group>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">孤品标识： </span>
                  {getFieldDecorator('sole', { valuePropName: 'value', initialValue: 0 })(
                    <Radio.Group>
                      <Radio value={0}>非孤品</Radio>
                      <Radio value={1}>孤品</Radio>
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
                      <span className="col-title">起售时间：</span>
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

              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">推荐：</span>
                  {getFieldDecorator('recommendation', { valuePropName: 'value', initialValue: 0 })(
                    <Radio.Group>
                      <Radio value={0}>否</Radio>
                      <Radio value={1}>是</Radio>
                    </Radio.Group>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">是否自营：</span>
                  {getFieldDecorator('selfSupport', { valuePropName: 'value', initialValue: 0 })(
                    <Radio.Group>
                      <Radio value={0}>非自营</Radio>
                      <Radio value={1}>自营</Radio>
                    </Radio.Group>
                  )}

                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">必买优品：</span>
                  {getFieldDecorator('quality', { valuePropName: 'value', initialValue: 0 })(
                    <Radio.Group>
                      <Radio value={0}>否</Radio>
                      <Radio value={1}>是</Radio>
                    </Radio.Group>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="col-width">
                  <span className="col-title">新人必买：</span>
                  {getFieldDecorator('rookie', { valuePropName: 'value', initialValue: 0 })(
                    <Radio.Group>
                      <Radio value={0}>否</Radio>
                      <Radio value={1}>是</Radio>
                    </Radio.Group>
                  )}

                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className="col-width col-width-other">
                  <span className="col-title">运费： </span>
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
                  <span className="col-title">名人佳作：</span>
                  {getFieldDecorator('famous', { valuePropName: 'value', initialValue: 0 })(
                    <Radio.Group>
                      <Radio value={0}>否</Radio>
                      <Radio value={1}>是</Radio>
                    </Radio.Group>
                  )}
                </div>
              </Col>

            </Row>
          </Card>

          <Card title="底卡信息" bordered={false} >
            <Row style={{ marginBottom: 20 }}>
              {
                productAttribute.map(item => {
                  return (
                    <Col span={6} key={item.id} style={{ marginBottom: 10 }}>
                      <div className="col-width-card">
                        <span className="col-title">{item.name}：</span>
                        <Input className="col-card-input" style={{ width: '100%' }} data-id={item.id} value={item.value} onChange={this.bottomCardChange} />
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </Card>

          <Card title="商品规格" bordered={false}>
            <Row style={{ marginBottom: 20 }}>
              <Col span={24}>
                <div className="col-width-other">
                  <span className="col-title">商品规格： </span>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', minHeight: 39, }}>

                    {
                      groupSpecsPrams.map(item => {
                        return (
                          <span className="label-box-minor" key={item.key}>
                            <Input style={{ width: 100, marginRight: 10 }} value={item.value} maxLength={10} data-key={item.key} data-type="groupSpecsPrams" onChange={this.inputChange} />
                            <Icon className="label-delete" type="delete" data-type="groupSpecsPrams" data-key={item.key} onClick={this.labelDelete} />
                          </span>
                        )
                      })
                    }
                    <Icon data-type="groupSpecsPrams" onClick={this.addLabels} type="plus" style={{ fontSize: 24, marginLeft: 10, cursor: 'pointer' }} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{ width: '100%', color: '#333', fontWeight: 500 }}>商品参数：</p>
                <Row>
                  <Col span={24}>
                    <div className="params-box">
                      {
                        commodityParameters.map((item, index) => {
                          return (
                            <div className="params-item" key={item.id}>
                              <span className="params-item-title">参数{index + 1}：</span>

                              {
                                groupSpecsPrams.map((gropItem, gropIndex) => {
                                  return (
                                    <Input className="params-item-input" key={gropIndex} value={item.specsParamsArr[gropIndex]} placeholder={'请输入' + gropItem.value} data-gropindex={gropIndex} data-id={item.id} onChange={this.groupItemChange} />
                                  )
                                })
                              }
                              <span className="params-item-bd"></span>
                              {/* <InputNumber min={0} className="params-item-input" placeholder="市场价 ￥" value={item.marketPrice} data-key="marketPrice" onChange={(e) => this.commodityPriceChange(e, item.id, 'marketPrice')} /> */}
                              <InputNumber min={0} className="params-item-input" placeholder="现价 ￥" value={item.currentPrice} data-key="currentPrice" data-id={item.id} onChange={(e) => this.commodityPriceChange(e, item.id, 'currentPrice')} />
                              <InputNumber min={0} className="params-item-input" placeholder="原价 ￥" value={item.originalPrice || 0} data-key="originalPrice" data-id={item.id} onChange={(e) => this.commodityPriceChange(e, item.id, 'originalPrice')} />
                              <InputNumber min={0} className="params-item-input" placeholder="会员价 ￥" value={item.memberPrice || 0} data-key="memberPrice" data-id={item.id} onChange={(e) => this.commodityPriceChange(e, item.id, 'memberPrice')} />
                              <div className="params-item-repertory">
                                <span>商品库存：</span>
                                {/* <Icon type="minus" style={{ fontSize: 16, cursor: 'pointer' }} data-value={item.stock} data-key="stock" data-id={item.id} onClick={this.subStock} /> */}
                                <InputNumber min={0} style={{ marginLeft: 10 }} className="params-item-input" value={item.stock} data-key="stock" data-id={item.id} onChange={(e) => this.commodityPriceChange(e, item.id, 'stock')} />
                                {/* <Icon type="plus" style={{ fontSize: 16, cursor: 'pointer' }} data-value={item.stock} data-key="stock" data-id={item.id} onClick={this.addStock} /> */}
                              </div>
                              {/* {
                                item.deleted === 0 ?
                                  <Button style={{ marginLeft: 20 }} disabled>已添加</Button>
                                  :
                                  <Button style={{ marginLeft: 20, width: 74, flexShrink: 0 }} type="primary">添加</Button>
                              } */}
                              {
                                !item.isAdd ? <Icon type="delete" data-id={item.id} style={{ fontSize: 16, marginLeft: 20, cursor: 'pointer' }} onClick={this.deleteCommodityParamet} /> : ''
                              }
                            </div>
                          )
                        })
                      }
                      <Button icon="plus" onClick={this.addCommodityParameters} style={{ width: 150, margin: '10px 0' }}>添加参数</Button>
                      <div style={{ textAlign: 'center' }}>
                        <Button onClick={this.goodsParamsConfirmed} type="primary" style={{ width: 150 }}>确认规格</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
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
            </Row>
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