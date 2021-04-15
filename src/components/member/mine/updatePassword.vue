<template>
  <div class="top">
    <el-page-header @back="back" content="修改密码">
    </el-page-header>
    <div style="height: 12px;"></div>
    <div style="background-color: white;height: 100%;">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
               style="padding-top: 20px;padding-right: 20px;" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
  export default {
    data() {

      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        editLoading: false,
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          oldPass: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
          ],
          newPass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
          ],
          checkPass: [
            {validator: validateCheckPass, required: true, trigger: 'blur'}
          ]

        }
      };
    },
    methods: {
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let name = sessionStorage.getItem("user")
            //先校验旧密码是否正确
            let params = {userName: name, oldPass: this.ruleForm.oldPass, newPass: this.ruleForm.newPass}
            this.$api.user.updatePw(params).then((res) => {
              if (res.code == 200) {
                this.$message({message: '修改成功,请重新登录！', type: 'success'})
                this.$router.push({path: '/login'});
              } else {
                this.$message({message: '旧密码不正确', type: 'error'})
                return
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      back() {
        this.$router.go(-1);//返回上一层
      },
    },
    mounted() {
      //一开始会执行
    }
  }
</script>
<style>
  .top {
    height: 100%;
    padding-top: 10px;
  }
</style>
