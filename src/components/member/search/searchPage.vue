<template>
  <el-container>
    <el-header height="120px;" class="headerClass">
      <div style="margin-top: 15px;font-size: 20px;text-align: center;color: white;"><span >首页</span></div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: center;margin-top: 20px;">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="formInline.name"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
          style="width: 60%;">
          <i
            class="el-icon-delete el-input__icon"
            slot="suffix"
            @click="deleteClick">
          </i>

          <template slot-scope="{ item }">
            <div class="name">{{ item.garbageName }}</div>
          </template>
        </el-autocomplete>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="hotDiv">
        热门搜索：
          <span v-for="(item ,i) in garbageHotList" class="hotList" slot="suffix" @click="hotClick(item.garbageName)"> {{item.garbageName}} |</span>
      </div>
    </el-header>
    <el-main class="mainClass">
      <!-- 当用户未输入搜索时，显示图片及分类信息 -->
      <div v-if="this.formInline.name==''||this.garbageType==''" style="text-align: center;">
        <img slot="icon"  src="../../../assets/images/garbage/type.jpg"><br>
        <el-row :gutter="12">
          <el-col :span="12" @click.native="recyclable('1')">
            <el-card shadow="hover">
              <div ><img slot="icon" src="../../../assets/images/garbage/recyclable.png"></div>
              <div >可回收物<br><span style="color: #E1E1E1;font-size: 12px;letter-spacing:-0.1em;">Recyclable Waste</span></div>
            </el-card>
          </el-col>
          <el-col :span="12" @click.native="recyclable('2')">
            <el-card shadow="hover">
              <div><img slot="icon" src="../../../assets/images/garbage/houseHoldFood.png"></div>
              <div>湿垃圾<br><span style="color: #E1E1E1;font-size: 12px;">HouseFood Waste</span></div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 12px;">
          <el-col :span="12" @click.native="recyclable('3')">
            <el-card shadow="hover">
              <div><img slot="icon" src="../../../assets/images/garbage/hazardous.png"></div>
              <div>有害垃圾<br><span style="color: #E1E1E1;font-size: 12px;letter-spacing:-0.1em;">Hazardous Waste</span></div>
            </el-card>
          </el-col>
          <el-col :span="12" @click.native="recyclable('4')">
            <el-card shadow="hover">
              <div><img slot="icon" src="../../../assets/images/garbage/other.png"></div>
              <div>其他垃圾<br><span style="color: #E1E1E1;font-size: 12px;">Other Waste</span></div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 当用户输入搜索时，显示搜索结果 -->
      <div v-else>
        <div style="font-size: 20px;font-weight: 900;text-align: center; "><span>{{formInline.name}}</span></div><br>
        <div v-if="this.garbageType=='1'">
          <div style="text-align: center;">
            <img slot="icon" src="../../../assets/images/garbage/recyclable.png"><br>
            属于<span style="font-size: 20px;font-weight: 900;">可回收垃圾</span>
          </div>

          <span style="text-align: left;">
            &#160&#160&#160&#160&#160&#160&#160可回收垃圾主要包括废纸、塑料、玻璃、金属和布料五大类。<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">废纸：主要包括报纸、期刊、图书、各种包装纸等。但是，要注意纸巾和厕所纸由于水溶性太强不可回收。<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">塑料：各种塑料袋、塑料泡沫、塑料包装（快递包装纸是其他垃圾/干垃圾）、一次性塑料餐盒餐具、硬塑料、塑料牙刷、塑料杯子、矿泉水瓶等。<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">玻璃：主要包括各种玻璃瓶、碎玻璃片、暖瓶等。（镜子是其他垃圾/干垃圾）<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">金属物：主要包括易拉罐、罐头盒等。<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">布料：主要包括废弃衣服、桌布、洗脸巾、书包、鞋等。<br>
            这些垃圾通过综合处理回收利用，可以减少污染，节省资源。如每回收1吨废纸可造好纸850公斤，节省木材300公斤，比等量生产减少污染74%；每回收1吨塑料饮料瓶可获得0.7吨二级原料；每回收1吨废钢铁可炼好钢0.9吨，比用矿石冶炼节约成本47%，减少空气污染75%，减少97%的水污染和固体废物。
          </span>
        </div>
        <div v-else-if="this.garbageType=='2'">
          <div style="text-align: center;">
            <img slot="icon" src="../../../assets/images/garbage/houseHoldFood.png"><br>
            属于<span style="font-size: 20px;font-weight: 900;">厨余（湿垃圾）</span>
          </div>
          &#160&#160&#160&#160&#160&#160&#160厨余垃圾（上海称湿垃圾）包括剩菜剩饭、骨头、菜根菜叶、果皮等食品类废物。<br>
          经生物技术就地处理堆肥，每吨可生产0.6~0.7吨有机肥料。<br>
        </div>
        <div v-else-if="this.garbageType=='3'">
          <div style="text-align: center;">
            <img slot="icon" src="../../../assets/images/garbage/hazardous.png"><br>
            属于<span style="font-size: 20px;font-weight: 900;">有害垃圾</span>
          </div>
          有害垃圾含有对人体健康有害的重金属、有毒的物质或者对环境造成现实危害或者潜在危害的废弃物。<br>
          包括电池、荧光灯管、灯泡、水银温度计、油漆桶、部分家电、过期药品及其容器、过期化妆品等。<br>
          这些垃圾一般使用单独回收或填埋处理。<br>
        </div>
        <div v-else-if="this.garbageType=='4'">
          <div style="text-align: center;">
            <img slot="icon" src="../../../assets/images/garbage/other.png"><br>
            属于<span style="font-size: 20px;font-weight: 900;">其它（干垃圾）</span>
          </div>
          <span style="font-size: 20px;font-weight: 900;color: #b3e19d">其他垃圾</span>（上海称干垃圾）包括除上述几类垃圾之外的砖瓦陶瓷、渣土、卫生间废纸、纸巾等难以回收的废弃物及尘土、食品袋（盒）。采取卫生填埋可有效减少对地下水、地表水、土壤及空气的污染。<br>
          <div class=""></div>
          大棒骨因为“难腐蚀”被列入“其它垃圾”。<span style="font-size: 20px;font-weight: 900;">玉米核、坚果壳、果核、鸡骨等</span>则是餐厨垃圾。<br>
          <span style="font-size: 20px;font-weight: 900;">卫生纸</span>：厕纸、卫生纸遇水即溶，不算可回收的“纸张”，类似的还有烟盒等。<br>
          <span style="font-size: 20px;font-weight: 900;">餐厨垃圾装袋</span>：常用的塑料袋，即使是可以降解的也远比餐厨垃圾更难腐蚀。此外塑料袋本身是可回收垃圾。正确做法应该是将餐厨垃圾倒入垃圾桶，塑料袋另扔进“可回收垃圾”桶。<br>
          <span style="font-size: 20px;font-weight: 900;">果壳</span>：在垃圾分类中，“果壳瓜皮”的标识就是花生壳，的确属于厨余垃圾。家里用剩的废弃食用油，也归类在“厨余垃圾”。<br>
          <span style="font-size: 20px;font-weight: 900;">尘土</span>：在垃圾分类中，尘土属于“其它垃圾”，但残枝落叶属于“厨余垃圾”，包括家里开败的鲜花等。<br>
        </div>
        <div v-else>
          <div style="text-align: center;">
            <img slot="icon" src="../../../assets/images/garbage/sorry.png"><br>
            未搜索到分类，词库正在紧急补充中~
          </div>
          <div>
            <div style="text-align: center;">
              <span style="font-size: 20px;font-weight: 900;">可回收垃圾</span><br>
              <img slot="icon" src="../../../assets/images/garbage/recyclable.png"><br>
            </div>
            &#160&#160&#160&#160&#160&#160&#160可回收垃圾主要包括废纸、塑料、玻璃、金属和布料五大类。<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">废纸：主要包括报纸、期刊、图书、各种包装纸等。但是，要注意纸巾和厕所纸由于水溶性太强不可回收。<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">塑料：各种塑料袋、塑料泡沫、塑料包装（快递包装纸是其他垃圾/干垃圾）、一次性塑料餐盒餐具、硬塑料、塑料牙刷、塑料杯子、矿泉水瓶等。<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">玻璃：主要包括各种玻璃瓶、碎玻璃片、暖瓶等。（镜子是其他垃圾/干垃圾）<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">金属物：主要包括易拉罐、罐头盒等。<br>
            <img slot="icon" src="../../../assets/images/garbage/course.png">布料：主要包括废弃衣服、桌布、洗脸巾、书包、鞋等。<br>
            <div style="text-align: center;">
              <img slot="icon" class="imgClass" src="../../../assets/images/garbage/recyclableDetail.jpg">
            </div>
            <div style="text-align: center;">
              <span style="font-size: 20px;font-weight: 900;">厨余（湿垃圾）</span><br>
              <img slot="icon"  src="../../../assets/images/garbage/houseHoldFood.png">
            </div>
            <p>&#160&#160&#160&#160&#160&#160&#160厨余垃圾是指居民日常生活及食品加工、饮食服务、单位供餐等活动中产生的垃圾,包括丢弃不用的菜叶、剩菜、剩饭、果皮、蛋壳、茶渣、骨头等，其主要来源为家庭厨房、餐厅、饭店、食堂、市场及其他与食品加工有关的行业。</p>
            <div style="text-align: center;">
              <img slot="icon" class="imgClass" src="../../../assets/images/garbage/houseHoldFoodDetail2.jpg">
            </div>
            <p>注意：由于餐厨垃圾需要粉碎，像大棒骨、贝壳、榴莲壳这样的垃圾,虽然与食物有关，还是应该归属其他垃圾</p>
            <div style="text-align: center;">
              <img slot="icon" class="imgClass" src="../../../assets/images/garbage/houseHoldFoodDetail1.jpg">
            </div>
            <div style="text-align: center;">
              <span style="font-size: 20px;font-weight: 900;">有害垃圾</span><br>
              <img slot="icon"  src="../../../assets/images/garbage/hazardous.png"><br>
            </div>
            <p>&#160&#160&#160&#160&#160&#160&#160有害垃圾，是指对人体健康或者自然环境造成直接或者潜在危害的生活垃圾，包括废充电电池、废扣式电池、废灯管、弃置药品、废杀虫剂（容器）、废油漆（容器）、废日用化学品、废水银产品等，要放进红色垃圾桶。</p>
            <p>&#160&#160&#160&#160&#160&#160&#160<span style="font-size: 20px;font-weight: 900;">注意</span>：过期化妆品、电子产品，都属于有害垃圾，一次性电池是其他垃圾</p>
            <div style="text-align: center;">
              <img slot="icon" class="imgClass" src="../../../assets/images/garbage/hazardousDetail.jpg">
            </div>

            <div style="text-align: center;">
              <span style="font-size: 20px;font-weight: 900;">其它（干垃圾）</span><br>
              <img slot="icon" src="../../../assets/images/garbage/other.png">
            </div>
            <span style="font-size: 20px;font-weight: 900;color: #b3e19d">其他垃圾</span>（上海称干垃圾）包括除上述几类垃圾之外的砖瓦陶瓷、渣土、
            卫生间废纸、纸巾等难以回收的废弃物及尘土、食品袋（盒）。采取卫生填埋可有效减少对地下水、地表水、土壤及空气的污染。<br>
            <div style="text-align: center;">
              <img slot="icon" class="imgClass" src="../../../assets/images/garbage/otherDetail.png">
            </div>
            <span style="font-size: 20px;font-weight: 900;">卫生纸</span>：厕纸、卫生纸遇水即溶，不算可回收的“纸张”，类似的还有烟盒等。<br>
            <span style="font-size: 20px;font-weight: 900;">餐厨垃圾装袋</span>：常用的塑料袋，即使是可以降解的也远比餐厨垃圾更难腐蚀。此外塑料袋本身是可回收垃圾。正确做法应该是将餐厨垃圾倒入垃圾桶，塑料袋另扔进“可回收垃圾”桶。<br>
            <span style="font-size: 20px;font-weight: 900;">果壳</span>：在垃圾分类中，“果壳瓜皮”的标识就是花生壳，的确属于厨余垃圾。家里用剩的废弃食用油，也归类在“厨余垃圾”。<br>
            <span style="font-size: 20px;font-weight: 900;">尘土</span>：在垃圾分类中，尘土属于“其它垃圾”，但残枝落叶属于“厨余垃圾”，包括家里开败的鲜花等。
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          name: ''
        },
        garbageValue:"",
        garbageType:"",
        garbageHotList:null
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var allHistory = this.allHistory;
        var results = queryString ? this.allGarbage.filter(this.createFilter(queryString)) : allHistory;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.garbageName.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },

      handleSelect(item) {
        //选择下拉数据的时候触发
        this.formInline = {
          name: item.garbageName
        }
        this.onSubmit();
        console.log(item);
      },
      deleteClick(ev) {
        //点击删除按钮时触发
        this.formInline = {
          name: ''
        }
        this.garbageValue="",
        this.garbageType=""
      },
      onSubmit(){
        if(this.formInline.name!=""){
          //点击查询时查找数据
          this.$api.garbage.findByName({'name':this.formInline.name}).then((res) => {
            if(res.code == 200) {
              if(res.data!=null){
                this.garbageValue=res.data.garbageName;
                this.garbageType=res.data.type;
                this.findAllHistory()
              }else{
                this.garbageValue=this.formInline.name;
                this.garbageType="5";
              }

            } else {
              alert("服务器异常");
            }
          })
        }
      },
      findAllHistory(){
        //一开始加载搜索历史数据
        this.$api.history.findAll().then((res) => {
          if(res.code == 200) {
            this.allHistory = res.data;
          } else {
          }
        })
      },
      findAllGarbage(){
        //一开始加载所有分类数据
        this.$api.garbage.findAll().then((res) => {
          if(res.code == 200) {
            this.allGarbage = res.data;
          } else {
          }
        })
      },
      findHotGarbage(){
        //一开始加载热门数据
        this.$api.garbage.findHot().then((res) => {
          if(res.code == 200) {
            this.garbageHotList = res.data;
          } else {
          }
        })
      },
      hotClick(e){
        this.formInline.name=e;
        this.onSubmit();
      },
      recyclable(e){
        this.$router.push({path:'/detail/'+e});
      }
    },
    mounted() {
      //一开始会执行
      this.findAllGarbage();
      this.findAllHistory();
      this.findHotGarbage();

    }
  }
</script>
<style>


  .headerClass{
    border: #e8e8e8 solid 1px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    background-image: url("../../../assets/images/garbage/background1.jpg");
    background-size: cover;
  }
  .mainClass{
    border: #e8e8e8 solid 1px;
    margin-top: -4px;
    margin-left: 5px;
    margin-right: 5px;
    height: 100%;
    background-color: white;
  }
  .hotDiv{
    padding-bottom: 10px;
  }
  .hotList{
    color: #35495e;
  }

  .image {
    width: 100%;
    display: block;
    text-align: center;
  }

</style>
