import React, { Component } from 'react';
import { Form, Button, Row, Col, Modal, message, Drawer } from 'antd'
import { jrFetchGet, queryNull, judgeState } from '../../../../src/pages/common';
import { Link } from "react-router-dom";
import { getCookie } from "../../Cookie";
import { withRouter } from "react-router";

const confirm = Modal.confirm;

class ItemSituation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            evolve: false,
        }
    }

    componentDidMount() {
        let { user_admin } = getCookie(['user_admin']);
        this.setState({
            id: this.props.id,
            dataInfo: this.props.dataInfo,
            user_admin: user_admin === 'true'
        })
    }

    componentWillReceiveProps(nextProps) {
        let { id, dataInfo } = nextProps;
        this.setState({
            id,
            dataInfo
        })

    }

    render() {
        const xs = { span: 24 }, sm = { span: 8 };
        const { info = {}, first_industry = [], round = [], phase = [], state = [], currency, contract_state, users } = this.state.dataInfo || {};
        const {
            name, pause_time, pause_reason, amount, staffing, progress, agency_history, contract_state: info_contract_state, currency: info_currency, first_industry: info_first_industry,
            second_industry, round: info_round, phase: info_phase, establish_time, state: info_state
        } = info;
        return (
            <div>
                <Row style={{ marginTop: '15px' }}>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>项目名称：</em><strong>{name}</strong></p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p>
                            <em>一级行业：</em>{first_industry[info_first_industry]}
                        </p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>二级行业：</em><strong>{second_industry}</strong></p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>轮次：</em>{round[info_round]}&nbsp;</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>项目阶段：</em>{phase[info_phase]}</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>立项时间：</em>{establish_time}</p>
                    </Col>
                </Row>
                <Row >
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>项目状态：</em>{state[info_state]}&nbsp;</p>
                    </Col>
                    {
                        judgeState(info_state) &&
                        <span>
                            <Col xs={{ ...xs }} sm={{ ...sm }}>
                                <p><em>{info_state === 2 ? '暂停时间：' : 'colse时间：'}</em><span>{pause_time}</span></p>
                            </Col>
                            <Col xs={{ ...xs }} sm={{ ...sm }}>
                                <p><em>{info_state === 2 ? '暂停原因：' : 'colse原因：'}</em><span>{pause_reason}</span></p>
                            </Col>
                        </span>

                    }

                </Row>
                <Row >
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p>
                            <em>融资金额(万)：</em>{queryNull(amount) ? '' : (amount + '万' + currency[info_currency])}&nbsp;
                        </p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p>
                            <em>合同状态：</em>{contract_state && contract_state[info_contract_state]}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p>
                            <em>staffing：</em>
                            <strong>
                                {
                                    users && Object.keys(staffing).map(i => {
                                        if (users.hasOwnProperty(i)) {
                                            return users[i].toString()
                                        }
                                    }).toString()
                                }
                            </strong>
                        </p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>历史投资机构：</em><strong>{agency_history}</strong></p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} className={'maxText'}>
                        <span className={'item_lsjz'}>
                            <em>历史进展：</em>
                            {
                                !queryNull(progress) &&
                                <span>
                                    <span>
                                        <span>
                                            <em style={{ width: 'auto' }}>{progress['0'].created_at.substring(0,10)}&nbsp;</em>
                                            <i>{progress['0'].progress}</i>
                                        </span>
                                        &nbsp;&nbsp;
                                      <Button
                                            onClick={this.handleShow} type={"primary"}
                                            size={"small"}
                                        >
                                            {this.state.evolve ? '收起' : '更多'}
                                        </Button>
                                    </span>
                                    {
                                        this.state.evolve &&
                                        <Drawer
                                            title={'历史进展'}
                                            placement='top'
                                            closable={false}
                                            onClose={this.onClose}
                                            visible={true}
                                            width='100%'
                                            height='auto'
                                            mask={false}
                                        >
                                            <div className={'primaryDiv'}>
                                                <Row className={'primaryheader'}>
                                                    <span>
                                                        <Col xs={{ ...xs }} sm={{ span: 4 }}><h3>时间</h3></Col>
                                                        <Col
                                                            xs={{ ...xs }} sm={{ span: 20 }}
                                                            className={'primaryCol'}
                                                        ><h3>进展</h3>
                                                        </Col>
                                                    </span>
                                                </Row>
                                                {
                                                    progress.map((item, index) => {
                                                        return <Row className={'primaryContent'}>
                                                            <span key={index}>
                                                                <Col
                                                                    xs={{ ...xs }}
                                                                    sm={{ span: 4 }}
                                                                >
                                                                    <em>{item.created_at}</em>
                                                                </Col>
                                                                <Col
                                                                    xs={{ ...xs }} sm={{ span: 20 }}
                                                                    className={'primaryCol'}
                                                                >
                                                                    <i>{item.progress}</i>
                                                                </Col>
                                                            </span>

                                                        </Row>
                                                    })
                                                }
                                            </div>
                                        </Drawer>
                                    }
                                </span>
                            }
                        </span>
                    </Col>
                </Row>
                <Row className={'situationButton'}>
                    <Col sm={{ span: 10 }} offset={7}>
                        <Button onClick={() => this.props.history.goBack()}>返回</Button>
                        <Button type={'primary'}>
                            <Link to={`/admin/additem/?id=${this.state.id}`}>编辑</Link>
                        </Button>
                        {
                            this.state.user_admin &&
                            <Button type={'danger'} onClick={() => this.handleRemove(this.state.id, this.props.history)}>删除</Button>
                        }
                    </Col>
                </Row>
            </div>
        );
    }

    //显示更多
    handleShow = () => {
        this.setState({
            evolve: !this.state.evolve
        })
    }
    //删除
    handleRemove = (id, props) => {
        confirm({
            title: '确定要删除吗?',
            okText: '确定',
            cancelText: "取消",
            onOk() {
                let url = `/ng-lingxi/api/project/internal/delete/${id}`
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

const ItemSituations = withRouter(ItemSituation)
export default Form.create()(ItemSituations);