<template>
  <div class="joblist-body">
    <div class="bodys">
      <div class="bodycontainer">
        <div class="leftname">
          <div class="leftimg">
            <img src="../assets/biao.png" alt="">
            <span class="lefttext">个人简历—{{resumeData[0].resumeUserInfo[0].userName}}</span>
          </div>
          <div>
            <span class="title-name">{{resumeData[0].resumeUserInfo[0].userName}}</span>
            <!-- <el-button @click="addResume" class="icon2" size="small" plain type="danger" round><i class="el-icon-edit-outline el-icon--right"></i>编辑</el-button> -->
            <!-- <el-button class="icon2" type="danger" plain size="small" round>编辑</el-button> -->
          </div>
          <div class="leftbox">
            <div class="leftText">
              <div>证件号: {{resumeData[0].resumeUserInfo[0].idNum}}</div>
              <div class="lineh">学校: {{resumeData[0].resumeUserInfo[0].schoolName}}</div>
              <div class="lineh">在校学历: {{resumeData[0].resumeUserInfo[0].educationalBackgroundName + ' ' + resumeData[0].resumeUserInfo[0].className}}</div>
            </div>
            <div class="leftText">
              <div><i class="point">●</i>电子邮箱: {{resumeData[0].resumeUserInfo[0].email}}</div>
              <div class="lineh"><i class="point">●</i>院系: {{resumeData[0].resumeUserInfo[0].faculty}}</div>
              <div class="lineh"><i class="point">●</i>政治面貌: {{resumeData[0].resumeUserInfo[0].politicalLandscapeName}}</div>
            </div>
            <div class="leftText">
              <div><i class="point">●</i>手机号码: {{resumeData[0].resumeUserInfo[0].phone}}</div>
              <div class="lineh"><i class="point">●</i>专业: {{resumeData[0].resumeUserInfo[0].major}}</div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div>
          <div>
            <strong style="color: #ff5043; font-size: 20px">|</strong>
            <strong  class="title-name">实践经历</strong>
          </div>
          <div v-if="resumeData[0].resumeCertificate">
            <div  v-for="(item,index) in resumeData[0].resumeCertificate" :key="index">
              <div style="margin-top: 20px;">
                <strong style="font-size: 17px; margin-right: 25px">{{item.name}}</strong>
                <!-- <span style="font-size: 17px">2018年9月—2019年2月</span> -->
              </div>
              <!-- <ol class="left-ol">
                <li>搭建系统开发环境，完成系统框架和核心代码的实现</li>
                <li>项目概要设计、详细设计、开发计划等的编制并实施</li>
                <li>熟悉ORACLE、REDIS等数据库操作，了解网络安全优先</li>
                <li>具备动态库和控件实现能力，熟悉设计模式、STL或Boost，有可视化引擎搭建经验优先</li>
                <li>对算法有较深的研究，能根据已有算法做算法移植，有布局算法经验优先</li> 
              </ol> -->
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div>
          <div>
            <strong style="color: #ff5043; font-size: 20px">|</strong>
            <strong  class="title-name">技能证书</strong>
          </div>
          <div style="margin-top: 20px" v-if="resumeData[0].resumeLanguage">
            <span>英语:{{resumeData[0].resumeLanguage ? resumeData[0].resumeLanguage[0].masterDegreeName : ''}}</span>
            <span><i class="point">●</i>{{resumeData[0].resumeLanguage[0].remarks}}</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="btnbox">
          <div class="btncontent" style="background: #d64947; "  @click="addResume">
            <img class="btnimg" src="../assets/submit.png" alt="">
            <span class="btntext" style="color: #fff;">编辑</span>
          </div>
        </div>
      </div>
      <div class="bodycontainer1">
        <div class="righttop">
          <!-- <div class="imgflex">
            <img src="../assets/refresh.png" alt="刷新" @click="reload">
            <span class="imgtext" @click="reload">刷新</span>
          </div> -->
          <div class="imgflex" @click="previewResume">
            <img src="../assets/preview.png" alt="预览">
            <span class="imgtext">预览</span>
          </div>
          <!-- <div class="imgflex">
            <img src="../assets/download.png" alt="下载">
            <span class="imgtext">下载</span>
          </div> -->
        </div>
        <!-- <div class="rightbottom">
          <div>当前简历完成度:</div>
          <el-progress style="margin-top:11px" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <div class="link">
            <el-link href="javascript:;" target="_blank">基本信息</el-link>
          </div>
          <div class="link">
            <el-link href="javascript:;" target="_blank">实践经历</el-link>
          </div>
          <div class="link">
            <el-link href="javascript:;" target="_blank">技能证书</el-link>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import * as Data from "../util/data";
import ERROR_CONFIG from "../constans/Error";
export default {
  name: "Resume",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
       options1: [{
          value: '选项1',
          label: '南京'
        }, {
          value: '选项2',
          label: '杭州'
        }, {
          value: '选项3',
          label: '上海'
        }, {
          value: '选项4',
          label: '深圳'
        }, {
          value: '选项5',
          label: '苏州'
        }],
       options2: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: '',
      peopleSearch: '',    //绑定搜索内容
      resumeData:[{resumeUserInfo:[{}]}]
    }
  },
  computed: {
    
  },
  created(){
    Data.getMyResume(res => {
      console.log('===我的简历===' + JSON.stringify(res));
      if (res.SystemCode == 1) {
        this.resumeData = res.data;
      }
    },
    err => {
      console.log('获取我的简历失败');
    })
  },
  methods: {
    reload() {
      this.$router.go(0);
    },
    addResume() {
      this.$router.push("/AddResume")
      this.$store.commit("handleSelectIndex","/AddResume")
    },
    previewResume(){
      this.$router.push("/resume")
      this.$store.commit("handleSelectIndex","/AddResume")
    }
  },
}
</script>

<style scoped>
.joblist-body {
  background: #ededed;
  padding-top: 13px;
  padding-bottom: 1px;
}
.link {
  margin-top: 25px;
}
.lineh {
  margin-top: 27px;
}
.point {
  margin-right: 10px;
  color: #F1A4A4;
}
.title-name {
  font-size: 24px;
  color: #555555;
  font-weight: bold;
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
  margin: 32px 0;
  height: 1px;
  background: #ededed;
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
  padding: 36px 0;
  padding-left: 32px;
  display: inline-block;
  background: #fff;
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
.leftimg {
  position: relative;
  text-align: center;
}
.lefttext {
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 8px;
    left: calc(50% - 80px);
}
.btnbox {
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
}
.btntext {
  font-size: 27px;
  font-weight: 500
}
.btnimg {
  margin-right: 20px
}
.btncontent {
  width: 220px;
  height: 60px;
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  justify-content: center
}
</style>