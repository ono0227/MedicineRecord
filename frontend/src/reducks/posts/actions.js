export const DELETE_POST = "DELETE_POST";
export const deletePostsAction = (posts) => {
    return {
        type: "DELETE_POST",
        payload: posts
    }
}

export const FETCH_POSTS = "FETCH_POSTS";
export const fetchPostsAction = (posts) => {
    return {
        type: "FETCH_POSTS",
        payload: posts
    }
}
