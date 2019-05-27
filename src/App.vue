<template>
  <div
    id="app"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    v-if="isRouterAlive"
  >
    <div class="nav">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#e34949"
        text-color="#fff"
        active-text-color="#fff"
        :router="true"
      >
        <el-menu-item class="title-logo">宁聚青春</el-menu-item>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/AddResume">个人简历</el-menu-item>
        <el-menu-item index @click="goTestweb()">职业性格测评</el-menu-item>
        <el-menu-item index="/joblist">实习岗位</el-menu-item>
        <el-menu-item index="/JobSchedule">求职进度</el-menu-item>
        <el-menu-item index="/Collection">收藏</el-menu-item>
        <el-row class="fl_r clearfix">
          <el-submenu index="7" class="fl_l" v-show="userInfo.userId">
            <template slot="title">欢迎回来~{{userInfo.nickName?userInfo.nickName:userInfo.userName}}</template>
            <el-menu-item index="7-1" @click="quitLogin()">退出登录</el-menu-item>
          </el-submenu>
          <el-button
            round
            size="medium"
            @click="toLogin()"
            class="fl_l"
            style="margin-top:9px"
            v-show="!userInfo.userId"
          >登录</el-button>
          <el-button
            round
            size="medium"
            @click="toRegister()"
            class="fl_l"
            style="margin-top:9px"
            v-show="!userInfo.userId"
          >注册</el-button>
          <!-- <el-link :underline="false" class="telphone fl_l">025-83630969</el-link> -->
        </el-row>
      </el-menu>
    </div>
    <div class="body">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="footer">
      <p>
        <img src="./assets/logo.png" alt width="30px" height="30px">主办单位：中国共产主义青年团南京市委员会&nbsp;&nbsp;&nbsp;&nbsp;支持单位：江苏瑞银文化传媒有限公司&nbsp;&nbsp;&nbsp;&nbsp;苏ICP备07026463号-1
      </p>
      <p>南京市建邺区江东中路259号新城大厦15楼 （210019） 025-83630969</p>
    </div>
    <!-- <img src="./assets/logo.png" alt width="100px" height="100px"> -->
  </div>
</template>

<script>
import myStore from "./util/store";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  computed: {
    loading: {
      get: function() {
        return this.$store.state.regLoadingState;
      },
      set: function(newValue) {
        this.$store.state.regLoadingState = newValue;
      }
    },
    userInfo: {
      get: function() {
        return this.$store.state.userInfo;
      },
      set: function(newValue) {
        this.$store.state.userInfo = newValue;
      }
    },
    activeIndex2: {
      get: function() {
        return this.$store.state.activeIndex2;
      },
      set: function(newValue) {
        this.$store.state.activeIndex2 = newValue;
      }
    }
  },
  created() {
    let initUserInfo = this.getUserInfo();
    if (initUserInfo) {
      this.$store.dispatch("userLogin", initUserInfo);
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key) {
        this.activeIndex2 = key;
      }
    },
    toLogin() {
      this.activeIndex2 = "/";
      this.$router.push("/");
    },
    toRegister() {
      this.activeIndex2 = "/";
      this.$router.push("/reg");
    },
    goTestweb() {
      window.location.href = "http://hr.zhiding.com.cn/s/23/7347/index.html";
    },
    quitLogin() {
      this.activeIndex2 = "/";
      this.$store.commit("quitLogin");
    },
    getUserInfo() {
      return JSON.stringify(this.$store.state.userInfo) == "{}"
        ? myStore.get("userInfo")
          ? JSON.parse(myStore.get("userInfo"))
          : undefined
        : this.$store.state.userInfo;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  mounted() {
    // setInterval(function(){
    //   console.log("hahah")
    // },10000)
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.fl_r {
  float: right;
}
.fl_l {
  float: left;
}
.telphone {
  color: white !important;
  padding-left: 32px;
  background: url("./assets/telephone.png") left center no-repeat;
  background-size: 25px;
  margin-left: 10px;
}
.fl_r.el-row {
  outline: none;
}
.el-button:active {
  color: #e34949;
  border-color: #e34949;
  outline: 0;
}
.el-button:focus,
.el-button:hover {
  color: #e34949;
  border-color: #e34949;
  background-color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #e34949;
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #e34949;
}
.el-radio.is-bordered.is-checked {
  border-color: #67c23a;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #67c23a;
  background: #67c23a;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #67c23a;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #e34949;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #e34949;
}
.el-select .el-input__inner:focus {
  border-color: #e34949;
}
.el-textarea__inner:focus {
  border-color: #e34949;
}
.el-textarea__inner:focus {
  border-color: #e34949;
}
.demo-regForm .el-input__inner {
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-radius: 0;
  /* height: 45px;
  line-height: 45px; */
}

.reg-tel-input > input {
  padding-left: 50px;
  background: url("./assets/tel.png") left center no-repeat;
  background-size: 15px;
}
.reg-val-input > input {
  padding-left: 50px;
  background: url("./assets/check.png") left center no-repeat;
  background-size: 15px;
}
.reg-pass-input > input {
  padding-left: 50px;
  background: url("./assets/checkpass.png") left center no-repeat;
  background-size: 15px;
}
.reg-check-input > input {
  padding-left: 50px;
  background: url("./assets/pass.png") left center no-repeat;
  background-size: 15px;
}
.log-tel-input > input {
  padding-left: 40px;
  background: url("./assets/tel.png") 10px center no-repeat;
  background-size: 15px;
}
.log-pass-input > input {
  padding-left: 40px;
  background: url("./assets/checkpass.png") 10px center no-repeat;
  background-size: 15px;
}

.confirm-btn {
  width: 100%;
}

.joblist-form-inline .el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #f56c6c;
  outline: 0;
}
.joblist-form-inline > .el-form-item {
  margin-right: 0px;
}

.login-box .el-card__header {
  padding: 8px 0px;
  width: calc(100% - 75px);
  margin: auto;
}

.el-submenu__icon-arrow {
  right: 0px;
}
.el-submenu__title {
  height: 53px;
  line-height: 53px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5c5c5b;
  margin-top: 0px;
}
.title-logo {
  padding: 0px 0 0px 50px;
  background: url("./assets/nlogo.png") left center no-repeat;
  background-size: 42px;
  margin-right: 10px !important;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.nav {
  background-color: #e34949;
  line-height: 52px;
}
.nav .el-menu-demo {
  width: 1050px;
  margin: auto;
}
.nav .el-menu-item {
  height: 53px;
  line-height: 53px;
}
.nav .el-button {
  color: #e34949;
}

.footer {
  padding: 35px 0px;
  background-color: white;
  text-align: center;
  line-height: 34px;
}
.footer > p:first-child > img {
  vertical-align: middle;
  margin-right: 10px;
}
</style>
