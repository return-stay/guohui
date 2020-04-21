import React from 'react'
import { Tabs } from 'antd'

import GtableEdit from '../../../../common/GtableEdit'
import Datas from '../datas'
const { TabPane } = Tabs;
export default class CounselManage extends React.Component {
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

  callback = (key) => {
    console.log(key);
  }

  render() {
    const _columns = (that) => {
      return [
        {
          title: '咨询商品',
          key: 'ProductName',
          dataIndex: 'ProductName',
        },
        {
          title: '咨询内容',
          key: 'ConsultationContent',
          dataIndex: 'ConsultationContent',
        },
        {
          title: '咨询人',
          key: 'UserName',
          dataIndex: 'UserName',
        },
        {
          title: '咨询日期',
          key: 'Date',
          dataIndex: 'Date',
        },
        {
          title: '咨询状态',
          key: 'type',
          dataIndex: 'type',
        },
        {
          title: '操作',
          render: (item) => {
            return <span style={{ color: '#1890ff' }} onClick={(e) => { that.handleDelete(e, item) }}>清除</span>
          }
        }
      ]
    }

    const { titleList, urls,dataSource } = this.state
    return (
      <div>
        <Tabs defaultActiveKey="0" onChange={this.callback} type="card">
          {
            titleList && titleList.length > 0 && titleList.map((item) => {
              return (
                <TabPane tab={item.value} key={item.type}>
                  <GtableEdit
                    urls={urls}
                    columns={_columns}
                    dataSource={dataSource}
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