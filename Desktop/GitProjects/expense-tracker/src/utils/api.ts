import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:5000/api"
})


// export default axios.create({
// baseURL:"https://sk-budget-tracker-backend-a66d94409f7b.herokuapp.com/api"
// })