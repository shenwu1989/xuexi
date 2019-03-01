import React, {Component} from 'react';
import File from "./fileDetails/index";
import {Drawer} from "antd";

class ItemDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        return (
            <div className={'itemDate'}>
                <ul>
                    <li><em>文件夹</em><em>文件数量</em></li>
                    <li><a onClick={this.handleDrawer}>pitchbook</a><i>3</i></li>
                    <li><a>kickoff</a><i>3</i></li>
                    <li><a>BP&简版资料</a><i>3</i></li>
                    <li><a>datapack</a><i>3</i></li>
                    <li><a>FM</a><i>3</i></li>
                    <li><a>cap</a><i>3</i></li>
                    <li><a>交易文件及协议</a><i>3</i></li>
                    <li><a>会议memo</a><i>3</i></li>
                    <li><a>其他补充资料</a><i>3</i></li>
                </ul>
                <Drawer
                    title="Pitchbook文件夹"
                    placement="right"
                    width={600}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <File fn={this.handleDrawer}/>
                </Drawer>
            </div>
        );
    }

    handleDrawer = () => {
        this.setState({
            visible:!this.state.visible
        })
    }
}

export default ItemDate;