import React, {Component} from 'react';
import {Col, Form, Row, Progress, Input, Select, Button, Table, Drawer} from 'antd'
import {jrFetchPost, jrFetchGet} from '../../../../src/pages/common';
import styleConfig from '../../../config/styleConfig';
import tableListConfig from "./tableListCinfig";
import AddTl from './itemTL/addTL'
import TableListConfig from './tableListCinfig';

const FormItem = Form.Item;

const {Option} = Select;

class ItemTl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,

        }
    }

    render() {
        const columns = tableListConfig;
        const {getFieldDecorator} = this.props.form;
        const {minCol} = styleConfig;
        const xs = {span: 24}, sm = {span: 6};
        return (
            <div className={'itemTl'}>
                <Form>
                    <Row className={'itemTl_Row'}>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <div>
                                <em>已推送机构：</em>
                                <b>18</b>
                                <div className={'itemTl_div'}>
                                    <Progress type="circle" percent={30} width={50} strokeColor={'#199ED8'}/>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <div>
                                <em>已开会机构:</em>
                                <b>18</b>
                                <div className={'itemTl_div'}>
                                    <Progress type="circle" percent={30} width={50} strokeColor={'#199ED8'}/>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <div>
                                <em>在跟进机构：</em>
                                <b>18</b>
                                <div className={'itemTl_div'}>
                                    <Progress type="circle" percent={30} width={50} strokeColor={'#199ED8'}/>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <div>
                                <em>待排会机构：</em>
                                <b>18</b>
                                <div className={'itemTl_div'}>
                                    <Progress type="circle" percent={30} width={50} strokeColor={'#199ED8'}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{...xs}} sm={{span: 7}}>
                            <FormItem label={'投资机构'} {...minCol}>
                                {
                                    getFieldDecorator('name', {})(
                                        <Input placeholder="请输入投资机构"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{span: 7}}>
                            <FormItem label={'参会人'} {...minCol}>
                                {
                                    getFieldDecorator('name1', {})(
                                        <Select mode="multiple" placeholder={'请选择参会人'}>
                                            <Option value={'1'}>金融</Option>
                                            <Option value={'2'}>金融2</Option>
                                            <Option value={'3'}>金融3</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{span: 7}}>
                            <FormItem label={'事件状态'} {...minCol}>
                                {
                                    getFieldDecorator('name2', {})(
                                        <Select placeholder={'请选择事件状态'}>
                                            <Option value={'1'}>金融</Option>
                                            <Option value={'2'}>金融2</Option>
                                            <Option value={'3'}>金融3</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{span: 3}} style={{marginTop: '3px'}}>
                            <Button type={"primary"} size={"default"} onClick={this.handleSeek}>查询</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type={"primary"} onClick={this.handleDrawer}>新建事件</Button>
                        </Col>
                    </Row>
                </Form>
                <Row style={{marginTop: '20px'}}>
                    <TableListConfig fn={this.handleShow}/>
                </Row>
                <Drawer
                    title="新增事件"
                    placement="right"
                    width={800}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <AddTl fn={this.handleDrawer}/>
                </Drawer>
            </div>
        );
    }

    handleDrawer = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    handleSeek = () => {
        let itemInfo = this.props.form.getFieldsValue();
        console.log(itemInfo)
    }
    handleShow = (data) => {
        this.props.fn(data)
    }
}

export default Form.create()(ItemTl);
