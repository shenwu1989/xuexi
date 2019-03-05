import React, { Component } from 'react';
import { Form, Table } from 'antd'
import { withRouter } from 'react-router';

class TableListConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.dataInfo && this.setState({
            dataSource: nextProps.dataInfo.tls,
            tl_state: nextProps.dataInfo.tl_state
        })
    }

    render() {
        //项目列表
        const { tl_state = [] } = this.state;
        const columns = [
            {
                title: 'ID',
                align: 'center',
                width: 10,
                dataIndex: 'id',
                key: 'id',
                // defaultSortOrder: 'ascend',
                //  sorter: (a, b) => a.id - b.id,
            },
            {
                title: '投资机构',
                width: 50,
                align: 'center',
                key: 'agency',
                dataIndex: 'agency'
            },
            {
                title: '投资人',
                width: 50,
                align: 'center',
                key: 'investor',
                render: (r) => {
                    return <span><em>{r.investor}</em>{r.investor_title && '/'}<i>{r.investor_title}</i></span>
                }

            },
            {
                title: '事件状态',
                width: 100,
                align: 'center',
                dataIndex: 'state',
                key: 'state',
                render: (r) => {
                    return <i>{tl_state[r]}</i>
                }
            },
            {
                title: '参会人',
                width: 50,
                align: 'center',
                dataIndex: 'attendee',
                key: 'attendee',
                render: (r) => {
                    return r.map((item, index) => {
                        return index === r.length - 1 ? <i key={item.id}>{item.name}</i> : <i key={item.id}>{item.name},</i>;
                    })
                }
            },
            {
                title: '历史反馈',
                width: 200,
                align: 'center',
                dataIndex: 'feedback',
                key: 'feedback',
                render: (r) => {
                    return r.map((item) => {
                        return <span key={item.id}><em>{item.created_at}</em>&nbsp;<i>{item.feedback}</i></span>
                    })
                }
            },
            {
                title: '下一步跟进',
                width: 100,
                align: 'center',
                key: 'following_up',
                dataIndex: 'following_up'
            },
            {
                title: '详情',
                width: 50,
                align: 'center',
                dataIndex: 'id',
                key: 'investor_title',
                render: (r) => {
                    return <a onClick={() => this.handleShow(r)}>查看</a>
                }
            }
        ]
        return (
            <Table
                columns={columns}
                pagination={false}
                rowKey="id"
                bordered
                dataSource={this.state.dataSource || []}
            />
        );
    }


    handleShow = (data) => {
        this.props.fn(data)
    }
}

const Tablelist = withRouter(TableListConfig)
export default Form.create()(Tablelist);


