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
        const { info = {}, attendee_list = {}, state_list = [], attendee_selected = [], feedback = [], updated = [], memo = [], schedule = {}, tl_record_fields = {} } = this.state.dataInfo || {};
        const { agency, following_up, investor, investor_title, state } = info;
        let updatedConfig = {};
        //解构tl_record_fields获取字典
        Object.keys(tl_record_fields).map(item => {
            let key = tl_record_fields[item].index,
                value = tl_record_fields[item].name;
            updatedConfig[key] = value;
            return null;
        })
        //处理updated
        let sort_update_arr = updated.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        let updated_arr = sort_update_arr.map((item, i) => {
            let find_arr = sort_update_arr.slice(i + 1)
            let edit_data = find_arr.find(it => it.field === item.field)
            let res = edit_data && [item, edit_data] || ""
            return res
        }).filter(Boolean)
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
                                            return <s key={index}>{attendee_list[item]}</s>
                                        }
                                        return <s key={index}>{attendee_list[item]},</s>
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
                        <em className={this.state.stateValue === 4 ? 'max' : ''}>历史反馈：</em>
                        <div>
                            <p>
                                {
                                    feedback.map(item => {
                                        return <span key={item.id}>{item.created_at.substring(0,10)}&nbsp;{item.feedback}</span>
                                    })
                                }
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row className={'detailsTl_rol'}>
                    <Col span={this.state.stateValue === 4 ? 18 : 18}>
                        <em className={'m18_width'}>修改记录：</em>
                        <div>
                            <p>
                                {
                                    updated_arr.map(
                                        i => {
                                            return i.map((item, index) => {
                                                let oldValue = i[1].value;
                                                return index === 0 && <span key={index}>
                                                    {item.created_at.substring(0,10)}&nbsp;
                                                    <b>{updatedConfig[item.field]}</b> 由
                                                    <strong>"{item.field !== 3 ? oldValue : state_list[oldValue]}"</strong>变更为
                                                    <strong>"{item.field !== 3 ? item.value : state_list[item.value]}"</strong>
                                                </span>
                                            })
                                        })
                                }
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <em className={'max_width'}>会议memo：</em>
                        <p>
                            {
                                memo.map(item => {
                                    return <span key={item.id}>
                                        <a href={item.url} download target='_blank'>
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
                    destroyOnClose={true}
                >
                    <AddTl fn={this.handleDrawer} state={this.state} info={this.getDataInfo} />
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
    getDataInfo = () => {
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
