<template>
    <div style="position: relative;">
        <Header/>
        <div class="container">
            <div class="img" id="img1">
                <div class="mid-words">
                    AI字幕君
                    <div style="font-weight: normal; font-size: 28px; line-height: 40px">
                        <p>
                            一个“聪明”的在线视频编辑器
                        </p>

                        <p>
                            添加字幕，视频变声样样行。
                        </p>
                    </div>
                </div>
                <img src="@/assets/0725_10.jpg"/>
            </div>

            <div class="img" id="img2">
                <div class="left-words">
                    没有账号？
                    <button class="btn">
                        <router-link to="/register">立即注册</router-link>
                    </button>
                </div>
                <img src="@/assets/0725_11.jpg"/>
            </div>

            <div class="img" id="img3">
                <img src="@/assets/0725_12.jpg"/>
            </div>

            <div class="for-footer"></div>
        </div>
        <Footer/>


    </div>
</template>

<script>
    import $ from 'jquery'
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import axios from 'axios'
    import qs from 'qs'
    import https from "@/https.js";

    export default {
        name: "index",
        components: {Footer, Header},
        data() {
            return {
                pageSN: 1
            }
        },
        mounted() {
            $("#img2").css("right", '100%');
            $("#img3").css("left",'100%');
            $("#img2").css("opacity", 0);
            $("#img3").css("opacity", 0);
            console.log('123')
        },
        created() {
            const _this = this;
            $(window).scroll(function(){
                const lineHeight=200+$(window).height()*_this.pageSN;
                const windowHeight=$(window).height();
                const scrollTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

                if(scrollTop+windowHeight>=lineHeight){
                    _this.pageSN++;
                    _this.showImg(_this.pageSN); // 执行增加页面数据操作
                }
            });
        },
        methods:{
            test() {
                let params = {
                    userName: 'tttttttt',
                    userPassword: 'tttttttttttttt',
                    userEmail: '1231@1.com'
                }

              https.fetchPost('/user/regist', params).then(data => {
                  alert(JSON.stringify(data.data))
              }).catch(err => {
                  alert(err)
              })
            },
            showImg(x) {

                let s = '#img'+x;
                if (x % 2 === 0) {
                    $(s).css("right", 0);
                }
                else {
                    $(s).css("left", 0);
                }

                $(s).css("opacity", 1);
            }
        }
    }



</script>

<style lang="scss" scoped>
    .header{
        background-color: rgba(55, 92, 160, 0.2);
        transition: background 1s;
    }

    .header:hover{
        background-color: rgb(55, 92, 160);
    }
    .mid-words{
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        flex-flow: column;
        display:flex;
        justify-content: center;
        align-items: center;
        line-height: 100px;
        font-size: 80px;
        font-weight: bold;
        text-align: center;
        color: white;
    }

    .btn{
        color: white;
        background: rgba(255, 255, 255, 0.2);
        border: solid 2px;
        font-size: 36px;
        border-radius: 12px;
        transition: background 1s;
    }

    .btn a{
        text-decoration: none;
        color: white;
    }

    .btn:hover{
        background: rgba(255, 255, 255, 0.5)
    }

    .left-words{
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        display:flex;
        padding-left: 10%;
        align-items: center;
        line-height: 100px;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        color: white;
    }

    .container {
        overflow-x: hidden;
    }

    .img{
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .img img{
        position: relative;
        height: 100%;
        width: 100%;
        right: 0;
    }

    #img2{
        transition: right 0.8s ease-in-out, opacity 1s ease-in-out;
    }

    #img3{
        transition: left 0.8s ease-in-out, opacity 1s ease-in-out;
    }

    .for-footer{
        height: $footer-height;
    }

</style>
