<template>
  <div class="joblist-body">
    <div class="header">
      <div class="header-box">
        <div class="header-title">
          <div>{{this.deliverId !== undefined ? sendListDetail.companyName : jobDetail.companyName}}</div>
          <div>
            <el-button
              class="icon1"
              type="primary"
              @click="iscollect === '0' ? collect(pageId) : cancelcollect(pageId)"
            >
              <i class="el-icon-star-off el-icon--left"></i>
              {{iscollect === '0' ? '收藏' : '已收藏'}}
            </el-button>
            <el-button class="icon2" type="primary" @click="open">
              <i class="el-icon-success el-icon--left"></i>
              {{this.isdeliver === '0' ? '投递' : '已投递'}}
            </el-button>
          </div>
        </div>
        <div class="namebox">
          <span
            class="header-name"
          >{{this.deliverId !== undefined ? sendListDetail.name : jobDetail.name}}</span>
          <!-- <div class="iconbox">
            <el-button class="icon1" type="primary" @click="iscollect === '0' ? collect(pageId) : cancelcollect(pageId)"><i class="el-icon-star-off el-icon--left"></i>{{iscollect === '0' ? '收藏' : '已收藏'}}</el-button>
            <el-button class="icon2" type="primary" @click="open"><i class="el-icon-success el-icon--left"></i>{{this.isdeliver === '0' ? '投递' : '已投递'}}</el-button>
          </div>-->
        </div>
        <div class="header-address">
          <span>招聘人数:</span>
          <span
            class="peopleNum"
          >{{this.deliverId !== undefined ? sendListDetail.hireNumber : jobDetail.hireNumber}}人</span>
          <!-- <span>● 工作地点: {{this.deliverId !== undefined ? sendListDetail.detailedAddress : jobDetail.detailedAddress}}</span> -->
        </div>
        <div
          class="header-time"
          v-if="((sendListDetail.linkMan !== undefined) && (sendListDetail.linkMan !== '')) || (jobDetail.linkMan !== undefined) && (jobDetail.linkMan !== '')"
        >联系人: {{this.deliverId !== undefined ? sendListDetail.linkMan : jobDetail.linkMan}}</div>
        <div
          class="header-time"
          v-if="((sendListDetail.contactNumber !== undefined) && (sendListDetail.contactNumber !== '')) || (jobDetail.contactNumber !== undefined) && (jobDetail.contactNumber !== '')"
        >联系电话: {{this.deliverId !== undefined ? sendListDetail.contactNumber : jobDetail.contactNumber}}</div>
        <div
          class="header-time"
          v-if="((sendListDetail.wageDescription !== undefined) && (sendListDetail.wageDescription !== '0')) || (jobDetail.wageDescription !== undefined) && (jobDetail.wageDescription !== '0')"
        >实习待遇: {{this.deliverId !== undefined ? sendListDetail.wageDescription : jobDetail.wageDescription}}</div>
        <div
          class="header-time"
        >发布于: {{this.deliverId !== undefined ? sendListDetail.updateDate : jobDetail.updateDate}}</div>
      </div>
      <div class="header-container">
        <div class="container">
          <div class="linebox" style="margin-top: 0">
            <span class="line">|</span>
            <span class="describe">岗位描述</span>
          </div>
          <div class="introduce">岗位介绍</div>
          <ol class="container-ol">
            <li>{{this.deliverId !== undefined ? sendListDetail.remarks : jobDetail.remarks}}</li>
          </ol>
          <div class="linebox">
            <span class="line">|</span>
            <span class="describe">工作地点</span>
          </div>
          <div class="address">
            <span
              class="address-font"
              style="color: #555555"
            >{{this.deliverId !== undefined ? sendListDetail.detailedAddress : jobDetail.detailedAddress}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Data from "../util/data";
import ERROR_CONFIG from "../constans/Error";
export default {
  inject: ["reload"],
  name: "JobListDetails",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      iscollect: "", // '0': 未收藏 '1': 已收藏
      isdeliver: "", // '0': 未投递 '1': 已投递
      pageId: "",
      deliverId: "",
      jobDetail: {},
      sendListDetail: {},
      peopleSearch: "" //绑定搜索内容
    };
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    // if (this.reload) {
    //   to.meta.keepAlive = false;
    // }
    next();
  },
  created() {
    this.pageId = this.$route.query.pageId;
    this.deliverId = this.$route.query.deliverId;
    if (this.deliverId !== undefined) {
      this.DeliverDetail(this.pageId, this.deliverId);
      console.log(this.pageId, this.deliverId);
    } else {
      this.getJobDetail(this.pageId);
    }
  },
  computed: {},
  methods: {
    open() {
      if (this.isdeliver === "0") {
        this.$confirm(
          "亲爱的同学，您只有一次投递机会，投递成功后将暂时不可投递其他岗位，若未被录用，方能再一次投递。请仔细考虑后再进行投递！",
          "温馨提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            // type: 'warning',
            center: true
          }
        )
          .then(() => {
            this.sendResume(this.pageId);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      }
    },
    getJobDetail(pageId) {
      Data.getJobDetail(
        pageId,
        res => {
          console.log("【===岗位详情===】" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.jobDetail = res.data.positiondetail;
            this.iscollect = res.data.collectionFlag;
            this.isdeliver = res.data.deliverFlag;
            console.log(this.jobDetail);
          } else {
            this.$message({
              type: "warning",
              message: ERROR_CONFIG[res.SystemCode]
            });
            return;
          }
        },
        err => {
          // console.log(err);
          this.$message.error("服务器异常，请稍后重试");
        }
      );
    },
    DeliverDetail(pageId, deliverId) {
      Data.getPositionDeliverDetail(
        pageId,
        deliverId,
        res => {
          console.log("【===投递详情===】" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.sendListDetail = res.data.positiondetail;
            this.iscollect = res.data.collectionFlag;
            this.isdeliver = res.data.deliverFlag;
            console.log(this.iscollect, this.isdeliver);
          } else {
            this.$message({
              type: "warning",
              message: ERROR_CONFIG[res.SystemCode]
            });
            return;
          }
        },
        err => {
          // console.log(err);
          this.$message.error("服务器异常，请稍后重试");
        }
      );
    },
    sendResume(pageId) {
      console.log(pageId);
      Data.sendResume(
        pageId,
        res => {
          console.log("【===投递===】" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.$message({
              type: "success",
              message: "投递成功!"
            });
            this.reload();
          } else {
            this.$message({
              type: "warning",
              message: ERROR_CONFIG[res.SystemCode]
            });
            return;
          }
        },
        err => {
          // console.log(err);
          this.$message.error("服务器异常，请稍后重试");
        }
      );
    },
    collect(pageId) {
      Data.collectJob(
        pageId,
        res => {
          console.log("【===收藏===】" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.$message({
              type: "success",
              message: "收藏成功!"
            });
            this.reload();
          } else {
            this.$message({
              type: "warning",
              message: ERROR_CONFIG[res.SystemCode]
            });
            return;
          }
        },
        err => {
          // console.log(err);
          this.$message.error("服务器异常，请稍后重试");
        }
      );
    },
    cancelcollect(pageId) {
      Data.cancelCollectJob(
        pageId,
        res => {
          console.log("【===取消收藏===】" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.$message({
              type: "success",
              message: "取消成功!"
            });
            this.reload();
          } else {
            this.$message({
              type: "warning",
              message: ERROR_CONFIG[res.SystemCode]
            });
            return;
          }
        },
        err => {
          // console.log(err);
          this.$message.error("服务器异常，请稍后重试");
        }
      );
    }
  }
};
</script>

<style scoped>
.joblist-body {
  background: #f2f4f5;
}
.address {
  margin-top: 33px;
}
.address-font {
  font-size: 20px;
  color: #ff5043;
}
.linebox {
  margin-top: 33px;
}
.line {
  font-size: 20px;
  color: #ff5043;
  margin-right: 8px;
  background: #ff5043;
}
.header {
  background: #f2f4f5;
  padding: 40px 0;
}
.header-box {
  width: 1040px;
  margin: auto;
}
.header-container {
  margin-top: 33px;
  background: #fff;
  padding: 33px 0;
}
.header-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: #555555;
}
.namebox {
  margin-top: 15px;
  position: relative;
}
.container {
  width: 1040px;
  margin: auto;
  list-style-position: inside;
}
.container-ol > li {
  margin-top: 16px;
}
.describe {
  font-size: 22px;
  color: #555555;
  font-weight: 600;
}
.introduce {
  font-size: 20px;
  color: #555555;
  margin-top: 28px;
}
.header-name {
  font-size: 48px;
  font-weight: 500;
  color: #5f5f66;
  margin-top: 15px;
  margin-bottom: 23px;
}
.icon1 {
  background: #fff;
  color: #ff5043;
}
.icon2 {
  background: #ff5043;
}
.el-button--primary {
  border: none;
}
.header-address {
  width: fit-content;
  padding: 0 10px;
  font-size: 20px;
  background: #fff;
  border-radius: 36px;
  line-height: 36px;
  margin-top: 23px;
}
.header-time {
  margin-top: 20px;
  font-size: 16px;
  color: #555555;
}
.peopleNum {
  color: #ff5043;
}
</style>