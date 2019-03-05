import React, { Component } from 'react';
import { Button, Col, Form, Row, Modal, Drawer, message } from 'antd'
import { jrFetchGet, fileSize } from '../../../common';
import AddTl from './addTL';

const confirm = Modal.confirm;
class DetailsTl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateValue: 0,
            visible: false,
            id: 1
        }
    }

    componentDidMount() {
        let id = this.props.id
        this.setState({
            itemId: id
        })
        this.getDataInfo()
    }

    render() {
        const { info = {}, attendee_list = {}, state_list = [], attendee_selected = [], feedback = [], updated = [], memo = [], schedule = {} } = this.state.dataInfo || {};
        const { agency, following_up, id, investor, investor_title, project_id, state } = info;
        return (
            <div className={'detailsTl'}>
                <Row className={'detailsTl_rol'}>
                    <Col span={8}>
                        <em>投资机构：</em>
                        <p>
                            <span>{agency}</span>
                        </p>
                    </Col>
                    <Col span={8}>
                        <em>投资人：</em>
                        <p>
                            <span>{investor}</span>
                        </p>
                    </Col>
                    <Col span={8}>
                        <em>title：</em>
                        <p>
                            <span>{investor_title}</span>
                        </p>
                    </Col>
                </Row>
                <Row className={'detailsTl_rol'}>

                    <Col span={8}>
                        <em>参会人：</em>
                        <p>
                            <span>
                                {
                                    attendee_selected.map((item, index) => {
                                        if (index === attendee_selected.length - 1) {
                                            return <b key={index}>{attendee_list[item]}</b>
                                        }
                                        return <b key={index}>{attendee_list[item]},</b>
                                    })
                                }
                            </span>
                        </p>
                    </Col>
                    <Col span={8} className={'gj'}>
                        <em>下一步跟进：</em>
                        <p>
                            <span>{following_up}</span>
                        </p>
                    </Col>
                    <Col span={8}>
                        <em>事件状态：</em>
                        <p>
                            <span>{state_list[state]}</span>
                        </p>
                        {
                            this.state.stateValue === 4 &&
                            <Col span={24} className={'item_table'}>
                                <ul>
                                    <li>
                                        <em>待开会议</em>
                                        <i>{schedule.meeting}</i>
                                    </li>
                                    <li>
                                        <em>参会人员</em>
                                        <i>{schedule.attendee}</i>
                                    </li>
                                    <li>
                                        <em>投资人</em>
                                        <i>{schedule.investor}</i>
                                    </li>
                                    <li>
                                        <em>title</em>
                                        <i>{schedule.title}</i>
                                    </li>
                                    <li>
                                        <em>地点</em>
                                        <i>{schedule.location}</i>
                                    </li>
                                    <li>
                                        <em>时间</em>
                                        <i>{schedule.time}</i>
                                    </li>
                                    <li>
                                        <em>备注</em>
                                        <i>{schedule.remark}</i>
                                    </li>
                                </ul>
                            </Col>
                        }
                    </Col>
                </Row>
                <Row className={'tl_lsfk detailsTl_rol'}>
                    <Col span={this.state.stateValue === 4 ? 18 : 12}>
                        <em>历史反馈：</em>
                        <div>
                            <p>
                                {
                                    feedback.map(item => {
                                        return <span key={item.id}>{item.created_at}&nbsp;{item.feedback}</span>
                                    })
                                }
                            </p>
                        </div>
                    </Col>
                    <Col span={this.state.stateValue === 4 ? 18 : 12}>
                        <em>修改记录：</em>
                        <div>
                            <p>
                                {
                                    updated.map(
                                        (item, index) => {
                                            return <span key={index}>{item.created_at}&nbsp;{item.value}</span>
                                        })
                                }
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <em>会议memo：</em>
                        <p>
                            {
                                memo.map(item => {
                                    return <span key={item.id}>
                                        <a href={item.url} target='_blank'>
                                            {item.name}({fileSize(item.size)})
                                        </a>
                                    </span>
                                })
                            }
                        </p>
                    </Col>
                </Row>
                <Drawer
                    title="编辑事件"
                    placement="right"
                    width={800}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <AddTl fn={this.handleDrawer} state={this.state} info={this.getDataInfo}/>
                </Drawer>
                <Row className='detailsTl_button'>
                    <Col sm={{ span: 14 }} offset={9}>
                        <Button onClick={this.handleExit}>返回</Button>
                        <Button type={'primary'} onClick={this.handleDrawer}>编辑</Button>
                        <Button type={'danger'} onClick={this.handleDelete}>删除</Button>
                    </Col>
                </Row>
            </div>
        );
    }
    //初始化信息
    getDataInfo=()=>{
        jrFetchGet(`/ng-lingxi/api/project/internal/tl/view/sketch/${this.props.id}`).then(res => {
            this.setState({
                dataInfo: res.data,
                stateValue: res.data.info.state
            })
        })
    }
    //编辑
    handleDrawer = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    //取消
    handleExit = () => {
        this.props.fn()
    }
    //开会列表显示
    handleState = (e) => {
        let stateValue = e;
        this.setState({
            stateValue
        })
    }
    //删除
    handleDelete = () => {
        let id = this.props.id;
        let handleExit = this.handleExit;
        confirm({
            title: '是否要删除？',
            content: '此次操作将删除当前事件！',
            okText: '确定',
            okType: 'danger',
            cancelText: '再想想',
            onOk() {
                jrFetchGet(`/ng-lingxi/api/project/internal/tl/delete/${id}`).then(res => {
                    if (res.code === 0) {
                        message.success('删除成功', 1, onclose => {
                            handleExit();
                        })
                    } else {
                        message.info(res.message)
                    }
                })
            },
            onCancel() { },
        });
    }
}

export default Form.create()(DetailsTl);
