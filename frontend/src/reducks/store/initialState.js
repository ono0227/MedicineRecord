import noprofile from "../../assets/img/no-profile.png"

const initialState = {
    users : {
        isSignedIn: false,
        uid: "",
        username: "",
        email: "",
        image: noprofile
    }

}

export default initialState;
