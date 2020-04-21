import React from 'react'
import { PageHeader, Radio, Button } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'

export default class ThemeColor extends React.Component {
  constructor() {
    super()

    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 0,
          Name: '商城主色',
          ColorShow: '颜色',
          WebColor: 'rgba(255, 153, 0, 0.76)',
          ColorArea: '修改商城搜索框，商品分类栏顶栏，按钮，以及方块状图标的颜色',
        },
        {
          Id: 1,
          Name: '商城辅色',
          ColorShow: '颜色',
          WebColor: '#20124d',
          ColorArea: '修改商城中水平线颜色，楼层风格以及选中效果的边框颜色',
        },
        {
          Id: 2,
          Name: '字体效果',
          ColorShow: '颜色',
          WebColor: '#000000',
          ColorArea: '文字选项的选中效果以及鼠标移入选项时文字的颜色',
        },
        {
          Id: 3,
          Name: '侧边栏',
          ColorShow: '颜色',
          WebColor: 'rgba(255, 153, 0, 0.76)',
          ColorArea: '右侧边栏的颜色',
        },
        {
          Id: 4,
          Name: '商品分类',
          ColorShow: '颜色',
          WebColor: 'rgba(255, 153, 0, 0.76)',
          ColorArea: '	商品分类栏展开后的颜色',
        },
      ]
    }
  }
  themeChange = (e) => {
    console.log(e)
    this.setState({
      themeType: e.target.value
    })
  }

  themeBack = () => {
    this.props.onBack()
  }

  saveTheme = () => {
    console.log('保存')
  }
  render() {

    const _columns = (that) => {
      let isEdit = this.state.themeType === 1 ? false : true
      return [
        {
          title: '名称',
          key: 'Name',
          dataIndex: 'Name',
        },
        {
          title: '颜色显示',
          key: 'ColorShow',
          dataIndex: 'ColorShow',
        },
        {
          title: 'web色编码',
          key: 'WebColor',
          dataIndex: 'WebColor',
          editable: isEdit,
        },
        {
          title: '颜色作用区域',
          key: 'ColorArea',
          dataIndex: 'ColorArea'
        }
      ]
    }

    const { urls, dataSource } = this.state
    return (
      <div>

        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={this.themeBack}
          title="主题设置"
        />


        <div style={{ padding: '20px' }}>
          <Radio.Group name="radiogroup" defaultValue={2} onChange={this.themeChange}>
            <Radio value={1}>默认主题</Radio>
            <Radio value={2}>自定义主题</Radio>
          </Radio.Group>
        </div>


        <div>

          <GtableEdit
            urls={urls}
            columns={_columns}
            isRowSelection={false}
            dataSource={dataSource}
          />



          <div style={{ marginLeft: 450, marginTop: 30 }}>
            <Button type="primary" onClick={this.saveTheme}>保存</Button>
          </div>
        </div>

      </div>
    )
  }
}