<template>
  <div class="joblist-body">
    <div class="nothing" v-if="sendList === undefined || sendList.length === 0">
      <div>-- 暂无数据 --</div>
      <img src="../assets/none2.png" alt="暂无数据">
    </div>
    <div class="header" v-else>
      <div>已投递简历状态</div>
      <div class="line"></div>
      <ul class="header-ul">
        <li v-for="(item, index) in sendList" :key="index" @click="sendListDetail(index)">
          <div style="color: #555555; font-weight: bold">
            <span>• {{item.name}}</span>
            <span style="color: #ff5043">{{item.hireNumber}}人</span>
            <span style="float: right; font-weight: normal">{{item.companyName}}</span>
          </div>
          <div style="margin-top: 10px">
            <span>工作地点:</span>
            <span>{{item.detailedAddress}}</span>
            <span class="header-zt" style="background: #FA624D">
              <span>{{item.tUserResumeDeliver.deliverResultName}}</span>
            </span>
          </div>
        </li>
      </ul>
      <div class="list-box-f clearfix">
        <el-pagination
          @size-change="handleSizeChange"
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="totalRecords"
          class="fl_r"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as Data from "../util/data";
import ERROR_CONFIG from "../constans/Error";
export default {
  name: "JobListDetails",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      sendList: [],
      pageId: '',
      deliverId: '',
      currentPage: 1,
      totalRecords: 1000,
      pagesize: 10,
      peopleSearch: '',    //绑定搜索内容
      deliverResultName: ''
    }
  },
  created() {
    this.getSendList();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.state.newBaseInfo) {
        vm.$alert(
          "亲爱的同学，欢迎来到大学生“进机关进企业进社区”实习专区，这里有你想要的实习机会，请先填写简历，选择实习岗位，开启你的职场初体验吧！",
          "提示",
          {
            confirmButtonText: "填写简历",
            callback: action => {
              vm.$router.push("/AddResume");
              vm.$store.commit("handleSelectIndex","/AddResume")
            }
          }
        );
      }
    });
  },
  computed: {
  },
  methods: {
    getSendList() {
      Data.getPcSendList(
        res => {
          console.log("【===投递记录列表===】" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.sendList = res.data.page.rows;
            this.pagesize = res.data.page.pagesize;
            this.totalRecords = res.data.page.records;
            this.currentPage = res.data.page.page;
            console.log(this.sendList);
          } else {
            this.$message({
              type: "warning",
              message: ERROR_CONFIG[res.SystemCode]
            });
            return;
          }
        },
        err => {
          console.log(err);
          this.$message.error("服务器异常，请稍后重试");
        }
      );
    },
    sendListDetail(index) {
      this.pageId = this.sendList[index].id;
      this.deliverId = this.sendList[index].tUserResumeDeliver.id
      console.log(this.pageId, this.deliverId);
      this.$router.push({ path: "/Jld", query: { pageId: this.pageId, deliverId: this.deliverId } })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changePage(val) {
      console.log(`点击换页：${val}`);
    },
  },
}
</script>

<style scoped>
.joblist-body {
  background: #ededed;
  padding: 20px 0;
}
.nothing {
  width: 1040px;
  margin: auto;
  padding: 50px 0;
  color: #cccccc;
  text-align: center;
  background: #fff;
}
.header {
  width: 1040px;
  margin: auto;
  background: #fff;
  padding: 20px;
}
.header-zt {
  float: right;
  color: #fff;
  height: 30px;
  width: 100px;
  text-align: center;
  line-height: 30px;
  border-radius: 30px;
  background: #3987CA;
}
.line {
  border: 1px solid #F8F8F8;
  margin-top: 20px;
}
.header-ul {
  list-style: none;
}
.header-ul li {
  cursor: pointer;
  background: #F8F8F8;
  margin-top: 32px;
  padding: 20px;
}
.clearfix {
  margin-top: 100px;
}
</style>