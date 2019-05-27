<template>
  <div class="home-body" :style="{height:calcheight}">
    <div class="header clearfix">
      <div class="header-l fl_l"></div>
      <div class="header-r fl_l">
        <el-form
          :model="logForm"
          :rules="rules"
          ref="logForm"
          label-width="0px"
          label-position="left"
          class="demo-logForm"
          v-show="!alreadyLogin"
        >
          <el-form-item label prop="tel">
            <el-input
              type="text"
              v-model="logForm.tel"
              autocomplete="off"
              placeholder="请输入手机号码"
              class="log-tel-input"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="pass">
            <el-input
              type="password"
              v-model="logForm.pass"
              autocomplete="off"
              placeholder="输入密码"
              class="log-pass-input"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('logForm')" id="loginBtn">登录</el-button>
            <el-row class="link-box">
              <el-col :span="12" class="reg-link">
                <el-link
                  type="danger"
                  id="wantRegisterBtn"
                  :underline="false"
                  @click="wantRegister()"
                >注册账号</el-link>
              </el-col>
              <el-col :span="12" class="forget-link">
                <el-link
                  type="danger"
                  id="forgetPassBtn"
                  :underline="false"
                  @click="forgetPass()"
                >忘记密码</el-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div class="login-box" v-show="alreadyLogin">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <img :src="headSrc" alt v-show="userInfo.portrait||userInfo.photo">
              <img
                src="../assets/icon_user_portrait.png"
                alt
                v-show="!(userInfo.portrait||userInfo.photo)"
              >
              <span>Hi~{{userInfo.nickName?userInfo.nickName:userInfo.userName}}</span>
            </div>
            <div class="icon-btns" @click="goResume">
              <img src="../assets/myresume.png" alt style="cursor: pointer;">
            </div>
          </el-card>
          <el-button type="danger" class="send-list-btn" size="mini" @click="goSendList">
            求职进度
            <img src="../assets/roundrightarr.png" alt>
          </el-button>
        </div>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
import GLOBAL_CONFIG from "../constans/Global";
import ERROR_CONFIG from "../constans/Error";
import { JSEncrypt } from "jsencrypt";
import { login } from "../util/data";
import { IMAGE_GET_CONFIG } from "../constans/Urls";
export default {
  name: "Home",
  data() {
    var validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        if (!/^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(value.trim())) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.trim().length < 6 || value.trim().length > 18) {
          callback(new Error("密码长度为6~18位"));
        } else if (
          !/^[a-zA-Z0-9]+$/.test(value.trim()) ||
          !/^[a-zA-Z0-9]+$/.test(value.trim())
        ) {
          callback(new Error("密码不能含有特殊字符"));
        } else if (this.logForm.checkPass !== "") {
          this.$refs.logForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      calcheight: `${(window.innerHeight
        ? window.innerHeight
        : document.body.clientHeight) - 209}px`,
      logForm: {
        tel: "",
        pass: ""
      },
      rules: {
        tel: [{ validator: validateTel, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      },
      isLoading: true
    };
  },

  computed: {
    headSrc() {
      return `${IMAGE_GET_CONFIG}${
        this.userInfo.portrait ? this.userInfo.portrait : this.userInfo.photo
      }`;
    },
    userInfo: {
      get: function() {
        return this.$store.state.userInfo;
      },
      set: function(newValue) {
        this.$store.state.userInfo = newValue;
      }
    },
    alreadyLogin: {
      get: function() {
        return this.$store.state.alreadyLogin;
      },
      set: function(newValue) {
        this.$store.state.alreadyLogin = newValue;
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit("changeRegLoadingState");
          if (this.isLoading) {
            this.isLoading = false;
            const encrypt = new JSEncrypt(); //初始化字符串加密对象
            encrypt.setPublicKey(GLOBAL_CONFIG.publicKey); //设置公钥
            let password = encrypt.encrypt(this.logForm.pass);
            login(
              this.logForm.tel.trim(),
              password,
              "",
              res => {
                this.$store.commit("changeRegLoadingState");
                this.isLoading = true;
                console.log("===用户账号密码登录===" + JSON.stringify(res));
                if (res.SystemCode == 1) {
                  this.$message({
                    type: "success",
                    message: "登录成功"
                  });
                  //登录验证通过
                  // userInfo = res.data;
                  // loginSuccess(userInfo);
                  this.$store.dispatch("userLogin", res.data);
                } else if (res.SystemCode == 1008) {
                  this.$message({
                    type: "warning",
                    message: "该用户正在等待审核"
                  });
                  return;
                } else {
                  this.$message({
                    type: "warning",
                    message: ERROR_CONFIG[res.SystemCode]
                  });
                }
              },
              err => {
                this.$store.commit("changeRegLoadingState");
                this.isLoading = true;
                console.log(err);
                this.$message.error("服务器异常，请稍后重试");
              }
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    wantRegister() {
      this.$router.push("/reg");
      this.$store.commit("handleSelectIndex","/")
    },
    forgetPass() {
      this.$router.push("/forget");
      this.$store.commit("handleSelectIndex","/")
    },
    goSendList() {
      if (this.$store.state.newBaseInfo) {
        this.$alert(
          "亲爱的同学，欢迎来到大学生“进机关进企业进社区”实习专区，这里有你想要的实习机会，请先填写简历，选择实习岗位，开启你的职场初体验吧！",
          "提示",
          {
            confirmButtonText: "填写简历",
            callback: action => {
              this.$router.push("/AddResume");
              this.$store.commit("handleSelectIndex","/AddResume")
            }
          }
        );
      } else {
        this.$router.push("/JobSchedule");
        this.$store.commit("handleSelectIndex","/JobSchedule")
      }
    },
    goResume() {
      this.$router.push("/AddResume");
      this.$store.commit("handleSelectIndex","/AddResume")
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-body {
  background: #ededed url("../assets/bg.png") left bottom no-repeat;
  background-position: cover;
  padding-top: 18px;
}
.header {
  width: 1040px;
  margin: auto;
  background-color: white;
  margin-top: 14px;
}
.content {
  width: 1040px;
  margin: auto;
  background-color: white;
  margin-top: 13px;
}

.header-l {
  box-sizing: border-box;
  width: 64%;
  height: 397px;
  background: url("../assets/banner.png") left top no-repeat;
  background-size: cover;
}

.header-r {
  box-sizing: border-box;
  width: 36%;
}
.demo-logForm {
  margin: 108px 40px 0px;
}
#loginBtn {
  width: 100% !important;
  margin-top: 25px;
}

.link-box {
  line-height: 20px;
  margin-top: 14px;
}
.reg-link {
  text-align: right;
  padding-right: 25px;
  border-right: 1px solid #5c5c5b;
}
.forget-link {
  padding-left: 25px;
}

.login-box {
  margin: 40px 40px 0px;
}
.box-card img {
  vertical-align: middle;
  width: 45px;
  height: 45px;
  margin-right: 8px;
}
.icon-btns {
  text-align: center;
  padding-bottom: 40px;
}
.icon-btns > img {
  /* width: 90px; */
  width: 110px;
  height: auto;
}
.send-list-btn {
  width: 100%;
  margin-top: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.send-list-btn img {
  vertical-align: middle;
  width: 25px;
  height: 25px;
  margin-left: 10px;
}
</style>
