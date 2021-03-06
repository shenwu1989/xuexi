import React from 'react';
import { Menu, Icon } from 'antd';
import MenuConfig from './../../config/menuConfig';
import { NavLink, withRouter } from 'react-router-dom';
import './index.less';
import { getCookie, cookieConfig } from '../../pages/Cookie';

const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuTreeNode: null,
            visible: false,
            key: sessionStorage.getItem("key") || '1'
        }
    }

    componentDidMount() {
        let menuList = this.renderMenu(MenuConfig);
        const userInfo = getCookie(cookieConfig);
        let menuTreeNode = userInfo.user_admin === 'true' ? (menuList.splice(2, 1), menuList) : menuList.splice(2);
        this.setState({
            menuTreeNode
        })
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div className={'navBox'}>
                <p className={'logo'}>灵犀资本管理系统</p>
                <Menu
                    defaultSelectedKeys={[this.state.key]}
                    mode="inline"
                    theme="dark"
                    onSelect={
                        k => {
                            sessionStorage.setItem('key', k.key);
                        }
                    }
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }


    /*导航渲染*/
    renderMenu = (data) => {
        return data.map((item) => {
            let { title, key, icon, url } = item;
            if (item.children) {
                return (
                    <SubMenu
                        title={<span><Icon type={icon} />{title}</span>} key={key}
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={key}>
                    <Icon type={icon} />
                    <NavLink to={url} >{title}</NavLink>
                </Menu.Item>
            )
        }
        )
    }

}

export default withRouter(NavLeft)