import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'antd'
import { jrFetchPost, jrFetchGet } from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';

import './index.less';
import { Link } from "react-router-dom";


class ItemDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout } = styleConfig;
        let xs = { span: 24 }, sm = { span: 8 };
        return (
            <div className={'tabPane'}>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>外部意向项目详情</h1>
                    </Col>
                </Row>
                <Row style={{ marginTop: '50px' }}>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>项目名称：</em>百维科技</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>一级行业：</em>金融</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>二级行业：</em>贷款超市</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>录入人：</em>张艺</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>跟进状态：</em>外部意向-重点关注</p>
                    </Col>
                    <Col xs={{ ...xs }} sm={{ ...sm }}>
                        <p><em>历史投资机构：</em>腾讯投资</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 8 }} offset={8}>
                        <Button onClick={() => this.props.history.goBack()}>返回</Button>
                        <Button type={'primary'} >
                            <Link to={'/admin/addintentionitem'}>编辑</Link>
                        </Button>
                        <Button
                            onClick={this.handleRemove}
                            style={{ marginRight: '60px', marginTop: '40px' }}
                            type={'danger'}
                        >
                            删除
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Form.create()(ItemDetails);
