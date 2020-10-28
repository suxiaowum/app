<template>
  <div id="app">
    <div class="top">
      <el-row :gutter="10">
        <el-col :span="8" :offset="8">
          <div style="text-align: center;line-height:40px;z-index">时间轴</div>
        </el-col>
        <el-col :span="2" :offset="2">
          <i
            class="el-icon-circle-plus-outline"
            @click="newTaskFun"
            style="font-size: 24px; line-height: 40px"
          ></i>
        </el-col>
        <el-col :span="3">
          <!-- <i class="iconfont icon-tuding" style="font-size:24px;line-height:40px"></i> -->
        </el-col>
      </el-row>
    </div>
    <div class="top2">
      <el-row :gutter="10">
        <el-col :span="8" :offset="8">
          <div style="text-align: center;line-height:40px;z-index">时间轴</div>
        </el-col>
        <el-col :span="2" :offset="2">
          <i
            class="el-icon-circle-plus-outline"
            style="font-size: 24px; line-height: 40px"
          ></i>
        </el-col>
        <el-col :span="3">
          <i
            class="iconfont icon-tuding"
            style="font-size: 24px; line-height: 40px"
          ></i>
        </el-col>
      </el-row>
    </div>
    <div>
      <Calendar
        :mark="mark"
        v-show="CalendarB"
        v-on:choseDay="fun"
        ref="calend"
      ></Calendar>
      <div class="MiniVueCalendarWeek">
        <VueCalendarWeek v-model="value" v-show="!CalendarB" />
      </div>
      <div class="MiniVueCalendarWeek2">
        <VueCalendarWeek v-model="value" v-if="!CalendarB" />
      </div>
    </div>
    <div
      style="height: 100%; overflow: scroll"
      @touchstart="touchstart"
      @touchmove="touchmove"
    >
      <div
        style="
          color: rgba(102, 102, 102, 1);
          height: 46px;
          line-height: 46px;
          background: #f7f7f7;
          margin-left: 16px;
        "
      >
        事项
      </div>
      <div style="margin-left: 14px; height: auto" ref="scrollOne">
        <el-row
          :gutter="10"
          style="background: #fff; margin-top: 8px"
          v-for="(msg, key) in data"
          :key="key"
          @click.native="msgFun(msg, key)"
        >
          <el-col
            v-if="msg.className === 'red'"
            :span="2"
            style="line-height: 54px; height: 54px; position: relative"
          >
            <i class="el-icon-s-management" style="color: #f91f1f"></i>
          </el-col>
          <el-col
            v-else-if="msg.className === 'orange'"
            :span="2"
            style="line-height: 54px; height: 54px; position: relative"
          >
            <i class="el-icon-s-management" style="color: #ef9c0c"></i>
          </el-col>
          <el-col
            v-else-if="msg.className === 'blue'"
            :span="2"
            style="line-height: 54px; height: 54px; position: relative"
          >
            <i class="el-icon-s-management" style="color: #357afc"></i>
          </el-col>
          <el-col
            v-else
            :span="2"
            style="line-height: 54px; height: 54px; position: relative"
          >
            <i class="el-icon-s-management" style="color: #1fc326"></i>
          </el-col>
          <el-col
            :span="10"
            style="
              line-height: 54px;
              height: 54px;
              font-size: 14px;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
            >{{ msg.matterName }}</el-col
          >
          <el-col
            :span="10"
            style="
              line-height: 54px;
              height: 54px;
              font-size: 12px;
              color: #999999;
              text-align: right;
            "
            >{{ msg.matterOpen }}-{{ msg.end }}</el-col
          >
        </el-row>
      </div>
    </div>
    <xiugai
      :overForm="overVal"
      :taskNoDialog="taskNoDialog"
      @taskNoDialogChange="test2"
      @overget="overget"
    ></xiugai>
    <newTask :newTaskShow="newTaskShow" @newTaskShowChange="test1"></newTask>
  </div>
</template>
<script>
import VueCalendarWeek from "vue-calendar-week";
import Calendar from "vue-calendar-component";
import axios from "axios";
import moment from "moment";
import xiugai from "./xiugai.vue";
import newTask from "./newTask.vue";
export default {
  components: {
    VueCalendarWeek,
    Calendar,
    xiugai,
    newTask,
  },

  data() {
    return {
      CalendarB: true,
      value: new Date(),
      mark: [],
      marke: [
        {
          date: "2020/09/20",
          arrs: ["l4"],
        },
      ],
      data: [],
      startX: null,
      startY: null,
      endX: null,
      endY: null,
      scorllY: null,
      overVal: {},
      newTaskShow: false,
      taskNoDialog: false,
      funDate: undefined,
      index: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.allmsg();
  },
  methods: {
    newTaskFun() {
      // console.log(1);
      this.newTaskShow = true;
    },
    test1(val) {
      // console.log(val);
      this.newTaskShow = val;
      // this.fun(this.funDate);
      this.data.splice(this.index, 1);
    },
    allmsg() {
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/list?userId=" +
            sessionStorage.getItem("userId")
        )
        .then((msg) => {
          console.log(msg);
          var data = msg.data.data;
          var mark = [];
          for (let i = 0; i < data.length; i++) {
            // console.log(moment(data[i].remindTime).format("yyyy/MM/DD"));
            data[i].matterOpen = moment(data[i].matterOpen).format(
              "yyyy/MM/DD"
            );
            data[i].createTime = moment(data[i].createTime).format("MM/DD");
            data[i].end = moment(data[i].end).format("MM/DD");
            // data[i].matterOpen = moment(
            //   data[i].matterOpen
            // ).format("MM/DD");

            if (data[i].importantOne === 1) {
              if (data[i].urgentOne === 1) {
                mark.push({
                  date: data[i].matterOpen,
                  arrs: ["l1"],
                });
                data[i].className = "red";
              } else {
                mark.push({
                  date: data[i].matterOpen,
                  arrs: ["l2"],
                });
                data[i].className = "orange";
              }
            } else {
              if (data[i].urgentOne === 1) {
                mark.push({
                  date: data[i].matterOpen,
                  arrs: ["l3"],
                });
                data[i].className = "blue";
              } else {
                mark.push({
                  date: data[i].matterOpen,
                  arrs: ["l4"],
                });
                data[i].className = "green";
              }
            }
          }
          var marke = JSON.parse(JSON.stringify(mark));
          const res = new Map();
          marke = this.uniquer(marke);
          // console.log(marke);
          // console.log(mark);
          for (var c = 0; c < mark.length; c++) {
            for (var v = 0; v < marke.length; v++) {
              if (mark[c].date === marke[v].date) {
                // console.log(1);
                marke[v].arrs.push.apply(marke[v].arrs, mark[c].arrs);
                // console.log(marke[v]);
                marke[v].arrs = [...new Set(marke[v].arrs)];
                break;
              }
            }
          }
          this.data = data;
          this.mark = marke;
          var thst = this;
          setTimeout(function () {
            thst.$refs.calend.ChoseMonth(new Date(), false);
          }, 1000);
        });
    },
    uniquer(arr) {
      const res = new Map(); //定义常量 res,值为一个Map对象实例 //返回arr数组过滤后的结果，结果为一个数组   过滤条件是，如果res中没有某个键，就设置这个键的值为1
      return arr.filter((arr) => !res.has(arr.date) && res.set(arr.date, 1));
    },
    msgFun(msg, index) {
      // console.log(msg);
      this.index = index;
      this.overVal = msg;
      this.taskNoDialog = true;
    },
    test2(val) {
      this.taskNoDialog = val;
      // this.fun(this.funDate);
    },
    handleScroll(e) {
      var top = e.srcElement.scrollingElement.scrollTop;
      this.scorllY = top;
      if (top > 20) {
        this.CalendarB = false;
      }
    },
    touchstart(e) {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    touchmove(e) {
      this.endX = e.touches[0].clientX;
      this.endY = e.touches[0].clientY;
      if (this.startY - this.endY >= 5) {
        this.CalendarB = false;
      }
      if (this.startY - this.endY <= -50 && this.scorllY <= 5) {
        this.CalendarB = true;
      }
    },
    fun(msg) {
      this.funDate = msg;
      msg = moment(msg).format("yyyy-MM-DD");
      console.log(msg);
      // this.value = new Date(msg);
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/list?matterOpenStr=" +
            msg +
            "&userId=" +
            sessionStorage.getItem("userId")
        )
        .then((msg) => {
          // console.log(msg);
          if (msg.data.data.length > 0) {
            var data = msg.data.data;
            for (let i = 0; i < data.length; i++) {
              // console.log(moment(data[i].remindTime).format("yyyy/MM/DD"));
              data[i].remindTime = moment(data[i].remindTime).format(
                "yyyy/MM/DD"
              );
              data[i].createTime = moment(data[i].createTime).format("MM/DD");
              data[i].end = moment(data[i].end).format("MM/DD");
              data[i].matterOpen = moment(data[i].matterOpen).format("MM/DD");
              if (data[i].importantOne === 1) {
                if (data[i].urgentOne === 1) {
                  data[i].className = "red";
                } else {
                  data[i].className = "orange";
                }
              } else {
                if (data[i].urgentOne === 1) {
                  data[i].className = "blue";
                } else {
                  data[i].className = "green";
                }
              }
            }
          }
          this.data = data;
          // console.log(this.arr);
        });
    },
    overget(msg) {
      console.log(msg);
      this.msgData[this.index] = msg;
      var daff = this.data;
      this.data = "";

      setTimeout(() => {
        console.log((this.data = daff));
      }, 200);
    },
  },
  destroyed() {
    // console.log(1);
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style scoped>
.top {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 50;
  background: #fff !important;
}
.top2 {
  opacity: 0;
}
.bookMark {
  overflow: scroll;
  text-align: right;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 20px;
  height: 20px;
}

.MiniVueCalendarWeek {
  position: fixed;
  top: 40px;
  width: 100%;
  z-index: 999;
}
.MiniVueCalendarWeek2 {
  opacity: 0;
  /* position: relative;
  z-index: -99; */
}
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>
<style lang="scss">
.wh_container {
  .wh_top_changge {
    li {
      color: #333333 !important;
      .wh_jiantou1 {
        width: 12px;
        height: 12px;
        border-top: 2px solid #999999 !important ;
        border-left: 2px solid #999999 !important;
        transform: rotate(-45deg);
      }
      .wh_jiantou2 {
        width: 12px;
        height: 12px;
        border-top: 2px solid #999999 !important;
        border-right: 2px solid #999999 !important;
        transform: rotate(45deg);
      }
    }
  }
  .wh_content_all {
    background: #fff !important;
  }
  .wh_content_item {
    color: #333333 !important;
    .green {
      background: #1fc326 !important;
    }
    .blue {
      background: #357afc !important;
    }
    .orange {
      background: #ef9c0c !important;
    }
    .red {
      background: #f91f1f !important;
    }

    .wh_isToday {
      border-radius: 5px;
      background: #f91f1f !important;
      color: #fff;
    }
    .wh_chose_day {
      border-radius: 5px;
      background: #f91f1f !important;
    }
  }
}
</style>