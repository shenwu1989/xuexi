//每个板块单独的action-creator：就是把dispatch派发时候需要传递的action对象进一步统一封装处理
import * as TYPES from '../action-types';
import { userItemAll, userTableList } from '../../api/request';
const user = {
    userItemAll() {
        return async dispatch => {
            dispatch({
                type: TYPES.USER_ITEM_ALL,
                userList: await userItemAll()
            })
        }
    },
    userTableList() {
        return async dispatch => {
            dispatch({
                type: TYPES.USER_TABLE_LIST,
                UserTableList: await userTableList()
            })
        }
    }
}
export default user;