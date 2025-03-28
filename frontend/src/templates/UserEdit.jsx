import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton, UserImageArea } from "../components/UIkit";
import { updateUser } from "../reducks/users/operations";
import { useDispatch,useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getEmail, getUserImage, getUserName } from "../reducks/users/selectors";
import guestuserimage from "../assets/img/guestuserimage.png";

const UserEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const prevusername = getUserName(selector),
          prevuserimage = getUserImage(selector),
          prevemail = getEmail(selector);
    
    const [username, setUsername] = useState(prevusername),
          [email, setEmail] = useState(prevemail),
          [userimage, setUserImage] = useState(prevuserimage);
    
    
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    }, [setUsername]);
    
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    const isGuestUser = useCallback(() => {
        return prevusername === "ゲストユーザ";
    }, [prevusername]);

    return (
        <section>
           <h2 className="u-text_headline u-text-center">ユーザ情報の編集</h2>
           <div className="c-section-container">
                { isGuestUser()? (
                    <UserImageArea userimage={guestuserimage} setUserImage={setUserImage} />
                ) : (
                    <UserImageArea userimage={userimage} setUserImage={setUserImage} />                    
                )}
               <TextInput
                   fullWidth={true} label={"ユーザ名"} multiline={false} required={true}
                   rows={1} value={username} type={"text"} onChange={inputUsername}
               />
              <TextInput
                  fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                  rows={1} value={email} type={"email"} onChange={inputEmail}
              />
              <div className="module-spacer--small"/>
              <div className="center">
                  <PrimaryButton
                      label={"ユーザ情報を保存"}
                      onClick={() => dispatch(updateUser(userimage, username, email))}
                  />
                  <p onClick={() => dispatch(push('/users/detail'))}>戻る</p>
              </div>
          </div>
        </section>
    )
}

export default UserEdit;
