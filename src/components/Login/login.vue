<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button type="primary">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
// 引入axios
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          // 校验通过，发送请求
          axios
            .get("static/login.json", {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(res => {
              console.log(res);
              //   登录成功跳转至主页
              if (res.status === 200) {
                //   存储token值
                localStorage.setItem("token", res.data.token);
                // 跳转路由（编程式导航）
                this.$router.push({ path: "/home" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>



<style lang="less" scoped>
.demo-ruleForm {
  margin: 10% auto;
}
.el-form-item {
  width: 30%;
  margin: 15px auto;
  .el-button {
    width: 49%;
    margin: 0 auto;
  }
}
</style>
