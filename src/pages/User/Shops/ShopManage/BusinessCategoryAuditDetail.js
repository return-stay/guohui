import React from 'react'
import { PageHeader, Popover, Icon, Table } from 'antd'
import './index.less'
class BusinessCategoryAuditDetail extends React.Component {

  constructor() {
    super()

    this.state = {
      title: '审核详情',
      businessCategoryAuditItem: {},
    }
  }

  componentDidMount() {
    this.props.tirggerRef && this.props.tirggerRef(this)
  }
  businessDetailBack = () => {
    this.props.businessDetailBack()
  }

  show = (item) => {
    this.setState({
      title: '审核详情',
      businessCategoryAuditItem: item
    })
  }

  render() {

    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10, fontSize: 14 }
    const content = (
      <div style={{ padding: 20, width: 520 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>官方自营店默认拥有所有类目的经营权限，入驻商家需要申请经营类目。</span>
          </li>

          <li style={listStyle}>
            <div style={{ color: '#747474' }}>商家冻结后，商家将无法登录卖家中心，店铺所有商品都会下架， 商家下面的所有门店也会冻结。商家解冻后，所有商品需要重新上架，所有门店也需要重新解冻。</div>
          </li>
        </ul>
      </div>
    );

    const columns = [
      {
        title: '申请类目',
        dataIndex: 'leimu',
      },
      {
        title: '佣金比例',
        dataIndex: 'bili',
      },
    ];
    const { title, businessCategoryAuditItem } = this.state

    return (
      <div className="shop-detail-box">
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={this.businessDetailBack}
          title='经营类目审核'
          subTitle={title}
          extra={[
            <Popover key={1} content={content} placement="leftBottom">
              <div style={{ height: 32, lineHeight: '32px' }}><Icon type="question-circle" style={{ color: '#ccc' }} /></div>
            </Popover>,
          ]}
        />

        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <p>商家：{businessCategoryAuditItem.Name}</p>
          <p>审核时间：{businessCategoryAuditItem.EndDate}</p>
        </div>

        <Table
          rowKey={row => row.Id}
          columns={columns}
          dataSource={businessCategoryAuditItem.data} />

      </div>
    )
  }
}

export default BusinessCategoryAuditDetail