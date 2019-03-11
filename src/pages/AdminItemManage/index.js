import React, { Component } from 'react';
import { Form, Button, Row, Col, Select, Input, DatePicker,  Pagination } from 'antd'
import { jrFetchGet, dateShift, queryNull, getPagination } from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import { NavLink } from 'react-router-dom'
import { cookieConfig, getCookie } from "../Cookie";
import TableListConfig from './tableListConfig'
import message from "antd/lib/message";

const FormItem = Form.Item;
const { Option } = Select;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const userInfo = getCookie(cookieConfig);
        userInfo && this.setState({
            user_admin: userInfo.user_admin === 'true'
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout, minStyle } = styleConfig;
        const xs = { span: 24 }, sm = { span: 8 };
        const { phase = [], users = {}, state = [], round = [], first_industry = [] } = this.state.dataList || {};
        return (
                <div>
                    <Row>
                        <Col span={22} offset={1}>
                            <h1 className={'title'}>{this.state.user_admin ? '项目管理' : '我的项目'}</h1>
                        </Col>
                    </Row>
                    <Form>
                        <Row>
                            <Col xs={{ ...xs }} sm={{ ...sm }}>
                                <FormItem label={'项目名称'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('name', {})(
                                            <Input placeholder="请输入项目名称" />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col xs={{ ...xs }} sm={{ ...sm }}>
                                <FormItem label={'一级行业'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('first_industry', {
                                            initialValue: 0,
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
                                        getFieldDecorator('second_industry', {})(
                                            <Input placeholder="请输入二级行业" />
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ ...xs }} sm={{ ...sm }}>
                                <FormItem label={'轮次'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('round', {
                                            initialValue: 0,
                                        })(
                                            <Select placeholder={'请选择轮次'}>
                                                {
                                                    round.map((item, index) => {
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
                                            initialValue: 0,
                                        })(
                                            <Select placeholder={'请选择准备阶段'}>
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
                            <Col xs={{ ...xs }} sm={{ ...sm }}>
                                <FormItem label={'项目状态'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('state', {
                                            initialValue: 0,
                                        })(
                                            <Select placeholder={'请选择项目状态'}>
                                                {
                                                    state.map((item, index) => {
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
                            <Col xs={{ ...xs }} sm={{ ...sm }}>
                                <FormItem label={'staffing'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('staffing', {})(
                                            <Select mode="multiple" placeholder={'请选择项目人员'}>
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
                            <Col xs={{ ...xs }} sm={{ span: 13 }}>
                                <FormItem label={'立项时间'} {...minStyle}>
                                    {
                                        <span>
                                            {
                                                getFieldDecorator('start_time', {})(
                                                    <DatePicker style={{ width: '42%' }}
                                                        placeholder="开始时间"
                                                    />
                                                )
                                            }
                                            &nbsp;一&nbsp;
                                            {
                                                getFieldDecorator('end_time', {})(
                                                    <DatePicker style={{ width: '42%' }}
                                                        placeholder="结束时间"
                                                    />
                                                )
                                            }
                                        </span>
                                    }

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={19}>
                                <Button type={"primary"} size={"large"} onClick={this.handleSeek}>搜索</Button>
                                &nbsp;
                                &nbsp;
                                <Button size={"large"} onClick={this.handleClear}>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col offset={1}>
                            {
                                this.state.user_admin && <Button type={"primary"} size={"large"}>
                                    <NavLink to={'/admin/additem?id=0'}>新建项目</NavLink>
                                </Button>
                            }
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <TableListConfig dataSource={this.state.dataSource} fn={this.dataList} />
                        <Pagination
                            className={'pagination'}
                            size="small"
                            defaultPageSize={5}
                            pageSizeOptions={['5', '10', '15']}
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

    //搜索
    handleSeek = () => {
        let itemInfo = this.props.form.getFieldsValue();
        queryNull(itemInfo.start_time) ? itemInfo.start_time = '' : (itemInfo.start_time = dateShift(itemInfo.start_time._d));
        queryNull(itemInfo.end_time) ? itemInfo.end_time = '' : (itemInfo.end_time = dateShift(itemInfo.end_time._d));
        jrFetchGet('/ng-lingxi/api/project/internal/list', {
            ...itemInfo
        }).then((ret) => {
            if (ret.data.projects.length === 0) {
                message.info('项目不存在，请确认关键字正确后重新搜索！')
            } else {
                let projects = ret.data.projects;
                if (!Array.isArray(projects)) {
                    projects = Object.values(projects)
                }
                let obj = { pageSize: 5, page: 1, dataList: projects, sort: 'date' };
                let { pageLen, dataSource } = getPagination(obj);
                this.setState({
                    dataList: ret.data,
                    dataSource,
                    pageLen
                })
            }
        })
    }
    //重置
    handleClear = () => {
        const { form } = this.props;
        form.resetFields();
    }
    //获取数据
    dataList = (data, pageLen) => {
        this.setState({
            dataList: data,
            pageLen
        })
    }
    //分页
    getVule = (page, pageSize) => {
        let obj = { pageSize, page, dataList: this.state.dataList.projects, sort: 'date' };
        let { pageLen, dataSource } = getPagination(obj);
        this.setState({
            dataSource,
            pageLen
        })
    }
}

export default Form.create()(Index);
