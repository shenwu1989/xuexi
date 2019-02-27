import React, {Component} from 'react';
import {Form, Table} from 'antd'
import {getPagination, jrFetchGet} from '../../common';
import {withRouter} from 'react-router';

class TableListConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                {'id': 1, 'tzjg': 'aaa', 'tzr': 'bbb', 'sjzt': 'ccc', 'chr': 'ddd', 'gj': 'eee', 'lsfk': 'vvv'}
            ]
        }
    }

    componentDidMount() {
        //this.getItemList()
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
                width: 20,
                dataIndex: 'id',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: '投资机构',
                width: 100,
                align: 'center',
                dataIndex: 'tzjg'
            },
            {
                title: '投资人',
                width: 100,
                align: 'center',
                dataIndex: 'tzr'
            },
            {
                title: '事件状态',
                width: 100,
                align: 'center',
                dataIndex: 'sjzt'
            },
            {
                title: '参会人',
                width: 100,
                align: 'center',
                dataIndex: 'chr'
            },
            {
                title: '历史反馈',
                width: 100,
                align: 'center',
                dataIndex: 'lsfk'
            },
            {
                title: '下一步跟进',
                width: 100,
                align: 'center',
                dataIndex: 'gj'
            },
            {
                title: '详情',
                width: 30,
                align: 'center',
                render: (r, i, t) => {
                    return <a onClick={() => this.handleShow(r, i, t)}>查看</a>
                }
            }
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

    //获取项目列表
    /*getItemList = () => {
        jrFetchGet(`/ng-lingxi/api/project/internal/list`).then(ret => {
            const projects = ret.data.projects;
            let obj = {pageSize: 5, page: 1, dataList: projects,sort:'date'};
            let {pageLen, dataSource} = getPagination(obj);
            this.props.fn(ret.data, pageLen)
            this.setState({
                dataSource,
                dataInfo: ret.data
            })
        })
    }*/
    handleShow = (data) => {
        this.props.fn(data)
    }
}

const Tablelist = withRouter(TableListConfig)
export default Form.create()(Tablelist);


