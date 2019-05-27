<template>
  <div class="reg-body" style="height:700px;">
    <div class="reg-box clearfix">
      <div class="reg-box-l fl_l">
        <img src="../assets/icon22.png" alt>
      </div>
      <div class="reg-box-r fl_r">
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
              placeholder="请输入手机号码"
              class="reg-tel-input"
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
          <el-form-item label prop="pass">
            <el-input
              type="password"
              v-model="regForm.pass"
              autocomplete="off"
              placeholder="输入密码"
              class="reg-pass-input"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="checkPass">
            <el-input
              type="password"
              v-model="regForm.checkPass"
              autocomplete="off"
              placeholder="再次输入密码"
              class="reg-check-input"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('regForm')" id="registerBtn">注册</el-button>
            <el-link type="danger" id="wantLoginBtn" :underline="false" @click="wantLogin()">我要登录</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { sendCheckMsg, userRegisterNjqc } from "../util/data";
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
      isRegistering: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$alert(
            `<div style="line-height:1.2em;font-size:12px;margin-bottom:18px;">
              <p style="text-indent:2em;">大学生朋友，你好，欢迎你关注南京市“大学生进机关进企业进社区岗位实习”计划，请大家注意以下事项：</p>
              <p style="text-indent:2em;">一、参与对象：以本科二、三年级、四年级学生为主，研究生为辅。</p>
              <p style="text-indent:2em;">二、实习周期：以体验式实习为主，分5-6月份、7-8月份两个批次，每个批次以1个月为期，实习起始时间由学生和用人单位双方沟通确定。</p>
              <p style="text-indent:2em;">三、报名流程：进入“大学生岗位实习”板块——填写个人简历——浏览实习岗位——投递实习岗位——收到线下通知——达成实习意向——签订三方协议——走上实习岗位</p>
              <p>（备注：1、实习岗位投递之后不可修改，浏览岗位时请先收藏后投递；2、如未被用人单位录用，报名信息将被退回，退回之后可重新选择其他岗位。）</p>
              <p style="text-indent:2em;">四、实习保障：实习保险、实习导师、实习补贴和工作日午餐。（备注：不提供住宿）</p>
              <p style="text-indent:2em;">五、联系方式</p>
              <p style="text-indent:2em;">南京团市委徐老师，联系电话：83630973，电子邮箱：11473498@qq.com</p>
              <p style="float: right;">大学生“三进实习”工作组</p>
            </div>
				`,
            "报名须知",
            {
              dangerouslyUseHTMLString: true,
              confirmButtonClass: "confirm-btn"
            }
          ).then(() => {
            this.$store.commit("changeRegLoadingState");
            if (this.isRegistering) {
              this.isRegistering = false;
              userRegisterNjqc(
                this.regForm.tel.trim(),
                this.regForm.valid,
                this.regForm.pass.trim(),
                res => {
                  this.$store.commit("changeRegLoadingState");
                  this.isRegistering = true;
                  console.log("===用户注册===" + JSON.stringify(res));
                  if (res.SystemCode == 1) {
                    //注册成功
                    this.$message({
                      type: "success",
                      message: "注册成功，请登录"
                    });
                    this.$router.push("/");
                  } else if (res.SystemCode == 10007) {
                    //注册成功
                    this.$message({
                      type: "warning",
                      message: "用户名重复"
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
                  this.isRegistering = true;
                  console.log(err);
                  this.$message.error("服务器异常，请稍后重试");
                }
              );
            }
          });
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
            "1",
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
  padding: 116px 76px 74px;
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
#registerBtn {
  width: 100%;
  margin-top: 60px;
}
#wantLoginBtn {
  width: 100%;
}
</style>
