<template>
  <div id="paixu">
    <el-dialog
      class="fourDialog"
      :visible.sync="dataList"
      width="90%"
      top="5rem"
      :before-close="closeFun"
    >
      <div>
        <el-form :model="listForm" :label-width="formLabelWidth" class="listFormClass">
          <el-form-item label="展示时间类型">
            <br />
            <el-radio-group v-model="listForm.timeRadio" size="small">
              <el-radio-button label="1">创建时间</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="listForm.timeRadio" size="small" style="margin-left:10px;">
              <el-radio-button label="2">要求完成时间</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="listForm.timeRadio" size="small" style="margin-left:10px;">
              <el-radio-button label="3">实际完成时间</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序">
            <br />
            <el-radio-group v-model="listForm.listRadio" size="small" @change="sortFun">
              <el-radio-button label="0">升序</el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-model="listForm.listRadio"
              size="small"
              @change="sortFun"
              style="margin-left:10px;"
            >
              <el-radio-button label="1">降序</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="展示已完成的">
            <br />
            <el-radio-group v-model="listForm.overRadio" size="small" @change="finshFun">
              <el-radio-button label="0">否</el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-model="listForm.overRadio"
              size="small"
              @change="finshFun"
              style="margin-left:10px;"
            >
              <el-radio-button label="1">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="closeFun">取 消</el-button>
        <el-button type="primary" @click="paixuFun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    dataList: Boolean,
    tudingOn: Boolean,
  },
  data() {
    return {
      formLabelWidth: "32",
      listForm: {
        timeRadio: "1",
        listRadio: "0",
        overRadio: "0",
      },
    };
  },
  methods: {
    paixuFun() {
      if (this.tudingOn) {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/list?order=" +
              this.listForm.listRadio +
              "&userId=" +
              sessionStorage.getItem("userId") +
              "&SIGN=1" +
              "&status=" +
              this.listForm.timeRadio +
              "&finish=" +
              this.listForm.overRadio
          )
          .then((msg) => {
            console.log(msg);
            this.$emit("listMsg", msg);
            this.$emit("radio", this.listForm);
            this.$emit("dataListChange", false);
            sessionStorage.setItem('paixu',JSON.stringify(this.listForm))
          })
          .catch(() => {
            this.$emit("dataListChange", false);
          });
      } else {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/list?order=" +
              this.listForm.listRadio +
              "&userId=" +
              sessionStorage.getItem("userId") +
              "&status=" +
              this.listForm.timeRadio +
              "&finish=" +
              this.listForm.overRadio
          )
          .then((msg) => {
            sessionStorage.setItem('paixu',JSON.stringify(this.listForm))
            console.log(msg)
            this.$emit("listMsg", msg);
            this.$emit("radio", this.listForm);
            this.$emit("dataListChange", false);
          })
          .catch(() => {
            this.$emit("dataListChange", false);
          });
      }
    },
    finshFun(msg) {
      // console.log(msg);
    },
    sortFun(msg) {},
    closeFun() {
      this.$emit("dataListChange", false);
      this.$emit("radio", this.listForm);
    },
  },
};
</script>