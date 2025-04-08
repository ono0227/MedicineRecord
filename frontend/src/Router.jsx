import React from "react";
import { Routes, Route } from 'react-router-dom';
import { TopPage, TimeLine, SignUp, SignIn, UserDetail, UserEdit,
         ResetPassword, UpdatePassword,
         MedicinesIndex, MedicineDetail,MedicineEdit, MedicineCreate,
         PostDetail, PostEdit, PostCreate,
         BarGraph,
         Calendar
         } from "./templates";
import { InquiryForm, TermsOfService, PrivacyPolicy } from "./components/Footer";
import Auth from './Auth';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/password/reset" element={<ResetPassword />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/inquiryform" element={<InquiryForm />} />
            <Route path="/timeline" element={<Auth><TimeLine /></Auth>} />
            <Route path="/posts/:id" element={<Auth><PostDetail /></Auth>} />
            <Route path="/posts/edit/:id" element={<Auth><PostEdit /></Auth>} />
            <Route path="/posts/create" element={<Auth><PostCreate /></Auth>} />
            <Route path="/users/detail" element={<Auth><UserDetail /></Auth>} />
            <Route path="/users/edit" element={<Auth><UserEdit /></Auth>} />
            <Route path="/medicines/index" element={<Auth><MedicinesIndex /></Auth>} />
            <Route path="/medicines/:id" element={<Auth><MedicineDetail /></Auth>} />
            <Route path="/medicines/edit/:id" element={<Auth><MedicineEdit /></Auth>} />
            <Route path="/medicines/create" element={<Auth><MedicineCreate /></Auth>} />
            <Route path="/bargraph" element={<Auth><BarGraph /></Auth>} />
            <Route path="/calendar" element={<Auth><Calendar /></Auth>} />
        </Routes>
    )
}

export default Router;
