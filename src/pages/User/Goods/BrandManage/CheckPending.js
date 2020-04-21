import React from 'react'
import { Divider } from 'antd'

import GtableEdit from '../../../../common/GtableEdit'
import Datas from '../datas'
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

  render() {

    const _columns = (that) => {
      return [
        {
          title: '申请经营方',
          key: 'teacherName',
          dataIndex: 'teacherName',
        },
        {
          title: '品牌名称',
          key: 'Seniority',
          dataIndex: 'Seniority',
        },
        {
          title: '申请时间',
          key: 'date',
          dataIndex: 'date',
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
      { type: 'input', field: 'name', label: '申请经营方', placeholder: '请输入申请经营方' },
    ]

    const { urls,dataSource } = this.state
    return (
      <GtableEdit
        addCallback={(e) => this.add(e)}
        urls={urls}
        dataSource={dataSource}
        isRowSelection={false}
        searchData={searchData}
        columns={_columns}
      />
    )
  }
}