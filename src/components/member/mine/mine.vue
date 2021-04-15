<template>
  <div style="font-size: 14px;">
    <div class="login">
      <div style="padding-top: 10px;font-size: 20px;text-align: center;">
        <span style="line-height: 35px;padding-left: 30px;">我的</span>
      </div>
      <div v-if="user==''" style=" width:100%;">
        <span style="margin-left: 20px;">
          <el-avatar icon="el-icon-user-solid" shape="square" style="margin-bottom: -13px;"
                     @click="uploadImage()"></el-avatar>&#160&#160您好，请
          <router-link to="/register">注册</router-link>/
          <router-link to="/login">登录</router-link>
        </span>
      </div>
      <div v-if="user!=''" style=" width:100%;padding-top: 30px;" @click="handleEdit()">
        <span style="margin-left: 20px;">
          <el-avatar icon="el-icon-user-solid" style="margin-bottom: -13px;"></el-avatar>&#160&#160欢迎您：<span>{{nickname}}</span>
          <!--<a class="personal-footer" @click="logout" style="margin-left: 40px;">
            退出
          </a>-->
        </span>
        <i class="el-icon-arrow-right" style="float: right;margin-top: 16px;margin-right: 20px;"></i>
      </div>
    </div>
    <div>
      <ul>
        <li @click="toHistory()" style="margin-top: 10px;">
          <img slot="icon" class="imageClass" src="../../../assets/images/garbage/history.png">
          &#160&#160历史搜索记录
          <i class="el-icon-arrow-right" style="float: right;margin-top: 18px;margin-right: 20px;"></i>
        </li>
        <li @click="toCall()">
          <img slot="icon" class="imageClass" src="../../../assets/images/garbage/call.png">
          &#160&#160留言
          <i class="el-icon-arrow-right" style="float: right;margin-top: 18px;margin-right: 20px;"></i>
        </li>
        <li @click="toSetting()">
          <img slot="icon" class="imageClass" src="../../../assets/images/garbage/setting.png">
          &#160&#160设置
          <i class="el-icon-arrow-right" style="float: right;margin-top: 18px;margin-right: 20px;"></i>
        </li>
      </ul>
    </div>
    <!--编辑界面-->
    <el-dialog width="90%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="60px" :rules="dataFormRules" ref="dataForm" :size="size">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="dataForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="value">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="type">
          <el-input v-model="dataForm.mobile" auto-complete="off" maxlength="11"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" type="primary" @click.native="editDialogVisible = false">返回</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        size: 'small',
        user: "",
        nickname: "",
        centerDialogVisible: false,//提示页面是否显示
        editDialogVisible: false, // 编辑界面是否显示
        editLoading: false,
        dataFormRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ]
        },
        // 新增编辑界面数据
        dataForm: {
          id: 0,
          label: '',
          value: '',
          type: '',
          sort: 0,
          description: '',
          remarks: ''
        }
      };
    },
    methods: {
      uploadImage: function () {
        alert("1");
      },
      toHistory: function () {
        if (this.user != null) {
          this.$router.push({path: '/history'});
        } else {
          this.$confirm("历史搜索记录需要先登录，是否跳转到登录界面!", "提示", {
            customClass: 'messageLogout',
            type: "warning"
          })
            .then(() => {
              this.$router.push({path: '/login'});
            })
            .catch(() => {

            })
        }
      },
      toCall() {
        this.$router.push({path: '/call'});
      },
      // 删除cookie
      deleteCookie: function (name) {
        Cookies.remove(name)
      },
      toSetting() {
        this.$router.push({path: '/setting'})
      },
      // 显示编辑界面
      handleEdit: function () {
        this.$router.push({path: '/personal'})
        /*this.editDialogVisible = true
        this.$api.user.findByName({"name":sessionStorage.getItem("user")}).then((res) => {
          if(res.code == 200) {
            this.dataForm = Object.assign({}, res.data)
          } else {
            this.$message({message: '操作失败, ' + res.msg, type: 'error'})
          }
        })*/
      },
      // 编辑
      submitForm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {
              customClass: 'messageLogout'
            }).then(() => {
              this.editLoading = true
              let params = Object.assign({}, this.dataForm)
              this.$api.user.save(params).then((res) => {
                if (res.code == 200) {
                  this.$message({message: '操作成功', type: 'success'})
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.editLoading = false
                this.editDialogVisible = false
              })
            })
          }
        })
      },
      findUserByName() {
        let name = sessionStorage.getItem("user")
        if (name != null) {
          this.$api.user.findByName({'name': name}).then((res) => {
            if (res.code == 200) {
              this.user = res.data.name;
              if (res.data.nickname != "" && res.data.nickname != null) {
                this.nickname = res.data.nickname;
              } else {
                this.nickname = res.data.name;
              }
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

  ul {
    width: 100%;
    line-height: 50px;
  }

  li {
    background-color: white;
    margin-top: 3px;
  }

  .login {
    height: 140px;
    background-image: url("../../../assets/images/garbage/mineBackgroud.jpg");
  }

  .imageClass {
    margin-bottom: -3px;
    margin-left: 20px;
  }

  .evaluateClass {
    float: right;
    margin-right: 30px;
    padding-top: 10px;
  }

  .helpClass {
    margin-left: 10px;
  }

  .el-message-box.messageLogout {
    width: auto;
  }
</style>
