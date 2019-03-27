
import * as TYPES from '../action-types';

export default function user(state = {}, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.USER_ITEM_ALL:
            state.userList = action.userList
            break;
        case TYPES.USER_TABLE_LIST:
            state.UserTableList = action.UserTableList
            break;
        case TYPES.USER_NOT_ADMIN:
            break;
        default:
            break;
    }
    return state;
}