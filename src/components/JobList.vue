<template>
  <div class="joblist-body">
    <div class="header">
      <div class="header-box clearfix">
        <el-form :inline="true" :model="formInline" class="joblist-form-inline fl_l">
          <el-form-item label>
            <el-input
              v-model="formInline.user"
              placeholder="请输入关键词，例如：办公室助理、大堂经理助理等"
              type="danger"
              class="searchInput"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="search()" icon="el-icon-search" id="searchBtn"></el-button>
          </el-form-item>
        </el-form>
        <div class="header-box-r fl_r clearfix">
          <div class="erweima-box fl_r">
            <img src="../assets/iosapp.png" alt>
            <p class="erweima-text">ios</p>
          </div>
          <div class="erweima-box fl_r">
            <img src="../assets/androidapk.png" alt>
            <p class="erweima-text">android</p>
          </div>
          <span class="fl_r">扫码下载App</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="search-box">
        <div class="unit-search clearfix">
          <div class="fl_l">单位类别：</div>
          <div class="fl_l">
            <el-link :type="unitArr[0]" @click="selectUnit(1)">机关</el-link>
            <el-link :type="unitArr[1]" @click="selectUnit(3)">社区</el-link>
            <el-link :type="unitArr[2]" @click="selectUnit(2)">企业</el-link>
          </div>
        </div>
        <div class="area-search clearfix">
          <div class="fl_l">区域所属：</div>
          <div class="fl_l">
            <el-link :type="activeAll" @click="selectAllArea()">不限</el-link>
            <el-link
              :type="item.isExist==1?((active==index)?'primary':'info'):'danger'"
              v-for="(item,index) in areaList"
              :key="index"
              :disabled="item.isExist==1?false:true"
              @click="selectArea(index,item.dictValue)"
            >{{item.dictName}}</el-link>
          </div>
        </div>
      </div>
      <div class="nothing" v-if="jobList === undefined || jobList.length === 0">
        <div>-- 暂无数据 --</div>
        <img src="../assets/none2.png" alt="暂无数据">
      </div>
      <div class="list-box" v-else>
        <div class="list-box-b">
          <div
            class="item-card"
            v-for="(item,index) in jobList"
            :key="index"
            @click="detail(index)"
          >
            <div class="item-card-h">
              <div class="item-card-h-t clearfix">
                <div class="fl_l">
                  <em>{{item.name}}</em>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>{{item.createDate|createDateFilter}}</span>
                </div>
                <span class="fl_r">{{item.companyName}}</span>
              </div>
              <div>
                <span style="font-size: 18px">招聘人数: </span>
                <span class="item-card-h-b">{{item.hireNumber}}人</span>
              </div>
              <div v-if="(item.linkMan !== undefined) && (item.linkMan !== '')">
                <span style="font-size: 18px">联系人: </span>
                <span class="item-card-h-b">{{item.linkMan}}</span>
              </div>
              <div v-if="(item.contactNumber !== undefined) && (item.contactNumber !== '')">
                <span style="font-size: 18px">联系电话: </span>
                <span class="item-card-h-b">{{item.contactNumber}}</span>
              </div>
              <div v-if="(item.wageDescription !== '0') && (item.wageDescription !== undefined) ">
                <span style="font-size: 18px">实习待遇: </span>
                <span class="item-card-h-b">{{item.wageDescription}}</span>
              </div>
            </div>
            <div class="item-card-b">工作地点：{{item.detailedAddress}}</div>
            <div class="btns">
              <el-button type="danger" round icon="el-icon-edit" size="small">投递</el-button>
              <br>
              <el-button type="danger" round icon="el-icon-edit" size="small">收藏</el-button>
            </div>
          </div>
        </div>
        <div class="list-box-f clearfix">
          <el-pagination
            @size-change="handleSizeChange"
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalRecords"
            class="fl_r"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Data from "../util/data";
import ERROR_CONFIG from "../constans/Error";
export default {
  name: "JobList",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      currentPage: 1,
      areaList: [],
      unitArr: ["primary", "info", "info"],
      activeAll: "primary",
      active: "-1",
      pageId: "",
      jobList: [],
      pageSize: 10,
      totalRecords: 1000,
      unit: "1",
      area: ""
    };
  },
  computed: {},
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
  created() {
    // this.currentPage = this.getContextData("currentPage" || 1);
    console.log(this.currentPage);
    this.initPage();
  },
  mounted() {},
  filters:{
    createDateFilter(val){
      val=val.replace(/-/g,"/");
      const oldTime=new Date(val);
      let result=Math.floor((new Date().getTime()-oldTime.getTime())/(24*60*60*1000));
      if(result==0){
        return "当天发布";
      }else{
        return `${result}天前发布`
      }
    }
  },
  methods: {
    search() {
      console.log("search");
      this.getJobList();
    },
    detail(index) {
      this.pageId = this.jobList[index].id;
      this.$router.push({ path: "/Jld", query: { pageId: this.pageId } });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getJobList(val);
    },
    changePage(val) {
      console.log(`点击换页：${val}`);
    },
    selectUnit(unit) {
      switch (unit) {
        case 1:
          this.unitArr = this.unitArr.map((item, index) => {
            switch (index) {
              case 0:
                return "primary";
                break;
              case 1:
                return "info";
                break;
              case 2:
                return "info";
                break;
            }
          });
          this.unit = "1";
          this.getAreaList("1");
          this.selectAllArea();
          this.getJobList();
          break;
        case 2:
          this.unitArr = this.unitArr.map((item, index) => {
            switch (index) {
              case 0:
                return "info";
                break;
              case 1:
                return "info";
                break;
              case 2:
                return "primary";
                break;
            }
          });
          this.unit = "2";
          this.getAreaList("2");
          this.selectAllArea();
          this.getJobList();
          break;
        case 3:
          this.unitArr = this.unitArr.map((item, index) => {
            switch (index) {
              case 0:
                return "info";
                break;
              case 1:
                return "primary";
                break;
              case 2:
                return "info";
                break;
            }
          });
          this.unit = "3";
          this.getAreaList("3");
          this.selectAllArea();
          this.getJobList();
          break;
      }
    },
    selectArea(index, area) {
      this.activeAll = "info";
      this.active = index;
      this.area = area;
      this.getJobList();
    },
    selectAllArea() {
      this.activeAll = "primary";
      this.active = "-1";
      this.area = "";
      this.getJobList();
    },
    initPage() {
      this.getAreaList();
      this.getJobList();
    },
    getAreaList(area = "1") {
      Data.getAreaListNew(
        area,
        res => {
          console.log("===获取地区列表===" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.areaList = res.data;
          } else {
          }
        },
        err => {
          console.log("获取地区列表失败");
        }
      );
    },
    getJobList(pageNo = 1) {
      Data.getJobListPage(
        this.formInline.user,
        this.unit,
        "",
        this.area,
        pageNo,
        res => {
          console.log("【===岗位列表 一页===】" + JSON.stringify(res));
          if (res.SystemCode == 1) {
            this.jobList = res.data.page.rows;
            this.pageSize = res.data.page.pagesize;
            this.totalRecords = res.data.page.records;
            this.currentPage = res.data.page.page;
            // setTimeout(() => {
            //   let items = document.querySelectorAll(".item-card");
            //   items.forEach((item, idx) => {
            //     item.addEventListener("mouseover", () => {
            //       item.classList.add("item-card-hover");
            //       item.lastElementChild.classList.add("show");
            //     });
            //     item.addEventListener("mouseout", () => {
            //       item.classList.remove("item-card-hover");
            //       item.lastElementChild.classList.remove("show");
            //     });
            //   });
            // }, 0);
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.joblist-body {
  background: #ededed;
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
  background-color: white;
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
.erweima-text{
  text-align: center;
  font-size: 12px;
  color: #717171;
  margin-top: 5px;
}
.header-box-r > span {
  line-height: 80px;
  margin-right: 4px;
}
#searchBtn {
  width: 88px;
}

.content {
  width: 1040px;
  margin: auto;
  margin-top: 13px;
  padding-bottom: 20px;
}

.search-box {
  padding: 0 20px;
  line-height: 1.9em;
  background-color: #fff;
}
.unit-search {
  padding: 15px 0;
  border-bottom: 1px solid #ededed;
}
.unit-search > div:first-child {
  color: black;
}
.unit-search > div:nth-child(2) {
  width: 920px;
}
.unit-search > div:nth-child(2) a {
  margin: 0 12px;
}
.area-search {
  padding: 15px 0;
}
.area-search > div:first-child {
  color: black;
}
.area-search > div:nth-child(2) {
  width: 920px;
}
.area-search > div:nth-child(2) a {
  margin: 0 12px;
}

.list-box {
  padding: 50px 32px 0px;
  margin-top: 13px;
  background-color: #fff;
  margin-bottom: 20px;
}
.item-card {
  cursor: pointer;
  border: 1px solid #cbcddc;
  border-radius: 5px;
  margin-bottom: 20px;
  position: relative;
}

.item-card-hover {
  border: 1px solid #e34949 !important;
  cursor: pointer;
}
.item-card:last-child {
  margin-bottom: 0px;
}
.item-card-h {
  padding: 10px 22px 8px;
}
.item-card-h-t {
  line-height: 42px;
}
.item-card-h-t > div > em {
  font-style: normal;
  color: #e34949;
  font-size: 22px;
}
.item-card-h-t > div > span {
  color: #a3a3a3;
  font-size: 16px;
}
.item-card-h-t > span {
  font-size: 22px;
}
.item-card-h-b {
  color: #e34949;
  line-height: 40px;
  font-size: 18px;
}
.item-card-b {
  background-color: #fafafa;
  color: #717171;
  font-size: 18px;
  line-height: 42px;
  padding: 0 22px;
}
.list-box-f {
  padding: 40px 0px;
}

.btns {
  position: absolute;
  bottom: 6px;
  right: 20px;
  display: none;
}
.btns button {
  margin: 0;
  display: block;
  width: 200px;
}
.show {
  display: block;
}
</style>
