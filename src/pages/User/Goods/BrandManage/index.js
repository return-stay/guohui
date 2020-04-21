import React from 'react'
import { Divider, Tabs } from 'antd'

import GtableEdit from '../../../../common/GtableEdit'
import CheckPending from './CheckPending'
import AddModalBrand from './AddModalBrand'
import Datas from '../datas'
const { TabPane } = Tabs;
export default class BrandManage extends React.Component {
  state = {
    urls: {
      add: '',
      list: '',
      edit: ''
    },
    titleList: [
      { value: '管理', id: 0, type: 0 },
      { value: '待审核', id: 1, type: 1 },
    ],
    dataSource: Datas
  }

  titleTabChange = (e) => {
    console.log(e)
    let index = e.target.value
    let titleObj = this.state.titleList[index]
    console.log(titleObj)
  }

  callback = (key) => {
    console.log(key);
  }
  add = () => {
    this.child.modalShow()
  }

  render() {

    const _columns = (that) => {
      return [
        {
          title: '名称',
          key: 'BrandName',
          dataIndex: 'BrandName',
        },
        {
          title: 'logo',
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
    const searchData = [
      { type: 'input', field: 'name', label: '名称', placeholder: '请输入商品名称' },
    ]

    const { titleList, urls ,dataSource} = this.state
    return (
      <div>
        <Tabs defaultActiveKey="0" onChange={this.callback} type="card">
          {
            titleList && titleList.length > 0 && titleList.map((item) => {
              return (
                <TabPane tab={item.value} key={item.type}>
                  {
                    item.type === 0 ? (<GtableEdit
                      addCallback={(e)=> this.add(e)}
                      functionButtons={{ isAdd: true, }}
                      urls={urls}
                      searchData={searchData}
                      dataSource={dataSource}
                      columns={_columns}
                      onChange={this.handleChange}
                      titleChangeCallback={this.titleChangeCallback}
                    />) : <CheckPending />
                  }
                </TabPane>
              )
            })
          }
        </Tabs>
        <AddModalBrand triggerRef={ref => { this.child = ref }}/>
      </div>
    )
  }
}