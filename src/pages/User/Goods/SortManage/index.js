import React from 'react'

import { Table, Input, Button, Form, Divider, message, Modal } from 'antd';

import AddSort from './AddSort'
import request from '../../../../utils/request'
import { CategoryFindAllCate, CateUpdateCate, CateUpDownCate } from '../../../../config/api'
// import './index.less'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ width: '100%', textAlign: 'center' }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}

class SortManage extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '',
        dataIndex: 'age',
        key: 'paixu',
        width: 100,
        align: 'center'
      },
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
      },
      {
        title: '分类图片',
        dataIndex: 'colorPicUrl',
        key: 'colorPicUrl',
        render(ordinaryPicUrl) {
          if (ordinaryPicUrl) {
            return <img src={ordinaryPicUrl} style={{ height: 30 }} alt="图片" />
          } else {
            return ''
          }

        }
      },
      {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render(state) {
          return <span>{state === 0 ? '已上线' : '已下线'}</span>
        }
      },
      {
        title: '操作',
        key: 'dengji',
        onCell: () => ({ style: { textAlign: 'center' } }),
        onHeaderCell: () => ({ style: { textAlign: 'center' } }),
        render: (item) => {
          return (
            <div style={{ textAlign: 'center' }}>
              {
                item.isType === 'parent' && <>
                  <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { this.handleAdd(item) }}>添加</span>
                  <Divider type="vertical" />
                </>
              }
              <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { this.edit(item) }}>编辑</span>
              <Divider type="vertical" />
              {
                item.state === 0 ?
                  <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { this.upDownCate(item, 'down') }}>下线</span>
                  :
                  <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { this.upDownCate(item, 'up') }}>上线</span>
              }
              <Divider type="vertical" />
              <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.handleDelete(item) }}>删除</span>
            </div>
          )
        }
      },
    ]

    this.state = {
      urls: {
        list: '/productCategory/listByParentId'
      },
      selectedRowKeys: [],
      count: 2,
    };
  }
  componentDidMount() {
    // this.getList({
    //   url: '/productCategory/listByParentId'
    // })
    this.getList()
  }

  //初始列表
  getList = (id = 0, callback) => {
    request({
      url: CategoryFindAllCate,
      params: {
        parentId: id
      }
    }).then(res => {
      console.log(res)
      // let list = this.actionList(res.data[0].childList)
      let list = res.data;
      console.log(list)
      if (id) {
        callback && callback(list)
      } else {
        this.setState({
          dataSource: list
        }, () => {
          this.getListChild()
        })
      }
    })
  }

  getListChild = () => {
    let list = this.state.dataSource

    for (let i = 0; i < list.length; i++) {
      list[i].isType = 'parent'
      this.getList(list[i].id, (childs) => {
        if (childs && childs.length > 0) {
          list[i].children = childs
          this.setState({
            dataSource: list
          })
        }
      })
    }
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
  //获取分页关键内容
  pagination = (data, callback) => {
    return {
      current: data.pageNumber + 1 || data.current,
      pageSize: data.pageSize,
      total: data.totalSize,
      size: 'small',
      pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
      showQuickJumper: false,
      showSizeChanger: true,
      onChange: (current) => {
        callback(current)
      },
      showTotal: () => {
        return `共${data.total || 1}条`
      }
    }
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRows)
    let keys = [selectedRowKeys[selectedRowKeys.length - 1]]
    let rows = [selectedRows[selectedRows.length - 1]]
    this.setState({ selectedRowKeys: keys, selectedRows: rows });
  }

  // 上下线
  upDownCate = (item, type) => {
    const that = this
    let contentText = type === 'up' ? '确定上线改类目吗？' : '确定下线该类目吗？'
    Modal.confirm({
      title: '提示',
      content: contentText,
      onOk() {
        request({
          url: CateUpDownCate,
          params: {
            cateId: item.id,
            type: type === 'up' ? 0 : 1,
            token: localStorage.getItem('authed')
          }
        }).then(res => {
          if (res.code === 100) {
            let successText = type === 'up' ? '上线' : '下线'
            message.success(successText + '成功')
            that.getList()
          }
        })
      }
    })
  }

  edit = item => {
    console.log(item)
    this.child.edit(item)
  }

  batchDelete = () => {
    console.log(this.state.selectedRowKeys)
  }

  handleDelete = item => {
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    console.log(item)
    const that = this
    Modal.confirm({
      title: '提示',
      content: '确定删除该类目吗?',
      onOk() {
        request({
          url: CateUpdateCate,
          params: {
            cateId: item.id
          }
        }).then(res => {
          if (res.code === 100) {
            message.success('删除成功')
            that.getList()
          }
        })
      },
    })

  };

  handleAdd = (item) => {
    this.child.add(item)
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
    const { dataSource, selectedRowKeys } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Button icon="plus" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增
        </Button>
        <Table
          rowKey={row => row.id}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          rowSelection={rowSelection}
          columns={columns}
        // pagination={this.pagination(dataSource)}
        />

        <AddSort triggerRef={this.bindRef} successCallback={this.getList} />


      </div>
    );
  }
}
export default SortManage