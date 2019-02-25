import React, {Component} from 'react';
import {Col, Row} from "antd";

class Index extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>投资机构库</h1>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;