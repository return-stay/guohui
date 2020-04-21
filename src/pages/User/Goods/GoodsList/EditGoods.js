import React from 'react'
import { UploadApi } from '../../../../config/api'
import { Button, Form, Input, InputNumber, Icon, message, Upload, Row, Col, Radio, DatePicker } from 'antd'
import { dismantleSearch } from '../../../../utils'
import './index.less'
class EditGoods extends React.Component {
  constructor() {
    super()
    this.state = {
      imgLoading: false,
      typeValue: 1,
      freeShipping: 0, //是否包邮， 0 否 1，是
      marjorLabels: [{ key: 0, value: '' }], //商品主标签
      minjorLabels: [{ key: 0, value: '' }], //商品副标题
      groupSpecsPrams: [{ key: 0, value: '' }], //商品规格
      productPicUrl: '', //商品banner主图
      productDetailPicUrl: '', //商品详情主图
      productPicList: [], //图片集合
      commodityParameters: [
        {
          id: 0,
          name: '参数1',
          color: '',
          size: '',
          rulingPrice: '',
          originalPrice: '',
          memberPrice: '',
          repertory: 1,
          isAdd: true,
        },
      ],
    }
  }

  componentDidMount() {
    let searchObj = dismantleSearch(this)
    this.setState({
      ...searchObj
    })
    this.props.triggerRef && this.props.triggerRef(this)

    if (searchObj.id) {
      this.edit(searchObj.id)
    } else {
      this.add()
    }
  }

  add = () => { }

  edit = (id) => {
    console.log(id)
    let obj = {
      inputName: '商品名称',
    }
    this.props.form.setFieldsValue({ inputName: '我是测试编辑的', ...obj });
  }
  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { productPicUrl, marjorLabels, minjorLabels, groupSpecsPrams } = this.state

        let params = {
          productPicUrl,
          ...values,
          marjorLabels: this.arrayObjToarrstr(marjorLabels),
          minjorLabels: this.arrayObjToarrstr(minjorLabels),
          groupSpecsPrams: this.arrayObjToarrstr(groupSpecsPrams)
        }
        console.log(params)
        if (!this.verifyParams(params)) {
          return false
        }
      }
    });
  };

  arrayObjToarrstr = (arr, str = ',') => {
    let newarr = []
    for (let i = 0; i < arr.length; i++) {
      newarr.push(arr[i].value)
    }
    return newarr.join(str)
  }

  verifyParams = (params) => {
    if (!params.name) {
      message.error('名称不能为空')
      return false
    }
    return true
  }

  radioChange = (e, str) => {
    let obj = {}
    let value = e.target.value
    switch (str) {
      case 'freeShipping':
        obj.freeShipping = value
        break
      default:
        obj = {}
    }
    this.setState({
      ...obj
    })
  }

  inputNumberChange = (e) => {
    this.setState({ postage: e });
  };

  onDateChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onDateOk = (value) => {
    console.log('onOk: ', value);
  }

  handleChange = info => {
    console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ imgLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        console.log(imageUrl)
        this.setState({
          imageUrl,
          imgLoading: false,
        })
      }
      );
    }
  };

  // 添加标签
  addLabels = (e) => {
    let type = e.currentTarget.getAttribute("data-type")
    let obj = {}

    let { marjorLabels, minjorLabels, groupSpecsPrams } = this.state;
    switch (type) {
      case 'marjorLabels':
        let key = marjorLabels.length;
        marjorLabels.push({
          key,
          value: ''
        })
        obj.marjorLabels = marjorLabels
        break;
      case 'minjorLabels':
        let key2 = minjorLabels.length;
        minjorLabels.push({
          key: key2,
          value: ''
        })
        obj.minjorLabels = minjorLabels
        break;
      case 'groupSpecsPrams':
        let key3 = groupSpecsPrams.length;
        groupSpecsPrams.push({
          key: key3,
          value: ''
        })
        obj.groupSpecsPrams = groupSpecsPrams
        break;
      default:
        obj = {}
    }
    this.setState({
      ...obj
    })
  }
  inputChange = (e) => {
    let key = Number(e.currentTarget.getAttribute("data-key"))
    let value = e.target.value
    let type = e.currentTarget.getAttribute("data-type")
    let obj = {}
    switch (type) {
      case 'marjorLabels':
        let marjorLabels = this.state.marjorLabels
        marjorLabels[key].value = value
        obj.marjorLabels = marjorLabels
        break;
      case 'minjorLabels':
        let minjorLabels = this.state.minjorLabels
        minjorLabels[key].value = value
        obj.minjorLabels = minjorLabels
        break;

      case 'groupSpecsPrams':
        let groupSpecsPrams = this.state.groupSpecsPrams
        groupSpecsPrams[key].value = value
        obj.groupSpecsPrams = groupSpecsPrams
        break;
      default:
        obj = {}
    }
    this.setState({ ...obj })

  }

  addCommodityParameters = () => {
    let commodityParameters = this.state.commodityParameters
    let key = commodityParameters.length
    let index = key + 1;
    commodityParameters.push(
      {
        id: key,
        name: '参数' + index,
        color: '',
        size: '',
        rulingPrice: '',
        originalPrice: '',
        memberPrice: '',
        repertory: 0,
        isAdd: false,
      }
    )
    this.setState({
      commodityParameters,
    })
  }

  // 商品参数修改  根据 index 第几个元素  key：属性名  value 修改的值
  commodityParametersItemEdit = (index, key, value) => {
    let commodityParameters = this.state.commodityParameters
    commodityParameters[index][key] = value

    this.setState({
      commodityParameters,
    })
  }

  colorChange = (e) => {
    let index = Number(e.currentTarget.getAttribute("data-index"))
    let value = e.target.value
    this.commodityParametersItemEdit(index, 'color', value)
  }

  // 确认商品参数
  goodsParamsConfirmed = () => {
    console.log(this.state.commodityParameters)
  }

  render() {
    const UploadButton = (props) => {
      let imgLoading = this.state.imgLoading
      return (
        <div>
          <div>主图</div>
          <Icon style={{ fontSize: 30 }} type={imgLoading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传图片</div>
        </div>
      )
    };

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    const formItemLayoutTwo = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };

    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
    }

    const { imageUrl, marjorLabels, minjorLabels, groupSpecsPrams, commodityParameters } = this.state

    return (
      <div className="add-goods-box">
        <Form {...formLayout}>

          <Form.Item label="名称">
            {getFieldDecorator('inputName', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input placeholder='请输入名称' />)}
          </Form.Item>

          <Row>
            <Col span={8}>
              <Form.Item label="商品类目" {...formItemLayoutTwo}>
                {getFieldDecorator('description', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input autoComplete="on" placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所属店铺" {...formItemLayout}>
                {getFieldDecorator('keywords', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
          </Row>


          <Row>
            <Col span={8}>
              <Form.Item label="售卖类型" {...formItemLayoutTwo}>
                {getFieldDecorator('saleType', { valuePropName: 'value', initialValue: 1 })(
                  <Radio.Group>
                    <Radio value={0}>非预售</Radio>
                    <Radio value={1}>预售</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="起售时间" {...formItemLayout}>
                <DatePicker showTime placeholder="开始时间" onChange={this.onDateChange} onOk={this.onDateOk} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item label="推荐类型" {...formItemLayoutTwo}>
                {getFieldDecorator('choice', { valuePropName: 'value', initialValue: 0 })(
                  <Radio.Group>
                    <Radio value={0}>非精选</Radio>
                    <Radio value={1}>预售</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="运费" {...formItemLayout}>
                {getFieldDecorator('freeShipping', { valuePropName: 'value', initialValue: 0 })(
                  <Radio.Group onChange={e => this.radioChange(e, 'freeShipping')}>
                    <Radio value={1}>包邮</Radio>
                    <Radio value={0}>不包邮</Radio>
                  </Radio.Group>
                )}
                {
                  this.state.freeShipping === 0 ? <InputNumber onChange={this.inputNumberChange} placeholder="￥ 请输入运费" style={{ width: 120 }} min={0} /> : ''
                }
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item label="孤品标识" {...formItemLayoutTwo}>
                {getFieldDecorator('sole', { valuePropName: 'value', initialValue: 1 })(
                  <Radio.Group>
                    <Radio value={0}>非孤品</Radio>
                    <Radio value={1}>预售</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>


          <Form.Item label="商品主标签" {...formLayout}>
            <div style={{ display: 'flex', alignItems: 'center', height: 39 }}>
              {
                marjorLabels.map((item) => {
                  return <Input style={{ width: 130, marginRight: 10 }} maxLength={10} value={item.value} placeholder="请输入商品标签" key={item.key} data-key={item.key} data-type="marjorLabels" onChange={this.inputChange} />
                })
              }
              <Icon data-type="marjorLabels" onClick={this.addLabels} type="plus" style={{ fontSize: 24, marginLeft: 10, cursor: 'pointer' }} />
            </div>
          </Form.Item>

          <Form.Item label="商品副标签" {...formLayout}>
            <div style={{ display: 'flex', alignItems: 'center', height: 39, }}>
              {
                minjorLabels.map(item => {
                  return <Input style={{ width: 130, marginRight: 10 }} maxLength={10} placeholder="请输入商品标签" key={item.key} data-key={item.key} data-type="minjorLabels" onChange={this.inputChange} />
                })
              }
              <Icon data-type="minjorLabels" onClick={this.addLabels} type="plus" style={{ fontSize: 24, marginLeft: 10, cursor: 'pointer' }} />
            </div>
          </Form.Item>

          <Form.Item label="商品规格" {...formLayout}>
            <div style={{ display: 'flex', alignItems: 'center', height: 39, }}>

              {
                groupSpecsPrams.map(item => {
                  return <Input style={{ width: 100, marginRight: 10 }} maxLength={10} key={item.key} data-key={item.key} data-type="groupSpecsPrams" onChange={this.inputChange} />
                })
              }
              <Icon data-type="groupSpecsPrams" onClick={this.addLabels} type="plus" style={{ fontSize: 24, marginLeft: 10, cursor: 'pointer' }} />
            </div>
          </Form.Item>

          <Form.Item label="商品参数" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>

            <div className="params-box">
              {
                commodityParameters.map(item => {
                  return (
                    <div className="params-item" key={item.id}>
                      <span className="params-item-title">{item.name}：</span>
                      <Input className="params-item-input" value={item.color} placeholder="" data-index={item.id} onChange={this.colorChange} />
                      <Input style={{ width: 103 }} value={item.size} placeholder="" />
                      <span className="params-item-bd"></span>
                      <Input className="params-item-input" placeholder="现价 ￥" value={item.rulingPrice} />
                      <Input className="params-item-input" placeholder="原价 ￥" value={item.originalPrice} />
                      <Input className="params-item-input" placeholder="会员价 ￥" value={item.memberPrice} />
                      <div className="params-item-repertory">
                        <span>商品库存：</span>
                        <Icon type="minus" style={{ fontSize: 16, cursor: 'pointer' }} />
                        <span className="params-item-repertory-num">{item.repertory || null}</span>
                        <Icon type="plus" style={{ fontSize: 16, cursor: 'pointer' }} />
                      </div>
                      {
                        item.isAdd ? <Button style={{ marginLeft: 20 }} disabled>已添加</Button> : <Button style={{ marginLeft: 20, width: 74, flexShrink: 0 }} type="primary">添加</Button>
                      }
                      {
                        item.isAdd ? <Icon type="delete" style={{ fontSize: 16, marginLeft: 20, cursor: 'pointer' }} /> : ''
                      }
                    </div>
                  )
                })
              }
              <Icon onClick={this.addCommodityParameters} type="plus" style={{ fontSize: 24, marginLeft: 25, cursor: 'pointer' }} />
              <div>
                <Button onClick={this.goodsParamsConfirmed} type="primary" style={{ width: 150 }}>确认</Button>
              </div>
            </div>
          </Form.Item>


          <div style={{ marginTop: 10, paddingTop: 20, borderTop: '1px solid #ccc' }}>
            <Form.Item label="商品banner图" {...formLayout}>
              <span>请上传图片800*800的图片/视频， 仅支持jpg, png 格式</span>
            </Form.Item>

            <div style={{ paddingLeft: 20 }}>
              {getFieldDecorator('productPicUrl', { valuePropName: 'upload' })(<Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={UploadApi}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadButton />}
              </Upload>)}
            </div>
          </div>

          <div>
            <Form.Item label="商品详情长图片" {...formLayout}>
              <span>请上传图片800*800的图片/视频， 仅支持jpg, png 格式</span>
            </Form.Item>

          </div>

          <Form.Item label=" " colon={false}>
            <Button onClick={this.handleOk} type="primary" style={{ width: 200 }}>发布商品</Button>
          </Form.Item>

        </Form>

      </div>
    )
  }
}

export default Form.create()(EditGoods)


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}