<template>
  <div class="joblist-body">
    <div class="bodys">
      <div class="bodycontainer">
        <el-form :model="resumeForm" :rules="rules" ref="resumeForm" label-width="80px">
          <div style="background: #fff">
            <div class="leftname">
              <div class="leftimg">
                <img src="../assets/biao.png" alt>
                <span class="lefttext">个人简历</span>
              </div>
            </div>

            <div class="tittle" style="margin-top: 20px">
              <img src="../assets/smallbiao.png">
              <strong class="strongtittle">基本信息</strong>
            </div>
            <ul class="left-ul">
              <li>
                <el-form-item label="姓名" prop="name">
                  <el-input class="left-input" v-model="resumeForm.name" placeholder="请输入你的姓名"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="resumeForm.sex" class="left-radio">
                    <el-radio label="1" border class="el-radio">男</el-radio>
                    <el-radio label="2" border class="el-radio">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="政治面貌" prop="politic">
                  <el-select class="el-select" v-model="resumeForm.politic" placeholder="请填写政治面貌">
                    <el-option
                      v-for="item in politicSelector"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="证件类型" prop="cardtype">
                  <el-select class="el-select" v-model="resumeForm.cardtype" placeholder="请选择证件类型">
                    <el-option
                      v-for="item in cardtypeSelector"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="证件号" prop="idcard">
                  <el-input class="left-input" v-model="resumeForm.idcard" placeholder="请填写身份证号"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input class="left-input" v-model="resumeForm.email" placeholder="请填写电子邮箱"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="手机号码" prop="tel">
                  <el-input class="left-input" v-model="resumeForm.tel" placeholder="请填写手机号码"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="学校" prop="school">
                  <el-select
                    class="el-select"
                    v-model="resumeForm.school"
                    placeholder="请选择学校"
                    filterable
                  >
                    <el-option
                      v-for="(item,index) in schoolSelector"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="院系" prop="department">
                  <el-input class="left-input" v-model="resumeForm.department" placeholder="请填写院系"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="专业" prop="major">
                  <el-input class="left-input" v-model="resumeForm.major" placeholder="请填写专业"></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="在校学历" prop="education" style="width:100%">
                  <el-cascader
                    style="width:100%"
                    :options="educationSelector"
                    @change="handleChange"
                    v-model="resumeForm.education"
                  ></el-cascader>
                </el-form-item>
              </li>
            </ul>
            <div class="line"></div>
          </div>
          <div style="background: #fff">
            <div class="tittle">
              <img src="../assets/smallbiao.png">
              <strong class="strongtittle">实践经历</strong>
              <el-button class="icon1" size="small" type="danger" round @click="addPractise">
                <i class="el-icon-success el-icon--right" round></i>添加经历
              </el-button>
            </div>
            <ul class="left-ul" id="practiseBox">
              <!-- <li>
              <el-form-item label="任职名称" prop="jobname">
                <el-input class="left-input" v-model="resumeForm.jobname" placeholder="请填写岗位名称"></el-input>
              </el-form-item>
            </li>
            <li>
              <strong class="ulName">任职时间:</strong>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择时间">
                </el-date-picker>
                <span>-</span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择时间">
                </el-date-picker>
              </li>-->
              <li v-for="(item,index) in resumeForm.practise" :key="index">
                <el-form-item prop="practise" label-width="0px" style="width:100%">
                  <el-input
                    type="textarea"
                    v-model="item.name"
                    placeholder
                    :rows="4"
                    max-length="10"
                  ></el-input>
                </el-form-item>
              </li>
            </ul>
            <div class="line"></div>
          </div>
          <div style="background: #fff">
            <div class="tittle">
              <img src="../assets/smallbiao.png">
              <strong class="strongtittle">技能证书</strong>
            </div>
            <ul class="left-ul">
              <li>
                <el-form-item label="英语" prop="english">
                  <el-select class="el-select" v-model="resumeForm.english" placeholder="请选择英语等级">
                    <el-option
                      v-for="item in englishLevelSelector"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="其他" prop="skill">
                  <el-input class="left-input" v-model="resumeForm.skill" placeholder="请填写其他技能证书"></el-input>
                </el-form-item>
              </li>
            </ul>
          </div>
          <div class="btnbox">
            <div
              class="btncontent"
              style="background: #d64947; margin-right: 53px"
              @click="submitForm('resumeForm')"
            >
              <img class="btnimg" src="../assets/submit.png" alt>
              <span class="btntext" style="color: #fff;">保存并更新</span>
            </div>
            <div
              class="btncontent"
              style="border: 2px solid #d64947;"
              @click="resetForm('resumeForm')"
            >
              <img class="btnimg" src="../assets/cancel.png" alt>
              <span class="btntext" style="color: #d64947;">取消</span>
            </div>
          </div>
        </el-form>
      </div>
      <div class="bodycontainer1">
        <div class="righttop">
          <div class="imgflex" @click="previewResume">
            <img src="../assets/preview.png" alt="预览">
            <span class="imgtext">预览</span>
          </div>
          <!-- <div class="imgflex">
            <img src="../assets/download.png" alt="下载">
            <span class="imgtext">下载</span>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Data from "../util/data";
import ERROR_CONFIG from "../constans/Error";
export default {
  name: "AddResume",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入学生姓名"));
      } else {
        if (value.trim().length > 6) {
          callback(new Error("姓名长度不能超过6位"));
        } else {
          callback();
        }
      }
    };
    var validateSkill = (rule, value, callback) => {
      if (value.trim().length > 20) {
        callback(new Error("长度不能超过20位"));
      } else {
        callback();
      }
    };
    var validatePolitic = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择政治面貌"));
      } else {
        callback();
      }
    };
    var validateSex = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择性别"));
      } else {
        callback();
      }
    };
    var validateEducation = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择在校学历"));
      } else {
        callback();
      }
    };
    var validateDepartment = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入院系"));
      } else {
        if (value.length > 32) {
          callback(new Error("院系不能超过32位"));
        } else {
          callback();
        }
      }
    };
    var validateMajor = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入专业"));
      } else if (value.length > 16) {
        callback(new Error("专业长度不能超过16位"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱号"));
      } else {
        if (
          !/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/.test(
            value.trim()
          )
        ) {
          callback(new Error("邮箱格式不正确"));
        } else if (value.length > 50) {
          callback(new Error("邮箱长度不能超过50位"));
        }
        callback();
      }
    };
    var validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        if (!/^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(value.trim())) {
          callback(new Error("请输入正确的手机号"));
        } else if (value.length > 18) {
          callback(new Error("手机号长度过长"));
        } else {
          callback();
        }
      }
    };
    var validateIdcard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入证件号"));
      } else {
        if (this.resumeForm.cardtype == "1") {
          if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value.trim())) {
            callback(new Error("身份证格式不正确"));
          } else {
            callback();
          }
        } else if (this.resumeForm.cardtype == "2") {
          if (value.length > 32) {
            callback(new Error("证件号长度不能超过32位"));
          }
          callback();
        } else {
          callback();
        }
      }
    };
    // var validatePractise = (rule, value, callback) => {
    //   value.forEach((item,index)=>{
    //     if(item.name.length>10){
    //       callback(new Error("请输入完整实践经历，不超过100字"));
    //     }
    //   })
    // };
    var validateCardtype = (rule, value, callback) => {
      if (this.resumeForm.idcard !== "") {
        this.$refs.resumeForm.validateField("idcard");
      }
      callback();
    };

    return {
      checkPractise: true,
      newBaseInfo: false,
      isLoading: true,
      resumeId: "",
      resumeForm: {
        name: "",
        sex: "",
        politic: [],
        idcard: "",
        email: "",
        tel: "",
        department: "",
        major: "",
        education: [],
        skill: "",
        practise: [],
        // "XXXX年XX月-XXXX年XX月，任XXXX，负责XXXX",
        cardtype: "1",
        english: [],
        school: [],
        userId: "",
        languageId: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        politic: [{ validator: validatePolitic, trigger: "change" }],
        cardtype: [{ validator: validateCardtype, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        tel: [{ validator: validateTel, trigger: "blur" }],
        sex: [{ validator: validateSex, trigger: "blur" }],
        department: [{ validator: validateDepartment, trigger: "blur" }],
        major: [{ validator: validateMajor, trigger: "blur" }],
        education: [{ validator: validateEducation, trigger: "change" }],
        idcard: [{ validator: validateIdcard, trigger: "blur" }],
        skill: [{ validator: validateSkill, trigger: "blur" }]
        // practise: [{ validator: validatePractise, trigger: "blur" }]
      },
      cardtypeSelector: [
        {
          value: "1",
          label: "身份证"
        },
        {
          value: "2",
          label: "其他证件"
        }
      ],
      schoolSelector: [{ value: "", label: "" }],
      politicSelector: [
        {
          value: "1",
          label: "中共党员"
        },
        {
          value: "2",
          label: "共青团员"
        },
        {
          value: "3",
          label: "群众"
        },
        {
          value: "4",
          label: "其他"
        }
      ],
      educationSelector: [
        {
          value: 4,
          label: "大专",
          children: [
            {
              value: "2",
              label: "二年级"
            },
            {
              value: "3",
              label: "三年级"
            }
          ]
        },
        {
          value: 3,
          label: "本科",
          children: [
            {
              value: "2",
              label: "二年级"
            },
            {
              value: "3",
              label: "三年级"
            },
            {
              value: "4",
              label: "四年级"
            },
            {
              value: "5",
              label: "五年级"
            }
          ]
        },
        {
          value: 2,
          label: "硕士",
          children: [
            {
              value: "0",
              label: "硕士"
            }
          ]
        },
        {
          value: 1,
          label: "博士",
          children: [
            {
              value: "0",
              label: "博士"
            }
          ]
        }
      ],
      englishLevelSelector: [
        {
          value: 1,
          label: "CET4"
        },
        {
          value: 2,
          label: "CET6"
        },
        {
          value: 3,
          label: "无"
        }
      ]
    };
  },
  computed: {},
  watch: {
    resumeForm(newval) {
      this.resumeForm.name = newval.name.replace(
        /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
        ""
      );
    }
  },
  created() {
    Data.getSchoolListNew(
      null,
      "",
      res => {
        console.log("【===最新学校列表===】" + JSON.stringify(res));
        if (res.SystemCode == 1) {
          if (res.data) {
            this.schoolSelector = res.data.map((value, index) => {
              let obj = {};
              obj.value = value.id;
              obj.label = value.orgName;
              return obj;
            });
          } else {
            //没有记录
          }

          Data.getMyResume(
            res => {
              console.log("===编辑获取我的简历===" + JSON.stringify(res));
              if (res.SystemCode == 1) {
                this.resumeId = res.data[0].id;
                this.resumeForm.languageId = res.data[0].resumeLanguage[0].id;
                res.data[0].resumeUserInfo
                  ? (this.newBaseInfo = false)
                  : (this.newBaseInfo = true);
                this.resumeForm.name = res.data[0].resumeUserInfo[0].userName;
                this.resumeForm.sex = res.data[0].resumeUserInfo[0].sex;
                this.resumeForm.politic =
                  res.data[0].resumeUserInfo[0].politicalLandscape;
                // this.resumeForm.cardtype = res.data[0].resumeUserInfo[0].cardtype;
                this.resumeForm.idcard = res.data[0].resumeUserInfo[0].idNum;
                this.resumeForm.email = res.data[0].resumeUserInfo[0].email;
                this.resumeForm.tel = res.data[0].resumeUserInfo[0].phone;
                this.resumeForm.school = res.data[0].resumeUserInfo[0].orgId;
                this.resumeForm.department =
                  res.data[0].resumeUserInfo[0].faculty;
                this.resumeForm.major = res.data[0].resumeUserInfo[0].major;
                this.resumeForm.education = [
                  parseInt(res.data[0].resumeUserInfo[0].educationalBackground),
                  res.data[0].resumeUserInfo[0].classId
                ];
                if (res.data[0].resumeLanguage) {
                  this.resumeForm.english = parseInt(
                    res.data[0].resumeLanguage[0].masterDegree
                  );
                  this.resumeForm.skill = res.data[0].resumeLanguage[0].remarks;
                }
                if (res.data[0].resumeCertificate) {
                  this.resumeForm.practise = res.data[0].resumeCertificate.map(
                    (item, index) => {
                      if (this.newBaseInfo) {
                        return { name: item.name };
                      } else {
                        return { name: item.name, id: item.id };
                      }
                    }
                  );
                }
                if (res.data[0].resumeUserInfo[0].id) {
                  this.resumeForm.userId = res.data[0].resumeUserInfo[0].id;
                }
                if (res.data[0].resumeLanguage[0].id) {
                  this.resumeForm.languageId = res.data[0].resumeLanguage[0].id;
                }
              }
            },
            err => {
              console.log("获取我的简历失败");
            }
          );
        } else {
          this.$message.error("请求出错");
        }
      },
      err => {
        console.log(err);
        this.$message.error("服务器异常，请稍后重试");
      }
    );
  },
  methods: {
    reload() {
      this.$router.go(0);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resumeForm.practise.forEach((item, index) => {
            if (item.name.length > 100) {
              console.log(">100");
              this.$message({
                type: "warning",
                message: "请输入完整实践经历，不超过100字"
              });
              this.checkPractise = false;
              return false;
            } else {
              this.checkPractise = true;
            }
          });
          if (this.checkPractise) {
            this.$store.commit("changeRegLoadingState");
            if (this.isLoading) {
              this.isLoading = false;
              let obj = this.newBaseInfo
                ? {
                    id: this.resumeId,
                    resumeUserInfo: [
                      {
                        userName: this.resumeForm.name,
                        sex: this.resumeForm.sex,
                        phone: this.resumeForm.tel,
                        email: this.resumeForm.email,
                        politicalLandscape: this.resumeForm.politic,
                        orgId: this.resumeForm.school,
                        idNum: this.resumeForm.idcard,
                        faculty: this.resumeForm.department,
                        major: this.resumeForm.major,
                        educationalBackground: this.resumeForm.education[0],
                        classId: this.resumeForm.education[1]
                      }
                    ],
                    resumeLanguage: [
                      {
                        languageId: this.resumeForm.languageId,
                        masterDegree: this.resumeForm.english,
                        remarks: this.resumeForm.skill
                      }
                    ],
                    resumeCertificate: this.resumeForm.practise
                  }
                : {
                    id: this.resumeId,
                    resumeUserInfo: [
                      {
                        id: this.resumeForm.userId,
                        userName: this.resumeForm.name,
                        sex: this.resumeForm.sex,
                        phone: this.resumeForm.tel,
                        email: this.resumeForm.email,
                        politicalLandscape: this.resumeForm.politic,
                        orgId: this.resumeForm.school,
                        idNum: this.resumeForm.idcard,
                        faculty: this.resumeForm.department,
                        major: this.resumeForm.major,
                        educationalBackground: this.resumeForm.education[0],
                        classId: this.resumeForm.education[1]
                      }
                    ],
                    resumeLanguage: [
                      {
                        id: this.resumeForm.languageId,
                        languageId: this.resumeForm.languageId,
                        masterDegree: this.resumeForm.english,
                        remarks: this.resumeForm.skill
                      }
                    ],
                    resumeCertificate: this.resumeForm.practise
                  };
              Data.addResumeAllInfo(
                obj,
                res => {
                  this.$store.commit("changeRegLoadingState");
                  this.isLoading = true;
                  console.log("===更新简历所有信息===" + JSON.stringify(res));
                  if (res.SystemCode == 1) {
                    this.$store.commit("couldPreviewResume");
                    this.$message({
                      type: "success",
                      message: "添加所有信息成功"
                    });
                    this.$router.push("/joblist");
                    this.$store.commit("handleSelectIndex", "/joblist");
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
          }
        } else {
          this.$message({
            type: "warning",
            message: "校验出错"
          });
          return false;
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    previewResume() {
      if (this.$store.state.newBaseInfo) {
        this.$alert("填写并保存您的简历信息才能预览哦", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push("/AddResume");
            this.$store.commit("handleSelectIndex", "/AddResume");
          }
        });
      } else {
        this.$router.push("/resume");
        this.$store.commit("handleSelectIndex", "/AddResume");
      }
    },
    addPractise() {
      if (this.resumeForm.practise.length <= 4) {
        this.resumeForm.practise.push({
          name: "XXXX年XX月-XXXX年XX月，任XXXX，负责XXXX"
        });
      } else {
        this.$message({
          type: "warning",
          message: "实践经历不能超过5条"
        });
      }
    }
  }
};
</script>

<style scoped>
.btntext {
  font-size: 27px;
  font-weight: 500;
}
.btnimg {
  margin-right: 20px;
}
.btncontent {
  width: 220px;
  height: 60px;
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.joblist-body {
  background: #ededed;
  padding-bottom: 1px;
  padding-top: 13px;
}
.link {
  margin-top: 25px;
}
.lineh {
  margin-top: 27px;
}
.point {
  margin-right: 10px;
  color: #f1a4a4;
}
.title-name {
  font-size: 24px;
  color: #555555;
  font-weight: bold;
}
.leftname {
  text-align: center;
}
.left-ul {
  clear: both;
  list-style: none;
  width: 540px;
  /* height: 615px; */
  margin: auto;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-input__inner {
  background-color: #f3f3f3;
  height: 47px;
}
.el-select {
  width: 450px;
  height: 47px;
}
.left-ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.ulName {
  font-size: 18px;
  margin-right: 12px;
  /* letter-spacing: 36px; */
}
.left-input {
  width: 450px;
  height: 47px;
}
.left-radio {
  width: 450px;
  height: 47px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-radio {
  width: 220px;
  height: 47px;
  /* background: #f3f3f3; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.strongred {
  display: inline-block;
  width: 10px;
  height: 30px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #e34949;
}
.tittle {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.strongtittle {
  display: inline-block;
  flex: 1;
  height: 30px;
  font-size: 24px;
  color: #555555;
  margin-left: 24px;
  line-height: 30px;
}
.leftimg {
  position: relative;
}
.lefttext {
  font-size: 20px;
  color: #fff;
  position: absolute;
  top: 8px;
  left: calc(50% - 40px);
}
.left-ol {
  list-style-position: inside;
  margin-top: 36px;
  margin-right: 109px;
}
.left-ol li {
  font-size: 17px;
  color: #6c6c6c;
  line-height: 36px;
}
.icon2 {
  float: right;
}
.icon1 {
  float: right;
}
.line {
  margin-top: 32px;
  height: 32px;
  border-top: 1px dashed #ededed;
}
.header {
  background-color: white;
}
.bodys {
  width: 1040px;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background: #fff; */
}
.bodycontainer {
  width: 80%;
}
.bodycontainer1 {
  width: 20%;
  margin-left: 9px;
  display: inline-block;
}
.leftbox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.leftText {
  margin-top: 27px;
  margin-right: 18px;
}
.righttop {
  padding: 21px;
  background: #fff;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.imgflex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.imgflex img {
  cursor: pointer;
  width: 50px;
}
.imgtext {
  margin-top: 20px;
  cursor: pointer;
}
.rightbottom {
  padding: 21px;
  background: #fff;
  height: 272px;
  margin-top: 9px;
}
.header-box {
  width: 1040px;
  margin: auto;
  padding: 25px 0;
}
.searchInput {
  width: 538px;
}
.joblist-form-inline {
  padding: 12px 0px;
  margin-top: 5px;
}
.erweima-box {
  background: url("../assets/bubel.png") left top no-repeat;
  background-size: 100% 100%;
  width: 83px;
  height: 80px;
}
.erweima-box > img {
  margin-top: 4px;
  margin-left: 8px;
  width: 72px;
  height: 72px;
}
.header-box-r > span {
  line-height: 80px;
  margin-right: 4px;
}
#searchBtn {
  width: 88px;
}
.btnbox {
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
}
</style>