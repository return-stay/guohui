import React from 'react'


import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => name,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

export default class GoodsClassify extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination,  filters, sorter)
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    // reqwest({
    //   url: 'https://randomuser.me/api',
    //   method: 'get',
    //   data: {
    //     results: 10,
    //     ...params,
    //   },
    //   type: 'json',
    // }).then(data => {
    //   const pagination = { ...this.state.pagination };
    //   // Read total count from server
    //   // pagination.total = data.totalCount;
    //   pagination.total = 200;
    //   this.setState({
    //     loading: false,
    //     data: data.results,
    //     pagination,
    //   });
    // });

    this.setState({
        loading: false,
        data: [
            {name: 'woshini', gender: 'MediaList', email: 'etienne.li@example.com', key: 0 , login:{uuid: '123456778'}},
            {name: 'boshini1', gender: 'MediaList', email: 'etienne.li@example.com', key: 2 , login:{uuid: '123456778g'}},
            {name: 'noshini', gender: 'MediaList', email: 'etienne.li@example.com', key: 3 , login:{uuid: '123456778b'}},
            {name: 'yoshini', gender: 'MediaList', email: 'etienne.li@example.com', key: 4 , login:{uuid: '12345677www8'}}
        ],
    })
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.login.uuid}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}