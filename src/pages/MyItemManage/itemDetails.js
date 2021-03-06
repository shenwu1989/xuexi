import React, { Component } from 'react';
import { Form, Row, Col, Tabs } from 'antd'
import ItemSituation from './itemDetails/itemSituation';
import ItemTl from './itemDetails/itemTL';
import ItemDate from './itemDetails/itemDate';
import DetailsTl from './itemDetails/itemTL/detailsTL';
import './index.less'
import { jrFetchGet } from "../common";

const TabPane = Tabs.TabPane;

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTl: false,
        }
    }

    componentDidMount() {
        let id = Number(this.props.location.search.substr(1).split('=')[1]);
        this.setState({
            id
        })
        let url = `/ng-lingxi/api/project/internal/view/sketch/${id}`;
        id && jrFetchGet(url, {}).then(ret => {
            this.setState({
                id,
                dataInfo: ret.data
            })
        })
    }

    render() {
        const { info: { name } = {} } = this.state.dataInfo || {};
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>{name}</h1>
                    </Col>
                    <Col span={22} offset={1}>
                        <Tabs type="card" defaultActiveKey="1" animated onChange={i => this.setState({ activeKey: i })}>
                            <TabPane tab="概况" key="1" className={'tabPane'}>
                                <ItemSituation id={this.state.id} dataInfo={this.state.dataInfo} />
                            </TabPane>
                            <TabPane tab="TL" key="2">
                                {
                                    this.state.showTl ? this.state.activeKey === '2' ? <DetailsTl fn={this.handleShow} id={this.state.idTl} /> : <div></div> 
                                    :<ItemTl fn={this.handleShow} id={this.state.id} />
                                }
                            </TabPane>
                            {
                                this.state.activeKey === '3' ? <TabPane tab="资料" key="3" >
                                    <ItemDate id={this.state.id} infoSon={this.state.infoSon} />
                                </TabPane> : <TabPane tab="资料" key="3" ></TabPane>
                            }

                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }

    handleShow = (data = 0) => {
        this.setState({
            showTl: !this.state.showTl,
            idTl: data
        })
    }
}

export default Form.create()(ItemDetails);
