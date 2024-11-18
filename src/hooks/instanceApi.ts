import axios from "axios"

const instance = axios.create({ baseURL: "http://206.42.23.7:59610/" })

export default instance