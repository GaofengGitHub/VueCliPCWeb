import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import myStore from '../util/store'
import router from '../router'
import {
  tokenExchange
} from '../util/data'
import * as Data from '../util/data'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    regLoadingState: false,
    count: 0,
    userInfo: {},
    alreadyLogin: false,
    tokenTimer: '',
    newBaseInfo: false,
    newBaseInfotest:true,
    activeIndex2:"/"
  },
  mutations: {
    changeRegLoadingState(state) {
      state.regLoadingState = !state.regLoadingState
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      myStore.set("userInfo", JSON.stringify(userInfo));
    },
    quitLogin(state) {
      state.userInfo = {};
      state.activeIndex2="/";
      myStore.remove("userInfo");
      router.push("/");
      state.alreadyLogin = false; 
      clearInterval(state.tokenTimer);
    },
    loging(state) {
      state.alreadyLogin = true;
    },
    couldPreviewResume(state){
      state.newBaseInfo=false;
    },
    handleSelectIndex(state,key){
      state.activeIndex2=key;
    }

  },
  actions: {
    startTokenTimer({
      commit,
      state
    }) {
      state.tokenTimer = setInterval(() => {
        tokenExchange(res => {
          console.log('===token置换（store）===' + JSON.stringify(res));
          if (res.SystemCode == 1) {
            state.userInfo.token = res.token;
            commit("setUserInfo", state.userInfo);
          } else {
            router.push("/");
            state.alreadyLogin = false;
            clearInterval(state.tokenTimer);
          }
        }, err => {
          console.err(JSON.stringify(err));
          router.push("/");
          state.alreadyLogin = false;
          clearInterval(state.tokenTimer);
        })
      }, 82800000)
    },
    exchangeAndRefreshTokenTimer({
      dispatch,
      state
    }) {
      clearInterval(state.tokenTimer);
      dispatch("startTokenTimer");
    },
    userLogin({
      commit,
      dispatch
    },userInfo) {
      commit("setUserInfo", userInfo);
      commit("loging");
      dispatch("testResume");
      dispatch("startTokenTimer");
    },
    testResume({
      state
    }) {
      Data.getMyResume(
        res => {
          console.log("===登陆后获取我的简历测试是否新简历===" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            res.data[0].resumeUserInfo
              ? (state.newBaseInfo = false)
              : (state.newBaseInfo = true);
          }
        },
        err => {
          console.log("登陆后获取我的简历测试是否新简历失败");
        }
      );

    },
  },
  modules: {
    cart,
    products
  }
})
