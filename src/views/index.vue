<template>
    <div>
        <Header/>
        <div class="container">
            <div class="img" id="img1">
                <div class="mid-words">
                    AI字幕君
                </div>
                <img src="@/assets/0725_10.jpg"/>
            </div>
            <div class="img" id="img2">
                <img src="@/assets/0725_11.jpg"/>
            </div>

            <div class="img" id="img3">
                <img src="@/assets/0725_12.jpg"/>
            </div>
        </div>


        <Footer/>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
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

<style scoped>
    .header{
        background: rgba(107, 154, 255, 0.2);
        transition: background 1s;
    }

    .header:hover{
        background: rgb(107, 154, 255);
    }
    .mid-words{
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
        line-height: 100px;
        font-size: 80px;
        font-weight: bold;
        text-align: center;
        color: white;
    }
    .container {

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

</style>
