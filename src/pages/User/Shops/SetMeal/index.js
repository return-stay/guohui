import React from 'react'

import GtableEdit from '../../../../common/GtableEdit'
import SetMealModal from './SetMealModal'
export default class SetMeal extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 1,
          Name: "Platinumstore",
          ProductLimit: 500,
          ImageLimit: 10000,
          ChargeStandard: 10000,
        }
      ]
    }
  }
  addCallback = () => {
    console.log('add')
    this.modalChild.add()
  }
  editCallback = (item) => {
    this.modalChild.edit(item)
  }
  render() {

    let { urls, dataSource } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      return [
        {
          title: '套餐名称',
          key: 'Name',
          dataIndex: 'Name',
        },
        {
          title: '可发布商品',
          key: 'ProductLimit',
          dataIndex: 'ProductLimit',
        },
        {
          title: '可使用空间(M)',
          key: 'ImageLimit',
          dataIndex: 'ImageLimit',
        },
        {
          title: '年费',
          key: 'ChargeStandard',
          dataIndex: 'ChargeStandard',
        },
        {
          title: '操作',
          render: (item) => {
            return (<div style={{ color: '#1890ff' }} onClick={(e) => { that.handleEdit(e, item) }}>编辑</div>)
          }
        }
      ]
    }
    return (
      <div>

        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          isRowSelection={false}
          functionButtons={{isAdd: true}}
          addCallback={this.addCallback}
          editCallback={this.editCallback}
        />


        <SetMealModal triggerRef={ref=> this.modalChild = ref} />
      </div>
    )
  }
}