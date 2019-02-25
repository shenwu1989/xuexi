import {message} from "antd";
import {jrFetchGet} from "../common";

function overallMessage (ret, text) {
    ret.code === 0 ? message.success(text + '成功') : message.success(text + '失败')
}
//删除用户
export function handleDelete (id, text) {
    let url = `/ng-lingxi/api/user/delete/${id}`;
    jrFetchGet(url).then((ret) => {
        overallMessage(ret, text)
        this.getUserList()
    })
}
//用户编辑
export function handleEdit (id) {
    this.props.history.push(`/admin/adduser/?id=${id}`);
}
//停用
export function userOff (id) {
    let url = `/ng-lingxi/api/user/freeze/${id}`;
    jrFetchGet(url).then((ret) => {
        console.log(ret)
        ret.code === 0 ? message.success('停用成功') : message.success('删除失败')
    })
}
//启用
export function userOn (id)  {
    let url = `/ng-lingxi/api/user/activate//${id}`;
    jrFetchGet(url).then((ret) => {
        console.log(ret)
        ret.code === 0 ? message.success('启用成功') : message.success('启用失败')
    })
}
//重置密码
export function userReset (id) {
    let url = `/ng-lingxi/api/user/reset/password/${id}`;
    jrFetchGet(url).then((ret) => {

        ret.code === 0 ? message.success('重置成功') : message.success('重置失败')
    })
}