import React from "react"
import { PrimaryButton } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../reducks/users/operations";
import { push } from "connected-react-router";
import { getEmail, getUserId, getUserImage, getUserName } from "../reducks/users/selectors";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')] : {
            margin: '0 auto 16px auto',
            height: 'auto',
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: 'o auto',
            height: 'auto',
            width: 400
        }
    }
}));

const UserDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const username = getUserName(selector),
          userimage = getUserImage(selector),
          email = getEmail(selector),
          userid = getUserId(selector);
 
    return (
        <div className="c-section-wrapin">
            {userid && (
                <div className="p-grid__row">
                    <img src={userimage} alt="ユーザ画像" />
                    <div className={classes.detail}>
                        <h3 className="u-text__headline">{username}</h3>
                        <div className="module-spacer--small"/>
                        <p>{email}</p>
                        <div className="module-spacer--medium"/>
                        <div className="center">
                          <PrimaryButton
                              label={"ユーザ情報を編集"}
                              onClick={() => dispatch(push('/users/edit'))}
                          />
                          <div className="module-spacer--medium"/>
                          <PrimaryButton
                              label={"退会する"}
                              onClick={() => dispatch(deleteUser())}
                          />
                        </div>
                    </div> 
                </div>
            )}
        </div>
    )
}

export default UserDetail
