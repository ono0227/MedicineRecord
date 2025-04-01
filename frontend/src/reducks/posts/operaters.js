import { deletepostsAction, fetchpostsAction } from "./actions";
import { push } from "connected-react-router"
import axios from 'axios';

export const fetchPosts = () => {
    return async(dispatch) => {
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');

        try {
            const response = await axios.get(postIndexUrl, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid
                }
            });
            const postsList = response.data;
            dispatch(fetchpostsAction(postsList));
        } catch(error) {
                console.error(' Error Fetch Posts', error);
                alert('服薬記録の一括取得に失敗しました')
        }
    }
}

export const deletePost = (id) => {
    return async(dispatch, getState) => {
        const  accessToken = localStorage.getItem('access-token'),
               client = localStorage.getItem('client'),
               uid = localStorage.getItem('uid');

        try {
            await axios.delete(postIndexUrl, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid
                }
            })
            .then(() => {
            const prevPosts = getState().posts.list;
            const nextPosts = prevPosts.filter(post => post.id !== id)
            dispatch(deletepostsAction(nextPosts))
            dispatch(push('/timeline'))
            })
        } catch(error) {
                console.error(' Error Delete Post', error);
                alert('投薬記録の削除に失敗しました')
        };
    }
}

export const createPost = (ingestionAmount, comment, medicineName,
    medicineImage) => {
    return async(dispatch) => {
        if(ingestionAmount === "") {
            alert("必要項目が未入力です");
            return false
        }
        if(medicineName === "") {
            alert("薬の名前が未設定です");
            return false
        }
        if(!medicineImage || !(medicineImage instanceof File)){
            alert("薬の画像が未設定です");
            return false
        }

        try {
            const formData = new FormData();
            formData.append("ingestion_amount", ingestionAmount);
            formData.append("comment", comment);
            formData.append("medicine_name", medicineName);
            formData.append("medicine_image", medicineImage);

            const  accessToken = localStorage.getItem('access-token'),
                   client = localStorage.getItem('client'),
                   uid = localStorage.getItem('uid');

            await axios.get(postIndexUrl,formData, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid,
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(push('/timeline'))
        } catch(error) {
            console.error(' Error Register Post', error);
            alert('投薬記録の投稿に失敗しました')
        }
    }
}

export const updatePost = (ingestionAmount, comment, medicineName,
    medicineImage) => {
    return async(dispatch) => {
        if(ingestionAmount === "") {
            alert("必要項目が未入力です");
            return false
        }
        if(medicineName === "") {
            alert("薬の名前が未設定です");
            return false
        }
        if(!medicineImage || !(medicineImage instanceof File)){
            alert("薬の画像が未設定です");
            return false
        }

        try {
            const formData = new FormData();
            formData.append("ingestion_amount", ingestionAmount);
            formData.append("comment", comment);
            formData.append("medicine_name", medicineName);
            formData.append("medicine_image", medicineImage);

            const  accessToken = localStorage.getItem('access-token'),
                   client = localStorage.getItem('client'),
                   uid = localStorage.getItem('uid');

            await axios.get(`${postUpdateUrl}/${postId}`,formData, {
                headers: {
                    'access-token': accessToken,
                    'client': client,
                    'uid': uid,
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(push('/post/detail'))
        } catch(error) {
            console.error(' Error Update Post', error);
            alert('投薬記録の更新に失敗しました')
        }
    }
}
