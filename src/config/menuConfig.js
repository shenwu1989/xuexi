const menuList = [
    {
        title: '项目管理',
        icon:'solution',
        key: '1',
        url:'/admin/adminitemmanage'
        // children:[
        //     {
        //         key: '/admin/addintentionitem/additem',  
        //     }
        // ]
    },
    {
        title: '用户管理',
        icon:'team',
        key: '2',
        url:'/admin/adminusermanage',
       
    },
    {
        title: '我的项目',
        icon:'solution',
        url:'/admin/myitemmanage',
        key: '1'
    },
    {
        title: '项目公司库',
        icon:"profile",
        url:'/admin/itemwarehouse',
        key: '4'
    },
    {
        title: '投资机构库',
        icon:"profile",
        url:'/admin/investwarehouse',
        key: '5'
    },
    {
        title: '密码修改',
        icon:'setting',
        key: '6',
        url:'/admin/accountmanage',
    }
]

export default menuList;