import React from 'react'

import GtableEdit from '../../../../common/GtableEdit'
import { Icon, Divider, Form, Radio, Popover, DatePicker, Button, InputNumber } from 'antd';
import Buttons from './Buttons'

import './index.less'
import { leimu, goumaicishu, xiaofeijine, huiyuanbiaoqian, } from './screenDatas'
const { RangePicker } = DatePicker;
const FormItem = Form.Item
export default class Screen extends React.Component {

  state = {
    urls: {
      list: '',
      add: ''
    },
    selectedRowKeys: '', selectedRows: [],
    dataSource: [
      {
        Id: 1599,
        RealName: "",
        Email: null,
        CellPhone: "-",
        QQ: null,
        UserName: "wxy7wtag",
        Sex: 0,
        BirthDay: null,
        Disabled: false,
        LastLoginDate: "/Date(1580189983000)/",
        Occupation: null,
        TotalAmount: 0,
        NetAmount: 0,
        CreateDate: "/Date(1580189983000)/",
        CreateDateStr: "2020-01-28 13:39:43",
        GradeName: "vip0",
        Photo: "/Storage/Member/1599/headImage.jpg",
        Nick: "萝卜",
        MemberLabels: null,
        InviteUserName: null,
        AvailableIntegral: 0,
        HistoryIntegral: 0,
        OrderNumber: 0,
        LastConsumptionTime: null,
        Platform: 5,
        PlatformText: "商城小程序",
        IconSrc: "/images/WeiXinSmallProg.png",
      }
    ]
  }

  blocking = (e) => {
    console.log(e)
  }

  editLabel = (e) => {
    console.log(e)
  }

  modifyPassword = (e) => {
    console.log(e)
  }

  check = (e) => {
    console.log(e)
  }

  search = (e) => {
    console.log(e)
  }

  selectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows)
    this.setState({
      selectedRowKeys, selectedRows
    })
  }
  render() {
    let { urls, dataSource, selectedRowKeys, selectedRows } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      return [
        {
          title: '',
          key: 'Platform',
          dataIndex: 'Platform',
          render: (Platform) => {

            // const connet = {
            //   '5': '../../Icin'
            // }
            // let Platform = item.Platform
            return (<Icon type="api" style={{ fontSize: 24 }} />)
          }
        },
        {
          title: '会员名',
          key: 'UserName',
          dataIndex: 'UserName',
        },
        {
          title: '昵称',
          key: 'Nick',
          dataIndex: 'Nick',
        },
        {
          title: '等级',
          key: 'GradeName',
          dataIndex: 'GradeName',
        },
        {
          title: '积分',
          key: 'AvailableIntegral',
          dataIndex: 'AvailableIntegral',
          sorter: true,
        },
        {
          title: '净消费',
          key: 'TotalAmount',
          dataIndex: 'TotalAmount',
          sorter: true,
        },
        {
          title: '手机',
          key: 'CellPhone',
          dataIndex: 'CellPhone',
        },
        {
          title: '创建日期',
          key: 'CreateDateStr',
          dataIndex: 'CreateDateStr',
          sorter: true,
        },
        {
          title: '状态',
          key: 'VirtualSaleCounts',
          dataIndex: 'VirtualSaleCounts',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff' }} onClick={(e) => { that.editLabel(e, item) }}>编辑标签</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={(e) => { that.check(e, item) }}>查看</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={(e) => { that.modifyPassword(e, item) }}>修改密码</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={(e) => this.blocking(e)}>冻结</span>
              </>
            )
          }
        }
      ]
    }

    return (
      <div style={{ marginTop: 10 }}>

        <div style={{ margin: '10px 0' }}>
          <Buttons selectedRowKeys={selectedRowKeys} selectedRows={selectedRows} />
        </div>

        <div>
          <SearchForm />
        </div>
        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          selectChange={this.selectChange}
          pagination={true}
        />
      </div>
    )
  }
}


class SearchBox extends React.Component {

  onRangePickerChange = (e) => {
    console.log(e)
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    };
    const { getFieldDecorator } = this.props.form;

    const xiaofeicontent = (
      <div><RangePicker onChange={this.onRangePickerChange} /><Button type="primary" style={{ marginLeft: 10 }}>确定</Button></div>
    )
    const goumaicontent = (
      <div>
        <InputNumber style={{ width: 80 }} precision={0} min={1} max={100000} onChange={this.onChange} />-
        <InputNumber style={{ width: 80 }} precision={0} min={1} max={100000} onChange={this.onChange} />
        <Button type="primary" style={{ marginLeft: 10 }}>确定</Button>
      </div>
    );
    const jinecontent = (
      <div>
        <InputNumber style={{ width: 80 }} precision={0} min={1} max={100000} onChange={this.onChange} />-
        <InputNumber style={{ width: 80 }} precision={0} min={1} max={100000} onChange={this.onChange} />
        <Button type="primary" style={{ marginLeft: 10 }}>确定</Button>
      </div>
    );
    return (
      <div className="s-box">

        <Form  {...formItemLayout}>
          <FormItem key='zuijinxiaofei' label='最近消费'>
            {getFieldDecorator('zuijinxiaofei', {
              valuePropName: ' ',
            })(
              <Radio.Group defaultValue="a" size="small">
                <Radio.Button value="a" style={{ marginRight: 6 }}>不限</Radio.Button>
                <Radio.Button value="b" style={{ marginRight: 6 }}>1周内</Radio.Button>
                <Radio.Button value="c" style={{ marginRight: 6 }}>2周内</Radio.Button>
                <Radio.Button value="d" style={{ marginRight: 6 }}>1个月内</Radio.Button>
                <Radio.Button value="e" style={{ marginRight: 6 }}>1个月前</Radio.Button>
                <Radio.Button value="f" style={{ marginRight: 6 }}>2个月前</Radio.Button>
                <Radio.Button value="g" style={{ marginRight: 6 }}>3个月前</Radio.Button>
                <Radio.Button value="h" style={{ marginRight: 6 }}>6个月前</Radio.Button>
                <Popover placement="bottomLeft" content={xiaofeicontent} trigger="click">
                  <Radio.Button value={9} style={{ color: '#1890ff' }}>
                    自定义
                    </Radio.Button>
                </Popover>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem key='goumaicishu' label='购买次数'>
            {getFieldDecorator('goumaicishu', {
              valuePropName: ' ',
            })(
              <Radio.Group defaultValue={100} size="small">
                {
                  goumaicishu.map((item) => {
                    return <Radio.Button key={item.id} value={item.id} style={{ marginRight: 6 }}>{item.value}</Radio.Button>
                  })
                }

                <Popover placement="bottomLeft" content={goumaicontent} trigger="click">
                  <Radio.Button value={9} style={{ color: '#1890ff' }}>
                    自定义
                    </Radio.Button>
                </Popover>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem key='leimu' label='类目'>
            {getFieldDecorator('leimu', {
              valuePropName: ' ',
            })(
              <Radio.Group defaultValue={0} size="small">
                {
                  leimu.map((item) => {
                    return <Radio.Button key={item.id} value={item.id} style={{ marginRight: 6 }}>{item.value}</Radio.Button>
                  })
                }
              </Radio.Group>
            )}
          </FormItem>


          <FormItem key='xiaofeijine' label='消费金额'>
            {getFieldDecorator('xiaofeijine', {
              valuePropName: ' ',
            })(
              <Radio.Group defaultValue={0} size="small">
                {
                  xiaofeijine.map((item) => {
                    return <Radio.Button key={item.id} value={item.id} style={{ marginRight: 6 }}>{item.value}</Radio.Button>
                  })
                }
                <Popover placement="bottomLeft" content={jinecontent} trigger="click">
                  <Radio.Button value={9} style={{ color: '#1890ff' }}>
                    自定义
                    </Radio.Button>
                </Popover>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem key='huiyuanbiaoqian' label='会员标签'>
            {getFieldDecorator('huiyuanbiaoqian', {
              valuePropName: ' ',
            })(
              <Radio.Group defaultValue={0} size="small">
                {
                  huiyuanbiaoqian.map((item) => {
                    return <Radio.Button key={item.id} value={item.id} style={{ marginRight: 6 }}>{item.value}</Radio.Button>
                  })
                }
              </Radio.Group>
            )}
          </FormItem>

        </Form>
      </div>
    )
  }
}

const SearchForm = Form.create()(SearchBox)