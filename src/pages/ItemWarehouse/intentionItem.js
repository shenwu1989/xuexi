import React, { Component } from 'react';
import { Form, Button, Row, Col,message ,Modal} from 'antd'
import {  jrFetchGet } from '../../../src/pages/common';
import './index.less';
import { Link } from "react-router-dom";

const confirm = Modal.confirm;

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        let id = this.props.location.search.substr(1);
        jrFetchGet(`/ng-lingxi/api/project/external/view/sketch/${id}`).then(res => {
            this.setState({
                dataInfo: res.data
            })
        })
    }
    render() {
        const { first_industry = {}, following_state_list = {}, users, info = {} } = this.state.dataInfo || {};
        const { agency_history, first_industry: industry, following_up_state, name, second_industry, staffing = [] ,id} = info;
        let xs = { span: 24 }, sm = { span: 7 };
        return (
            <div className={'tabPane'}>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>外部意向项目详情</h1>
                    </Col>
                </Row>
                <Row >
                    <Col xs={{ ...xs }} sm={{ ...sm }} offset={1}>
                        <p><em>项目名称：</em>{name}</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>一级行业：</em>{first_industry[industry]}</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>二级行业：</em>{second_industry}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ ...xs }} sm={{ ...sm }} offset={1}>
                        <p>
                            <em>录入人：</em>
                            {
                                staffing.map((a, b) => {
                                    return staffing.length - 1 === b ? users[a] : users[a] + ','
                                })
                            }
                        </p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>跟进状态：</em>{following_state_list[following_up_state]}</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>历史投资机构：</em>{agency_history}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 10 }} offset={8}>
                        <Button onClick={() => this.props.history.goBack()}>返回</Button>
                        <Button type={'primary'} >
                            <Link to={`/admin/addintentionitem?${id}`}>编辑</Link>
                        </Button>
                        <Button
                            onClick={() => this.handleRemove(id, this.props.history)}
                            style={{ marginRight: '60px', marginTop: '40px' }}
                            type={'danger'}
                        >
                            删除
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
    //删除
    handleRemove = (id, props) => {
        confirm({
            title: '确定要删除吗?',
            okText: '确定',
            cancelText: "取消",
            onOk() {
                let url = `/ng-lingxi/api/project/external/delete/${id}`
                jrFetchGet(url).then(ret => {
                    if (ret.code === 0)
                        message.success('删除成功', 1, () => {
                            props.goBack()
                        })
                })
            },
            onCancel() {
            },
        });
    }
}

export default Form.create()(ItemDetails);
