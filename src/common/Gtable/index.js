import React from 'react'
import { Table, message, Modal, Radio, Card } from 'antd'
import request from '../../utils/request'
import BaseForm from '../BaseForm'
import PropTypes from 'prop-types';

class Gtable extends React.Component {
  params = {
    page: 1,
    pageSize: 10
  }
  columns = []
  state = {
    titleType: '',
    dataSource: [],
    rowSelection: {
      selectedRowKeys: [],
      selectedRows: []
    },
  }


  goodsChange = (e) => {
    console.log(e.target)
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

  componentDidMount() {
    this.sortingParameters()
  }

  // 整理参数
  sortingParameters() {
    let urls = this.props.urls || {}
    let query = this.state.query || {}
    if (urls.list) {
      const options = {
        url: urls.list,
        method: 'get',
        params: {
          page: this.params.page,
          pageSize: this.params.pageSize,
          ...query,
          titleType: this.state.titleType,
          Sort: this.state.Sort,
          IsAsc: this.state.IsAsc,
        },
      }
      console.log(options)
      this.getList(options)
    } else {
      message.error('list 不能为空');
    }
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.updateSelectedItem(selectedRowKeys, selectedRows)
  }

  onRowClick = (index, record) => {
    /**
     * @param {* 勾选的类型} type radio是单选
     */
    const type = this.props.type
    if (type === 'radio') {
      this.onSelectChange([index], [record])
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
      this.onSelectChange(selectedRowKeys, selectedRows)
    }
  }

  //获取分页关键内容
  pagination = (data, callback) => {
    return {
      current: data.page || data.current,
      pageSize: data.pageSize,
      total: data.total,
      pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
      showQuickJumper: false,
      showSizeChanger: true,
      onChange: (current) => {
        callback(current)
      },
      showTotal: () => {
        return `共${data.total}条`
      }
    }
  }

  //初始列表
  getList = (options) => {
    request(options)
      .then(res => {
        if (res && res.data && res.data.data) {
          let dataSource = res.data.data.map((item, index) => {
            item.key = index;
            return item;
          });
          this.setState({
            dataSource,
            pagination: this.pagination(res.data, (current) => {
              this.params.page = 10;
            })
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

  // 删除提示
  handleDelete = (item, e) => {
    e.stopPropagation()//阻止冒泡
    Modal.confirm({
      title: '确认',
      content: '您确认要删除此条数据吗？',
      onOk: () => {
        this.handleDeleteAjax(item.id)
      }
    })
  }
  // 删除功能
  handleDeleteAjax = (id) => {
    let deleteUrl = this.props.urls.delete
    if (deleteUrl) {
      request({
        url: this.props.urls.delete,
        data: { id }
      }).then(res => {
        if (res && res.code === 1) {
          message.success('删除成功');
          // 删除成功的回调函数
          this.sortingParameters()
          // this.props.deleteCallback()
        } else {
          message.error('删除成功');
        }
      })
    } else {
      message.error('delete 不能为空');
    }
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    // this.setState({
    //   sortedInfo: sorter,
    // });

    let column = sorter.column || {}
    this.setState({
      pagination: this.pagination(pagination, (current)=> {
        this.params.page = current;
      }),
      Sort: column.dataIndex,
      IsAsc: column.sortOrder,
    })

    // this.props.onChange(pagination, filters, sorter)
  };


  search = (e) => {
    console.log(e)
    if (this.isQueryChange(e)) {
      this.setState({
        query: e
      }, () => {
        this.sortingParameters();
      })
    }
  }

  render() {
    //是否分页
    let pagination = this.state.pagination
    if (!pagination || pagination === false) {
      pagination = false
    }

    //是否需要勾选
    let rowSelection = this.state.rowSelection
    rowSelection.type = this.props.type === 'radio' ? 'radio' : 'checkbox'
    let onRow
    if (!rowSelection) {
      rowSelection = null
    } else {
      rowSelection.onChange = this.onSelectChange;
      onRow = (record, index) => {
        return {
          onClick: () => {
            console.log(index, record)
            this.onRowClick(index, record)
          }
        }
      }
    }

    let columns = this.props.columns(this)
    return (
      <>
        {
          this.props.titleList && this.props.titleList.length > 0 && (
            <Card >
              <Radio.Group defaultValue={0} buttonStyle="solid" onChange={this.goodsChange}>
                {
                  this.props.titleList.map((item, index) => <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>)
                }
              </Radio.Group>
            </Card>
          )
        }

        {
          this.props.searchData && this.props.searchData.length > 0 && (
            <div className="search-box">
              <BaseForm data={this.props.searchData} handleSearch={this.search} />
            </div>
          )
        }

        <Table
          onChange={this.handleChange}
          dataSource={this.state.dataSource}//表格内容
          columns={columns}//表头数据
          pagination={pagination}//分页
          rowSelection={rowSelection}//是否勾选以及是单选还是多选
          onRow={onRow}//表格单行点击
        />
      </>
    )
  }

}

Gtable.propTypes = {
  titleList: PropTypes.array,// 头部选线卡
  titleChangeCallback: PropTypes.func, // 头部选项卡 的回调函数
  columns: PropTypes.func,//表头函数
  searchData: PropTypes.array, //搜索数据集合
  type: PropTypes.string,//是否可以多选
  onChange: PropTypes.func, // 选中某一行之后的回调
}

export default Gtable 