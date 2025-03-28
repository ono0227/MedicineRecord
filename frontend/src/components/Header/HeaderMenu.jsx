import React, { useState, useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch } from "react-redux";
import { signOut } from "../../reducks/users/operations";
import { push } from "connected-react-router";
import guestuserimage from "../../assets/img/guestuserimage.png";

const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuToggle = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const isGuestUser = useCallback(() => {
        return props.username === "ゲストユーザ";
    }, [props.username]);

    return (
        <div>
            <IconButton onClick={handleMenuToggle}>
                {isGuestUser() ? ( 
                    <img src={guestuserimage} alt="ゲスト" width="50px" height="40px"/>
                ) : ( 
                    <img src={props.userimage} alt="ユーザ" width="50px" height="40px"/>
                )}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem button onClick={() => { dispatch(push('/users/detail')); handleClose(); }}>ユーザ設定</MenuItem>
                <MenuItem button onClick={() => { dispatch(signOut()); handleClose(); }}>サインアウト</MenuItem>
            </Menu>
        </div>
    )
}

export default HeaderMenu;
