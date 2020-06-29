<template>
    <div class="header">
        <div class="container">
            <div class="header-logo">
                <router-link to="/">AI字幕君</router-link>
            </div>
            <div class="header-list">
                <ul>
                    <li v-if="token != null" id="me">
                        <router-link style="display: block; height: 20px" to="/userinfo">
                            <img :src="headicon" style="height: 20px; width: 20px">
                        </router-link>
                        <div class="me-colla">
                            <div><router-link to="/userinfo">个人中心</router-link></div>
                            <div><router-link to="/favourition">收藏夹</router-link></div>
                        </div>
                    </li>
                    <li v-if="token != null" id="video">
                        视频
                        <div class="video-colla">
                            <div><router-link to="/uploader">视频上传</router-link></div>
                            <div>视频编辑</div>
                        </div>
                    </li>
                    <div v-if="token == null" style="display: flex">
                        <li>
                            <router-link to="/login">登录</router-link>
                        </li>
                        <li>
                            <router-link to="/register">注册</router-link>
                        </li>
                    </div>
                    <li>
                        <router-link to="/about">关于我们</router-link>
                    </li>

                    <li v-if="token != null" >
                        <a href="javascript:void(0)" @click="quit">退出登录</a>
                    </li>

                    <li>
                        <a href="javascript:void(0)" @click="test">测试</a>
                    </li>



                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import https from "@/https.js";
    export default {
        name: "Header",
        data() {
            return {
                token: '',
                headicon: ''
            }
        },
        props: {
            a: {
                type: Number,
                default: 0
            }
        },
        mounted() {
            let tmp = localStorage.getItem('token');
            console.log(this.token)
            this.token = tmp == null || tmp === '' ? null : tmp
            if (this.token != null) {
                let userinfo = JSON.parse(localStorage.getItem('userinfo'))

                if (process.env.VUE_APP_MODE !== 'production') {
                    this.headicon = 'api'+userinfo.image
                } else {
                    this.headicon = userinfo.image
                }
            }
        },
        methods: {
            quit() {
                this.token = null
                localStorage.removeItem('token')
                localStorage.removeItem('userinfo')
                this.$router.push('/')
            },
            test() {
                let a = {"code":1001,"data":[{"videoId":2,"userId":3,"videoName":"美人鱼名场面","videoPath":"/video/fcb5eefd2d3b1e540283fc231e699281/fcb5eefd2d3b1e540283fc231e699281.mp4","videoSize":1.22251213E8,"videoFormat":"mp4","videoCover":"/image/Default_video_cover.jpg","videoDuration":3591.0,"videoFavors":0,"videoBrowses":0,"videoShares":0,"videoComments":0,"videoCollections":0,"videoZHSubtitle":null,"videoENSubtitle":null,"videoENZHSubtitle":null,"videoENZHSubtitleJSON":null,"processProgress":null,"identifier":"fcb5eefd2d3b1e540283fc231e699281","createTime":"2020-06-29T08:53:38.472+00:00"}]}
                this.$router.push({path:'/videodetail', query:{videoinfo: JSON.stringify(a.data[0])}})
            }
        },

    }
</script>

<style lang="scss" scoped>
    .header{
        position: fixed;
        z-index: 100;
        height: $header-height;
        right: 0;
        left: 0;
        top: 0;
        background-color: $dark-blue;
        box-shadow: 0 1px 10px -6px rgba(0,0,0,0.42), 0 1px 10px 0 rgba(0,0,0,0.12), 0 4px 5px -2px rgba(0,0,0,0.1);
    }

    .header .container{
        padding: 10px 0;
        display: flex;
        margin: 0 5%;
        height: 40px;
    }

    .header-logo{
        color: white;
        font-size: 20px;
        line-height: 40px;
        margin-right: auto;
    }

    .header-logo a{
        text-decoration: none;
        color: white;
    }


    .header-list {

    }

    .header-list ul{
        display: flex;
        padding: 0;
        margin: 0;
        height: 40px;
        list-style: none;
    }

    .header-list li{
        line-height: 20px;
        padding: 10px 25px;
        font-size: 12px;
        color: white;
    }

    .header-list a, .header-list router-link{
        text-decoration: none;
        color: white;
        transition: color 1s;
    }

    .header-list a:hover, .header-list router-link:hover{

        color: rgb(51, 209, 255);
    }

    .video-colla, .me-colla{
        visibility: hidden;
        position: absolute;
        z-index: 99;
        width: 84px;
        left: -5px;
        padding-top: 20px;
    }


    .video-colla div, .me-colla div{
        background: $dark-blue;
        padding: 12px 4px;
    }

    #video:hover .video-colla{
        visibility: visible;
    }

    #me:hover .me-colla{
        visibility: visible;
    }


    #video, #me{
        position: relative;
        cursor: pointer;
    }

</style>
