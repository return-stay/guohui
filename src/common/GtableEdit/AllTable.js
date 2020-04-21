import React from 'react'
import { Table, message } from 'antd'
import PropTypes from 'prop-types';
import request from '../../utils/request'
import './index.less'
export default class AllTable extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 1,
      pageSize: 10,
      selectedRowKeys: [],
      dataSource: [],
    }
  }



  componentDidMount() {
    const that = this
    this.props.triggerRef && this.props.triggerRef(this)
    if (this.props.didMountShow) {
      const selectedRowKeys = this.props.selectedRowKeys
      that.sortingParameters()

      this.setState({
        selectedRowKeys: selectedRowKeys
      })
    }


  }

  onSelectChange = (selectedRowKeys, electedRows) => {
    let limitNumber = this.props.limitNumber
    if (selectedRowKeys.length <= limitNumber) {
      this.setState({ selectedRowKeys });
      this.props.selectChange && this.props.selectChange(selectedRowKeys, electedRows)
    } else {
      message.error('最多选择' + limitNumber + '条')
    }
  };

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
        data.pageNumber = this.state.page
        data.pageSize = 10000000
      }

      if (this.state.titleType) {
        data.titleType = this.state.titleType
      }
      if (this.state.sortField && this.state.sortOrder) {
        let sortField = this.state.sortField
        data[sortField] = this.state.sortOrder === "ascend" ? 0 : 1
      }

      options.params = { md5Str: localStorage.getItem('authed') }

      options.data = data
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
          let datas = res.data.datas ? res.data.datas : res.data
          let dataSource = datas.map((item, index) => {
            item.key = index;
            return item;
          });
          this.setState({
            dataSource,
            pagination: this.pagination(res.data),
          }, () => {
          })
        }
      })
  }
  //获取分页关键内容
  pagination = (data) => {
    return {
      total: data.totalSize,
      size: 'small',
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showQuickJumper: false,
      showSizeChanger: true,
      showTotal: () => {
        return `共${data.totalSize || 1}条`
      }
    }
  }
  render() {
    const columns = this.props.columns(this)
    const dataSource = (this.state.dataSource && this.state.dataSource.length > 0) ? this.state.dataSource : this.props.dataSource
    const { selectedRowKeys } = this.state
    console.log(selectedRowKeys)
    const { showHeader, tableBoxClass, rowKey } = this.props
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    //是否分页
    let pagination = this.props.pagination ? this.state.pagination : false
    if (!pagination || pagination === false) {
      pagination = false
    }

    return (
      <div className={tableBoxClass}>
        <Table
          rowKey={rowKey}
          showHeader={showHeader}
          rowSelection={rowSelection}
          columns={columns}
          pagination={pagination}//分页
          dataSource={dataSource}
          size="small"
        />
      </div>

    )
  }
}


AllTable.propTypes = {
  tableBoxClass: PropTypes.string,
  didMountShow: PropTypes.bool,
  urls: PropTypes.object, //请求路径{list: 获取列表， delete:删除, upload:导出}
  columns: PropTypes.func,//表头函数
  dataSource: PropTypes.array, //默认数据
  rowKey: PropTypes.func, //选择默认的rowkey
  selectedRowKeys: PropTypes.array, //默认选中的项
  showHeader: PropTypes.bool,
  limitNumber: PropTypes.number, //限制选中的个数
}

AllTable.defaultProps = {
  didMountShow: true,
  rowKey: record => record.Id,
  showHeader: true,
}