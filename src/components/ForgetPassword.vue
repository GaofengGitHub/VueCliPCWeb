<template>
  <div class="reg-body" style="height:700px;">
    <div class="reg-box clearfix">
      <div class="reg-box-l fl_l">
        <img src="../assets/icon22.png" alt>
      </div>
      <div class="reg-box-r fl_r">
        <h2>忘记密码</h2>
        <el-form
          :model="regForm"
          :rules="rules"
          ref="regForm"
          label-width="0px"
          label-position="left"
          class="demo-regForm"
        >
          <el-form-item label prop="tel">
            <el-input
              type="text"
              v-model="regForm.tel"
              autocomplete="off"
              placeholder="请填写手机号码"
              class="reg-tel-input"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="pass">
            <el-input
              type="password"
              v-model="regForm.pass"
              autocomplete="off"
              placeholder="请输入新的密码"
              class="reg-pass-input"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="checkPass">
            <el-input
              type="password"
              v-model="regForm.checkPass"
              autocomplete="off"
              placeholder="请再次输入新的密码"
              class="reg-check-input"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="valid" class="reg-val-input-box">
            <el-input v-model="regForm.valid" placeholder="验证码" class="reg-val-input"></el-input>
            <el-button
              round
              size="small"
              :type="validType"
              id="getValid"
              @click="getValid()"
              :disabled="validAble"
            >{{validText}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('regForm')" id="findBackBtn">找回密码</el-button>
            <el-link type="danger" id="wantLoginBtn" :underline="false" @click="wantLogin()">返回登录</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { sendCheckMsg,forgotPwd } from "../util/data";
import ERROR_CONFIG from "../constans/Error";
export default {
  name: "HelloWorld",
  data() {
    var checkValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error("请输入数字值"));
        // } else {
          callback();
        // }
      }, 1000);
    };
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
        } else if (this.regForm.checkPass !== "") {
          this.$refs.regForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value.trim().length < 6 || value.trim().length > 18) {
        callback(new Error("密码长度为6~18位"));
      } else if (
        !/^[a-zA-Z0-9]+$/.test(value.trim()) ||
        !/^[a-zA-Z0-9]+$/.test(value.trim())
      ) {
        callback(new Error("密码不能含有特殊字符"));
      } else if (value !== this.regForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      calcheight: `${(window.innerHeight
        ? window.innerHeight
        : document.body.clientHeight) - 191}px`,
      regForm: {
        tel: "",
        pass: "",
        checkPass: "",
        valid: ""
      },
      rules: {
        tel: [{ validator: validateTel, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        valid: [{ validator: checkValid, trigger: "blur" }]
      },
      validText: "获取验证码",
      initCountDown: 50,
      validType: "primary",
      validAble: false,
      isFinding: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit("changeRegLoadingState");
          if (this.isFinding) {
            this.isFinding = false;
            forgotPwd(
              this.regForm.valid,
              this.regForm.tel.trim(),
              this.regForm.pass.trim(),
              res => {
                this.$store.commit("changeRegLoadingState");
                this.isFinding = true;
                console.log('===找回密码===' + JSON.stringify(res));
                if (res.SystemCode == 1) {
                  //注册成功
                  this.$message({
                    type: "success",
                    message: "修改成功"
                  });
                  this.$router.push("/");
                } else if (res.SystemCode == 1003) {
                  //注册成功
                  this.$message({
                    type: "warning",
                    message: "用户不存在"
                  });
                } else if (res.SystemCode == 10005) {
                  //验证码过期
                  this.$message({
                    type: "warning",
                    message: "验证码过期"
                  });
                } else if (res.SystemCode == 10006) {
                  //手机号和验证码不匹配
                  this.$message({
                    type: "warning",
                    message: "验证码错误"
                  });
                } else {
                  this.$message({
                    type: "warning",
                    message: ERROR_CONFIG[res.SystemCode]
                  });
                }
              },
              err => {
                this.$store.commit("changeRegLoadingState");
                this.isFinding = true;
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
    wantLogin() {
      this.$router.push("/");
    },
    getValid() {
      this.$refs.regForm.validateField("tel", valid => {
        if (valid == "请输入手机号码") {
          return;
        } else {
          this.validType = "info";
          this.validAble = true;
          let timer = setInterval(() => {
            this.validText = `${this.initCountDown--} 秒`;
            if (this.initCountDown < 0) {
              this.validText = "获取验证码";
              this.validType = "primary";
              this.validAble = false;
              clearInterval(timer);
              this.initCountDown = 50;
            }
          }, 1000);
          sendCheckMsg(
            this.regForm.tel.trim(),
            "2",
            res => {
              console.log("===发送短信===" + JSON.stringify(res));
              if (res.SystemCode == 1) {
                //发送成功
                this.$message({
                  type: "success",
                  message: "发送成功!"
                });
              } else if (res.SystemCode == 10005) {
                //短信还在有效期内
              }
            },
            err => {
              // $.toast("服务器异常，请稍后重试");
              console.log(err);
              this.$message.error("服务器异常，请稍后重试");
            }
          );
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reg-body {
  background: #f2f2f2 url("../assets/bg.png") left bottom no-repeat;
  background-position: cover;
  position: relative;
}
.reg-box {
  position: absolute;
  width: 1040px;
  /* height: 500px; */
  background-color: white;
  border-radius: 20px;
  left: 50%;
  top: 20px;
  margin-left: -520px;
}
.reg-box-l {
  width: 46%;
  height: 604px;
  box-sizing: border-box;
  background: url("../assets/bg1.png") left top no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reg-box-l img {
  width: 80px;
  height: 80px;
}
.reg-box-r {
  width: 54%;
  box-sizing: border-box;
  padding: 56px 76px 0px;
}
.reg-box-r h2 {
  margin-bottom: 50px;
}
.reg-val-input-box {
  position: relative;
}
#getValid {
  position: absolute;
  right: 0;
  top: 2px;
  width: 92px;
}
#findBackBtn {
  width: 100%;
  margin-top: 60px;
}
#wantLoginBtn {
  width: 100%;
}
</style>
