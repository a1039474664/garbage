<template>
  <div style="height: 100%;background-color: #FAFAFA;padding-top: 10px;">
    <div class="headClass">
      <el-row>
        <!--
                <el-col :span="6"><img v-on:click="back" style="margin-top: 5px;margin-left: 5px;" src="../../../assets/images/garbage/back.png"></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light" style="padding-top:2px;font-size:18px; text-align: center">我的历史</div></el-col>
        -->
        <el-col :span="18" style="padding-top: 5px;">
          <el-page-header @back="back" content="历史搜索记录">
          </el-page-header>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light editClass" style="" v-on:click="toEdit">
            编辑
          </div>
        </el-col>
      </el-row>

    </div>

    <div>
      <div v-if="this.allHistory!=''" class="history" v-bind:class="[historyClass ,isEdit ? editHistoryClass : '']">
        <el-checkbox :indeterminate="isIndeterminate" v-if="isEdit" style="margin-left: 10px;" v-model="checkAll"
                     @change="handleCheckAllChange">全选
        </el-checkbox>
        <ul v-for="(item ,i) in allHistory">
          <li class="listClass" v-if="isEdit">
            <el-checkbox :label="item.id" :key="item.id" v-model="checkedGarbage" @change="handleCheckedGarbageChange">
              <div>
                <span style="font-size: 20px;">{{item.garbageName}}</span>
                <span style="margin-bottom: 10px;font-size: 12px;">&#160属于{{item.garbageType}}</span>
                <span style="font-size: 10px;">{{item.lastUpdateTime}}</span>
              </div>
            </el-checkbox>
          </li>
          <li class="listClass" v-else>
            <span style="font-size: 20px;">{{item.garbageName}}</span>
            <span style="margin-bottom: 10px;font-size: 12px;">&#160属于{{item.garbageType}}</span>
            <span style="font-size: 10px;">{{item.lastUpdateTime}}</span>
          </li>
        </ul>
      </div>
      <div v-else style="text-align: center;margin-top: 30px;">
        暂未搜索记录
      </div>
    </div>
    <div style="height: 30px;position:absolute;bottom: 0px;;width: 100%" v-if="isEdit">
      <el-row>
        <el-col :span="8"><span style="line-height: 30px;margin-left: 10px;" @click="deleteAllGarbage">一键清空</span>
        </el-col>
        <el-col :span="8" style="text-align: center;color: #e8e8e8">|</el-col>
        <el-col :span="8"><span :disabled="!isEdit" style="float: right;padding-right: 20px;line-height: 30px;"
                                @click="deleteGarbage">删除</span></el-col>
      </el-row>
    </div>
  </div>

</template>
<script>
  import {Message} from 'element-ui';

  export default {
    data() {
      return {
        checkAll: false,
        checkedGarbage: [],
        Garbage: [],
        isIndeterminate: true,
        allHistory: [],
        isEdit: false,
        editHistoryClass: 'editHistoryClass',
        historyClass: 'historyClass'
      };
    },
    methods: {
      findAllHistory() {
        //一开始加载搜索历史数据
        this.$api.history.findAll().then((res) => {
          this.editLoading = false
          if (res.code == 200) {
            this.allHistory = this.data(res.data);
            for (let i = 0; i < this.allHistory.length; i++) {
              this.Garbage.push(this.allHistory[i].id);
            }
          } else {
          }
        })
      },
      toEdit() {
        this.isEdit = !this.isEdit;
      },
      handleCheckAllChange(val) {
        this.checkedGarbage = val ? this.Garbage : [];
        this.isIndeterminate = false;
      },
      handleCheckedGarbageChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.Garbage.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.Garbage.length;
      },
      deleteGarbage() {
        if (this.checkedGarbage == '') {
          this.$message({message: '请选择一条记录！', type: 'warning'})
          return
        }
        this.$confirm("确认删除吗?", "提示", {
          customClass: 'messageLogout',
          type: "warning",
          center: true
        }).then(() => {
          this.$api.history.deleteByIds({'ids': this.checkedGarbage.toString()}).then((res) => {
            if (res.code == 200) {
              this.$message({message: '删除成功！', type: 'success'})
              this.checkedGarbage = [];
              this.Garbage = [];
              this.findAllHistory()
            } else {

            }
          })
        })
          .catch(() => {
          })
      },
      deleteAllGarbage() {
        this.$confirm("确认删除所有数据吗?", "提示", {
          customClass: 'messageLogout',
          type: "warning"
        }).then(() => {
          this.$api.history.deleteAllGarbage().then((res) => {
            if (res.code == 200) {
              this.$message({message: '删除成功', type: 'success'})
              this.checkedGarbage = [];
              this.Garbage = [];
              this.findAllHistory()
            } else {
            }
          })
        })
          .catch(() => {
          })
      },
      back() {
        this.$router.go(-1);//返回上一层
      },
      data(history) {
        for (let i = 0; i < history.length; i++) {
          let current = history[i]
          current.lastUpdateTime = this.format(current.lastUpdateTime, 'YYYY-MM-DD hh:mm:ss');
        }
        return history;
      },
      format(date, format) {
        //时间格式化
        if (!date) {
          return ''
        }
        let d = new Date(date)

        // 年
        if (/YYYY/.test(format)) {
          format = format.replace(/YYYY/, d.getFullYear())
        }

        // 月份
        let month = d.getMonth() + 1
        if (/MM/.test(format)) {
          let monthStr = month < 10 ? '0' + month : month
          format = format.replace(/MM/, monthStr)
        } else if (/M/.test(format)) {
          format = format.replace(/M/, month)
        }
        // 日期
        let dates = d.getDate()
        if (/DD/.test(format)) {
          let dateStr = dates < 10 ? '0' + dates : dates
          format = format.replace(/DD/, dateStr)
        } else if (/D/.test(format)) {
          format = format.replace(/D/, dates)
        }
        // 小时
        let hours = d.getHours()
        if (/HH/.test(format)) {
          let hoursStr = hours < 10 ? '0' + hours : hours
          format = format.replace(/HH/, hoursStr)
        } else if (/H/.test(format)) {
          format = format.replace(/H/, hours)
        } else if (/hh/.test(format)) {
          let hoursMin = hours > 12 ? hours - 12 : hours
          let hoursStr = hoursMin < 10 ? '0' + hoursMin : hoursMin
          format = format.replace(/hh/, hoursStr)
        } else if (/h/.test(format)) {
          let hoursMin = hours > 12 ? hours - 12 : hours
          format = format.replace(/h/, hoursMin)
        }
        // 分
        let minutes = d.getMinutes()
        if (/mm/.test(format)) {
          let minutesStr = minutes < 10 ? '0' + minutes : minutes
          format = format.replace(/mm/, minutesStr)
        } else if (/m/.test(format)) {
          format = format.replace(/m/, minutes)
        }
        // 秒
        let seconds = d.getSeconds()
        if (/ss/.test(format)) {
          let secondsStr = seconds < 10 ? '0' + seconds : seconds
          format = format.replace(/ss/, secondsStr)
        } else if (/s/.test(format)) {
          format = format.replace(/s/, seconds)
        }
        return format
      }
    },
    mounted() {
      //一开始会执行
      this.findAllHistory();
    }
  }
</script>
<style>
  .listClass {
    border-bottom: 1px solid #cccccc;
    margin-left: 10px;
    margin-right: 5px;
    list-style: none;
  }

  .el-message-box.messageLogout {
    width: auto;
  }

  .editClass {
    padding-top: 5px;
    font-size: 16px;
    text-align: right;
    padding-right: 20px;
  }

  .headClass {
    height: 38px;
    position: absolute;
    top: 0px;
    width: 100%
  }

  .historyClass {
    overflow: auto;
    position: absolute;
    top: 38px;
    width: 100%;
    background-color: white
  }

  .editHistoryClass {
    overflow: auto;
    position: absolute;
    top: 38px;
    bottom: 30px;
    width: 100%;
    background-color: white
  }
</style>

