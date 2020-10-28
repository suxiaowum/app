<template>
  <div>
    <el-row :gutter="10" class="top">
      <el-col :span="8" :offset="8">
        <div style="text-align: center; line-height: 40px">时间轴</div>
      </el-col>
      <el-col :span="2" :offset="2">
        <i
          class="el-icon-circle-plus-outline"
          style="font-size: 24px; line-height: 40px"
          @click="newTaskFun"
        ></i>
      </el-col>
      <el-col :span="3">
        <i
          v-if="tudingOn"
          class="iconfont icon-tuding"
          style="font-size: 24px; line-height: 40px; color: rgb(53, 122, 252)"
          @click="searchTuding"
        ></i>
        <i
          v-else
          class="iconfont icon-tuding"
          style="font-size: 24px; line-height: 40px"
          @click="searchTuding"
        ></i>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="Top">
      <el-col :span="22" :offset="1">
        <el-timeline class="lineBox">
          <el-timeline-item
            v-for="(msg, i) in msgData"
            :key="i"
            icon="el-icon-success"
            type="primary"
            :color="msg.color"
            size="large"
            @click.native="msgFun(msg, i)"
          >
            <s
              v-if="msg.finish === 1"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 50%;
                display: block;
              "
              >{{ msg.matterName }}</s
            >
            <span
              v-else
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 50%;
                display: block;
              "
              >{{ msg.matterName }}</span
            >
            <br />
            <s v-if="msg.finish === 1">{{ msg.end }}</s>
            <span v-else>{{ msg.end }}</span>
            <br />
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
    <newTask :newTaskShow="newTaskShow" @newTaskShowChange="test1"></newTask>
    <xiugai
      :overForm="overVal"
      :taskNoDialog="taskNoDialog"
      @taskNoDialogChange="test2"
      @overget="overget"
    ></xiugai>
    <div class="flexButton" @click="Popup">
      <img src="../assets/e.png" alt />
    </div>
    <paixu
      :dataList="dataList"
      @radio="radio"
      @dataListChange="test3"
      @listMsg="listMsg"
      :tudingOn="tudingOn"
    ></paixu>
  </div>
</template>
<style lang="css" scoped>
.Top {
  margin-top: 20px;
  padding-top: 20px;
  /* text-align: center; */
}
.infoClass {
  color: #999999;
}
.flexButton {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  position: fixed;
  top: 80%;
  right: 1.5rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px rgba(3, 46, 126, 0.1);
  opacity: 1;
}
.flexButton img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.flexButton p {
  text-align: center;
  line-height: 3rem;
  color: #357afc;
  font-size: 14px;
}
</style>
<style>
.lineBox .el-timeline-item__node {
  width: 23px;
  height: 23px;
}
.lineBox .el-timeline-item__node i {
  font-size: 22px;
}
</style>
<script>
import axios from "axios";
import moment from "moment";
import newTask from "./newTask.vue";
import xiugai from "./xiugai.vue";
import paixu from "./paixu.vue";
export default {
  components: {
    newTask,
    xiugai,
    paixu,
  },
  data() {
    return {
      index: null,
      activities: [],
      msgData: {},
      newTaskShow: false,
      tudingOn: false,
      overVal: {},
      taskNoDialog: false,
      dataList: false,
      radioObj: {
        timeRadio: "1",
        listRadio: "0",
        overRadio: "0",
      },
    };
  },
  created() {
    this.allmsg();
  },
  methods: {
    Popup() {
      this.dataList = true;
    },
    allmsg() {
      console.log(this.radioObj);
      axios
        .get(
         this.AJAX.AJAX_URL +
              "/matter/list?order=" +
              this.radioObj.listRadio +
              "&userId=" +
              sessionStorage.getItem("userId") +             
              "&status=" +
              this.radioObj.timeRadio +
              "&finish=" +
              this.radioObj.overRadio
        )
        .then((msg) => {
          for (let i = 0; i < msg.data.data.length; i++) {
            msg.data.data[i].createTime = moment(
              msg.data.data[i].createTime
            ).format("yy/MM/DD");
            msg.data.data[i].end = moment(msg.data.data[i].end).format(
              "yy/MM/DD"
            );
            msg.data.data[i].matterOpen = moment(
              msg.data.data[i].matterOpen
            ).format("yy/MM/DD");
            if (msg.data.data[i].finish === 1) {
              msg.data.data[i].color = "#999999";
            } else {
              if (msg.data.data[i].importantOne === 1) {
                if (msg.data.data[i].urgentOne === 1) {
                  msg.data.data[i].color = "#F91F1F";
                } else {
                  msg.data.data[i].color = "#EF9C0C";
                }
              } else {
                if (msg.data.data[i].urgentOne === 1) {
                  msg.data.data[i].color = "#357AFC";
                } else {
                  msg.data.data[i].color = "#1FC326";
                }
              }
            }
          }
          // console.log(msg.data.data);
          this.msgData = msg.data.data;
          // console.log(this.redData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newTaskFun() {
      this.newTaskShow = true;
    },
    test1(val) {
      console.log(val);
      this.newTaskShow = val;
      this.allmsg();
    },
    test2(val) {
      this.taskNoDialog = val;
      this.allmsg();
    },
    test3(val) {
      this.dataList = val;
      // console.log(val);
      // this.allmsg();
    },

    radio(val) {
      this.radioObj = val;
      console.log(this.radioObj);
      console.log(val);
    },
    searchTuding() {
      if (this.tudingOn === true) {
        this.allmsg();
        this.tudingOn = false;
      } else {
        this.tudingOn = true;
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/list?SIGN=1&userId=" +
              sessionStorage.getItem("userId"),
            {
              //  withCredentials:true
            }
          )
          .then((msg) => {
            console.log(msg);
            for (let i = 0; i < msg.data.data.length; i++) {
              msg.data.data[i].createTime = moment(
                msg.data.data[i].createTime
              ).format("yy/MM/DD");
              msg.data.data[i].end = moment(msg.data.data[i].end).format(
                "yy/MM/DD"
              );
              msg.data.data[i].matterOpen = moment(
                msg.data.data[i].matterOpen
              ).format("yy/MM/DD");
              if (msg.data.data[i].finish === 1) {
                msg.data.data[i].color = "#999999";
              } else {
                if (msg.data.data[i].importantOne === 1) {
                  if (msg.data.data[i].urgentOne === 1) {
                    msg.data.data[i].color = "#F91F1F";
                  } else {
                    msg.data.data[i].color = "#EF9C0C";
                  }
                } else {
                  if (msg.data.data[i].urgentOne === 1) {
                    msg.data.data[i].color = "#357AFC";
                  } else {
                    msg.data.data[i].color = "#1FC326";
                  }
                }
              }
            }
            this.msgData = msg.data.data.reverse();
          })
          .catch((error) => {});
      }
    },
    msgFun(msg, index) {
      this.index = index;
      // console.log(msg);
      this.overVal = msg;
      this.taskNoDialog = true;
    },
    overget(msg) {
      console.log(msg);
      this.msgData[this.index] = msg;
      var daff = this.msgData;
      this.msgData = "";

      setTimeout(() => {
        console.log((this.msgData = daff));
      }, 200);
    },
    listMsg(msg) {
      for (let i = 0; i < msg.data.data.length; i++) {
        msg.data.data[i].createTime = moment(
          msg.data.data[i].createTime
        ).format("yy/MM/DD");
        msg.data.data[i].end = moment(msg.data.data[i].end).format("yy/MM/DD");
        msg.data.data[i].matterOpen = moment(
          msg.data.data[i].matterOpen
        ).format("yy/MM/DD");
        if (msg.data.data[i].finish === 1) {
          msg.data.data[i].color = "#999999";
        } else {
          if (msg.data.data[i].importantOne === 1) {
            if (msg.data.data[i].urgentOne === 1) {
              msg.data.data[i].color = "#F91F1F";
            } else {
              msg.data.data[i].color = "#EF9C0C";
            }
          } else {
            if (msg.data.data[i].urgentOne === 1) {
              msg.data.data[i].color = "#357AFC";
            } else {
              msg.data.data[i].color = "#1FC326";
            }
          }
        }
      }
      this.msgData = msg.data.data;
    },
  },
};
</script>
