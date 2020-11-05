<template>
  <div id="newtask">
    <el-dialog
      :visible.sync="newTaskShow"
      width="80%"
      top="5rem"
      class="fourDialog"
      :before-close="closeFun"
    >
      <span
        slot="title"
        @click="closeFun"
        style="float: right; margin-right: 1rem; font-size: 1.5rem"
        >X</span
      >

      <el-form
        :model="newForm"
        :hide-required-asterisk="true"
        :rules="rules"
        ref="newtaskBox"
      >
        <el-form-item
          label="事项"
          :label-width="formLabelWidth"
          prop="matterName"
        >
          <br />
          <el-input
            v-model="newForm.matterName"
            size="mini"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="象限" :label-width="formLabelWidth">
          <br />
          <el-checkbox
            label="重要"
            true-label="1"
            false-label="0"
            v-model="newForm.important"
            @change="changeFun"
          ></el-checkbox>
          <el-checkbox
            label="紧急"
            true-label="1"
            false-label="0"
            v-model="newForm.urgent"
            @change="changeFun"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="日程时间安排" prop="matterOpen" size="mini">
          <el-date-picker
            :editable="false"
            v-model="newForm.matterOpen"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            @change="changeFun"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="end" size="mini">
          <el-date-picker
            style="margin-top: 10px"
            :editable="false"
            v-model="newForm.end"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            @change="changeFun"
            :picker-options="pickerOption0"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="任务内容">
          <el-input type="textarea" v-model="newForm.matterText"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="text"
          style="color: #333333; font-size: 18px; font-weight: bold"
          @click="closeFun"
          >取 消</el-button
        >
        <el-button
          @click="newTaskFun"
          type="text"
          style="
            color: #333333;
            font-size: 18px;
            font-weight: bold;
            margin-left: 2.5rem;
            margin-right: 2.215rem;
          "
          >添 加</el-button
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
    newTaskShow: Boolean,
  },
  mounted() {},
  data() {
    return {
      newForm: {
        matterName: "",
        important: "0",
        urgent: "0",
        matterOpen: "",
        end: "",
        matterText: "",
      },
      formLabelWidth: "32",
      rules: {
        matterName: [{ required: true, message: " ", trigger: "blur" }],
        matterOpen: [
          {
            type: "date",
            required: true,
            message: " ",
            trigger: "change",
          },
        ],
        end: [
          {
            type: "date",
            required: true,
            message: " ",
            trigger: "change",
          },
        ],
      },
      pickerOptions: {
        disabledDate: (time) => {
          if (this.newForm.end != "") {
            return time.getTime() > this.newForm.end;
          } else {
            return;
          }
        },
      },
      pickerOption0: {
        disabledDate: (time) => {
          return time.getTime() < this.newForm.matterOpen;
        },
      },
    };
  },
  created() {
    this.newTask = true;
    console.log(1);
  },
  methods: {
    newTaskFun() {
      this.$refs.newtaskBox.validate((valid) => {
        if (valid) {
          axios
            .get(
              this.AJAX.AJAX_URL +
                "/matter/add?userId=" +
                sessionStorage.getItem("userId"),
              {
                params: {
                  matterName: this.newForm.matterName,
                  important: this.newForm.important,
                  matterOpenStr: moment(this.newForm.matterOpen).format(
                    "yyyy-MM-DD"
                  ),
                  endStr: moment(this.newForm.end).format("yyyy-MM-DD"),
                  urgent: this.newForm.urgent,
                  matterText: this.newForm.matterText,
                },
              }
            )
            .then((msg) => {
              if (msg.data.state === "2000") {
                console.log("ssssssssssss");

                Object.keys(this.newForm).forEach((key) => {
                  this.newForm[key] = "";
                });
                this.$refs.newtaskBox.resetFields();
                this.$emit("newTaskShowChange", false);
                this.$message({
                  duration: 1000,
                  message: "添加成功",
                  type: "success",
                });
              }
            })
            .catch((error) => {
              this.$message({
                duration: 1000,
                message: "添加失败",
                type: "error",
              });
            });
        }
      });
    },
    changeFun(msg) {
      console.log(msg);
    },
    closeFun() {
      console.log(this.newTaskShow);
      this.$emit("newTaskShowChange", false);
    },
  },
};
</script>

<style scoped>
/* .el-form-item {
  margin-bottom: 15px;
} */
.el-form-item {
  margin-bottom: 0;
}
.el-form-item >>> .el-form-item__label {
  font-size: 1rem;
  color: #333333;
  font-weight: bold;
}
</style>