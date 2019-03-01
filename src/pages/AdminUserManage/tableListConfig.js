import React, { Component } from 'react';
import { Form, Popconfirm, Table, message } from 'antd'
import { jrFetchGet, getPagination } from '../common';
import { withRouter } from 'react-router'

class TableListConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            more: -1
        }
    }

    componentDidMount() {
        this.getUserList()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let dataSource = nextProps.dataSource;
        if (dataSource.constructor === Object) {
            dataSource = Object.values(nextProps.dataSource)
        }
        dataSource.length > 0 && this.setState({
            dataSource
        })
    }

    render() {
        const columns = [
            {
                title: 'ID',
                align: 'center',
                width: 20,
                dataIndex: 'id',
                defaultSortOrder: 'ascend',
            },
            {
                title: '姓名',
                align: 'center',
                width: 100,
                dataIndex: 'name'
            },
            {
                title: '手机号',
                width: 100,
                align: 'center',
                dataIndex: 'phone'
            },
            {
                title: '邮箱',
                width: 100,
                align: 'center',
                dataIndex: 'email'
            },
            {
                title: '关联项目',
                align: 'center',
                width: 350,
                className: 'tableword',
                render: (t, r, i) => {
                    const { projects } = t;
                    return (
                        <div style={{ width: '100%', wordWrap: 'break-word' }}>
                            {
                                !!projects.length && projects.map((it, index) => {
                                    if (projects.length > 3) {
                                        if (index < 3) {
                                            if (index === 2) {
                                                return <span key={it.id}>
                                                    {it.name}&nbsp;
                                                        {
                                                        this.state.more !== i &&
                                                        <a id={i} onClick={(e) => this.showProjects(e)}>
                                                            展开更多
                                                            </a>
                                                    }
                                                </span>
                                            }
                                            return <span key={it.id}>{it.name}&nbsp;</span>
                                        } else {
                                            if (index === projects.length - 1) {
                                                return this.state.more === i && <span key={it.id}>
                                                    {it.name}&nbsp;
                                                        <a id={i} onClick={this.hideProjects}>
                                                        收起更多
                                                            </a>
                                                </span>
                                            }
                                            return this.state.more === i && <span key={it.id}>{it.name}&nbsp;</span>
                                        }
                                    } else {
                                        return <span key={it.id}>{it.name}&nbsp;</span>
                                    }
                                }
                                )
                            }

                        </div>
                    )
                }
            },
            {
                title: '操作',
                align: 'center',
                width: 200,
                dataIndex: 'is_active',
                render: (is_active, record) => {
                    let config = {
                        '0': '停用',
                        '1': '删除',
                        '2': "编辑",
                        '3': "启用",
                        '4': "重置密码",
                    };
                    return (
                        <span>
                            {
                                !is_active && <Popconfirm title="确定要删除吗？" onConfirm={
                                    () => this.handleDelete(record.id, config['1'])
                                } okText="是" cancelText="否">
                                    <a href="#" style={{color:'red'}}>删除</a>
                                </Popconfirm>
                            }
                            &nbsp;&nbsp;
                            <Popconfirm title="确定要编辑吗？" onConfirm={
                                () => this.handleEdit(record.id, config['2'])
                            }
                                okText="是"
                                cancelText="否">
                                <a>编辑</a>
                            </Popconfirm>
                            &nbsp;&nbsp;
                            {
                                !!is_active ? <Popconfirm title="确定要停用吗？" onConfirm={
                                    () => this.userOff(record.id, config['0'])
                                }
                                    okText="是"
                                    cancelText="否">
                                    <a href="#">停用</a>
                                </Popconfirm> : <Popconfirm title="确定要启用吗？" onConfirm={
                                    () => this.userOn(record.id, config['3'])
                                }
                                    okText="是"
                                    cancelText="否">
                                        <a href="#">启用</a>
                                    </Popconfirm>
                            }&nbsp;&nbsp;
                            <Popconfirm title="确定要重置密码吗？" onConfirm={
                                () => this.userReset(record.id, config['4'])
                            }
                                okText="是"
                                cancelText="否">
                                <a href="#">重置密码</a>
                            </Popconfirm>
                        </span>

                    )
                }
            },
        ]
        return (
            <Table
                columns={columns}
                pagination={false}
                rowKey={'id'}
                bordered
                dataSource={this.state.dataSource || []}
            />
        );
    }

    //获取用户列表
    getUserList = () => {
        jrFetchGet('/ng-lingxi/api/user/list', {}).then((ret) => {
            const projects = ret.data;
            let obj = { pageSize: 5, page: 1, dataList: projects };
            let { pageLen, dataSource } = getPagination(obj);
            this.props.fn(projects, pageLen)
            this.setState({
                dataSource
            })
        })
    }
    //提示窗口
    overallMessage = (ret, text) => {
        ret.code === 0 ? message.success(text + '成功') : message.success(text + '失败')
    }
    //删除用户
    handleDelete = (id, text) => {
        let url = `/ng-lingxi/api/user/delete/${id}`;
        jrFetchGet(url).then((ret) => {
            this.overallMessage(ret, text);
            this.getUserList()
        })
    }
    //用户编辑
    handleEdit = (id) => {
        this.props.history.push(`/admin/adduser/?id=${id}`);
    }
    //停用
    userOff = (id, text) => {
        let url = `/ng-lingxi/api/user/freeze/${id}`;
        jrFetchGet(url).then((ret) => {
            this.overallMessage(ret, text);
            this.getUserList()
        })
    }
    //启用
    userOn = (id, text) => {
        let url = `/ng-lingxi/api/user/activate/${id}`;
        jrFetchGet(url).then((ret) => {
            this.overallMessage(ret, text);
            this.getUserList()
        })
    }
    //重置密码
    userReset = (id, text) => {
        let url = `/ng-lingxi/api/user/reset/password/${id}`;
        jrFetchGet(url).then((ret) => {
            this.overallMessage(ret, text);
        })
    }
    //展开更多
    showProjects = (e) => {
        this.setState({
            more: Number(e.target.id)
        })
    }
    //收起更多
    hideProjects = () => {
        this.setState({
            more: -1
        })
    }

}

const Tablelist = withRouter(TableListConfig)
export default Form.create()(Tablelist);

