import React, {Component} from 'react';
import {Form, Row, Col, Tabs} from 'antd'
import ItemSituation from './itemDetails/itemSituation';
import ItemTl from './itemDetails/itemTL';
import './index.less'
import {jrFetchGet} from "../common";

const TabPane = Tabs.TabPane;

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
        const xs = {span: 24}, sm = {span: 8};
        const {info: {name} = {}} = this.state.dataInfo || {};
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>{name}</h1>
                    </Col>
                    <Col span={22} offset={1}>
                        <Tabs type="card" defaultActiveKey="1" animated>
                            <TabPane tab="概况" key="1" className={'tabPane'}>
                                <ItemSituation id={this.state.id} dataInfo={this.state.dataInfo}/>
                            </TabPane>
                            <TabPane tab="TL" key="2">
                                <ItemTl/>
                            </TabPane>
                            <TabPane tab="资料" key="3">资料</TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(ItemDetails);