import React, { Component } from 'react';
import { Col, Form, Row, Progress, Input, Select, Button, Drawer, Pagination } from 'antd'
import { jrFetchGet, getVule, seekList } from '../../../../src/pages/common';
import styleConfig from '../../../config/styleConfig';
import AddTl from './itemTL/addTL'
import TableListConfig from './tableListConfig';

const FormItem = Form.Item;

const { Option } = Select;

class ItemTl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            id: 0,
        }
    }
    componentDidMount() {
        this.getItemList()
        this.setState({
            itemId: this.props.id
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { minCol } = styleConfig;
        const { tl_state = [], users = {}, state_statistics = {}, tls = [] } = this.state || {};
        const { all, followed, met, pushed, tomeet } = state_statistics;
        const xs = { span: 24 }, sm = { span: 6 };
        return (
            <div className={'itemTl'}>
                <Form>
                    <Row className={'itemTl_Row'}>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <div>
                                <em>已推送机构：</em>
                                <b>{pushed}</b>
                                <div className={'itemTl_div'}>
                                    <Progress
                                        type="circle"
                                        percent={Math.round(pushed / all * 100)}
                                        width={50}
                                        strokeColor={'#199ED8'}
                                        format={percent => percent + '%'}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <div>
                                <em>已开会机构:</em>
                                <b>{met}</b>
                                <div className={'itemTl_div'}>
                                    <Progress
                                        type="circle"
                                        percent={Math.round(met / all * 100)}
                                        width={50}
                                        strokeColor={'#199ED8'}
                                        format={percent => percent + '%'}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <div>
                                <em>在跟进机构：</em>
                                <b>{followed}</b>
                                <div className={'itemTl_div'}>
                                    <Progress
                                        type="circle"
                                        percent={Math.round(followed / all * 100)}
                                        width={50}
                                        strokeColor={'#199ED8'}
                                        format={percent => percent + '%'}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <div>
                                <em>待排会机构：</em>
                                <b>{tomeet}</b>
                                <div className={'itemTl_div'}>
                                    <Progress
                                        type="circle"
                                        percent={Math.round(tomeet / all * 100)}
                                        width={50}
                                        strokeColor={'#199ED8'}
                                        format={percent => percent + '%'}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ ...xs }} sm={{ span: 7 }}>
                            <FormItem label={'投资机构'} {...minCol}>
                                {
                                    getFieldDecorator('agency', {})(
                                        <Input placeholder="请输入投资机构" />
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ span: 7 }}>
                            <FormItem label={'参会人'} {...minCol}>
                                {
                                    getFieldDecorator('attendee', {})(
                                        <Select mode="multiple" placeholder={'请选择参会人'}>
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
                        <Col xs={{ ...xs }} sm={{ span: 7 }}>
                            <FormItem label={'事件状态'} {...minCol}>
                                {
                                    getFieldDecorator('state', {
                                        //initialValue: 0,
                                    })(
                                        <Select placeholder={'请选择事件状态'}>
                                            {
                                                tl_state.map((item, index) => {
                                                    return <Option key={index} value={index}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ span: 3 }} style={{ marginTop: '3px' }}>
                            <Button type={"primary"} size={"default"} onClick={this.handleSeek}>查询</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type={"primary"} onClick={this.handleDrawer}>新建事件</Button>
                        </Col>
                    </Row>
                </Form>
                <Row style={{ marginTop: '20px' }}>
                    <TableListConfig fn={this.handleShow} dataInfo={this.state} />
                    <Pagination
                        className={'pagination'}
                        size="small"
                        defaultPageSize={10}
                        pageSizeOptions={['10', '20', '30']}
                        total={this.state.pageLen}
                        showSizeChanger
                        showQuickJumper
                        onChange={(v, i) => getVule.call(this, v, i, tls)}
                        onShowSizeChange={(v, i) => getVule.call(this, v, i, tls)}
                    />
                </Row>
                <Drawer
                    title="新增事件"
                    placement="right"
                    width={800}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    destroyOnClose={true}
                >
                    <AddTl fn={this.handleDrawer} state={this.state} info={this.getItemList} />
                </Drawer>
            </div>
        );
    }
    //获取初始数据
    getItemList = () => {
        jrFetchGet(`/ng-lingxi/api/project/internal/tl/list`, {
            project: this.props.id
        }).then(ret => {
            const { tl_state, tls, users, state_statistics } = ret.data;
            seekList.call(this, tls, 10);
            this.setState({
                tl_state,
                tls,
                users,
                state_statistics,
            })
        })
    }

    handleDrawer = (i) => {
        this.setState({
            visible: !this.state.visible
        })
    }
    //查询
    handleSeek = () => {
        let itemInfo = this.props.form.getFieldsValue();
        itemInfo.project = this.props.id;
        Object.keys(itemInfo).map(key => {
            if (key === 'state') {
                itemInfo[key] = itemInfo[key] === undefined ? 0 : itemInfo[key]
            }
        })
        jrFetchGet(`/ng-lingxi/api/project/internal/tl/list`, {
            ...itemInfo
        }).then(ret => {
            seekList.call(this, ret.data.tls, 10);
            this.setState({
                tls: ret.data.tls
            })
        })
    }
    handleShow = (data) => {
        this.props.fn(data)
    }
}
export default Form.create()(ItemTl);
