<template>
  <div style="position:relative; min-height: 100%">
    <Header/>
    <div class="container">
      <div class="main-content">
        <h1>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconzuzhijiagou"></use>
          </svg>
          开发人员
        </h1>
        <div>
          <h1>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconapp"></use>
            </svg>
            前端组
          </h1>
          <div>
            <p>佟彦泽</p>
            <p>张棋清</p>
            <p>郝良洲</p>
            <p>黄紫璇</p>
            <p>肖铭昊</p>
            <p>苏旭</p>
            <p>曹俊燕</p>
          </div>
        </div>
        <div>
          <h1>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconsetting"></use>
            </svg>
            后端接口组
          </h1>
          <div>
            <p>张宇豪</p>
            <p>张召金</p>
            <p>刘子龙</p>
            <p>毕义才</p>
          </div>
        </div>
        <div>
          <h1>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconplay"></use>
            </svg>
            后端视频处理组
          </h1>
          <div>
            <p>彭元</p>
            <p>施玉秀</p>
            <p>杜驰程</p>
            <p>赵建博</p>
            <p>卢玉坤</p>
            <p>宋璋贤</p>
            <p>陆东宝</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";

  export default {
    name: 'About',
    components: {Footer, Header},
    data() {
      return {

      }
    }
  }

</script>

<style lang="scss" scoped>
  .container{
    min-height: 100%;
    padding-top: $header-height;
    padding-bottom: $footer-height;
  }

  .main-content{
    width: 60%;
    margin:30px auto 30px auto;
  }

  div p {
    font-size: 24px;
    margin: 8px 0;
  }

  .main-content>h1{
    letter-spacing: 20px;
    font-size: 40px;
  }

</style>
