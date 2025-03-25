import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton, ImageArea } from "../components/UIkit";
import { updateUser } from "../reducks/users/operations";
import { useDispatch,useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getEmail, getUserImage, getUserName } from "../reducks/users/selectors";

const UserEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const currentusername = getUserName(selector),
          currentuserimage = getUserImage(selector),
          currentemail = getEmail(selector);
    
    const [nextusername, setNextUsername] = useState(currentusername),
          [nextemail, setNextEmail] = useState(currentemail),
          [nextuserimage, setNextUserImage] = useState(currentuserimage);
    
    
    const inputNextUsername = useCallback((event) => {
        setNextUsername(event.target.value)
    }, [setNextUsername]);
    
    const inputNextEmail = useCallback((event) => {
        setNextEmail(event.target.value)
    }, [setNextEmail]);

    return (
        <section>
           <h2 className="u-text_headline u-text-center">ユーザ情報の編集</h2>
           <div className="c-section-container">
               <ImageArea nextuserimage={nextuserimage} setNextUserImage={setNextUserImage} />
           
               <TextInput
                   fullWidth={true} label={"ユーザ名"} multiline={false} required={true}
                   rows={1} value={nextusername} type={"text"} onChange={inputNextUsername}
               />
              <TextInput
                  fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                  rows={1} value={nextemail} type={"email"} onChange={inputNextEmail}
              />
              <div className="module-spacer--small"/>
              <div className="center">
                  <PrimaryButton
                      label={"ユーザ情報を保存"}
                      onClick={() => dispatch(updateUser(nextuserimage, nextusername, nextemail))}
                  />
                  <p onClick={() => dispatch(push('/users/detail'))}>戻る</p>
              </div>
          </div>
        </section>
    )
}

export default UserEdit;
