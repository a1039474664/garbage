<template>
  <div style="background-color: white;height: 100%">
    <div class="loginBackTo">
      <el-row>
        <el-col :span="18" style="padding-top: 5px;">
          <el-page-header @back="back" content="登录">
          </el-page-header>
        </el-col>
        <el-col :span="6">
          <router-link to="/register" style="float: right;padding-right: 15px;padding-top: 4px;">注册</router-link>
        </el-col>
      </el-row>
    </div>
    <div class="login_warp">
      <div class="login_header">
        <ul class="tabClick">
          <li  @click="cur=0" :class="{active:cur==0}"><span>快捷登录</span></li>
          <li  @click="cur=1" :class="{active:cur==1}"><span>账号登录</span></li>
        </ul>
      </div>
      <div>
        <div v-show="cur==0" class="Cbody_item">
          <el-form :model="ReginForm" status-icon :rules="mobileRule" ref="ReginForm" style="padding: 20px;" class="demo-ruleForm">
            <el-form-item  prop="mobile">
              <el-input type="text" v-model="ReginForm.mobile" autocomplete="off" placeholder="请输入手机号码" maxlength="11" ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div>
                <el-input type="text" v-model="ReginForm.code" autocomplete="off" placeholder="请输入验证码" style="width: 60%;" maxlength="6"></el-input>
                <el-button v-show="sendAuthCode" style="margin-left: 10px;"  type="text" @click="getAuthCode('ReginForm')">获取验证码</el-button>

                <span v-show="!sendAuthCode" style="color: #8cc5ff;margin-left: 10px;">
                剩余<span class="auth_text_blue">{{auth_time}} </span>s</span>
              </div>
            </el-form-item>
            <div style="text-align: center;">
              <el-button type="success" style="width: 90%;" round @click="mobileForm('ReginForm')" :logining="logining">
                登录
              </el-button>
            </div>
          </el-form>
        </div>
        <div v-show="cur==1">
          <el-form :model="loginForm" status-icon :rules="rule" ref="loginForm"  style="padding: 20px;" class="demo-ruleForm">
            <el-form-item label="" prop="account">
              <el-input type="text" v-model="loginForm.account" autocomplete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <router-link style="float: right;margin-top: -10px;margin-bottom: 5px;" to="/register">忘记密码？</router-link>
            <div class="clear"></div>
            <div style="text-align: center;margin-left: 20px;">
              <el-button type="success" class="submitBtn" round @click="submitForm('loginForm')" :logining="logining">
                登录
              </el-button>
            </div>
          </el-form>
        </div>

      </div>
    </div>
  </div>
  </template>
  <script>
    import Cookies from "js-cookie"
    export default {
      data() {
        let telCheck = (rule, value, callback) => {
          if (value === "") {
            return callback(new Error("电话号码是必须的"));
          } if (!(/^1[34578]\d{9}$/.test(value))) {
            return callback(new Error("请输入正确的电话号码"));
          } else if (value.toString().length !== 11) {
            return callback(new Error("电话号码必须是11位数字"));
          } else {
            callback();
          }
        };

        return {
          ReginForm: {
            mobile: "",
            code:""
          },
          getCode:"",
          loginForm: {
            password: "",
            account: ""
          },
          sendAuthCode: true,
          /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
          auth_time: 0,
          /*倒计时 计数器*/
          verification: "", //绑定输入验证码框框
          cur:0,
          logining: false,
          mobileRule: {
            mobile: [
              {
                required: true,
                validator: telCheck,
                trigger: "blur"
              }
            ],
            code: [
              {
                required: true,
                message: "请输入验证码",
                trigger: "blur"
              }
            ]
          },
          rule: {
            password: [
              {
                required: true,
                message: "密码是必须的",
                trigger: "blur"
              }
            ],
            account: [
              {
                required: true,
                message: "账号是必须的",
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
        handleClick(tab, event) {
          console.log(tab, event);
        },
        submitForm: function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.logining = true;
              let userInfo = {account:this.loginForm.account, password:this.loginForm.password}
              this.$api.user.appLogin(userInfo).then((res) => {
                if(res.msg != null) {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                } else {
                  Cookies.set('token', res.data.token) // 放置token到Cookie
                  sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
                  this.$message({ message: '登录成功', type: 'success',center:true,width:50 })
                  this.$router.push('/')  // 登录成功，跳转到主页
                }
                this.logining = false
              }).catch((res) => {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              });
            } else {
              console.log("submit err");
            }
          });
        },
        //   验证
        getAuthCode: function(formName) {
            if (this.ReginForm.mobile!="") {
              let userInfo = {mobile:this.ReginForm.mobile}
              this.$api.user.sendSms(userInfo).then((res) => {
                if(res.code != 200) {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                } else {
                  this.$message({
                    message: "验证码已发送到您手机上，请查收！",
                    type: 'success'
                  })
                  this.getCode = res.msg;
                }
                this.logining = false
              }).catch((res) => {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
                this.logining = false
              });

              this.sendAuthCode = false;
              //设置倒计时秒
              this.auth_time = 1;
              var auth_timetimer = setInterval(() => {
                this.auth_time--;
                if (this.auth_time <= 0) {
                  this.sendAuthCode = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            } else {
              this.$message({ message: '请输入手机号码', type: 'error' })
              return;
            }

        },
        // 提交
        mobileForm: function (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.logining = true;
              if(this.getCode!=this.ReginForm.code){
                this.$message({ message: '验证码不正确', type: 'error' })
                this.logining = false;
              }else{
                console.log("开始写入后台数据！");
                let userInfo = {mobile:this.ReginForm.mobile}
                this.$api.user.mobileLogin(userInfo).then((res) => {
                  if(res.msg != null) {
                    this.$message({
                      message: res.msg,
                      type: 'error'
                    })
                  } else {
                    Cookies.set('token', res.data.token) // 放置token到Cookie
                    sessionStorage.setItem('user', userInfo.mobile) // 保存用户到本地会话
                    this.$message({ message: '登录成功', type: 'success',center:true,width:50 })
                    this.$router.push('/')  // 登录成功，跳转到主页
                  }
                  this.logining = false
                })
              }
            } else {
              console.log("submit err");
            }
          });
        },

      }
    };
  </script>
  <style>
    @import '../../../assets/css/main.css';

    .loginBackTo{
      height: 40px;
      background-color: #FAFAFA;
    }

    .submitBtn {
      width: 90%;
    }


  </style>
