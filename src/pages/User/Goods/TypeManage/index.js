import React from 'react'

import { Button, Divider, Switch, Icon } from 'antd';

import AddModalType from './AddModalType'
import request from '../../../../utils/request'
import GtableEdit from '../../../../common/GtableEdit'
import { CategoryFindAllCate } from '../../../../config/api'
// import './index.less'

class TypeManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: {
        list: '/productCategory/listByParentId'
      },
      selectedRowKeys: [],
    };
  }
  componentDidMount() {
    // this.getList({
    //   url: '/productCategory/listByParentId'
    // })
    this.getList()
  }

  //初始列表
  getList = (options) => {
    request({
      url: CategoryFindAllCate,
    }).then(res => {
      console.log(res)
      let list = this.actionList(res.data[0].childList)
      console.log(list)
      this.setState({
        dataSource: list
      })
    })
  }

  actionList = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].children = arr[i].childList.length > 0 ? arr[i].childList : null
      if (arr[i].childList.length > 0) {
        this.actionList(arr[i].childList)
      }
    }

    return arr
  }

  edit = item => {
    console.log(item)
    this.child.edit(item)
  }

  batchDelete = () => {
    console.log(this.state.selectedRowKeys)
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    this.child.add()
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  bindRef = ref => { this.child = ref }

  render() {
    const columns = () => {
      return [
        {
          title: '',
          dataIndex: 'age',
          key: 'paixu',
          width: '15%',
        },
        {
          title: '属性名称',
          dataIndex: 'name',
          key: 'name',
          width: '25%',
        },
        {
          title: '是否显示',
          dataIndex: 'isShow',
          key: 'isShow',
          render(isShow) {
            return <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked
            />
          }
        },
        {
          title: '修改时间',
          dataIndex: 'changeTime',
          key: 'changeTime',
        },
        {
          title: '操作',
          key: 'dengji',
          onCell: () => ({ style: { textAlign: 'center' } }),
          onHeaderCell: () => ({ style: { textAlign: 'center' } }),
          render: (item) => {
            return (
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: '#1890ff' }} onClick={(e) => { this.edit(item) }}>编辑</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={() => { this.handleDelete(item) }}>删除</span>
              </div>
            )
          }
        },
      ]
    }

    return (
      <div>
        <Button icon="plus" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增
        </Button>
        <GtableEdit
          rowKey={row => row.key}
          rowClassName={() => 'editable-row'}
          bordered
          rowSelection={true}
          columns={columns}
          pagination={true}
        />

        <AddModalType triggerRef={this.bindRef} />


      </div>
    );
  }
}
export default TypeManage