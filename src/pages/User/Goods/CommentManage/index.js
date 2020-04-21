import React from 'react'
import { Tabs } from 'antd'

import GtableEdit from '../../../../common/GtableEdit'
import Datas from '../datas'
const { TabPane } = Tabs;
export default class CommentManage extends React.Component {
  state = {
    urls: {
      add: '',
      list: '',
      edit: ''
    },
    titleList: [
      { value: '未处理', id: 11, type: 0 },
      { value: '全部', id: 12, type: 1 },
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
          title: '评价商品',
          key: 'ProductName',
          dataIndex: 'ProductName',
        },
        {
          title: '评价内容',
          key: 'CommentContent',
          dataIndex: 'CommentContent',
        },
        {
          title: '商品评分',
          key: 'CommentMark',
          dataIndex: 'CommentMark',
        },
        {
          title: '初评日期',
          key: 'CommentDateStr',
          dataIndex: 'CommentDateStr',
        },
        {
          title: '追评日期',
          key: 'AppendDateStr',
          dataIndex: 'AppendDateStr',
        },
        {
          title: '状态',
          key: 'Status',
          dataIndex: 'Status',
        },
        {
          title: '操作',
          render: (item) => {
            return <span style={{ color: '#1890ff' }} onClick={(e) => { that.handleDelete(e, item) }}>评价已清除</span>
          }
        }
      ]
    }
    const searchData = [
      { type: 'input', field: 'name', label: '名称', placeholder: '请输入商品名称' },
      { type: 'select', field: 'number', label: '评分', width: '170px', placeholder: '请输入商品名称', list: [{id: '1111', value: 'jusk', label: 'jusk'}] },
      { type: 'checkbox', field: 'pinglun', label: '查看追加的评论'},
    ]

    const { titleList, urls,dataSource } = this.state
    return (
      <div>
        <Tabs defaultActiveKey="0" onChange={this.callback} type="card">
          {
            titleList && titleList.length > 0 && titleList.map((item) => {
              return (
                <TabPane tab={item.value} key={item.type}>
                  <GtableEdit
                    addCallback={(e) => this.add(e)}
                    urls={urls}
                    dataSource={dataSource}
                    searchData={searchData}
                    columns={_columns}
                    onChange={this.handleChange}
                    titleChangeCallback={this.titleChangeCallback}
                  />
                </TabPane>
              )
            })
          }
        </Tabs>
      </div>
    )
  }
}