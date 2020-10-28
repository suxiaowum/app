
<template>
  <!-- 登录页 -->
  <div class="loginBox">
    <el-row :gutter="10" class="loginRow">
      <el-col :span="6" :offset="9" style="text-align:center">
        <span class="title">登 录</span>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:40px;">
      <el-col :span="19" :offset="1">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="loginForm.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" show-password v-model="loginForm.pass" size="mini"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" style="width:100%" @click="togo">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        name: "MrBird",
        pass: "1234qwer",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    sessionStorage.setItem("userId", "");
  },
  methods: {
    togo() {
      this.$refs.loginForm.validate((valid) => {
        // 判断form rules
        if (valid) {
          axios
            .get(this.AJAX.AJAX_URL + "/user/login", {
              params: {
                username: this.loginForm.name,
                password: this.loginForm.pass,
              },
            })
            .then((msg) => {
              console.log(msg);
              if (msg.data.state === "2000") {
                sessionStorage.setItem("userId", msg.data.data.userId);
                // sessionStorage.setItem("user", JSON.stringify(msg.data.data));
                sessionStorage.setItem("login", "denglu");
                console.log(sessionStorage.getItem("userId"));
                this.$router.push("/index");
              } else {
                this.$message({
                  duration: 1000,
                  message: msg.data.message,
                  type: "error",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    f() {},
  },
};
</script>
<style scoped>
.loginBox {
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: absolute;
}
.loginRow {
  margin-top: 40%;
}
.title {
  font-size: 22px;
  color: #202336;
  font-weight: bold;
}
.loginBox {
  position: fixed;
  width: 100%;
}
</style>