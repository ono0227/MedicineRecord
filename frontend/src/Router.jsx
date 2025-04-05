import React from "react";
import { Route, Switch } from 'react-router';
import { TopPage, TimeLine, SignUp, SignIn, UserDetail, UserEdit,
         ResetPassword, UpdatePassword,
         MedicinesIndex, MedicineDetail,MedicineEdit, MedicineCreate,
         PostDetail, PostEdit, PostCreate
         } from "./templates";
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
                <Route exact path="/posts/:id" component={PostDetail} />
                <Route exact path="/posts/edit/:id" component={PostEdit} />
                <Route exact path="/posts/create" component={PostCreate} />
                <Route exact path="/users/detail" component={UserDetail} />
                <Route exact path="/users/edit" component={UserEdit} />
                <Route exact path="/medicines/index" component={MedicinesIndex} />
                <Route exact path="/medicines/:id" component={MedicineDetail} />
                <Route exact path="/medicines/edit/:id" component={MedicineEdit} />
                <Route exact path="/medicines/create" component={MedicineCreate} />
            </Auth>
        </Switch>
    )
}

export default Router;
