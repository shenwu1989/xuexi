import React, {Component} from 'react';
import {Form, Button, Row, Col, Select, Input,} from 'antd'
import {jrFetchGet} from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import TableListConfig from './tableListConfig'
import './index.less';
import {Link} from "react-router-dom";

const FormItem = Form.Item;
const {Option} = Select;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
    }

    componentDidMount() {
        jrFetchGet(` /ng-lingxi/api/project/internal/all`).then(res => {
            this.setState({
                listData: res
            })
        })
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {formItemLayout} = styleConfig;
        const {data: listData = {}} = this.state.listData || {};
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>用户管理</h1>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col xs={{span: 24}} sm={{span: 6}}>
                            <FormItem label={'姓名'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name')(
                                        <Input placeholder="请输入姓名"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 6}}>
                            <FormItem label={'手机号'} {...formItemLayout}>
                                {
                                    getFieldDecorator('phone')(
                                        <Input placeholder="请输入手机号"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 6}}>
                            <FormItem label={'邮箱'} {...formItemLayout}>
                                {
                                    getFieldDecorator('email')(
                                        <Input placeholder="请输入邮箱"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 6}}>
                            <FormItem label={'关联项目'} {...formItemLayout}>
                                {
                                    getFieldDecorator('project')(
                                        <Select placeholder={'请选择关联项目'}>
                                            {
                                                Object.keys(listData).map((tiem, index) => {
                                                    return <Option key={index} value={tiem}>{listData[tiem]}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} offset={22}>
                            <Button type={'primary'} onClick={this.handleSubmit} size={'large'}>搜索</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} style={{marginLeft: '10px', marginBottom: '20px'}}>
                            <Button type={'primary'} size={'large'}>
                                <Link to={'/admin/adduser/?id=0'}>新增用户</Link>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <TableListConfig dataSource={this.state.dataSource}/>
                    </Row>
                </Form>
            </div>
        );
    }


    //搜索
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        userInfo.project = userInfo.project &&  Number(userInfo.project);
        jrFetchGet('/ng-lingxi/api/user/list', {
            ...userInfo
        }).then((ret) => {
            this.setState({
                dataSource: ret.data
            })
        })
    }
}

export default Form.create()(Index);