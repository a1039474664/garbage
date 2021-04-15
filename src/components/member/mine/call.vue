<template>
  <div style="background-color: #FAFAFA;height: 100%;padding-top: 10px;">
    <el-page-header @back="back" content="留言">
    </el-page-header>
    <div style="height: 8px;"></div>
    <div style="background-color: white;height: 100%;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini"
               style="margin-right: 30px;padding-top: 20px" class="demo-ruleForm">
        <el-form-item label="问题类型" prop="problem">
          <el-select v-model="ruleForm.problem" placeholder="请选择问题类型">
            <el-option label="投诉" value="complaint"></el-option>
            <el-option label="建议" value="suggest"></el-option>
            <el-option label="缺分类" value="miss"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系方式" prop="contactType">
          <el-select v-model="ruleForm.contactType" placeholder="请选择联系方式">
            <el-option label="电话号码" value="phone" sele></el-option>
            <el-option label="邮箱" value="email"></el-option>
            <el-option label="QQ" value="qq"></el-option>
            <el-option label="微信" value="weChat"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话号码" prop="phone" v-if="this.ruleForm.contactType=='phone'">
          <el-input type="text" v-model="ruleForm.phone" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item v-if="this.ruleForm.contactType=='email'"
                      prop="email"
                      label="邮箱"
                      :rules="[
         {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item label="QQ号" prop="desc" v-if="this.ruleForm.contactType=='qq'">
          <el-input type="text" v-model="ruleForm.qq"></el-input>
        </el-form-item>

        <el-form-item label="微信号" prop="desc" v-if="this.ruleForm.contactType=='weChat'">
          <el-input type="text" v-model="ruleForm.weChat"></el-input>
        </el-form-item>

        <el-form-item label="详细描述" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact" hidden="hidden">
          <el-input type="text" v-model="ruleForm.contact"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          contactType: 'phone',
          remark: '',
          contact: '',
          region: '',
          desc: '',
          weChat: '',
        },
        rules: {

          problem: [
            {required: true, message: '请选择问题类型', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.logining = true;
            console.log("开始写入后台数据！");
            if (this.ruleForm.contactType == 'phone') {
              if (!this.isvalidPhone(this.ruleForm.phone) && this.ruleForm.phone != undefined) {
                this.$message({
                  message: '请输入正确的11位手机号码',
                  type: 'warning'
                });
                return
              } else {
                this.ruleForm.contact = this.ruleForm.phone;
              }

            } else if (this.ruleForm.contactType == 'email') {
              this.ruleForm.contact = this.ruleForm.email;
            } else if (this.ruleForm.contactType == 'qq') {
              this.ruleForm.contact = this.ruleForm.qq;
            } else if (this.ruleForm.contactType == 'weChat') {
              this.ruleForm.contact = this.ruleForm.weChat;
            }

            let params = Object.assign({}, this.ruleForm)

            this.$api.tGcCustomerService.save(params).then((res) => {
              this.editLoading = false
              if (res.code == 200) {
                this.$message({message: '提交成功，请等候客服处理！', type: 'success'})
                this.resetForm(formName)
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      back() {
        this.$router.go(-1);//返回上一层
      },
      isvalidPhone(str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        return reg.test(str)
      }
    }
  }
</script>
<style>

</style>
