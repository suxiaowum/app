<template>
  <div id="Box">
    <FourQuadrants v-if='IndexActive === "1"'></FourQuadrants>
    <timeAxis v-if='IndexActive === "2"'></timeAxis>
    <calendar v-if='IndexActive === "3"'></calendar>
    <Mytodo v-if='IndexActive === "4"' @getmsg="getmsgs"></Mytodo>
    <div id="menuBox">
      <el-menu
        :default-active="IndexActive"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#292E4E"
        text-color="#999999"
        active-text-color="#fff"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">四象限</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span class="iconfont">&#xe62e;</span>
          <span slot="title">时间轴</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span class="iconfont">&#xe62a;</span>
          <span slot="title">日历</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span class="iconfont">&#xe629;</span>
          <span slot="title">我的待办</span>
        </el-menu-item>
      </el-menu>
    </div>
     <div id="menuBox2">
      <el-menu
        :default-active="IndexActive"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#292E4E"
        text-color="#999999"
        active-text-color="#fff"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">四象限</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span class="iconfont">&#xe62e;</span>
          <span slot="title">时间轴</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span class="iconfont">&#xe62a;</span>
          <span slot="title">日历</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span class="iconfont">&#xe629;</span>
          <span slot="title">我的待办</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
  <!-- <div>
    <router-view></router-view>
  </div> -->
</template>
<script>
import FourQuadrants from '../views/FourQuadrants';
import timeAxis from '../views/timeAxis';
import calendar from '../views/calendar';
import Mytodo from '../views/Mytodo';
export default {
  components: {
    FourQuadrants,
    timeAxis,
    calendar,
    Mytodo
  },
  data() {
    return {
      IndexActive: "1"
    };
  },
  created(){
    var login = sessionStorage.getItem('login')
    if(sessionStorage.getItem('login')=== 'denglu'){
      console.log('已登录')
      this.IndexActive = "1"     
    }else{
      
      this.$router.push('/')
    }
  },
  methods:{
    handleSelect(key){
      this.IndexActive = key
      // console.log(this.IndexActive + key)
    },
    getmsgs(msg){
     this.IndexActive = '1'
    }
  }
};
</script>
<style lang="css" scoped>
#menuBox {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
}
#menuBox2{
  opacity: 0;
  position: relative;
  z-index: -5;
}
#menuBox li {
  border: 0;
  text-align: center;
}
#menuBox li i {
  position: absolute;
  /* display: i nline-block; */
  /* float: left; */
  /* margin: 5px 0px 10px 0px; */
  text-align: center;
  top: 10px;
  /* left: 0; */
  right: 0;
  left: 0;
  margin: auto;
}
#menuBox li .iconfont {
  position: absolute;
  /* display: i nline-block; */
  /* float: left; */
  /* margin: 5px 0px 10px 0px; */
  text-align: center;
  top: -20px;
  /* left: 0; */
  right: 0;
  left: 0;
  margin: auto;
}
.el-menu-item {
  line-height: 80px !important;
}
</style>