const menuList = [
    {
        title: '项目管理',
        key: '/admin/adminitemmanage',
    },
    {
        title: '用户管理',
        key: '/admin/adminusermanage',
    },
    {
        title: '我的项目',
        key: '/admin/myitemmanage',
    },
    {
        title: '项目公司库',
        key: '/admin/itemwarehouse'
    },
    {
        title: '投资机构库',
        key: '/admin/investwarehouse'
    },
    {
        title: '账户管理',
        key: '/admin',
        children: [
            {
                title: '密码修改',
                key: '/admin/accountmanage'
            }
        ]
    }
]

export default menuList;