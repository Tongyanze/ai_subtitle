<template>
  <div class="global-container">
    <Header/>
      <div class="content">
      <div class="search-box">
        <input class="search-text" type="text" v-model="data" placeholder="请输入作品名称或关键词">
        <button class="search-btn" @click="search(data),getPage()">搜索</button>
      </div>
      <div class="show1">
        <div class="para" v-if="realList.length==0"><img id="not-found" src="../assets/notfound.png" alt="什么都没找到啊..."></div>
        <ul v-else>
          <li class="show-video" v-for="(item,index) in realList" :key="index">
            <ul>
              <li><img class="videoCover" v-bind:src="item.videoCover" @click="play(item)" alt="photo"></li>
              <li class="show-msg">{{item.videoName}}</li>
              <li class="show-msg">up:{{item.userId}}</li>
              <li class="show-msg">点赞量:{{item.videoFavors}}</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="changePage">
        <button class="page-btn" @click="prevPage()">上一页</button>
        <span>第{{currentPage}}页/共{{totalPage}}页</span>
        <button class="page-btn" @click="nextPage()">下一页</button>
      </div>
      <!--分页效果
      <div class="page">
        <ul class="pagination">
          <li><a href="#">«</a></li>
          <li><a class="active" href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li><a href="#">6</a></li>
          <li><a href="#">7</a></li>
          <li><a href="#">»</a></li>
        </ul>
      </div>
      -->
    </div>
    <Footer/>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped src=@/assets/scss/search.scss>

</style>

<script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import https from "@/https.js";
  import $ from 'jquery'

export default {
  name: 'Search',
  components: {
    Header, Footer
  },
  data() {
    return {
      searchData: '', // 需要搜索的信息
      totalNum: 0, // 视频数
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 8, // 每页显示数量
      //currentPageData: [], //当前页显示内容
      realList: [] // 显示内容
    }
  },
  mounted () {
    this.search(this.searchData)
  },
  methods: {
    search (name) {
      this.totalNum = 0
      this.totalPage = 1
      this.currentPage = 1
      if(name==null){
        name = ''
        console.log('null')
      }
      this.searchData = name
      let params = {key:this.searchData,begin:1*this.currentPage,end:8*this.currentPage};
      https.fetchPost('/video/search',params)
        .then(response =>{
          console.log("data:"+response)
          console.log(response.data)
          this.realList = response.data.data
          this.totalNum = response.data.code - 1000
          for (var i=0;i<this.realList.length;i++) {
            this.realList[i].videoCover = "api" + this.realList[i].videoCover
          }
        })
    },
    getPage() {
        // 计算一共有几页
        this.totalPage = Math.ceil(this.totalNum / this.pageSize);
        // 计算得0时设置为1
        this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
        this.setCurrentPageData();
    },
    // 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...,
    setCurrentPageData() {
      //let begin = (this.currentPage - 1) * this.pageSize;
      //let end = this.currentPage * this.pageSize;
      //this.currentPageData = this.realList.slice(begin,end);
      let params = {key:this.searchData,begin:1*this.currentPage,end:8*this.currentPage};
      https.fetchPost('/video/search',params)
        .then(response =>{
          console.log("data:"+response)
          console.log(response.data)
          this.realList = response.data.data
          //this.totalNum = response.data.code - 1000
          for (var i=0;i<this.realList.length;i++) {
            this.realList[i].videoCover = "api" + this.realList[i].videoCover
          }
        })
    },
    //上一页
    prevPage() {
      //console.log(this.currentPage);
        if (this.currentPage == 1) return;
         
          this.currentPage--;
          this.setCurrentPageData();
            
    },
    // 下一页
    nextPage() {
      if (this.currentPage == this.totalPage)return ;
 
        this.currentPage++;
        this.setCurrentPageData();
            
    },
    play(videoMsg){
      console.log('videoMsg:'+videoMsg)
      this.$router.push({path:'videodetail',query:{videoinfo:JSON.stringify(videoMsg)}})
    }
  }
}
</script>
