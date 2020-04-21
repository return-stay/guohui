// 标签管理
import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import LabelModal from './LabelModal'
export default class SettingTable extends React.Component {

  state = {
    urls: {
      list: '',
      add: ''
    },
    dataSource: [
      {
        MemberNum: 12,
        LabelName: "牛百叶爱好者",
        Id: 75,
      }
    ]
  }

  editLabel = (item) => {
    this.child.edit(item)
  }

  addCallback=()=> {
    this.child.add()
  }
  render() {
    let { urls, dataSource } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      return [
        {
          title: '标签名称',
          key: 'LabelName',
          dataIndex: 'LabelName',
        },
        {
          title: '会员数',
          key: 'MemberNum',
          dataIndex: 'MemberNum',
          render: (MemberNum) => {
            return <span style={{ color: '#1890ff' }}>{MemberNum}</span>
          }
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.editLabel(item) }}>编辑</span>
              </>
            )
          }
        }
      ]
    }

    const searchData = [
      { type: 'input', field: 'name', label: '标签名称' },
    ]
    return (
      <div style={{ marginTop: 10 }}>

        <GtableEdit
          urls={urls}
          columns={_columns}
          functionButtons={{isAdd: true}}
          searchData={searchData}
          dataSource={dataSource}
          pagination={true}
          isRowSelection={false}
          addCallback={this.addCallback}
        />

        <LabelModal targetRef={ref => this.child = ref} />

      </div>
    )
  }
}