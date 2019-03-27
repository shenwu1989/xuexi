
// 把每个模块的单独设定的reducer函数最后合并成为总的reducer
//为了保证合并reducer过程中，每个模块管理的状态信息不会相互冲突，redux在合并的时候把容器的状态进行分开管理

import user from './user';
import { combineReducers } from 'redux';

let reducer = combineReducers({
    user
})
export default reducer;