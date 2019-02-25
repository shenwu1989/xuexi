import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Admin from './admin';
import AccountManage from './pages/AccountManage/resetPassword';
import AdminItemManage from './pages/AdminItemManage';
import AdminUserManage from './pages/AdminUserManage';
import InvestWarehouse from './pages/InvestWarehouse';
import ItemWarehouse from './pages/ItemWarehouse';
import MyItemManage from './pages/MyItemManage';
import AddItem from './pages/AdminItemManage/additem';
import AddUser from './pages/AdminUserManage/addUser';
import ItemDetails from './pages/MyItemManage/itemDetails';
import IntentionItem from './pages/ItemWarehouse/intentionItem';
import AddIntentionItem from './pages/ItemWarehouse/addIntentionItem';

class myRouter extends Component {


    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/admin'} render={() =>
                            <Admin>
                                <Switch>
                                    <Route path={'/admin/adduser'} component={AddUser}/>
                                    <Route path={'/admin/additem'} component={AddItem}/>
                                    <Route path={'/admin/itemdetails'} component={ItemDetails}/>
                                    <Route path={'/admin/intentionItem'} component={IntentionItem}/>
                                    <Route path={'/admin/addintentionitem'} component={AddIntentionItem}/>
                                    <Route path={'/admin/adminusermanage'} component={AdminUserManage}/>
                                    <Route path={'/admin/adminitemmanage'} component={AdminItemManage}/>
                                    <Route path={'/admin/accountmanage'} component={AccountManage}/>
                                    <Route path={'/admin/investwarehouse'} component={InvestWarehouse}/>
                                    <Route path={'/admin/itemwarehouse'} component={ItemWarehouse}/>
                                    <Route path={'/admin/myitemmanage'} component={MyItemManage}/>
                                </Switch>
                            </Admin>
                        }/>
                        <Route path={'/'} component={Login}/>
                    </Switch>

                </App>
            </Router>
        );
    }
}

export default myRouter;