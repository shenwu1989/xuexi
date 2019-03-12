import React, { Component } from 'react';
import { Form, Button, Row, Col, Select, Input, Pagination, message } from 'antd'
import { jrFetchGet, getPagination } from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import { Link } from "react-router-dom";
import TableListConfig from './tableListConfig';
import './index.less';
const FormItem = Form.Item;
const { Option } = Select;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout } = styleConfig;
        const { first_industry = [], following_state = [], phase = [], users = {} } = this.state.dataInfo || {};
        const xs = { span: 24 }, sm = { span: 8 };
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>项目公司库</h1>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'项目名称'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {})(
                                        <Input placeholder="请输入项目名称" allowClear />
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'一级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('first_industry', {
                                        //initialValue: 0,
                                    })(
                                        <Select placeholder={'请选择一级行业'}>
                                            {
                                                first_industry.map((item, index) => {
                                                    return <Option key={index} value={index}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'二级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('second_industry', {
                                    })(
                                        <Input placeholder="请输入二级行业" allowClear />
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'staffing/录入人'} {...formItemLayout}>
                                {
                                    getFieldDecorator('staffing', {})(
                                        <Select placeholder={'请选择轮次'} mode={"multiple"}>
                                            {
                                                Object.keys(users).map((item, index) => {
                                                    return <Option key={index} value={item}>{users[item]}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'跟进状态'} {...formItemLayout}>
                                {
                                    getFieldDecorator('state', {
                                        //initialValue: 0,
                                    })(
                                        <Select placeholder={'请选择准备阶段'}>
                                            {
                                                following_state.map((item, index) => {
                                                    return <Option key={index} value={index}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'项目阶段'} {...formItemLayout}>
                                {
                                    getFieldDecorator('phase', {
                                        //initialValue: 0,
                                    })(
                                        <Select placeholder={'请选择项目状态'}>
                                            {
                                                phase.map((item, index) => {
                                                    return <Option key={index} value={index}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={20}>
                            <Button type={"primary"} size={"large"} onClick={this.handleSeek}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col offset={1}>
                        <Button type={"primary"} size={"large"} >
                            <Link to={'/admin/addintentionitem?0'}>新建外部意向项目</Link>
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <TableListConfig fn={this.getChildrenData} data={this.state.dataInfo} />
                    <Pagination
                        className={'pagination'}
                        size="small"
                        defaultPageSize={10}
                        pageSizeOptions={['10', '20', '30']}
                        total={this.state.pageLen}
                        showSizeChanger
                        showQuickJumper
                        onChange={(v, i) => this.getVule(v, i)}
                        onShowSizeChange={(v, i) => this.getVule(v, i)}
                    />
                </Row>
            </div>
        );
    }
    //获取子级数据
    getChildrenData = (data, pageLen) => {
        this.setState({
            dataInfo: data,
            pageLen
        })
    }
    //搜索
    handleSeek = () => {
        let itemInfo = this.props.form.getFieldsValue();
        Object.keys(itemInfo).map(key => {
            if (key === 'first_industry' || key === 'state' || key === 'phase') {
                itemInfo[key] = itemInfo[key] === undefined ? 0 : itemInfo[key]
            }
        })
        jrFetchGet(`/ng-lingxi/api/project/external/list`, {
            ...itemInfo
        }).then(res => {
            if (res.data.projects.length === 0) {
                message.info('项目不存在，请确认关键字正确后重新搜索！')
            } else {
                const dataInfo = res.data;
                dataInfo.projects.map((a, b) => a.id = b + 1)
                let obj = { pageSize: 10, page: 1, dataList: dataInfo.projects };
                let { pageLen, dataSource } = getPagination(obj);
                dataInfo.infoList = dataSource;
                this.setState({
                    dataInfo,
                    pageLen
                })
            }
        })
    }
    //分页
    getVule = (page, pageSize) => {
        let obj = { pageSize, page, dataList: this.state.dataInfo.projects };
        let { pageLen, dataSource } = getPagination(obj);
        let dataInfo = this.state.dataInfo;
        dataInfo.infoList = dataSource;
        this.setState({
            dataInfo,
            pageLen
        })
    }
}

export default Form.create()(Index);