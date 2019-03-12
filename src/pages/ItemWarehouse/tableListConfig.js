
import React, { Component } from 'react';
import { Form, Table } from 'antd'
import { jrFetchGet ,getPagination} from '../common';
import { NavLink } from 'react-router-dom';

class TableListConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.getItemList()
    }

    componentWillReceiveProps(nextProps) {
        nextProps.data && this.setState({
            dataInfo: nextProps.data
        })
    }
    render() {
        const {
            first_industry,
            phase,
            infoList = [],
            following_state = []
        } = this.state.dataInfo || {};
        //项目列表
        const columns = [
            {
                title: 'ID',
                align: 'center',
                width: 30,
                dataIndex: 'id',
            },
            {
                title: '项目名称',
                align: 'center',
                width: 150,
                dataIndex: 'name',
                render(r, t, i) {
                    return 'ex_id' in t ? <NavLink to={`/admin/intentionItem?${t.ex_id}`}>{r}</NavLink> : r
                }
            },
            {
                title: '一级行业',
                width: 100,
                align: 'center',
                dataIndex: 'first_industry',
                render(r) {
                    return first_industry[r]
                }
            },
            {
                title: '二级行业',
                width: 100,
                align: 'center',
                dataIndex: 'second_industry'
            },
            {
                title: 'Staffing/录入人',
                width: 100,
                align: 'center',
                dataIndex: 'users',
                render(r) {
                    return r.map((item, index) => {
                        return index === r.length - 1 ? <i key={index}>{item.name}</i> : <i key={index}>{item.name},</i>
                    })
                }
            },
            {
                title: '项目跟进',
                width: 100,
                align: 'center',
                render(r) {
                    return 'in_id' in r ? '内部已立项' : following_state[r.following_up_state];
                }
            },
            {
                title: '项目阶段',
                width: 100,
                align: 'center',
                dataIndex: 'phase',
                render(r) {
                    return phase[r]
                }
            },
            {
                title: '历史投资机构',
                width: 100,
                align: 'center',
                dataIndex: 'agency_history'
            }
        ]
        return (
            <Table
                columns={columns}
                pagination={false}
                rowKey={'id'}
                dataSource={infoList}
            />
        )
    }
    //数据初始
    getItemList = () => {
        jrFetchGet(`/ng-lingxi/api/project/external/list`).then(res => {
            const dataInfo = res.data;
            dataInfo.projects.map((a,b) => a.id = b+1);
            let obj = { pageSize: 10, page: 1, dataList:dataInfo.projects };
            let { pageLen, dataSource } = getPagination(obj);
            dataInfo.infoList = dataSource;
            this.props.fn(dataInfo, pageLen);
            this.setState({
                dataInfo
            })
        })
    }
}
export default Form.create()(TableListConfig);