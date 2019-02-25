import React from 'react';
import {Col, Row, Button, Icon, Avatar} from "antd";
import {checkCookie, cookieConfig, getCookie, removeCookie} from "../../pages/Cookie";
import {withRouter} from 'react-router';
import './index.less';
import {promised} from "q";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            collapsed: false
        }
    }

    componentDidMount() {
        const userInfo = getCookie(cookieConfig);
        checkCookie(cookieConfig) && this.setState({
            userName: userInfo.user_name,
        })
    }

    render() {
        return (
            <div className={'header'}>
                <Row>
                    <Col span={2}>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}
                                className={'navBtn'}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                        </Button>
                    </Col>
                    <Col span={22} className={'headerTop'}>
                        <Button size="small" onClick={this.handleReload}>刷新</Button>
                        <span> <Avatar style={{ backgroundColor: '#001529' }} size="small" icon="user" />&nbsp;&nbsp;<i>{this.state.userName}</i></span>
                        <Button size="small" onClick={this.handleExit}>退出</Button>
                    </Col>
                </Row>
            </div>
        )
    }

    //显示隐藏导航
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
        this.props.fn();
    }
    //刷新页面
    handleReload = () => {
        this.props.history.goBack();
        setTimeout (() => {
            this.props.history.goForward();
        },1000/60)

    }
    //退出
    handleExit = () => {
        removeCookie(cookieConfig)
    }
}

const Headers = withRouter(Header)
export default Headers;