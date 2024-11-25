import { AnyAction } from "redux";
import { User, UserAction, UserState } from "../../types/user";


const defaultState: UserState = {
  data: { username: "", full_name: "", email: "", message: "", token: "" } as User,
  loading: false,
  error: "",
};
const userReducer = (state:UserState=defaultState
    ,action:UserAction):UserState=> {
        switch (action.type) {
            case "LOGIN_START":
              return { ...state, loading: true, error: "" };
            case "LOGIN_SUCCESS":
              return { ...state, loading: false, data: action.payload };
            case "LOGIN_ERROR":
              return { ...state, loading: false, error: "Login failed" };
            default:
              return state;
          }
    
}

export default userReducer;