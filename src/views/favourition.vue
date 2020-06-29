<template>
    <div class="global-container">
        <Header/>

        <div class="body">
            <div class="overall">
                <div class="header">
                    <div class="wrapper" >
                        <div class="h-inner">
                            <div class="h-gradient"></div>
                            <div class="h-user">
                                <div class="h-info">
                                    <div class="h-avatar">
                                        <div class="ih-item2">

                                        </div>
                                        <span class="avatar-m"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="s-space">
                    <div class="wrapper" id="page-fav">
                        <div class="toc">
                            <div class="beazb">
                                <div class="fav-siden">
                                    <div class="Collect-bar">
                                        <h2>我的创建</h2>
                                    </div>

                                    <div class="favadd">
                                        <span title="创建收藏夹" class="icon-add"></span>
                                        <span class="text">新建收藏夹</span>
                                    </div>
                                    <div class="fav-item" >
                                        <a href="" class="fav-link" title="默认收藏夹">默认收藏夹</a>
                                        <span class="num">378</span>
                                    </div>
                                    <div class="favadd">
                                        <li class='fav-item'>
                                            <a href="" class="fav-link">新建收藏夹1</a>
                                            <span class="num">378</span>
                                        </li>
                                    </div>
                                    <div class="favadd">
                                        <li class='fav-item'>
                                            <a href="" class="fav-link">新建收藏夹2</a>
                                            <span class="num">378</span>
                                        </li>
                                    </div>
                                </div>

                            </div>
                        </div>
<<<<<<< HEAD
                    <div style="display: none">

                    </div>
=======
                        <div style="display: none">
                            <ul class="form-group" id="details">    <!--addda-->
                                <ul class="fav-video" >
                                    <li class="small-item" >
                                        <div class="ih-item">
                                            <a id="mubiaovideo" href="https://www.hao123.com" target="_blank">

                                                <div class="img">
                                                    <img  id="fengmianpic" src="@/assets/test.png" alt="img">

                                                </div>
                                                <span class="time-length" id="videotime" >12:30</span>
                                                <div class="info">
                                                    <h3 id="bofl">播放量</h3>
                                                    <h3 id="dianzl">点赞量</h3>
                                                    <h3 id="shoucl">收藏量</h3>
                                                    <h3 id="pingll">评论数</h3>
                                                </div>
                                                <p class="videotitle" id="videoname">视频名称</p>
                                            </a>
                                        </div>
                                    </li>
                                </ul>

                            </ul>
                        </div>
>>>>>>> 3d91e22606ac29d9d4aeeef1f8f92d049632b911
                        <div class="beayb"  id="adform">
                            <div class="fav-info">
                                <p>这里是收藏夹基本信息栏</p>
                            </div>
                            <div v-for="(item,index) in userList":key="index">
                                <ul class="form-group" id="details">    <!--addda-->
                                    <ul class="fav-video" >
                                        <li class="small-item" >
                                            <div class="ih-item">
                                                <a id="mubiaovideo" @click="videoplay(item)" target="_blank">


                                                        <div class="img">
                                                            <img :src="'api'+item.videoCover"  alt="img">

                                                        </div>
                                                        <span class="time-length" id="videotime" >{{Math.floor(item.videoDuration/60)+":"+(item.videoDuration%60)}}</span>
                                                        <div class="info">
                                                            <h3 >播放量{{item.videoBrowses}}</h3>
                                                            <h3 >点赞量{{item.videoFavors}}</h3>
                                                            <h3 >收藏量{{item.videoCollections}}</h3>
                                                            <h3 >评论数{{item.videoComments}}</h3>
                                                        </div>
                                                        <p class="videotitle" id="videoname">{{item.videoName}}</p>

                                                </a>
                                            </div>
                                        </li>
                                    </ul>

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>

    </div>


</template>

<script>
    import https from "@/https.js";
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    import $ from 'jquery'
    export default {
        components: {Footer, Header},
        data() {
            let ade=100;

            return {
                begin: 1,
                end: 8,
                userList:[],
                env:'',
            }
        },
        mounted:function(){
            let params ={begin: this.begin,end:this.end};
            let detaildiv = 1;
            https.fetchPost('/video/all',params)
                .then(data =>{
                    console.log(data.data)
                    this.userList = data.data.data
<<<<<<< HEAD
=======
                    console.log(this.userList)
                    for( var i=0 ;i<this.userList.length;i++){
                    let e = document.getElementById("details");
                    let div = document.createElement("div");
                    $(div).css({'float': 'left', 'width': '30%'})

                    div.id = "details" + detaildiv;
                    document.getElementById("dianzl").innerText="点赞量:"+this.userList[i].videoFavors;
                    document.getElementById("bofl").innerText="播放量:"+this.userList[i].videoBrowses;
                    document.getElementById("shoucl").innerText="收藏量:"+this.userList[i].videoCollections;
                    document.getElementById("pingll").innerText="评论数:"+this.userList[i].videoComments;
                    document.getElementById("videotime").innerText="12:35";//视频时长参数没找到,再说吧,困了睡觉
                    document.getElementById("fengmianpic").src='api'+this.userList[i].videoCover;
                    document.getElementById("mubiaovideo").href='api'+this.userList[i].videoPath;
                    document.getElementById("videoname").innerText=this.userList[i].videoName;
                    div.innerHTML = e.innerHTML;
                    document.getElementById("adform").appendChild(div);
                        detaildiv++;
                    console.log(this.userList[i].videoCollections)
                    }
>>>>>>> 3d91e22606ac29d9d4aeeef1f8f92d049632b911
                })

        },
        methods:{
            videoplay(videoMsg)
            {
                console.log('videoMsg:'+videoMsg)
                this.$router.push({path:'videodetail',query:{videoinfo:JSON.stringify(videoMsg)}})
            }
        }





    }

</script>
    <style lang="scss" scoped>
        body{
            font-family: "Microsoft YaHei", serif;
        }
        .videotitle{
            size: 15px;
            color: #111111;
        }
        h2{
            padding: 10px;
        }
        .fav-item{
            list-style: none;
        }
        div.body{
            color: #222;
            background: #f4f5f7;
            font-size: 12px;
            line-height: 1.7em;
            margin: 0;
            height: inherit;
            min-height: 100%;
            padding-bottom: 12px;
        }
        .body .header{
            z-index: 10;
            padding-top: 24px;
        }
        div.wrapper{
            width: 1100px;
            margin: 0 auto;
            position: relative;
            height: 100%;
        }
        .s-space {
            height: 100%;
        }

        .overall {
            height: inherit;
            min-height: 100%;
        }

        .h-inner{
            background-image: url("../assets/preview.png");
            background-position: 50%;
            background-size: cover;
            transition: background-image .2s ease,background-size 1s ease;
            padding-top: 116px;
            position: relative;
        }

        div:after {
            clear: both;
            display: table;
            content: "";
        }
        div.minitype{
            position: relative;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
        }
        .overall.s-space.wrapper.toc div{
            padding: 0;
            background: rgb(255, 255, 255);
            box-shadow: 0 0 0 1px #eee;
            border-radius: 4px;
        }
        h3{
            font-size: 19px;
            font-family: "Microsoft YaHei",serif;
            margin: 5px 0px;
            height: 50px;
            color: #fff;
            padding-left: 20px;
            line-height: 20px;
        }
        .toc {
            height: 100%;
            float: left;
            min-height: 90vh;
        }

        .toc:after {
            clear: both;
            display: table;
            content: "";
        }
        div.beazb{
            float: left;
            width: 180px;
            height: inherit;
            min-height: 90vh;
            background-color: #ffffff;
            margin-right: -1px;
            font-size: 14px;
            color: #222;
            right: 15px;
            border-right: 10px solid #eee;
            box-sizing: border-box;
        }
        div.fav-siden{
            border-bottom: 1px solid #eee;

        }
        div.beayb{
            position: relative;
            float: left;
            width: 920px;
            min-height: 600px;
            height: inherit;
            background-color: #ffffff;
            border-left: 1px solid #eee;
            border-bottom: none;
            margin-bottom: 0;
        }
        div.beayb:after{
            clear: both;
        }
        div.favadd{
        position: relative;
        height: 44px;
        padding-left: 20px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        cursor: pointer;
        align-items: center;
        }
        div.fav-item{
            position: relative;
            padding-left: 20px;
            transition-property: background-color;
            transition-duration: 0.3s;
            transition-timing-function: ease;
            transition-delay: 0s;
            white-space: nowrap;
            font-size: 0;
            overflow: hidden;
        }
        .icon-add{
            background-position: -86px -1170px;
            width: 30px;
            height: 30px;
            vertical-align: middle;
            display: inline-block;
            background-image: url("../assets/preview.png");/*加一个“+”号的图标*/
        }
        .icon-huaban{
            color: #999;
            font-size: 22px;
            vertical-align: middle;
            margin-right: 10px;
            font-family: "iconfont" !important;
            font-size: 16px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .fav-link{
            display: inline-block;
            line-height: 44px;
            width: 86px;
            margin-right: 5px;
            font-size: 14px;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .num{
            display: inline-block;
            width: 32px;
            font-size: 12px;
            color: #99a2aa;
            vertical-align: middle;
            text-align: center;
            font-family: Arial;
        }
        .meta-mask{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 4;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: rgba(0,0,0,.45);
            color: #e5e9ef;
            transition-property: opacity;
            transition-duration: 0.2s;
            transition-timing-function: ease;
            transition-delay: 0s;
        }
        div.h-gradient{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 84px;
            background-image: url(../assets/shadow.png);
            background-repeat: repeat-x;
        }
        .fav-info{
            padding: 20px 0;
            margin: 0 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #e5e9ef;
        }
        .time-length{
            background: #111111;
            display: block;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 5px 0 0 0;
            color: #fff;
            line-height: 20px;
            transition: all .2s ease;
            padding: 0 6px;
            position: absolute;
            right: 0;
            bottom: 0;
        }
        .form-group {
            width: 100%;
            height: 100%;
            border-bottom: none;
            background-color: #ffffff;
            margin-bottom: 0;
            position: relative;
            float: left;
        }

        .small-item{
            padding: 0;
            margin: 0 20px 20px 0;
            border-radius: 4px;
            border: 1px solid #fff;
            background-color: #ffffff;
            box-sizing: border-box;
            display: block;
            width: 160px;
            height: 100%;
            position: relative;
        }

        .small-item:after {
            clear: both;
            display: table;
            content: "";
        }

        .ih-item{
            position: relative;
            width: 220px;
            height: 220px;
        }


        .fav-video{
            display: block;
            list-style: none;
        }
        .cover{
            background: url("../assets/preview.png") 50%;
            background-size: cover;
            border-radius: 4px;
            display: block;
            width: 160px;
            height: 100px;
            overflow: hidden;
            position: relative;
            text-decoration: none;
            color: inherit;
            transition: color .2s ease,background-color .2s ease;
            cursor: pointer;
            display: block;
        }
        .small-item{
            display: block;
            width: auto;
            position: relative;
            margin: 0 0 4px;
            padding: 10px;
        }
        h3{
            color: #f4f4f4;
        }
        .ih-item2 .img2 img {
            position: absolute;
            width: 100px;
            height: 100px;
            max-width: 100%;
        }
        .ih-item2{
            position: relative;
            width: 100px;
            height: 100px;
        }
        .ih-item .img img{

            position: relative;
            width: 220px;
            height: 180px;
            max-width: 100%;
        }
        .header .h-avatar .avatar-cover {
            position: relative;
            top: 0;
            left: 0;
            width: 12px;
            height: 12px;
            background: rgba(0,0,0,.6);
            font-size: 12px;
            color: #fff;
            line-height: 64px;
            text-align: center;
            opacity: 0;
            border-radius: 50%;
            transition: opacity .2s;
        }
        .header #h-avatar {
            position: relative;
            width: 100px;
            height: 100px;
            top: 50px;
            border-radius: 4px;
        }
        .header .h-user {
            position: relative;
            z-index: 1;
        }
        .header .h-info {
            margin-left: 20px;
            padding-bottom: 16px;
            display: block;
        }
        .ih-item .info {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            -webkit-backface-visibility: hidden;/* 隐藏旋转元素的背面*/
            backface-visibility: hidden;
            background: rgba(0, 0, 0, 0.7);   /*后面这个0.6是指的背景的透明度*/
            opacity: 0;
            -webkit-transition: all 0.35s ease-in-out;   /*规定提示信息怎样出现ease-in-out以慢速度开始和结束*/
            -moz-transition: all 0.35s ease-in-out;
            transition: all 0.35s ease-in-out;
        }
        a:link {color: #ffffff}
        a:visited {color: #ffffff}
        a:hover {color: #ffffff}
        a:active {color: #ffffff}
        .ih-item2 .info2 {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0px;
            right: 0;
            text-align: center;
            -webkit-backface-visibility: hidden;/* 隐藏旋转元素的背面*/
            backface-visibility: hidden;
            background: rgba(0, 0, 0, 0.6);   /*后面这个0.6是指的背景的透明度*/
            opacity: 0;
            -webkit-transition: all 0.35s ease-in-out;   /*规定提示信息怎样出现ease-in-out以慢速度开始和结束*/
            -moz-transition: all 0.35s ease-in-out;
            transition: all 0.35s ease-in-out;
        }
        .ih-item2 a:hover .info2 {
            opacity: 1;    /*有opacity有0变成1*/
        }
        .ih-item a:hover .info {
            opacity: 1;    /*有opacity有0变成1*/
        }

        .global-container {
            height: auto;
        }
    </style>
