import React, { Component } from 'react';
import { Form, Table } from 'antd'
import { withRouter } from 'react-router';
import { queryNull } from '../../common';

class TableListConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.dataInfo && this.setState({
            dataSource: nextProps.dataInfo.dataSource,
            tl_state: nextProps.dataInfo.tl_state
        })
    }

    render() {
        //项目列表
        const { tl_state = [] } = this.state;
        const columns = [
            {
                title: '序号',
                align: 'center',
                width: 50,
                dataIndex: 'sortId',
                key: 'id',
            },
            {
                title: '投资机构',
                width: 80,
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
                width: 120,
                align: 'center',
                dataIndex: 'state',
                key: 'state',
                render: (r, t) => {
                    if (t.schedule) {
                        let {id,tracking_id,...obj} = t.schedule;
                        let val = Object.keys(obj).some(i => {
                            return !queryNull(obj[i])
                        })
                        if(val){
                            const { meeting, investor, location, attendee, remark, time, title } = t.schedule;
                            return <span className={'state_style'}>
                                <i>{tl_state[r]}</i>
                                <p><em>代开会议:</em><em>{meeting}</em></p>
                                <p><em>参会人:</em><em>{attendee}</em></p>
                                <p><em>投资人:</em><em>{investor}{title && '/' + title}</em></p>
                                <p><em>地点:</em><em>{location}</em></p>
                                <p><em>时间:</em><em>{time}</em></p>
                                <p><em>备注:</em><em>{remark}</em></p>
                            </span>
                        }
                    }
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
                        return <span key={item.id} className={'lsfk_span'}><em>{item.created_at.substring(0,10)}</em>&nbsp;<i>{item.feedback}</i></span>
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


