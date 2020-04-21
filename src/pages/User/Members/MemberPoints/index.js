import React from 'react'
import { Radio } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import PointsSetting from './PointsSetting'
export default class MemberPoints extends React.Component {
    constructor() {
        super()
        this.state = {
            pagination: '',
            urls: {
                list: '',
                add: '',
                edit: '',
                delete: '',
            },
            isPointsSetting: true,
            sortedInfo: null,
            pointsValue: 0,
            titleList: [
                { value: '积分查询', id: 0, type: 0 },
                { value: '积分管理', id: 4, type: 4, isCallback: true, }
            ],
            dataSource: [
                {
                  Id: 279,
                  memberId: 569,
                  userName: "selleradmin",
                  historyIntegrals: 13078138,
                  availableIntegrals: 10016924,
                  memberGrade: "VVVVVVIP",
                  createDate: "2018-11-22 17:29:33",
                }
            ]
        }
    }
    params = {
        page: 1,
        pageSize: 5
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    };

    check=(item)=> {
      console.log(item)
    }

    // 修改商品tab 切换
    titleChangeCallback = (e) => {
        let index = e.target.value
        let titleObj = this.state.titleList[index]
        let bool = true
        if (titleObj.type === 4 || titleObj.type === 'dangqian') {
            bool = false
        }
        this.setState({
            isPointsSetting: bool,
            pointsValue: index,
        })
    }
    // 违规下架
    soldOut = (e) => {
        e.stopPropagation()
    }
    // 积分管理成功回调
    pointsOkCallback = (e)=> {
      console.log(e)
      this.setState({
        isPointsSetting: true,
        pointsValue: 0
      })
    }

    render() {
        let { urls, titleList, dataSource,isPointsSetting,pointsValue } = this.state;
        const _columns = (that) => {
            return [
                {
                    title: '会员名',
                    key: 'userName',
                    dataIndex: 'userName',
                },
                {
                    title: '可用积分',
                    key: 'availableIntegrals',
                    dataIndex: 'availableIntegrals',
                    sorter: true,
                },
                {
                    title: '会员等级',
                    key: 'memberGrade',
                    dataIndex: 'memberGrade',
                },
                {
                    title: '历史积分',
                    key: 'historyIntegrals',
                    dataIndex: 'historyIntegrals',
                    sorter: true,
                },
                {
                    title: '会员注册时间',
                    key: 'createDate',
                    dataIndex: 'createDate',
                    sorter: true,
                },
                {
                    title: '操作',
                    render: (item) => {
                        return (
                            <>
                                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.check(item) }}>查看</div>
                            </>
                        )
                    }
                }
            ]
        }
        const searchData = [
            { type: 'input', field: 'name', label: '会员名' },
            { type: 'chooseTime', field: 'zhuceshijian', label: '注册时间' },
        ]

        return (
            <div>
                {
                    titleList && titleList.length > 0 && (
                        <div style={{borderBottom: '1px solid #e8e8e8', paddingBottom: 10}}>
                            <Radio.Group value={pointsValue} buttonStyle="solid" size="large" onChange={this.titleChangeCallback}>
                                {
                                    titleList.map((item, index) => <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>)
                                }
                            </Radio.Group>

                        </div>
                    )
                }

                {
                    isPointsSetting ? <GtableEdit
                        triggerRef={ref => { this.child = ref }}
                        urls={urls}
                        searchData={searchData}
                        dataSource={dataSource}
                        columns={_columns}
                        onChange={this.handleChange}
                        isRowSelection={false}
                    /> : <PointsSetting pointsOkCallback={this.pointsOkCallback} />
                }


            </div>
        )
    }
}