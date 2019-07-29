import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://react-viv-project.firebaseio.com'
})

// instance.defaults.headers.commom['Access-Control-Allow-Origin'] = '*'
// instance.defaults.headers.commom['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
// instance.defaults.headers.commom['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'

export default instance