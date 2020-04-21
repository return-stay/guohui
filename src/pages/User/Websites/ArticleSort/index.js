import React from 'react'

import { Table, Input, Button, Form, Divider } from 'antd';

import ArticleSortModal from './ArticleSortModal'
import ArticleModal from '../ArticleManage/ArticleModal'
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

class ArticleSort extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
        width: '35%',
        editable: true,
        onCell: () => ({ style: { textAlign: 'center' } }),
        onHeaderCell: () => ({ style: { textAlign: 'center' } }),
      },
      {
        title: '排序',
        dataIndex: 'age',
        key: 'paixu',
        width: '10%',
        editable: true,
        onCell: () => ({ style: { textAlign: 'center' } }),
        onHeaderCell: () => ({ style: { textAlign: 'center' } }),
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
                item.dengji < 3 ? (<>
                  <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => {this.handleAdd(item) }}>新增下级</span>
                  <Divider type="vertical" />
                </>) : ''
              }
              <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.edit(item) }}>编辑</span>
              <Divider type="vertical" />
              <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.delete(item) }}>删除</span>

              <Divider type="vertical" />
              <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.addArticle(item)}}>新增文章</span>
            </div>
          )
        }
      },
    ]

    this.state = {
      dataSource: [
        {
          key: 1,
          name: '保健用品',
          age: 60,
          address: 'New York No. 1 Lake Park',
          dengji: 1,
          children: [
            {
              key: 11,
              name: '第一号',
              age: 42,
              address: 'New York No. 2 Lake Park',
              dengji: 2,
            },
            {
              key: 12,
              name: '第二号',
              age: 30,
              address: 'New York No. 3 Lake Park',
              dengji: 2,
              children: [
                {
                  key: 121,
                  name: '第三级',
                  age: 16,
                  address: 'New York No. 3 Lake Park',
                  dengji: 3,
                },
              ],
            },
            {
              key: 13,
              name: '第二季',
              age: 72,
              address: 'London No. 1 Lake Park',
              dengji: 2,
              children: [
                {
                  key: 131,
                  name: '好好第三级',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  dengji: 3,
                },
              ],
            },
          ],
        },
        {
          key: 2,
          name: '中草药k',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          dengji: 1,
        },
      ],
      count: 2,
    };
  }
  addArticle = (item) => {
    this.articleModalChild.add(item)
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  delete = item=> {
    console.log(item)
  }

  handleAdd = (item) => {
    this.child.add(item)
  };

  edit = (item) => {
    this.child.edit(item)
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

  render() {
    const { dataSource } = this.state;
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
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered={false}
          dataSource={dataSource}
          columns={columns}
        />

        <ArticleSortModal triggerRef={ref => this.child = ref } />

        <ArticleModal triggerRef={ref=> this.articleModalChild = ref} />
      </div>
    );
  }
}
export default ArticleSort