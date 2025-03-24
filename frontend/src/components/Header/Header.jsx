import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { getIsSignedIn, getUserImage } from "../../reducks/users/selectors";
import {push} from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import HeaderMenu from "./HeaderMenu";
import { PrimaryButton } from "../UIkit";
import { guestSignIn } from "../../reducks/users/operations";
import logo from "../../assets/img/logo.jpg";

const Header = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    const userimage = getUserImage(selector);

    const handleLogoClick = () => {
        if(isSignedIn){
            dispatch(push('/timeline'))
        } else {
            dispatch(push('/'))
        }
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <img src={logo} alt="サイトロゴ" width="128px" 
                    onClick={() => dispatch(handleLogoClick)}/>
                {!isSignedIn && (
                    <PrimaryButton
                        label={"新規登録"}
                        onClick={() => dispatch(push('/signup'))}
                    />,
                    <PrimaryButton
                        label={"ゲストログイン"}
                        onClick={() => dispatch((guestSignIn()))}
                    />,
                    <PrimaryButton
                        label={"ログイン"}
                        onClick={() => dispatch(push('/signin'))}
                    />
                )}
                {isSignedIn && (
                    <HeaderMenu userimage={userimage} />
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header
