<template>
  <div id="xiugai">
    <el-dialog
      :visible.sync="taskNoDialog"
      width="80%"
      top="5rem"
      class="fourDialog"
      :before-close="closeFun"
      @open="taskloadVal"
    >
      <span
        slot="title"
        @click="closeFun"
        style="float: left; margin-left: 1rem; font-size: 1.5rem"
        >X</span
      >

      <div style="border-bottom: 1px solid #e5e5e5; padding-bottom: 5px">
        <el-card class="topRadios">
          <div v-if="this.overForm.finish === 0">
            <img class="overImg" src="../assets/g.png" ref="londImg" alt />
            <span style="color: #333333">未完成</span>
          </div>
          <div v-else>
            <img class="overImg" src="../assets/f.png" ref="londImg" alt />
            <span>已完成</span>
          </div>
        </el-card>
        <div class="tudingBox" v-if="overForm.sign === 0" @click="signIn(1)">
          <i
            class="iconfont icon-tuding"
            style="font-size: 24px; line-height: 40px"
          ></i>
        </div>
        <div class="tudingBox" v-else @click="signIn(0)">
          <i
            class="iconfont icon-tuding"
            style="font-size: 24px; line-height: 40px; color: red"
          ></i>
        </div>
        <el-form
          :model="overForm"
          :label-width="formLabelWidth"
          style="padding-top: 20px"
          class="overFormClass"
        >
          <el-form-item label="是否完成">
            <el-row :gutter="10">
              <el-col :span="6" :offset="9">
                <el-switch
                  v-model="taskload"
                  active-color="#3C76FF"
                  inactive-color="#E2E2E2"
                  @change="taskLoadFun"
                ></el-switch>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="事项">
            <br />
            <span>{{ overForm.matterName }}</span>
          </el-form-item>
          <el-form-item label="提醒时间">
            <br />
            <p v-for="(item, index) in dateMsg" :key="index">
              {{ item.remindTime }}
            </p>
          </el-form-item>
          <el-form-item label="创建时间">
            <br />
            <span>{{ overForm.createTime }}</span>
          </el-form-item>
          <el-form-item label="日程安排">
            <br />
            <span>{{ overForm.matterOpen }}-{{ overForm.end }}</span>
          </el-form-item>
          <el-form-item label="工作内容">
            <br />
            <span class="workValue">{{ overForm.matterText }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button
          type="text"
          style="color: #333333; font-size: 18px; font-weight: bold"
          @click="TaskEditFun"
          >编 辑</el-button
        >
        <el-button
          @click="taskDelete"
          type="text"
          style="
            color: #333333;
            font-size: 18px;
            font-weight: bold;
            margin-left: 2.5rem;
            margin-right: 2.215rem;
          "
          >删 除</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="TaskEdit"
      width="80%"
      top="5rem"
      class="fourDialog"
      @close="closeDialog"
    >
      <span
        slot="title"
        @click="TaskEdit = false"
        style="float: right; margin-right: 1rem; font-size: 1.5rem"
        >X</span
      >

      <el-form :model="newFormEdit" size="mini">
        <el-form-item label="事项" :label-width="formLabelWidth">
          <br />
          <el-input
            v-model="newFormEdit.matterName"
            size="mini"
            placeholder="请输入内容"
            :disabled="overForm.deptId !== 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="象限" :label-width="formLabelWidth">
          <br />

          <el-checkbox
            label="重要"
            :true-label="1"
            :false-label="0"
            v-model="newFormEdit.important"
          ></el-checkbox>
          <el-checkbox
            label="紧急"
            :true-label="1"
            :false-label="0"
            v-model="newFormEdit.urgent"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="日程时间安排">
          <span>是否循环</span>
          <el-switch
            :disabled="overForm.deptId !== 0"
            style="margin-left: 1.25rem"
            v-model="newFormEdit.forEach"
            :active-value="1"
            :inactive-value="0"
            active-color="#3C76FF"
            inactive-color="#999999"
          ></el-switch>
          <br />
          <span>{{ newFormEdit.matterOpen }}-{{ newFormEdit.end }}</span>
        </el-form-item>
        <el-form-item label="事件提醒设置">
          <br />
          <el-row :gutter="10" v-for="(msg, key) in dateMsg" :key="key">
            <el-col :span="10">{{ msg.remindTime }}</el-col>
            <el-col :span="6" :offset="6">
              <el-button
                type="text"
                @click="dateDelete(msg)"
                v-if="msg.userBy !== 0"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in newFormEdit.domains"
          :key="domain.key"
        >
          <!-- <el-date-picker v-model="domain.date" type="date" format="YYYY-MM-DD" placeholder="date"></el-date-picker> -->
          <el-date-picker
            v-model="domain.dateValue"
            type="date"
            placeholder="点击新增提醒日期"
            value-format="yyyy-MM-dd"
            @blur="DateBlur(index)"
            :editable="false"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="mini"
            @click="addDomainDate"
          >添 加</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="text"
          style="color: #333333; font-size: 18px; font-weight: bold"
          @click="TaskEdit = false"
          >取 消</el-button
        >
        <el-button
          @click="TaskEditTrue"
          type="text"
          style="
            color: #333333;
            font-size: 18px;
            font-weight: bold;
            margin-left: 2.5rem;
            margin-right: 2.215rem;
          "
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  props: {
    taskNoDialog: Boolean,
    overForm: Object,
  },
  data() {
    return {
      tixingTime: [],
      taskload: null,
      formLabelWidth: "32",
      TaskEdit: false,
      newFormEdit: {},
      dateMsg: [],
    };
  },
  watch: {
    overForm() {
      this.dateMsgFun();
    },
  },
  methods: {
    taskloadVal() {
      if (this.overForm.finish === 1) {
        this.taskload = true;
      } else {
        this.taskload = false;
      }
      // console.log(this.taskload);
    },
    signIn(val) {
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/updates" +
            "?userId=" +
            sessionStorage.getItem("userId"),
          {
            params: {
              importantOne: this.overForm.importantOne,
              urgentOne: this.overForm.urgentOne,
              matterId: this.overForm.matterId,
              SIGN: val,
              finish: this.overForm.finish,
            },
          }
        )
        .then((msg) => {
          // console.log(msg);
          this.overForm.sign = val;
        });
    },
    taskLoadFun(msg) {
      console.log(this.overForm.over);
      console.log(msg);
      console.log(this.overForm);
      if (msg) {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/finish?userId=" +
              sessionStorage.getItem("userId"),
            {
              params: {
                matterId: this.overForm.matterId,
                finish: 1,
              },
            }
          )
          .then((msg) => {
            console.log(msg);
            this.overForm.finish = 1;
          });
      } else {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/finish?userId=" +
              sessionStorage.getItem("userId"),
            {
              params: {
                matterId: this.overForm.matterId,
                finish: 0,
              },
            }
          )
          .then((msg) => {
            this.overForm.finish = 0;
            console.log(msg);
          });
      }
    },
    TaskEditFun() {
      this.newFormEdit = JSON.parse(JSON.stringify(this.overForm));
      console.log(this.newFormEdit);

      // for (const key in this.overForm) {
      //   if (this.overForm.hasOwnProperty(key)) {
      //     this.newFormEdit[key] = this.overForm[key];
      //   }
      //   this.newFormEdit.forEach = Number(this.overForm.forEach);
      // }

      // console.log(this.newFormEdit);
      this.newFormEdit.domains = [
        {
          dateValue: "",
        },
      ];
      this.dateMsgFun();
      // console.log(this.newFormEdit)
      this.TaskEdit = true;
      this.$emit("taskNoDialogChange", false);
    },
    // 事件提醒日期获取
    dateMsgFun() {
      console.log(this.overForm.matterId);
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/remind/getBymatterId?matterId=" +
            this.overForm.matterId +
            "&userId=" +
            sessionStorage.getItem("userId")
        )
        .then((msg) => {
          if (msg.data.state === "2000") {
            this.dateMsg = [];
            for (let i = 0; i < msg.data.data.length; i++) {
              msg.data.data[i].remindTime = moment(
                msg.data.data[i].remindTime
              ).format("MM-DD");
              this.dateMsg.push(msg.data.data[i]);
            }
          }
          // console.log(msg);
        });
    },
    // 删除事项
    taskDelete() {
      // console.log(this.overForm);
      // console.log(this.overForm.deptId);
      if (this.overForm.deptId === 0) {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/delete?matterId=" +
              this.overForm.matterId +
              "&useid=" +
              sessionStorage.getItem("userId")
          )
          .then((msg) => {
            // console.log(msg);
            if (msg.data.state === "2000") {
              this.$message({
                duration: 1000,
                message: "删除成功",
                type: "success",
              });
              this.$emit("taskNoDialogChange", false);
            } else {
              this.$message({
                duration: 1000,
                message: "删除失败",
                type: "error",
              });
            }
          });
      } else {
        this.$message({
          duration: 1000,
          message: "部门任务不允许删除",
          type: "error",
        });
      }
    },
    closeFun() {
      this.$emit("taskNoDialogChange", false);
    },
    // 修改事项框关闭事件
    closeDialog() {
      // console.log(this.newFormEdit);
      var _this = this;
      // Object.keys(this.newFormEdit).forEach((key) => {
      //   this.newFormEdit[key] = "";
      // });
    },
    // 删除提醒日期
    dateDelete(msg) {
      // console.log(msg);
      axios
        .get(this.AJAX.AJAX_URL + "/remind/delete/" + msg.remindId)
        .then((msg) => {
          this.dateMsgFun();
          // console.log(msg);
        });
    },
    DateBlur(msg) {
      var a = msg;
      if (this.newFormEdit.domains[a].dateValue !== "") {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/remind/add?remindId=&matterId=" +
              this.newFormEdit.matterId +
              "&remindTimestr=" +
              this.newFormEdit.domains[msg].dateValue +
              "&userId=" +
              sessionStorage.getItem("userId")
          )
          .then((msg) => {
            if (msg.data.state === "2000") {
              this.dateMsgFun();
              this.newFormEdit.domains[a].dateValue = "";
              this.TaskEdit = false;
              this.TaskEdit = true;
            } else {
              this.$message.error(msg.data.message);
            }
          })
          .catch((err) => {
            this.$message.error("添加失败");
          });
      }

      // console.log(this.newFormEdit.domains[msg].dateValue)
    },
    TaskEditTrue() {
      console.log(this.newFormEdit);
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/update?userId=" +
            sessionStorage.getItem("userId"),
          {
            params: {
              important: this.newFormEdit.important,
              urgent: this.newFormEdit.urgent,
              matterId: Number(this.newFormEdit.matterId),
              finish: this.newFormEdit.finish,
              matterName: this.newFormEdit.matterName,
              SIGN: this.newFormEdit.sign,
              forEach: this.newFormEdit.forEach,
            },
          }
        )
        .then((msg) => {
          if (msg.data.state === "2000") {
            this.$message({
              duration: 1000,
              message: "保存成功",
              type: "success",
            });
            // console.log("object");
            this.$emit("overget", this.newFormEdit);
            this.TaskEdit = false;
          } else {
            this.$message({
              duration: 1000,
              message: "保存失败",
              type: "error",
            });
          }
        });
    },
  },
};
</script>
<style lang="css" scoped>
.el-card {
  width: 100%;
  height: 18.75rem;
  border: 0;
  overflow: scroll;
}
.bigCard {
  margin-top: 12px;
  width: 21.9375rem;
  height: 38.9375rem;
  overflow: scroll;
}
.ColorNum {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  font-size: 0.8125rem;
  text-align: center;
  line-height: 1rem;
}

.textTop {
  font-size: 0.875rem;
  color: #333333;
}
.textCenter {
  font-size: 0.75rem;
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
.el-form-item {
  margin-bottom: 15px;
}
.el-form-item >>> .el-form-item__label {
  font-size: 1rem;
  color: #333333;
  font-weight: bold;
}
.topRadios {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  position: absolute;
  top: -2.5rem;
  left: 0;
  right: 0;
  margin: auto;
}
.overImg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  margin: auto;
}
.topRadios span {
  display: block;
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
  font-size: 14px;
  font-weight: bold;
  color: #357afc;
}
.tudingBox {
  text-align: right;
  position: absolute;
  top: 16px;
  right: 14px;
}
.workValue {
  display: block;
  line-height: 22px;
}
</style>
<style>
/* .fourDialog .el-dialog__header {
  padding: 0px !important;
}
.fourDialog .el-dialog {
  border-radius: 10px !important;
}
.fourDialog .el-dialog__close {
  display: none;
}
.overFormClass .el-form-item {
  margin-bottom: 0;
}
.listFormClass .el-radio-group .el-radio-button__inner {
  padding: 7px 8px;
} */
</style>