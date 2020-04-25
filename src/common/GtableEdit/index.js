import React from 'react'
import { Table, Input, Button, Form, message, Card, Radio, Modal } from 'antd'

import BaseForm from '../BaseForm'
import Gexport from '../Gexport'
import PropTypes from 'prop-types';
import request from '../../utils/request'
import './index.less'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => {
  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  )
};

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
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} style={{ minWidth: '50px' }} />)}
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 0 }}
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

class GtableEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablePaginationPageTotalSize: 0,
      count: 1,
      titleType: '',
      rowSelection: {
        selectedRowKeys: [],
        selectedRows: []
      },
      page: 1,
      pageSize: 10,
    };
  }

  columns = []

  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
    if (this.props.didMountShow) {
      this.sortingParameters()
    }
  }

  goodsTabChange = (e) => {
    this.setState({
      titleType: e.type
    }, () => {
      this.sortingParameters()
    })
  }

  // 修改商品tab 切换
  tableTabsChange = (e) => {
    let index = e.target.value
    let titleObj = this.props.titleList[index]
    this.setState({
      titleType: titleObj.type
    }, () => {
      if (titleObj.isCallback) {
        this.props.titleChangeCallback(titleObj)
      } else {
        this.sortingParameters()
      }
    })
  }

  // 整理参数
  sortingParameters(prentQuery) {
    let urls = this.props.urls || {}
    let query = this.state.query || {}
    let propsQuery = this.props.query || {}
    if (urls.list) {

      let options = {}

      options.url = urls.list
      options.method = urls.listMethod || 'GET'
      if (urls.listMethod === 'POST' || urls.listMethod === 'post') {
        options.headers = {
          'Content-Type': 'application/json'
        }
      }

      let data = { ...query, ...this.state.filters, ...prentQuery, ...propsQuery }
      if (this.state.page) {
        if(prentQuery && prentQuery.pageNumber) {
          data.pageNumber = prentQuery.pageNumber
        }else {
          data.pageNumber = this.state.page
        }
        data.pageSize = this.state.pageSize
      }

      if (this.state.titleType) {
        data.titleType = this.state.titleType
      }
      if (this.state.sortField && this.state.sortOrder) {
        let sortField = this.state.sortField
        data[sortField] = this.state.sortOrder === "ascend" ? 0 : 1
      }

      // options.params = { md5Str: localStorage.getItem('authed') }

      options.data = data
      // options.data = data
      // console.log(options)
      this.getList(options)
    } else {
      // message.error('list 不能为空');
    }
  }

  //初始列表
  getList = (options) => {
    request(options)
      .then(res => {
        if (res && res.data && res.data) {
          let datas = res.data.dataList ? res.data.dataList : res.data
          let dataSource = datas.map((item, index) => {
            item.key = index;
            return item;
          });
          this.setState({
            dataSource,
            pagination: this.pagination(res.data)
          })
        }
      })
  }

  //设置勾选后的内容
  /**
   * @param {*选中行的索引} selectedRowKeys Array
   * @param {*选中行对象} selectedItem Array
   */
  updateSelectedItem = (selectedRowKeys, selectedRows) => {
    const rowSelection = {
      selectedRowKeys, selectedRows
    }
    this.setState({
      rowSelection
    })
  }

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

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.props.selectChange && this.props.selectChange(selectedRowKeys, selectedRows)
    this.updateSelectedItem(selectedRowKeys, selectedRows)
  }
  onRowChange = (selectedRowKeys, selectedRows) => {
    this.props.rowChange && this.props.rowChange(selectedRowKeys, selectedRows)
    // this.updateSelectedItem(selectedRowKeys, selectedRows)
  }

  onRowClick = (index, record) => {
    /**
     * @param {* 勾选的类型} type radio是单选
     */
    const type = this.props.type
    if (type === 'radio') {
      this.onRowChange([index], [record])
    } else {
      let selectedRowKeys = [...this.state.rowSelection.selectedRowKeys]
      let selectedRows = [...this.state.rowSelection.selectedRows]
      if (selectedRowKeys.includes(index)) {
        var selectIndex = selectedRowKeys.findIndex(item => {
          return index === item
        })
        selectedRowKeys.splice(selectIndex, 1)
        selectedRows.splice(selectIndex, 1)
      } else {
        selectedRowKeys.push(index)
        selectedRows.push(record)
      }
      this.onRowChange(selectedRowKeys, selectedRows)
    }
  }

  //获取分页关键内容
  pagination = (data, callback) => {
    const that = this

    let stateTotalSize = this.state.tablePaginationPageTotalSize
    let dataTotalSize = data.totalSize
    let totalSize = 0
    if (dataTotalSize === undefined || stateTotalSize === dataTotalSize) {
      totalSize = stateTotalSize
    } else {
      totalSize = dataTotalSize
      this.setState({
        tablePaginationPageTotalSize: dataTotalSize
      })
    }
    return {
      current: data.pageNumber || data.current,
      pageSize: data.pageSize || that.state.pageSize,
      total: totalSize,
      size: 'small',
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showQuickJumper: false,
      showSizeChanger: true,
      onChange: (current) => {
        this.setState({
          page: current,
        }, () => {
          this.sortingParameters()
        })
      },
      showTotal: () => {
        return `共${totalSize || 1}条`
      }
    }
  }

  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    const that = this
    if (pagination.current || pagination.pageSize) {
      this.setState({
        page: pagination.current,
        pageSize: pagination.pageSize
      })
    }

    this.setState({
      pagination: that.pagination(pagination),
      sortField: sorter.field,
      sortOrder: sorter.order,
      filters: filters,
    }, () => {
      this.sortingParameters()
    })
    this.props.onChange && this.props.onChange(pagination, filters, sorter)
  };
  // 对比query 的参数是否改变
  isQueryChange = (nexQuery) => {
    let propsQuery = this.props.query || {}
    for (const key in nexQuery) {
      if (nexQuery[key] !== propsQuery[key]) {
        return true
      }
    }
    return false
  }

  search = (e) => {
    this.setState({
      query: e,
      page: 1,
    }, () => {
      this.sortingParameters();
    })
  }
  // 添加
  handleAdd = () => {
    this.props.addCallback()
  };
  // 编辑
  handleEdit = (e, item) => {
    this.props.editCallback && this.props.editCallback(item)
  }
  // 添加成功之后的回调
  addSuccessCallback() { }
  // 批量删除
  handleBatchRemove = () => { }
  // 删除
  handleDelete = (e, item) => {
    e.stopPropagation()
    const cancelPopText = this.props.cancelPopText
    const that = this
    Modal.confirm({
      title: '确认',
      content: cancelPopText,
      onOk: () => {
        const { urls } = that.props
        let obj = {
          productId: item.productId,
          userId: '0',
        }

        if (urls.delete) {
          let options = {}
          options.url = urls.delete
          options.method = urls.listMethod || 'GET';
          options.params = { md5Str: localStorage.getItem('authed') }
          options.data = obj
          request(options).then(res => {
            message.success('删除成功');
            that.sortingParameters()
          })
        }
      }
    })
  };
  // 批量操作
  handleBatchDelete = (e) => {
    e.stopPropagation()
  }
  // 自定义按钮 回调函数
  handleCustom = (e) => {
    e.stopPropagation()
    this.props.customCallback()
  }

  render() {
    const dataSource = (this.state.dataSource && this.state.dataSource.length > 0) ? this.state.dataSource : this.props.dataSource
    //是否分页
    let pagination = this.props.pagination ? this.state.pagination : false
    if (!pagination || pagination === false) {
      pagination = false
    }
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.props.columns(this).map(col => {
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

    //是否需要勾选
    let rowSelection = null
    let onRow
    if (this.props.isRowSelection) {
      rowSelection = this.state.rowSelection
      rowSelection.type = this.props.type === 'radio' ? 'radio' : 'checkbox';
      if (!rowSelection) {
        rowSelection = null
      } else {
        rowSelection.onChange = this.onSelectChange;
        onRow = (record, index) => {
          return {
            onClick: () => {
              this.onRowClick(index, record)
            }
          }
        }
      }
    }
    let functionButtons = this.props.functionButtons || {}
    const { bordered, rowKey, tableBoxClass, showHeader, size, scrollX } = this.props
    return (
      <div className={tableBoxClass}>
        {
          this.props.isTitleTabsShow && this.props.titleList && this.props.titleList.length > 0 && (
            <div style={{ borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
              <Radio.Group defaultValue={0} buttonStyle="solid" size="large" onChange={this.tableTabsChange}>
                {
                  this.props.titleList.map((item, index) => <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>)
                }
              </Radio.Group>

            </div>
          )
        }
        {this.props.isTitleTabsShow && this.props.titleList && this.props.titleList.length > 0 && <div style={{ height: 8 }}></div>}

        <div style={{ textAlign: functionButtons.textAlign || 'left' }}>
          {functionButtons.isAdd && (
            <Button onClick={this.handleAdd} type="primary" style={{ marginRight: 16, marginTop: 10, marginBottom: 10 }}>
              {functionButtons.addText || '新增'}
            </Button>
          )}
          {
            functionButtons.isEdit && (
              <Button onClick={this.handleBatchRemove} type="primary" style={{ marginRight: 16, marginTop: 10, marginBottom: 10 }}>
                批量删除
              </Button>
            )
          }
          {
            functionButtons.isBatch && (
              <Button onClick={this.handleBatchDelete} type="primary" style={{ marginRight: 16, marginTop: 10, marginBottom: 10 }}>
                批量操作
              </Button>
            )
          }
          {
            functionButtons.isExport && (
              <Gexport btnStyle={{ marginRight: 16, marginTop: 10, marginBottom: 10 }} />
            )
          }
          {
            functionButtons.isCustom && (
              <Button onClick={this.handleCustom} type="primary" style={{ marginRight: 16, marginTop: 10, marginBottom: 10 }}>
                {functionButtons.customText}
              </Button>
            )
          }
        </div>
        {
          this.props.searchData && this.props.searchData.length > 0 && (
            <Card>
              <BaseForm data={this.props.searchData} handleSearch={this.search} />
            </Card>
          )
        }
        <Table
          size={size}
          showHeader={showHeader}
          rowKey={rowKey}
          onChange={this.handleChange}
          components={components}
          rowClassName={() => 'editable-row'}
          rowSelection={rowSelection}//是否勾选以及是单选还是多选
          bordered={bordered}
          pagination={pagination}//分页
          dataSource={dataSource}
          columns={columns}
          onRow={onRow}//表格单行点击
          scroll={{ x: scrollX }}
        />
      </div>
    );
  }
}


GtableEdit.propTypes = {
  didMountShow: PropTypes.bool,
  tableBoxClass: PropTypes.string, //根路径类名
  urls: PropTypes.object, //请求路径{list: 获取列表， delete:删除, upload:导出}
  titleList: PropTypes.array,// 头部选线卡
  titleChangeCallback: PropTypes.func, // 头部选项卡 的回调函数
  columns: PropTypes.func,//表头函数
  searchData: PropTypes.array, //按需搜索数据集合
  type: PropTypes.string,//列表是否可以多选
  onChange: PropTypes.func, // 选中某一行之后的回调
  functionButtons: PropTypes.object, //功能按钮 {isAdd:添加按钮 , isEdit:编辑按钮, isDelete: 删除按钮, isBatch:是否批量操作，isExport： 是否导出按钮}
  addCallback: PropTypes.func, //添加按钮的回调函数
  editCallback: PropTypes.func, //编辑回调
  customCallback: PropTypes.func, //自定义按钮回调函数
  isRowSelection: PropTypes.bool, //是否有选择框 默认是true
  bordered: PropTypes.bool,
  dataSource: PropTypes.array, //默认数据
  rowKey: PropTypes.func, //选择默认的rowkey
  cancelPopText: PropTypes.string, //删除提示文字
  isTitleTabsShow: PropTypes.bool,//是否显示头部tab
  showHeader: PropTypes.bool,
  selectedRowKeys: PropTypes.array, //默认选中的项
  size: PropTypes.string, // 表格的大小
  scrollX: PropTypes.string,
}

GtableEdit.defaultProps = {
  didMountShow: true, //是否在componentDidMount 的时候加载列表
  isRowSelection: true,
  bordered: false,
  size: 'middle',
  rowKey: record => record.Id,
  cancelPopText: '您确认要删除此条数据吗？',
  isTitleTabsShow: true,
  showHeader: true,
  scrollX: '100%',
}

export default GtableEdit
