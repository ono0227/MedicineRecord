import React from "react";
import { Route, Switch } from "react-router";
import { TopPage, TimeLine, SignUp, SignIn, UserDetail, UserEdit, ResetPassword, UpdatePassword } from "./templates";
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path="(/)?" component={TopPage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/password/reset" component={ResetPassword} />
            <Route exact path="/password/update" component={UpdatePassword} />        
            <Auth>
                <Route exact path="/timeline" component={TimeLine} />
                <Route exact path="/users/detail" component={UserDetail} />
                <Route exact path="/users/edit" component={UserEdit} />
            </Auth>
        </Switch>
    )
}

export default Router;
