<template>
  <div class="joblist-body">
    <div class="nothing" v-if="collectList === undefined || collectList.length === 0" >
      <div>— 暂无数据 —</div>
      <img src="../assets/none2.png" alt="暂无数据">
    </div>
    <div class="header" v-else>
      <div class="collectionTitle">
        <span style="font-size: 30px; color: #787878" @click="click">我收藏的职位</span>
      </div>
      <ul class="header-ul">
        <li v-for="(item, index) in collectList" :key="index" @click="detail(index)">
          <div style="color: #555555; font-weight: bold">
            <span>• {{item.name}}</span>
            <span style="color: #ff5043">{{item.hireNumber}}人</span>
            <span style="float: right; font-weight: normal">{{item.companyName}}</span>
          </div>
          <div style="margin-top: 10px">
            <span>工作地点:</span>
            <span>{{item.detailedAddress}}</span>
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
  name: "Collection",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      collectList: [],
      currentPage: 1,
      pageId: '',
      totalRecords: 1000,
      pagesize: 10,
      unit: "1",
      area: "",
      peopleSearch: ''    //绑定搜索内容
    }
  },
  computed: {
    
  },
  created() {
    this.getCollectListPc();
    console.log(this.collectList.length)
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
  methods: {
    open() {
      this.$confirm('亲爱的同学，您只有一次投递机会，投递成功后将暂时不可投递其他岗位，若未被录用，方能再一次投递。请仔细考虑后再进行投递！', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '投递成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    getCollectListPc(pageNo = 1) {
      Data.getCollectListPc(
        pageNo,
        res => {
          console.log("【===收藏列表===】" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.collectList = res.data.page.rows;
            console.log(this.collectList);
            this.pagesize = res.data.page.pagesize;
            this.totalRecords = res.data.page.records;
            this.currentPage = res.data.page.page;
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
    click(){console.log(collectList)},
    detail(index) {
      this.pageId = this.collectList[index].id;
      this.$router.push({ path: "/Jld", query: { pageId: this.pageId } })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getCollectListPc(val)
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
.collectionTitle {
  border-bottom: 1px solid #F8F8F8;
  padding-bottom: 20px;
}
.header-zt {
  float: right;
  color: #fff;
  height: 30px;
  width: 100px;
  text-align: center;
  line-height: 30px;
  border-radius: 30px;
  background: url('../assets/shenhe.png') no-repeat center center;
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