import React, { Component } from 'react';
import { Form, Table, Badge } from 'antd'
import { getPagination, jrFetchGet } from '../common';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class TableListConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getItemList()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        nextProps.dataSource && this.setState({
            dataSource: nextProps.dataSource
        })
    }

    render() {
        //const {projects: {...projects} = {}} = this.state.dataInfo || {};
        //项目列表
        const columns = [
            {
                title: 'ID',
                align: 'center',
                width: 30,
                dataIndex: 'id'
            },
            {
                title: '项目',
                align: 'center',
                width: 150,
                dataIndex: 'name',
                render: (t, r) => {
                    return (
                        <Link to={`/admin/itemdetails?id=${r.id}`}>{t}</Link>
                    )
                }
            },
            {
                title: '一级行业',
                width: 100,
                align: 'center',
                dataIndex: 'first_industry',
                render: (t) => {
                    const { first_industry } = this.state.dataInfo || {};
                    return (
                        <span>{first_industry[t]}</span>
                    )
                }
            },
            {
                title: '二级行业',
                width: 100,
                align: 'center',
                dataIndex: 'second_industry',
                render: (t) => {
                    return <i>{t === 'null' ? '' : t}</i>
                }
            },
            {
                title: 'staffing',
                width: 100,
                align: 'center',
                render: (t, r, i) => {
                    const { users } = t;
                    return (
                        <div style={{ width: '100%', wordWrap: 'break-word' }}>
                            {
                                !!users.length && users.map((it, index) => {
                                    if (index === users.length - 1) {
                                        return <span key={it.id}>{it.name}</span>
                                    }
                                    return <span key={it.id}>{it.name},</span>
                                }
                                )
                            }
                        </div>
                    )
                }
            },
            {
                title: '轮次',
                width: 100,
                align: 'center',
                dataIndex: 'round',
                render: (t) => {
                    const { round } = this.state.dataInfo || {};
                    return (
                        <span>{round[t]}</span>
                    )
                }
            },
            {
                title: '项目阶段',
                width: 100,
                align: 'center',
                dataIndex: "phase",
                render: (t) => {
                    const { phase } = this.state.dataInfo || {};
                    return (
                        <span>{phase[t]}</span>
                    )
                }
            },
            {
                title: '项目状态',
                width: 100,
                // align: 'center',
                dataIndex: "state",
                render: (t) => {
                    const { state } = this.state.dataInfo || {};
                    const configBadge = {
                        '0':'',
                        '1':'processing',
                        '2':'warning',
                        '3':'error'
                    }
                    return (
                        <Badge status={configBadge[t]} text={state[t]} />
                    )
                }
            },
            {
                title: '融资金额',
                width: 100,
                align: 'center',
                render: (t, r, i) => {
                    const { currency: currency_info } = this.state.dataInfo || {};
                    const { amount, currency } = t;
                    return (
                        amount !== null && <span>{amount}万{currency_info[currency]}</span>
                    )
                }
            },
            {
                title: '立项时间',
                width: 100,
                align: 'center',
                dataIndex: 'establish_time',
                defaultSortOrder: 'descend',
                /*sorter: (a, b) => {
                    let {establish_time: a_establish_time} = a;
                    let {establish_time: b_establish_time} = b;
                    a_establish_time === null ? a_establish_time = 0 : a_establish_time = a_establish_time.toString().replace(/-/g, '');
                    b_establish_time === null ? b_establish_time = 0 : b_establish_time = b_establish_time.toString().replace(/-/g, '');
                    return a_establish_time - b_establish_time
                },*/
            }
        ]
        return (
            <Table
                columns={columns}
                pagination={false}
                rowKey={'id'}
                // bordered
                dataSource={this.state.dataSource || []}
            />
        );
    }

    //获取项目列表
    getItemList = () => {
        jrFetchGet(`/ng-lingxi/api/project/internal/list`).then(ret => {
            const projects = ret.data.projects;
            let obj = { pageSize: 5, page: 1, dataList: projects, sort: 'date' };
            let { pageLen, dataSource } = getPagination(obj);
            this.props.fn(ret.data, pageLen)
            this.setState({
                dataSource,
                dataInfo: ret.data
            })
        })
    }

}

const Tablelist = withRouter(TableListConfig)
export default Form.create()(Tablelist);

