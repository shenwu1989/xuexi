import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import AdminItemManage from './../AdminItemManage/index';
class Index extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <AdminItemManage/>
                {/*<Link to={`/admin/itemdetails/?id=19`}>项目详情</Link>*/}
            </div>
        );
    }
}

export default Index;