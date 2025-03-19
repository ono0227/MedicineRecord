import { signInAction, signOutAction } from "./actions";
import { push } from 'connected-react-router';
import axios from 'axios';
import { usersIndex } from './index';
import { dispatchUserData } from '../reducks/reducers/user';

export const signUp = async(email, password, username, comfirmPassword) => {
  await axios
  .then(response => {
    console.log(response);

    // 取得したresponseより、アクセストークンなどを変数に代入
    const accessToken = response.headers['access-token'];
    const client = response.headers['client'];
    const uid = response.headers['uid'];

    // 認証情報をlocalStorageに保存する
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('client', client);
    localStorage.setItem('uid', uid);

    // ユーザーデータをReduxストアにディスパッチ
    dispatch(dispatchUserData(response.data.data));
  })
  .catch(error => {
    console.log(error);
  });
};

export const signIn = (email, password) => {
    return async(dispatch) => {
        if (email === "" || password === "") {
            alert("必須項目が未入力です");
            return false;
        }
        
        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user

            if(user){
                const uid = user.uid

                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const data = snapshot.data()

                    dispatch(signInAction({
                        isSignIn: true,
                        role: data.role,
                        uid: uid,
                        username: data.username
                    }))

                    dispatch(push('/'))
                })
            }
        })
    };
};

export const resetPassword = (email) => {
    return async (dispatch) => {
        if(email === ""){
            alert("必須項目が未入力です");
            return false;
        } else {
            auth.sendPasswordResetEmail(email)
            .then(() => {
                alert("入力されたメールアドレスにパスワードリセット用のメールをお送りしました。");
                dispatch(push('/signin'))
            }).catch(() => {
                alert('パスワードリセットに失敗しました')
            })
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut().then(() => {
                dispatch(signOutAction());
                dispatch(push('/signin'))
            })
    }
}
