import axios from 'axios'
import { deletePostsAction, fetchPostsAction } from './actions'

const postsUrl = process.env.REACT_APP_POSTS_URL

export const fetchPosts = () => {
  return async (dispatch) => {
    const accessToken = localStorage.getItem('access-token'),
      client = localStorage.getItem('client'),
      uid = localStorage.getItem('uid')

    try {
      const response = await axios.get(postsUrl, {
        headers: {
          'access-token': accessToken,
          client: client,
          uid: uid,
        },
      })
      const posts = response.data

      const postsList = []

      posts.forEach((post) => {
        postsList.push(post)
      })

      dispatch(fetchPostsAction(postsList))
    } catch (error) {
      console.error(' Error Fetch Posts', error)
    }
  }
}

export const deletePost = (id) => {
  return async (dispatch, getState) => {
    const accessToken = localStorage.getItem('access-token'),
      client = localStorage.getItem('client'),
      uid = localStorage.getItem('uid')

    const postIdUrl = postsUrl + String(id)

    try {
      await axios
        .delete(postIdUrl, {
          headers: {
            'access-token': accessToken,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          const prevPosts = getState().posts.list
          const nextPosts = prevPosts.filter((post) => post.id !== id)
          dispatch(deletePostsAction(nextPosts))
        })
    } catch (error) {
      console.error(' Error Delete Post', error)
      alert('投薬記録の削除に失敗しました')
    }
  }
}

export const createPost = (ingestionAmount, comment, medicineName, medicineImage) => {
  return async (dispatch) => {
    if (ingestionAmount === '') {
      alert('服薬量を入力してください')
      return false
    }

    try {
      // FormDataオブジェクトに変換
      const formData = new FormData()
      formData.append('post[ingestion_amount]', ingestionAmount)
      formData.append('post[comment]', comment)
      formData.append('post[medicine_name]', medicineName)
      formData.append('post[medicine_image]', medicineImage)

      const accessToken = localStorage.getItem('access-token'),
        client = localStorage.getItem('client'),
        uid = localStorage.getItem('uid')

      // FormDataオブジェクトとして送信
      await axios.post(postsUrl, formData, {
        headers: {
          'access-token': accessToken,
          client: client,
          uid: uid,
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      console.error(' Error Register Post', error)
      alert('投薬記録の投稿に失敗しました')
    }
  }
}

export const updatePost = (id, ingestionAmount, comment, medicineName, medicineImage) => {
  return async (dispatch) => {
    if (ingestionAmount === '') {
      alert('服薬量を入力してください')
      return false
    }

    try {
      // FormDataオブジェクトに変換
      const formData = new FormData()
      formData.append('post[ingestion_amount]', ingestionAmount)
      formData.append('post[comment]', comment)
      formData.append('post[medicine_name]', medicineName)
      formData.append('post[medicine_image]', medicineImage)

      const accessToken = localStorage.getItem('access-token'),
        client = localStorage.getItem('client'),
        uid = localStorage.getItem('uid')

      const postIdUrl = postsUrl + String(id)

      // FormDataオブジェクトとして送信
      await axios.put(postIdUrl, formData, {
        headers: {
          'access-token': accessToken,
          client: client,
          uid: uid,
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      console.error(' Error Update Post', error)
      alert('投薬記録の更新に失敗しました')
    }
  }
}
