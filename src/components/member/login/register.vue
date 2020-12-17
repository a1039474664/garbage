<template>
  <div style="background-color: white;">
    <div class="registerBackTo">
      <el-row>
        <el-col :span="18" style="padding-top: 5px;">
          <el-page-header @back="back" content="用户注册">
          </el-page-header>
        </el-col>
      </el-row>
    </div>
    <div style="background-color: white;">
      <el-form :model="registerForm" status-icon :rules="rule" ref="registerForm" label-width="80px" style="padding-top: 20px;padding-right: 20px;" class="demo-ruleForm">
        <el-form-item label="账号" prop="name">
          <el-input type="text" v-model="registerForm.name" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="mobile">
          <el-input type="text" v-model="registerForm.mobile" autocomplete="off" placeholder="用于密码找回" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input type="text" v-model="registerForm.nickname" autocomplete="off" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="registerForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="againPassword">
          <el-input type="password" v-model="registerForm.againPassword" autocomplete="off" placeholder="请重复密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')" :loading="logining">提交</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
          <p>已经有账号？马上去：<span class="to" @click="tologin">登录</span></p>
        </el-form-item>
      </el-form>
    </div>
  </div>

  </template>
  <script>
    import Cookies from "js-cookie"
    export default {
      data() {
        let checkPw=(rule, value,callback) => {
          if (!value){
            callback(new Error('请再次输入密码'))
          }else  if (value!=this.registerForm.password){
            callback(new Error('两次输入的密码不一致，请重新输入'))
          }else {
            callback()
          }
        }

        let telCheck = (rule, value, callback) => {
          if (!(/^1[34578]\d{9}$/.test(value))) {
            return callback(new Error("请输入正确的电话号码"));
          } else {
            callback();
          }
        };
        let emailCheck = (rule, value, callback) => {
          if (!value){
            var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (!regEmail.test(value)) {
              return callback(new Error("请输入正确的邮箱"));
            } else {
              callback();
            }
          }
        };

        return {
          logining:false,
          registerForm: {
            password: "",
            name: "",
            nickname: "",
            mobile: "",
            email:"",
          },
          rule: {
            password: [
              {
                required: true,
                message: "密码是必须的",
                trigger: "blur"
              }
            ],
            mobile: [
              {
                required: true,
                validator: telCheck,
                trigger: "blur"
              }
            ],
            email: [
              {
                validator: emailCheck,
                trigger: "blur"
              }
            ],
            name: [
              {
                required: true,
                message: "账号是必须的",
                trigger: "blur"
              }
            ],
            againPassword: [
              {
                required: true,
                validator: checkPw,
                trigger: "blur"
              }
            ]
          }
        };
      },
      methods: {
        back(){
          this.$router.go(-1);//返回上一层
        },

        // 提交
        submitForm: function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.logining = true;
              console.log("开始写入后台数据！");
              let params = Object.assign({}, this.registerForm)
              this.$api.user.save(params).then((res) => {
                this.editLoading = false
                if(res.code == 200) {
                  this.$message({ message: '注册成功已自动登录', type: 'success' })
                  this.logining = false;
                  this.login();
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                  this.logining = false;
                }
              })
            } else {
              console.log("submit err");
            }
          });
        },
        login() {
          let userInfo = {account:this.registerForm.name, password:this.registerForm.password}
          this.$api.user.appLogin(userInfo).then((res) => {
            if(res.msg != null) {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            } else {
              Cookies.set('token', res.data.token) // 放置token到Cookie
              sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
              this.$router.push('/')  // 登录成功，跳转到主页
            }
            this.logining = false
          }).catch((res) => {
            this.$message({
              message: res.message,
              type: 'error'
            })
          });
        },
        reset() {
          this.$refs.registerForm.resetFields();
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        tologin() {
          //已经注册过跳转到登入界面
          this.$router.push("/login");
        }
      }
    };
  </script>
  <style>


    .to {
      color: #fa5555;
      cursor: pointer;
    }
    .registerBackTo{
      height: 40px;
      background-color: #FAFAFA;
    }

  </style>
