<template>
  <div class="global-container">
    <Header/>
    <div class="content">
      <div class="search-box">
        <input class="search-text" type="text" v-model="data" placeholder="请输入作品名称或关键词">
        <button class="search-btn" @click="search(data),mounted()">搜索</button>
      </div>

      <div class="show1">
        <ul>
          <li class="show-video" v-for="(item,index) in  currentPageData" :key="index">

            <ul>
              <img v-bind:src="item.photo" alt="photo"><br>
              <li class="show-msg">name:{{item.name}}</li>
              <li class="show-msg">author:{{item.author}}</li>
              <li class="show-msg">level:{{item.level}}</li>
            </ul>

          </li>
          <div class="para" v-if="realList.length==0"><img id="not-found" src="" alt="什么都没找到啊..."></div>
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
  data () {
    return {
      msg: 'This is the test',
      /*formData: {
        name: '',
        author: '',
        level: ''
      },*/
      //productList, //所有数据
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 8, // 每页显示数量
      currentPageData: [], //当前页显示内容
      realList: [],
      list: [
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '节日vlog',
          author: '兔子不吃肉',
          level: 1
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '今天是认真敲代码的第1天',
          author: 'C语言修仙',
          level: 2
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '今天是认真敲代码的第2天',
          author: 'C语言修仙',
          level: 1
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '假期vlog',
          author: '爱吃胡萝卜',
          level: 1
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '录取vlog',
          author: '老虎tiger分不清',
          level: 1
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '今天是认真敲代码的第3天',
          author: 'C语言修仙',
          level: 2
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '环游世界vlog',
          author: '长发姐姐',
          level: 1
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '没有主题vlog',
          author: '令人羡慕的日常生活',
          level: 1
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '今天是认真敲代码的第4天',
          author: 'C语言修仙',
          level: 1
        },
        {
          photo: require('../assets/jpg/web1.jpeg'),
          name: '今天是认真敲代码的第5天',
          author: 'C语言修仙',
          level: 2
        }
      ]
    }
  },
  computed: {
    // realList() {
    //   let { name, phone, sex } = this.formData;
    //   if (name && phone && sex) {
    //     return this.list;
    //   }
    // },
  },
  created () {
    this.search('');
    this.mounted();
    console.log('start');
  },
  methods: {
    search (name) {
      this.currentPage = 1
      this.realList = this.list.filter(item => {
        let matchName = true // 姓名 筛选
        //let matchSex = true // 性别 筛选
        //let matchPhone = true // 号码 筛选

        //if (sex) {
        //  matchSex = item.sex === sex
        //}

        //if (phone) {
          // console.info(Object.prototype.toString.call(phone));
        //  matchPhone = item.phone === phone
        //}

        if (name) {
          // 模糊搜索;
          const keys = name
            .toUpperCase() // 转大写
            .replace(' ', '') // 删掉空格
            .split('') // 切割成 单个字

          matchName = keys.every(key => item.name.toUpperCase().includes(key))
        }
        return matchName //&& matchPhone && matchSex
      })
    },
    mounted() {
        // 计算一共有几页
        this.totalPage = Math.ceil(this.realList.length / this.pageSize);
        // 计算得0时设置为1
        this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
        this.setCurrentPageData();
    },
    // 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...,
    setCurrentPageData() {
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      this.currentPageData = this.realList.slice(begin,end);
    },
    //上一页
    prevPage() {
      console.log(this.currentPage);
        if (this.currentPage == 1) return;

          this.currentPage--;
          this.setCurrentPageData();

    },
    // 下一页
    nextPage() {
      if (this.currentPage == this.totalPage)return ;

        this.currentPage++;
        this.setCurrentPageData();

    }
  }
}
</script>
