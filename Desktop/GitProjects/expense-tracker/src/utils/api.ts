import axios from "axios";


export default () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://sk-budget-tracker-backend-a66d94409f7b.herokuapp.com/api",
        headers: {
            Authorization: token
        }
    })
}



// export default axios.create({
// baseURL:"https://sk-budget-tracker-backend-a66d94409f7b.herokuapp.com/api"
// })