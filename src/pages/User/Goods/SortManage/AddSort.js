import React from 'react'
import { Modal, Button, Form, Select, Input, InputNumber } from 'antd'
import request from '../../../../utils/request'
import Gupload from '../../../../common/Gupload'
import { CategoryFindAllCate, CateAddCate, CateUpdateCate, } from '../../../../config/api'
import './index.less'
const { Option } = Select;
class AddSort extends React.Component {
  state = {
    visible: false,
    loading: false,
    imgLoading: false,
    selectArr: [],
    isParentShow: false,
  }
  componentDidMount() {
    this.props.triggerRef(this)
    this.getList()
  }

  //获取父类目列表
  getList = (id = 0, callback) => {
    request({
      url: CategoryFindAllCate,
      params: {
        parentId: id
      }
    }).then(res => {
      console.log(res)
      // let list = this.actionList(res.data[0].childList)
      let list = res.data;
      console.log(list)
      for (let i = 0; i < list.length; i++) {
        list[i].label = list[i].id
        list[i].value = list[i].name
      }
      this.setState({
        selectArr: list
      }, () => {
        callback && callback()
      })
    })
  }
  handleOk = e => {
    console.log(e)
    const that = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        that.setState({ loading: true });
        let url = ''
        let params = values

        if (that.state.isEdit) {
          url = CateUpdateCate
          params.id = that.state.rows.id
        } else {
          url = CateAddCate

        }

        request({
          url: url,
          method: 'post',
          data: params
        }).then(res => {
          console.log(res)

          that.handleCancel()


          that.props.successCallback()
        })
      }
    });

  };

  handleCancel = () => {
    this.setState({
      visible: false,
      loading: false,
      colorPicUrl: '',
    });
    this.props.form.setFieldsValue({
      colorPicUrl: null
    })
  };

  modalShow = () => {
    this.setState({
      visible: true,
    });
  }

  add = (rows) => {
    console.log(rows)
    if (rows.isType === 'parent') {
      this.getList(0, () => {
        this.setAddValue(rows)
      })
    } else {
      this.setAddValue(rows)
    }

  }

  setAddValue = (rows) => {
    this.setState({
      title: '新增',
      isEdit: false,
      colorPicUrl: '',
      rows: null,
      isParentShow: rows.isType === 'parent' ? true : false
    });
    this.modalShow()

    setTimeout(() => {
      if (rows.isType === 'parent') {
        this.props.form.setFieldsValue({
          parentId: rows.id
        })
      } else {
        this.props.form.setFieldsValue({
          parentId: null
        })
      }
    }, 0);
  }
  edit = (rows) => {
    console.log(rows)
    if (rows.isType === 'parent') {
      this.getList(0, () => {
        this.setEditValue(rows)
      })
    } else {
      this.setEditValue(rows)
    }

  }

  setEditValue = (rows) => {
    console.log(rows)
    this.setState({
      title: '编辑',
      isEdit: true,
      colorPicUrl: rows.colorPicUrl,
      rows: rows,
      isParentShow: rows.isType === 'parent' ? false : true
    });
    this.modalShow()
    setTimeout(() => {
      this.props.form.setFieldsValue({
        name: rows.name,
        sort: rows.sort || 0,
        colorPicUrl: rows.colorPicUrl,
      })
      if (rows.isType === 'parent') {
        this.props.form.setFieldsValue({
          parentId: rows.id
        })
      } else {
        this.props.form.setFieldsValue({
          parentId: rows.parentId
        })
      }
    }, 0);
  }

  uploadSuccessCallback = (imgurl, type) => {
    console.log(imgurl)
    let obj = {}
    switch (type) {
      case 'colorPicUrl':
        obj.colorPicUrl = imgurl
        this.props.form.setFieldsValue({
          colorPicUrl: imgurl
        })
        break;
      default:
        obj = {}
    }
    this.setState({
      ...obj
    })
  }

  render() {
    const { visible, loading, title, colorPicUrl, selectArr, isParentShow } = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Modal
        title={title}
        visible={visible}
        destroyOnClose={true}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" loading={loading} onClick={this.handleOk}>
            保存
          </Button>,
        ]}
      >
        <Form {...formItemLayout}>

          <Form.Item label="名称">
            {getFieldDecorator('name', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input style={{ width: '100%' }} placeholder='请输入名称' />)}
          </Form.Item>

          {
            isParentShow && <Form.Item label="选择父类目">
              {getFieldDecorator('parentId', { valuePropName: 'value' })(<Select style={{ width: '100%' }}>
                {
                  selectArr.map((item) => {
                    return BaseOption(item)
                  })
                }
              </Select>)}
            </Form.Item>
          }



          {
            !isParentShow && <div className="bid-img">
              <Form.Item label="图片">

                {
                  getFieldDecorator('colorPicUrl', { valuePropName: 'upload', rules: [{ required: true, message: '请输入上传图片' }] })(
                    <Gupload file={colorPicUrl} className="sortClass" uploadButtonText="上传图片（522*242）" success={img => this.uploadSuccessCallback(img, 'colorPicUrl')} />
                  )
                }
              </Form.Item>
            </div>
          }

          {
            isParentShow && <Form.Item label="图片">
              {
                getFieldDecorator('colorPicUrl', { valuePropName: 'upload', rules: [{ required: true, message: '请输入上传图片' }] })(
                  <Gupload file={colorPicUrl} uploadButtonText="上传图片（156*156）" success={img => this.uploadSuccessCallback(img, 'colorPicUrl')} />
                )
              }
            </Form.Item>
          }


          <Form.Item label="排序">
            <div>
              {getFieldDecorator('sort', { valuePropName: 'value', initialValue: 0 })(
                <InputNumber style={{ width: '40%' }} placeholder='请输入排序' />
              )}
              <span style={{ fontSize: 10, color: 'red', marginLeft: 8 }}>提示：数值越大权重越高</span>
            </div>
          </Form.Item>



        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddSort)


const BaseOption = (item) => {
  return <Option value={item.id} key={item.id}>{item.value}</Option>
}
