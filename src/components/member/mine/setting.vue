<template>
  <div style="height: 90%;padding-top: 10px;background-color: #FAFAFA">
    <el-page-header @back="back" content="设置">
    </el-page-header>
    <div style="height: 8px;"></div>
    <ul>
      <li @click="updatePassword()">
        <img slot="icon" class="imageClass" src="../../../assets/images/garbage/passwd.png">
        &#160&#160修改密码
        <i class="el-icon-arrow-right" style="float: right;margin-top: 18px;margin-right: 20px;"></i>
      </li>
      <li @click="logout()"style="text-align: center;bottom: 5px;position:absolute;width: 100%">
        退出
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        size: 'small',
        user: null,
      };
    },
    methods: {
      // 退出登录
      logout: function() {
        if (this.user!=null){
          this.$confirm("确认退出吗?", "提示", {
            customClass: 'messageLogout',
            type: "warning"
          })
            .then(() => {
              this.$router.push({path:'/login'})
              sessionStorage.removeItem("user")
              this.deleteCookie("token")
            })
            .catch(() => {})
        }else{
          this.$confirm("您未登录，是否跳转到登录界面!", "提示", {
            customClass: 'messageLogout',
            type: "warning"
          })
            .then(() => {
              this.$router.push({path:'/login'});
            })
            .catch(() => {

            })
        }


      },
      updatePassword:function(){
        if (this.user!=null){
          this.$router.push({path:'/updatePassword'});
        }else{
          this.$confirm("您未登录，是否跳转到登录界面!", "提示", {
            customClass: 'messageLogout',
            type: "warning"
          })
            .then(() => {
              this.$router.push({path:'/login'});
            })
            .catch(() => {

            })
        }
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
      findUserByName(){
        let name = sessionStorage.getItem("user")
        if(name!=null){
          this.$api.user.findByName({'name':name}).then((res) => {
            if(res.code == 200) {
              this.user=res.data.name;
            } else {
              this.$message({message: '操作失败, ' + res.msg, type: 'error'})
            }
          })
        }
      }
    },
    mounted() {
      //一开始会执行
      this.findUserByName();
    }
  }
</script>
<style>

</style>
