<template>
  <div class="home-container">
    <div class="header">
      <ul class="nav-bar">
          <!-- 渲染页面 -->
        <li v-for="item in navList" :key="item">{{item}}</li>
      </ul>
      <div class="logout">
        <el-button size="small" :plain="true" @click="logout" >退出登录</el-button>
      </div>
    </div>
  </div>
</template>


<script>
// 导入axios
// import axios from 'axios';
import { getNav } from "@/components/api";

export default {
  data() {
    return {
      navList: []
    };
  },
  created() {
      this.getNav();
  },
  methods: {
    // 获取导航栏
    getNav() {
        getNav().then( res => {
            if (res.status === 200) {
                this.navList = res.data.navList;
            }
        })
    },
    // 退出登录操作
    logout() {
        this.$message({
          showClose: true,
          message: '恭喜你，注销成功',
          type: 'success',
          duration: 1000
        });
        // 清除token值
        localStorage.removeItem('token');
        // 跳转至登录页面（编程式导航）
        this.$router.push({path: '/login'})
        

      }
  }
};
</script>



<style lang="less" scoped>
.header {
  // width: 100%;
  height: 80px;
  position: relative;
  ul {
    line-height: 80px;
    float: right;
    margin-right: 300px;

    li {
      height: 80px;
      float: left;
      padding-left: 25px;
    }
    li:hover {
        cursor: pointer;
        color: rgb(17, 143, 247);
    }
  }

  .logout {
    position: absolute;
    right: 100px;
    line-height: 80px;
  }
}
</style>
