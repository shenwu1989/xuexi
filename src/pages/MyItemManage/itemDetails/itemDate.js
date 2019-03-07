import React, { Component } from 'react';
import File from "./fileDetails/index";
import { Drawer } from "antd";
import { jrFetchGet } from '../../common';

class ItemDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    componentDidMount() {
       this.dataInfo()
    }

    render() {
        const { folder_map = {}, list = [] } = this.state.dataInfo || {};
        return (
            <div className={'itemDate'}>
                <ul>
                    <li><em>文件夹</em><em>文件数量</em></li>
                    {
                        Object.keys(folder_map).map((item, index) => {
                            let count,
                                obj = { folder: item, project: this.props.id };
                            list.map(i => {
                                if(i.folder == item )
                                count =  i.count;
                            })
                            return <li key={index}><a onClick={() => this.handleDrawer(obj)}>{folder_map[item]}</a><i>{count || 0}</i></li>
                        })
                    }
                </ul>
                <Drawer
                    title="Pitchbook文件夹"
                    placement="right"
                    width={600}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    destroyOnClose={true}
                >   
                    <File fn={this.handleDrawer} folder={this.state.folder}/>
                </Drawer>
            </div>
        );
    }
    //数据初始
    dataInfo =()=>{
        jrFetchGet(`/ng-lingxi/api/project/internal/doc/folder_list/${this.props.id}`).then(res => {
            this.setState({
                dataInfo: res.data
            })
        })
    }
    //弹窗显示设置传递props
    handleDrawer = (obj) => {
        if(obj === 'on') return this.dataInfo()
        this.setState({
            visible: !this.state.visible,
            folder:obj
        })
    }
}

export default ItemDate;