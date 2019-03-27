
import { jrFetchGet, jrFetchPost } from '../pages/common';
import { getCookie, checkCookie, removeCookie, setCookie } from '../pages/Cookie';
import * as api from "./api";
//获取用户首页搜索框项目初始值
export function userItemAll() {
    return jrFetchGet(api.get_user_all).then(res => {
        return res.data
    })
}
//获取用户管理首页TABLE列表数据
export function userTableList() {
    return jrFetchGet(api.get_user_table_list).then(res => {
        return res.data
    })
}
//用户登录请求
export function userLogin(password, phone) {
    let loading = false;//logding动画是否显示
    return jrFetchPost(api.post_login, { password, phone }, loading).then(ret => {
        let userInfo = { ...ret.data, phone };
        setCookie(userInfo);
        if (ret.code === 0) {
            userInfo.user_admin ? this.props.history.push(`/admin/adminitemmanage`) : this.props.history.push(`/admin/myitemmanage`);
        }
    })
}