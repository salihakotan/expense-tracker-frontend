import { AnyAction } from "redux";
import { User, UserAction, UserState } from "../../types/user";


const defaultState: UserState = {
  data: {} as User,
  loading: false,
  error: "",
  loginError:""
};
const userReducer = (state:UserState=defaultState
    ,action:UserAction):UserState=> {
        switch (action.type) {
            case "LOGIN_START":
              case "IS_LOGGED_IN_START":
              return { ...state, loading: true, error: "",loginError:"" };
            case "LOGIN_SUCCESS":
              case "IS_LOGGED_IN_SUCCESS":
              return { ...state, loading: false, data: action.payload , error:"", loginError:""};
            case "LOGIN_ERROR":
              return { ...state, loading: false,loginError:"", error: "Login failed" };
              case "IS_LOGGED_IN_ERROR":
                return { ...state, loading: false,error:"", loginError: "Token is missing or invalid" };
              case "LOGOUT":
                return {...state,data:{} as User,}
                default:
              return state;
          }
    
}

export default userReducer;