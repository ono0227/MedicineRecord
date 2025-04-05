const initialState = {
    users: {
        isSignedIn: false,
        uid: "",
        username: "",
        email: "",
        userimage: ""
    },
    posts: {
        list: []
    },
    medicines: {
        list: [],
        names: {}
    },
    categories: {
        list: []
    }
}

export default initialState;
