// 会员等级
import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import { Divider } from 'antd'
import GradeModal from './GradeModal'
export default class MemberGrade extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '',
        add: '',
        edit: '',
        delete: '',
      },
      dataSource: [
        {
          Id: 10000,
          VipGrade: '普通会员',
          NeededPoints: 999,
          DiscountRate: 3.33,
          remark: ''
        },
        {
          Id: 10001,
          VipGrade: '白银会员',
          NeededPoints: 1000,
          DiscountRate: 8.50,
          remark: '积分满5000可升级白银会员，平台店铺所有商品99折'
        },
        {
          Id: 10002,
          VipGrade: '白金会员',
          NeededPoints: 10000,
          DiscountRate: 8.00,
          remark: ''
        },
        {
          Id: 10003,
          VipGrade: 'VVVVVVIP',
          NeededPoints: 20000,
          DiscountRate: 6.00,
          remark: ''
        }
      ]
    }
  }
  deleteCallback = (e) => {
    console.log(e)
  }

  editCallback=(e)=> {
    this.gradeChild.edit()
  }
  addCallback = () => {
    this.gradeChild.add()
  }

  // 修改，添加成功回调
  onGradeModalCallback = ()=>{}
  render() {
    let { urls, dataSource } = this.state;
    const _columns = (that) => {
      return [
        {
          title: '会员等级',
          key: 'VipGrade',
          dataIndex: 'VipGrade',
        },
        {
          title: '需要积分',
          key: 'NeededPoints',
          dataIndex: 'NeededPoints',
        },
        {
          title: '可享折扣率',
          key: 'DiscountRate',
          dataIndex: 'DiscountRate',
        },
        {
          title: '备注',
          key: 'remark',
          dataIndex: 'remark',
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
      <div>
        <GtableEdit
          triggerRef={ref => this.child = ref}
          functionButtons={{ isAdd: true }}
          urls={urls}
          dataSource={dataSource}
          columns={_columns}
          isRowSelection={false}
          editCallback={this.editCallback}
          addCallback={this.addCallback}
        />

        <GradeModal triggerRef={ref=>this.gradeChild = ref} onGradeModalCallback={this.onGradeModalCallback} />

      </div>
    )
  }
}