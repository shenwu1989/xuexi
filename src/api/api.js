/*项目管理API*/
//GET
export const get_item_table_list = `/ng-lingxi/api/project/internal/list`;//项目管理首页表格列表数据
export const get_item_seek = `/ng-lingxi/api/project/internal/list`;//项目管理首页搜索
export const get_item_additem_init = '/ng-lingxi/api/project/internal/view/create';//项目管理新建项目初始数据
// export const get_item_edititem_init = `/ng-lingxi/api/project/internal/view/edit/${id}`;//项目管理编辑项目初始数据
//POST
export const get_item_additem = `/ng-lingxi/api/project/internal/create`;//项目管理新建项目提交数据
export const get_item_edititem = `/ng-lingxi//api/project/internal/edit`;//项目管理编辑项目提交数据
/*项目详情API*/
//GET
// export const get_item_details_info = `/ng-lingxi/api/project/internal/view/sketch/${id}`;//项目
//POST 
/*用户管理API*/
//GET
export const get_user_table_list = '/ng-lingxi/api/user/list';//获取用户列表
// export const get_user_delete = `/ng-lingxi/api/user/delete/${id}`;//删除用户
// export const get_user_freeze = `/ng-lingxi/api/user/freeze/${id}`;//停用用户
// export const get_user_activate = `/ng-lingxi/api/user/activate/${id}`;//启用用户
// export const get_user_password =  `/ng-lingxi/api/user/reset/password/${id}`;//重置用户密码
export const get_user_all = `/ng-lingxi/api/project/internal/all`;//用户首页搜索框获取已有用户目录
export const get_user_seek = `/ng-lingxi/api/user/list`;//用户搜索
export const get_adduser_init = `/ng-lingxi/api/project/internal/all`;//新建用户初始数据
// export const get_edituser_init = `/ng-lingxi/api/user/view/${id}`;//编辑用户初始数据
//POST
export const post_user = `/ng-lingxi/api/user/edit`;//新建/编辑用户提交数据

/*密码修改API*/
//POST
export const post_password_edit = `/ng-lingxi/api/user/update/password`;//修改密码

/*退出登录API */
//POST
export const post_exit = `/ng-lingxi/api/user/logout`;//用户退出登录

/*登录API */
//POST
export const post_login = `/ng-lingxi/api/user/login`;//用户登录

/*项目公司库API */
//GET
export const get_itembank_table =`/ng-lingxi/api/project/external/list`;//项目公司库表格数据
export const get_itembank_seek = `/ng-lingxi/api/project/external/list`;//项目公司库搜索
// export const get_itembank_details =`/ng-lingxi/api/project/external/view/sketch/${id}`;//外部项目详情数据
// export const get_itembank_details_deltet = `/ng-lingxi/api/project/external/delete/${id}`;//外部项目删除
// export const get_itembank_edit_init =  `/ng-lingxi/api/project/external/view/edit/${id}`;//外部项目编辑初始信息
export const get_itembank_add_init = `/ng-lingxi/api/project/external/view/create`;//外部项目新建初始信息
//POST
export const post_itembank_edit =`/ng-lingxi/api/project/external/edit`;//编辑项目
export const post_itembank_add =`/ng-lingxi/api/project/external/create`;//新建项目