export const DELETE_POST = "DELETE_POST";
export const deletepostsAction = (posts) => {
    return {
        type: "DELETE_POST",
        payload: posts
    }
}

export const FETCH_POSTS = "FETCH_POSTS";
export const fetchpostsAction = (posts) => {
    return {
        type: "FETCH_MEDICINES",
        payload: posts
    }
}
