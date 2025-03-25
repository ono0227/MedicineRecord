import React, { useState, useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch } from "react-redux";
import { signOut } from "../../reducks/users/operations";
import { push } from "connected-react-router";

const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    
    const [open, setOpen] = useState(false);
    const handleMenuToggle = useCallback((event) => {
        if(event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setOpen(!open)
    }, [open]);

    return (
        <div>
            <IconButton onClick={handleMenuToggle}>
                <img src={props.userimage} alt="ユーザ画像" width="50px" height="40px"/>
            </IconButton>
            <Menu open={open} onClose={handleMenuToggle}>
                <MenuItem button onClick={() => dispatch(push('/users/detail'))}>ユーザ設定 </MenuItem>
                <MenuItem button onClick={() => dispatch(signOut())}>サインアウト</MenuItem>
            </Menu>
        </div>
    )
}

export default HeaderMenu;
