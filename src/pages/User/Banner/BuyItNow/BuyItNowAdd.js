import React from 'react'
import { Form, Input, Button, InputNumber, Icon, Modal, message, Select, Row, Col } from "antd";
import connect from '../../../../utils/connect'
import Gupload from '../../../../common/Gupload'
import AllTable from '../../../../common/GtableEdit/AllTable'
import { RecommendAdd, RecommendDetail, RecommendUpdate, CategoryFindAllCate, ProductList } from '../../../../config/api'
import request from '../../../../utils/request'
import BaseForm from '../../../../common/BaseForm'
import { getOptionsList } from '../../../../utils'
import '../index.less'

@connect
class BuyItNowAdd extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      bannerInfo: {},
      title: '编辑',
      imgtext: '',
      selectedRows: [],
      productIds: [],
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
    let { bannerid, messageText } = this.props
    this.setState({
      disabled: messageText === "查看详情" ? true : false,
      bannerid,
    }, () => {
      if (bannerid) {
        this.getConfigDetail(bannerid)
      }
    })
  }

  getConfigDetail = (id) => {
    request({
      url: RecommendDetail,
      method: 'get',
      params: {
        id: id
      }
    }).then(res => {
      let data = res.data
      let setData = {
        title: data.title,
        pic: data.pic,
        status: data.status,
        // modelType: data.modelType,
        modelType: 'yiKouJia',
        sort: data.sort || 0,
      }
      if (data.contentType) {
        setData.contentType = data.contentType
      }
      if (data.paramContent) {
        setData.paramContent = data.paramContent
      }
      this.setState({
        gridInfo: data,
        pic: data.pic,
        selectedRows: this.editDataList(data.dataList),
      }, () => {
        this.props.form.setFieldsValue({ ...setData })
      })

    })
  }

  editDataList = (list) => {
    let newarr = []
    let ids = []
    for (let i = 0; i < list.length; i++) {
      newarr.push({
        productId: list[i].dataId,
        productName: list[i].dataName,
        productPicUrl: list[i].pic,
        // cateName: keys[i].cateName + ' ' + keys[i].childCateName,
        cateName: list[i].cateName,
        currentPrice: list[i].price,
        pstock: list[i].stock,
        dataType: "product",
        modelType: "yiKouJia",
      })
      ids.push(list[i].dataId)
    }
    this.setState({
      productIds: ids
    })
    return newarr
  }

  save = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { name } = this.props.state
        let url = RecommendAdd
        const bannerid = this.state.bannerid

        if (bannerid) {
          url = RecommendUpdate
          values.ids = bannerid
        }
        if (this.state.selectedRows.length !== 3) {
          message.error('选择的商品必须为三条')
          return
        }
        let ids = this.idsFunc()
        request({
          url: url,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: {
            ...values,
            createUser: name,
            modelType: 'yiKouJia',
            link: '',
            dataIds: ids,
          }
        }).then(res => {
          if (res.code === 100) {
            this.props.successCallback()
          }
        }).catch(err=> {
          message.error(err.message)
        })
      }
    })
  }

  idsFunc = () => {
    let selectedRows = this.state.selectedRows
    let ids = []
    for (let i = 0; i < selectedRows.length; i++) {
      ids.push(selectedRows[i].productId)
    }

    return ids.join(',')
  }
  uploadSuccessCallback = (img) => {
    this.setState({
      pic: img
    })
    this.props.form.setFieldsValue({ pic: img })
  }

  cancel = () => {
    this.props.successCallback()
  }

  addGoods = () => {
    this.goodsChild.show(this.actionProductId(), this.state.selectedRows)
  }

  actionProductId = () => {
    let list = this.state.selectedRows
    let ids = []
    for (let i = 0; i < list.length; i++) {
      ids.push(list[i].productId)
    }
    return ids
  }

  goodsCallback = (keys) => {
    this.setState({
      selectedRows: keys,
    })
  }

  sortAction = (e) => {
    const type = e.currentTarget.getAttribute('data-type')
    const index = Number(e.currentTarget.getAttribute('data-index'))
    let newIndex = 0
    let fieldData = this.state.selectedRows
    if (type === 'up') {
      newIndex = index - 1
    } else if (type === 'down') {
      newIndex = index + 1
    }
    fieldData[index] = fieldData.splice(newIndex, 1, fieldData[index])[0];

    this.setState({
      selectedRows: fieldData
    })
  }

  closeGood = (e) => {
    const index = Number(e.currentTarget.getAttribute('data-index'))
    let fieldData = this.state.selectedRows

    if (fieldData.length > 1) {
      fieldData.splice(index, 1);
    } else {
      fieldData = []
    }
    this.setState({
      selectedRows: fieldData
    })
  }

  render() {
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    };

    const { pic, disabled, imgtext, selectedRows } = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="ba-box">
        <Form {...formLayout}>

          <Form.Item label="一口价名称">
            {getFieldDecorator('title', { valuePropName: 'value', rules: [{ required: true, message: "请输入一口价名称" }] })(
              <Input style={{ width: 400 }} />
            )}
          </Form.Item>
          <Form.Item label="一口价类型">
            {getFieldDecorator('modelType', { valuePropName: 'value', initialValue: 'yiKouJia', rules: [{ required: true, message: '请选择一口价类型' }] })(
              <Select placeholder='请选择一口价类型' style={{ width: 400 }} onChange={this.slectTypeChange}>
                {getOptionsList([
                  // { id: 'careLot', value: 'careLot', label: '首页推荐拍品' },
                  { id: 'yiKouJia', value: 'yiKouJia', label: '首页一口价专区' },
                  // { id: 'mallRecommend', value: 'mallRecommend', label: '商城为您推荐(p)' },
                  // { id: 'mallSellWell', value: 'mallSellWell', label: '商城新品热销(p)' },
                  // { id: 'mallCelebrity', value: 'mallCelebrity', label: '商城名人佳作(p)' },
                  // { id: 'mallChoiceShop', value: 'mallChoiceShop', label: '商城优选店铺(s)' },
                  // { id: 'mallAllSee', value: 'mallAllSee', label: '商城大家都在看(p)' },
                ])}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="一口价图片">
            {getFieldDecorator('pic', { valuePropName: 'value', rules: [{ required: true, message: "请上传金刚区图片" }] })(
              <Gupload className="avatar-uploader-card" file={pic} uploadButtonText={'请上传' + (imgtext || '图片')} success={img => this.uploadSuccessCallback(img, 'productPicUrl')} />
            )}
          </Form.Item>
          <Form.Item label="权重">
            {getFieldDecorator('sort', { valuePropName: 'value', initialValue: 1, rules: [{ required: true, message: "请输入权重" }] })(
              <InputNumber style={{ width: 120 }} min={0} />
            )}
            <span style={{ color: '#777', marginLeft: 20, fontSize: 13 }}>数值越大，排序越靠后</span>
          </Form.Item>
          <Form.Item label="商品列表" colon={false} labelCol={{ span: 2 }}>
            <Button onClick={this.addGoods}>选择商品</Button>
            {
              selectedRows.length > 0 && <div className="banner-img-list">
                <Row>
                  <Col span={2}><span className="banner-item-title">商品图片</span></Col>

                  <Col span={8}><span className="banner-item-title">商品名称</span></Col>
                  <Col span={3}><span className="banner-item-title">商品类目</span></Col>
                  <Col span={3}><span className="banner-item-title">商品价格</span></Col>
                  <Col span={2}><span className="banner-item-title">库存</span></Col>
                  <Col span={4}><span className="banner-item-title" style={{ paddingLeft: 20 }}>操作</span></Col>
                </Row>
                {
                  selectedRows.map((item, index) => {
                    return <Row key={item.productId}>
                      <Col span={2}>
                        <img src={item.productPicUrl} alt="图片" style={{ height: 30, marginRight: 10 }} />
                      </Col>
                      <Col span={8}><span className="banner-item-cont">{item.productName}</span></Col>
                      <Col span={3}><span className="banner-item-cont">{item.cateName}/{item.childCateName}</span></Col>
                      <Col span={3}><span className="banner-item-cont">￥{item.currentPrice}</span></Col>
                      <Col span={2}><span className="banner-item-cont">{item.pstock || 0}</span></Col>

                      <Col span={4} style={{ paddingLeft: 20 }} >
                        {index !== 0 ?
                          <Icon type="arrow-up" style={{ color: '#999', fontSize: 20, marginRight: 10, cursor: 'pointer' }} data-id={item.id} data-index={index} data-type="up" onClick={this.sortAction} />
                          :
                          <Icon type="1" style={{ width: 20, color: '#999', fontSize: 20, marginRight: 10, cursor: 'pointer' }} />
                        }
                        {
                          index !== selectedRows.length - 1 ?
                            <Icon type="arrow-down" style={{ color: '#999', fontSize: 20, marginRight: 10, cursor: 'pointer' }} data-id={item.id} data-index={index} data-type="down" onClick={this.sortAction} />
                            :
                            <Icon type="1" style={{ width: 20, color: '#999', fontSize: 20, marginRight: 10, cursor: 'pointer' }} />
                        }
                        <Icon type="close" style={{ fontSize: 20, color: '#999', cursor: 'pointer' }} data-key={item.id} data-index={index} onClick={this.closeGood} />
                      </Col>
                    </Row>
                  })
                }
              </div>
            }
          </Form.Item>

          {
            !disabled && <Form.Item label=" " colon={false}>
              <Button style={{ marginRight: 20 }} onClick={this.cancel}>取消</Button>
              <Button type="primary" onClick={this.save}>保存</Button>
            </Form.Item>
          }
        </Form>

        <GoodsList triggerRef={ref => this.goodsChild = ref} commitCallback={this.goodsCallback} />
      </div>

    )
  }
}


const BuyItNowAddFrom = Form.create()(BuyItNowAdd)

export default BuyItNowAddFrom


class GoodsList extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      urls: {
        list: '/product/search',
        listMethod: 'POST',
      },
      selectedRowKeys: [],
      categoryList: [], //商品类目列表
      parentSelectedRows: [],
      dataSource: []
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
    this.getGoodsList()
    this.getCategoryFindAllCate()
  }

  //获取商品列表
  getGoodsList = () => {
    request({
      url: ProductList,
      method: 'post',
      data: {
        pageSize: 10000000,
        pageNumber: 1,
      }
    }).then(res => {
      if (res.code === 100 && res.data) {
        this.setState({
          dataSource: res.data.datas || []
        })
      } else {
        this.setState({
          dataSource: []
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

  selectChange = (selectedRowKeys, selectedRows) => {
    if (selectedRowKeys.length < 4) {
      this.setState({
        selectedRowKeys, selectedRows
      })
    } else {
      message.warning('最多选择三条数据')
      this.setState({
        modalLoading: false
      })
    }
  }

  show = (keys) => {
    let selectedRows = this.state.dataSource
    let arr = []
    for (let i = 0; i < selectedRows.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        if (keys[j] === selectedRows[i].productId) {
          arr.push(selectedRows[i])
        }
      }
    }
    this.setState({
      visible: true,
      selectedRowKeys: keys,
      selectedRows: arr,
    })
  }
  onCancel = () => {
    this.setState({
      visible: false,
    })
  }
  onOk = (e) => {
    this.props.commitCallback(this.state.selectedRows)
    this.onCancel()
  }

  // 对比query 的参数是否改变
  isQueryChange = (nexQuery) => {
    let propsQuery = this.state.query || {}
    for (const key in nexQuery) {
      if (nexQuery[key] !== propsQuery[key]) {
        return true
      }
    }
    return false
  }

  search = (e) => {
    const that = this
    if (e.productCategoryIds && e.productCategoryIds.length > 0) {
      e.cateId = e.productCategoryIds[0]
      e.childCateId = e.productCategoryIds[1]
    }
    if (this.isQueryChange(e)) {
      this.setState({
        query: e
      }, () => {
        let obj = JSON.parse(JSON.stringify(e))
        delete obj.productCategoryIds
        that.tableSortingParameters(obj);
      })
    }
  }

  tableSortingParameters = (obj) => {
    let params = {
      ...obj
    }
    this.tableChild.sortingParameters(params);
  }

  render() {
    const { visible, urls, categoryList, selectedRowKeys } = this.state
    const _columns = () => {
      return [
        {
          title: '商品信息',
          key: 'productName',
          render(item) {
            return (
              <div style={{ display: 'flex' }}>
                <img src={item.productPicUrl} alt="图片" style={{ height: 30, marginRight: 10, flexShrink: 0 }} />

                <div style={{ flex: 1 }}>
                  <p>{item.productName}</p>
                  <p>￥ {item.currentPrice}</p>
                </div>

              </div>
            )
          }
        },
      ]
    }
    const searchData = [
      { type: 'input', field: 'productName', width: '150px', label: '商品名称', placeholder: '请输入商品名称' },
      { type: 'cascader', field: 'productCategoryIds', width: '180px', label: '商品类目', options: categoryList, placeholder: '请选择商品类目' },
    ]
    return (
      <div>
        <Modal
          size="small"
          maskClosable={false}
          visible={visible}
          title="选择商品"
          width={1000}
          onCancel={this.onCancel}
          onOk={this.onOk}
          destroyOnClose={true}
        >
          <div style={{ padding: '10px' }}>
            <BaseForm data={searchData} handleSearch={this.search} />
          </div>

          <AllTable
            limitNumber={3}
            selectedRowKeys={selectedRowKeys}
            tableBoxClass="goods-modal-game-list"
            urls={urls}
            rowKey={record => record.productId}
            columns={_columns}
            selectChange={this.selectChange}
            bordered={false}
            pagination={true}
            triggerRef={ref => { this.tableChild = ref }}
          />
        </Modal>
      </div>
    )
  }
}