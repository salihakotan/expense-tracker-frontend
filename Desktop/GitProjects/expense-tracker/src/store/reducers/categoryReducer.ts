import { error } from "console";
import { CategoryState, CategoryTypeAction } from "../../types/category";
import { data } from "react-router-dom";

const defaultState:CategoryState =  {
    data:[],
    loading:false,
    error:""
}

const categoryReducer = (state:CategoryState= defaultState,action:CategoryTypeAction) => {
    switch(action.type) {
        case "GET_CATEGORIES_START":
            return {...state,loading:true,error:""};
            case "GET_CATEGORIES_SUCCESS":
                return {...state,loading:false,error:"",data:action.payload};
        case "GET_CATEGORIES_ERROR":
            return {...state,loading:false,error:"Error fetching categories!"};

            case "ADD_CATEGORIES_START":
                return {...state,loading:true,error:""};
                case "ADD_CATEGORIES_SUCCESS":
                    return {...state,loading:false,error:"",data:[action.payload,...state.data]};
            case "ADD_CATEGORIES_ERROR":
                return {...state,loading:false,error:"Error adding categories!"};

                case "UPDATE_CATEGORIES_START":
                    return {...state,loading:true,error:""};
                    case "UPDATE_CATEGORIES_SUCCESS":
                        return {...state,loading:false,error:"",data:state.data.map(category => category.id === action.payload.id ? action.payload : category)};
                case "UPDATE_CATEGORIES_ERROR":
                    return {...state,loading:false,error:"Error updating category!"};
          
                    case "DELETE_CATEGORIES_START":
                        return {...state,loading:true,error:""};
                        case "DELETE_CATEGORIES_SUCCESS":
                            return {...state,loading:false,error:"",data:state.data.filter(category => category.id !== action.payload)};
                    case "DELETE_CATEGORIES_ERROR":
                        return {...state,loading:false,error:"Error deleting category!"};
              
      
            default:
                return state;
    }
}

export default categoryReducer;