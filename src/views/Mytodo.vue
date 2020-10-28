<template>
  <div>
    <div class="top">
      <el-row :gutter="10">
        <el-col :span="8" :offset="8">
          <div style="text-align: center;line-height:40px;z-index">我的待办</div>
        </el-col>
        <el-col :span="2" :offset="2">
          <i
            class="el-icon-circle-plus-outline"
            @click="newTaskFun"
            style="font-size:24px;line-height:40px"
          ></i>
        </el-col>
        <el-col :span="3">
          <!-- <i class="iconfont icon-tuding" style="font-size:24px;line-height:40px"></i> -->
        </el-col>
      </el-row>
    </div>
    <div style="margin-top:4px;" @click="goFour">
      <el-row :gutter="10">
        <el-col :span="3" :offset="1">
          <img src="../assets/i.png" alt />
        </el-col>
        <el-col :span="6">
          <span class="textBox">办公待办</span>
        </el-col>
        <el-col :span="11">
          <span style="font-size:14px; opacity: 0;">0</span>
        </el-col>
        <el-col :span="2">
          <div style="height:40px; width:20px; position:relative">
            <div class="numBox">
              <div>{{msg}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <newTask :newTaskShow="newTaskShow" @newTaskShowChange="test1"></newTask>
  </div>
</template>
<script>
import axios from "axios";
import newTask from "./newTask.vue";

export default {
  components: {
    newTask
  },
  data() {
    return {
      msg: "0",
      newTaskShow: false
    };
  },
  created() {
    this.allmsg();
  },
  methods: {
    allmsg() {
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/list?userId=" +
            sessionStorage.getItem("userId") +
            "&IsOpen=0"
        )
        .then(msg => {
          console.log(msg);
          this.msg = msg.data.data.length;
        })
        .catch(error => {
        });
    },
    goFour() {
      // console.log(1)
      this.$emit("getmsg", 1);
    },
    test1(val) {
      console.log(val);
      this.newTaskShow = val;
      this.allmsg();
    },
    newTaskFun() {
      this.newTaskShow = true;
    }
  }
};
</script>
<style scoped>
.textBox {
  font-size: 16px;
  line-height: 40px;
  font-weight: bold;
  color: #333333;
}
.numBox {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 11px;
  color: #fff;
  line-height: 16px;
  text-align: center;
  background: #f91f1f;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>