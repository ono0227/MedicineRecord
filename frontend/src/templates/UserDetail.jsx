import React from "react"
import { PrimaryButton } from "../components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getEmail, getUserImage, getUserName } from "../reducks/users/selectors";

const UserDetail = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const username = getUserName(selector),
          userimage = getUserImage(selector),
          email = getEmail(selector);
 
    return (
        <div>
            <p>{username}</p>
            <img src={userimage} alt="ユーザ画像" />
            <p>{email}</p>
            <PrimaryButton
              label={"ユーザ情報を編集"}
              onClick={() => dispatch(push('/users/edit'))}
            />
        </div>
    )
}

export default UserDetail
