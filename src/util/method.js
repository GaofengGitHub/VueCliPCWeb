// import router from "../router"
import store from '../store/index'
// import myStore from '../util/store'
const method = {
  checkToken(err, errorCB) {
    if (err.response&&err.response.status == 599) {
        store.commit("quitLogin");
    } else {
      errorCB && errorCB(err);
    }
  }
}
export default method;
