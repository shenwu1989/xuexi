import React from 'react';
import {Row, Col, Drawer, Spin, Form} from "antd";
import NavLeft from "./components/NavLeft";
import Header from "./components/Header";
import {withRouter} from 'react-router';
import 'antd/dist/antd.less';
import './admin.less';
import {getCookie, checkCookie, cookieConfig} from './pages/Cookie';

//加载模块
export let SpinLogin = null;


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            loading: false
        }
        SpinLogin = this;
    }

    /*componentDidMount() {
        const userInfo = getCookie(cookieConfig);
        if (!checkCookie(cookieConfig)) {
            window.location.replace(`/login`)
        }else {
            userInfo.user_admin === 'true' ? this.props.history.push(`/admin/adminitemmanage`) : this.props.history.push(`/admin/myitemmanage`);
        }
    }*/

    render() {
        return (
            <div className={'admin-content'}>

                <Row>
                    {
                        <Col span={4}>
                            <Drawer
                                placement='left'
                                closable={false}
                                onClose={this.onClose}
                                visible={this.state.collapsed}
                                width='16.7%'
                                mask={false}
                            >
                                <NavLeft/>
                            </Drawer>
                        </Col>
                    }
                    <Col span={this.state.collapsed ? 20 : 24} className={'admintop'}>
                        <Header fn={this.toggleCollapsed}/>
                        <Row className={'content'}>
                            {this.props.children}
                            {
                                this.state.loading &&
                                <div className={'spin'}>
                                    <Spin tip="Loading..." spinning={true} delay={500} size="large"/>
                                </div>
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

    //导航切换
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    //loading
    setLogin(loading) {
        this.setState({loading})
    }
}
const Index = withRouter(Admin)
export default Form.create()(Index);
