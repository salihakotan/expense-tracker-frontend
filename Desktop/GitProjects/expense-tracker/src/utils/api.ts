import axios from "axios";

const token = localStorage.getItem("token");
export default axios.create({
    baseURL:"http://localhost:5000/api",
    headers:{
        Authorization:token
    }
})


// export default axios.create({
// baseURL:"https://sk-budget-tracker-backend-a66d94409f7b.herokuapp.com/api"
// })