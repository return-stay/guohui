import React from 'react'
import { Form, Input, Checkbox, Divider } from 'antd'

import './index.less'
import GtableEdit from '../../../../common/GtableEdit'
import Gpopover from '../../../../common/Gpopover'
const { TextArea } = Input;
export default class BaseForm extends React.Component {

  constructor() {
    super()
    this.state = {
      atoz: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      codeIndex: 0,
      options: [],
      selectedIds: [],
      selectedOptions: [],
      propertyPop: false,
      urls: {
        add: '',
        list: '/productCategory/listByParentId',
        edit: ''
      }
    }
  }

  addProperty = (e) => {
    this.setState({
      propertyPop: true,
    })
  }

  componentDidMount() {
    this.setState({
      options: [{
        id: 444,
        isChecked: true,
        value: "TATA木门"
      },
      { id: 555, value: 'Pear', isChecked: false, },
      { id: 666, value: 'Orange', isChecked: false, },]
    }, () => {
      this.initOptionsConduct()
    })
  }

  initOptionsConduct = () => {
    let options = this.state.options
    let ids = []
    let selectedOptions = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].isChecked) {
        ids.push(options[i].id)
        selectedOptions.push(options[i])
      }
    }

    this.setState({
      selectedIds: ids,
      selectedOptions,
    })
  }


  codeClick = (e) => {
    console.log(e.currentTarget.getAttribute('data-index'))
    this.setState({
      codeIndex: Number(e.currentTarget.getAttribute('data-index'))
    })
  }

  onSpeciChange = (e) => { }

  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    let options = this.state.options
    let ids = []
    let selectedOptions = []
    for (let i = 0; i < checkedValues.length; i++) {
      for (let j = 0; j < options.length; j++) {
        if (checkedValues[i] === options[j].id) {
          ids.push(options[i].id)
          selectedOptions.push(options[i])
        }
      }
    }
    this.setState({
      selectedIds: ids,
      selectedOptions,
    })

  }
  render() {
    const { atoz, codeIndex, options, selectedIds, selectedOptions, urls } = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const _columns = (that) => {
      return [
        {
          title: '属性名',
          key: 'teacherName',
          dataIndex: 'teacherName',
        },
        {
          title: '属性值',
          key: 'Seniority',
          dataIndex: 'Seniority',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff' }} onClick={(e) => that.handleEdit(e, item)}>编辑</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={(e) => { that.handleDelete(e, item) }}>删除</span>
              </>
            )
          }
        }
      ]
    }




    return (
      <>
        <Form {...formItemLayout}>

          <Form.Item label="类型名称">
            {getFieldDecorator('inputName', { valuePropName: 'value', rules: [{ required: true, message: '请输入1至12个字符！' }] })(<Input maxLength={12} placeholder='请输入类型名称' />)}
          </Form.Item>


          <Form.Item label="关联品牌">
            <div>
              {
                atoz.map((item, index) => {
                  return <span className={codeIndex === index ? "code-style action" : "code-style"} disabled={item.isDisabled} data-index={index} key={index} onClick={this.codeClick}>{item}</span>
                })
              }
            </div>

            <div className="brand-box">
              <div className="brand-group">
                <Checkbox.Group onChange={this.onChange} value={selectedIds}>
                  {
                    options.map(item => {
                      return <Checkbox key={item.id} value={item.id} checked={item.isChecked}>{item.value}</Checkbox>
                    })
                  }
                </Checkbox.Group>
              </div>
              <div className="brand-checkbox">
                <span>已选择：</span>
                {getFieldDecorator('AssociationBrand', { valuePropName: 'checkbox', rules: [{ required: true, message: '请输入1至12个字符！' }] })(<Checkbox.Group onChange={this.onChange} value={selectedIds}>
                  {
                    selectedOptions.map(item => {
                      return <Checkbox key={item.id} value={item.id} checked={item.isChecked}>{item.value}</Checkbox>
                    })
                  }
                </Checkbox.Group>)}
              </div>
            </div>
          </Form.Item>
          <Form.Item label="属性">

            <GtableEdit
              urls={urls}
              columns={_columns}
            />

            <div style={{cursor: 'pointer'}} onClick={this.addProperty}>新增一个属性</div>
          </Form.Item>
          <Form.Item label="规格">
            <div className="speci-flex">
              <Checkbox onChange={this.onSpeciChange}></Checkbox><Input value="颜色" style={{ width: 120, marginLeft: 10 }} />
            </div>
            <div>
              <TextArea rows={2} />
            </div>

            <div className="speci-flex">
              <Checkbox onChange={this.onSpeciChange}></Checkbox><Input value="尺寸" style={{ width: 120, marginLeft: 10 }} />
            </div>
            <div>
              <TextArea rows={2} />
            </div>

            <div className="speci-flex">
              <Checkbox onChange={this.onSpeciChange}></Checkbox><Input value="规格" style={{ width: 120, marginLeft: 10 }} />
            </div>
            <div>
              <TextArea rows={2} />
            </div>
          </Form.Item>
        </Form>

        <GpopoverSortForm visible={this.state.propertyPop} onClose={() => { this.setState({ propertyPop: false }) }} onOk={this.Ok}></GpopoverSortForm>
      </>

    )
  }
}

@Gpopover
class GpopoverSort extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="属性名">
          {getFieldDecorator('typeName', { valuePropName: 'value', rules: [{ required: true, message: '请输入1至12个字符！' }] })(<Input maxLength={12} placeholder='请输入类型名称' />)}
        </Form.Item>

        <Form.Item label="属性值">
          {getFieldDecorator('typeValue', { valuePropName: 'value', rules: [{ required: true, message: '请输入1至12个字符！' }] })(<TextArea rows={2} placeholder='请输入类型名称' />)}
        </Form.Item>


        <Form.Item label="是否多选">
          {getFieldDecorator('isChecbox', { valuePropName: 'value' })(<Input maxLength={12} placeholder='请输入类型名称' />)}
        </Form.Item>
      </Form>
    )
  }
}

const GpopoverSortForm = Form.create()(GpopoverSort)