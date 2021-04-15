<template>
  <div style="height: 100%;padding-top: 10px;background-color: #FAFAFA">
    <el-page-header @back="back" content="个人中心">
      <span>保存</span>
    </el-page-header>
    <div>
      <div class="user-header">
        <input type="file" name="image" accept="image/*" @change='onchangeImgFun'
               class="header-upload-btn user-header-com">
        <img alt="" :src='imgStr' class="user-header-img user-header-com">
      </div>
      <p class="tip">更改头像</p>
      <ul>
        <li style="margin-top: 10px;">
          &#160&#160昵称
          <i class="el-icon-arrow-right" style="float: right;margin-top: 18px;margin-right: 20px;"></i>
        </li>
        <li>
          &#160&#160性别
          <i class="el-icon-arrow-right" style="float: right;margin-top: 18px;margin-right: 20px;"></i>
        </li>
        <!--        <li>
                  &#160&#160生日
                  <i class="el-icon-arrow-right" style="float: right;margin-top: 18px;margin-right: 20px;"></i>
                </li>-->
        <li @click="toSetting()">
          &#160&#160手机号码
          <i class="el-icon-arrow-right" style="float: right;margin-top: 18px;margin-right: 20px;"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import cropper from "@/views/cropper"

  export default {
    components: {
      cropper
    },
    name: 'HelloWorld',
    data() {
      return {
        imgStr: require('../../assets/images/garbage/header.jpeg'),
        uploadFile: "",
        errorStr: '',
        size: 'small',
        user: "",
        nickname: "",
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
      back() {
        this.$router.go(-1);//返回上一层
      },
      toHistory: function () {
      },
      newHeaderImage(newImg) {
        this.headerImage = newImg;
      },
      toCall() {
        this.$router.push({path: '/call'});
      },
      toSetting() {
        this.$router.push({path: '/setting'})
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
      },
      onchangeImgFun(e) {
        var file = e.target.files[0]
        console.log(file)
        // 获取图片的大小，做大小限制有用
        let imgSize = file.size
        console.log(imgSize)
        var _this = this // this指向问题，所以在外面先定义
        // 比如上传头像限制5M大小，这里获取的大小单位是b
        if (imgSize <= 100 * 1024) {
          // 合格
          _this.errorStr = ''
          console.log('大小合适')
          // 开始渲染选择的图片
          // 本地路径方法 1
          // this.imgStr = window.URL.createObjectURL(e.target.files[0])
          console.log(window.URL.createObjectURL(e.target.files[0]))                  // 获取当前文件的信息

          //base64方法 2
          var reader = new FileReader()
          reader.readAsDataURL(file) // 读出 base64
          reader.onloadend = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            var dataURL = reader.result
            console.log(dataURL)
            _this.imgStr = dataURL
            // 下面逻辑处理
            this.handleUploadHead(file);
          }
        } else {
          console.log('大小不合适')
          _this.errorStr = '图片大小超出范围'
        }
      },
      /**
       * 头像上传给后台
       * */
      handleUploadHead(file) {
        let picData = new FormData();
        picData.append('file', file, file.name);
        this.$api.user.updateHeaderImg({'file': file, 'fileName': file.name}).then((res) => {
          if (res.code == 200) {
            this.$notify.success({title: 'success', message: '头像图片上传成功'});
          } else {
            this.$message({message: '操作失败, ' + res.msg, type: 'error'})
          }
        })
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

  .user-header {
    position: relative;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
  }

  .user-header-com {
    border-radius: 30px;
    width: 60px;
    height: 60px;
  }

  .header-upload-btn {
    position: absolute;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
  }

  .tip {
    font-size: 14px;
    color: #666;
    text-align: center;
  }

  /* error是用于错误提示 */
  .error {
    font-size: 12px;
    color: tomato;
    margin-left: 10px;
  }
</style>
