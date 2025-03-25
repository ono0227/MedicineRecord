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
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#06D8F8",
    },
    toolBar: {
        margin: "0 auto",
        maxWidth: 1024,
        width: "100%",
    },
    iconButtons: {
        margin: "0 0 0 auto",
    }
});

const Header = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    const userimage = getUserImage(selector);
    const classes = useStyles();

    const handleLogoClick = () => {
        if(isSignedIn){
            dispatch(push('/timeline'))
        } else {
            dispatch(push('/'))
        }
    }

    return (
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.menuBar}>
              <Toolbar className={classes.toolBar}>
                  <img src={logo} alt="サイトロゴ" width="50px" 
                    onClick={() => dispatch(handleLogoClick)}/>
                  {!isSignedIn && (
                    <div className="p-grid__row">
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
                    </div>
                  )}
                  {isSignedIn && (
                    <div className={classes.iconButtons}>
                      <HeaderMenu userimage={userimage} />
                    </div>
                  )}
              </Toolbar>
          </AppBar>
        </div>
    )
}

export default Header
