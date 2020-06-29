<template>
    <div class="global-container">
        <Header/>
        <div class="container">
            <div class="left-container">

                <div class="title">
                    {{videoName}}
                </div>
                <div class="video-container">

                    <video ref="video" id="video" class="video" :src="videoUrl" controls></video>
                </div>

                <div class="dynamic-box">
                    <div>
                        <font-awesome-icon class="font-awesome-icon like" :class="{'pink': isLike}"
                                           :icon="['fas', 'heart']" @click.stop="add('like')">

                        </font-awesome-icon>
                        <div>
                            {{likeNum}}
                        </div>
                    </div>
                    <div>
                        <font-awesome-icon class="font-awesome-icon star" :class="{'yellow': isInterest}"
                                           :icon="['fas', 'star']" @click.stop="add('interest')">

                        </font-awesome-icon>
                        <div>
                            {{interestNum}}
                        </div>
                    </div>
                    <div>
                        <font-awesome-icon class="font-awesome-icon share" :icon="['fas', 'share']"></font-awesome-icon>
                        <div>
                            {{shareNum}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-container">
                <div v-if="userId === localuserId" class="edit-box" title="编辑视频" @click="edit">
                    <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'edit']"></font-awesome-icon>
                    <span>编辑视频</span>
                </div>
            </div>
        </div>
        <Footer/>
    </div>

</template>

<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import https from "@/https";
    export default {
        name: "VideoDetail",
        components: {Footer, Header},
        data() {
            return {
                videoinfo: '',
                videoUrl: '',
                videoName: '',
                isLike: false,
                isInterest: false,
                likeNum: 0,
                interestNum: 0,
                shareNum: 0,
                videoId: 0,
                localuserId: -1,
                userId: -1
            }
        },
        mounted() {

            this.getInfo()
        },
        methods: {
            edit() {
                this.$router.push({path:'/videomodify', query:{videoinfo: JSON.stringify(this.videoinfo)}})
            },
            add(s) {
                let tmp = localStorage.getItem('token');
                console.log(this.token)
                if (tmp == null || tmp === '') {
                    alert('点赞、收藏请先登录')
                    return
                }
                this.checkSome(this.videoId)
                if  (s === 'like') {
                    if (this.isLike) {
                        https.fetchPost('/userOpVideo/delete', {type: 'favor', videoId: this.videoId})
                            .then(res => {})
                            .catch(err => {})
                    } else {
                        https.fetchPost('/userOpVideo/add', {type: 'favor', videoId: this.videoId})
                            .then(res => {})
                            .catch(err => {})
                    }

                    this.isLike = this.isLike === false;

                } else if  (s === 'interest') {
                    if (this.isInterest) {
                        https.fetchPost('/userOpVideo/delete', {type: 'collection', videoId: this.videoId})
                            .then(res => {})
                            .catch(err => {})
                    } else {
                        https.fetchPost('/userOpVideo/add', {type: 'collection', videoId: this.videoId})
                            .then(res => {})
                            .catch(err => {})
                    }

                    this.isInterest = this.isInterest  === false;
                }

                https.fetchPost('/findVideoInfo', {videoId: this.videoId})
                    .then(res => {
                        let data = res.data.data
                        this.likeNum = data.videoFavors
                        this.interestNum = data.videoCollections
                    })
                    .catch(err => {

                    })

            },
            checkSome(videoId) {
                https.fetchPost('/userOpVideo/search', {videoId: videoId})
                    .then(res => {
                        let data = JSON.parse(res.data.data)
                        this.isLike = data.favor === 1
                        this.isInterest = data.collection === 1
                    })
                    .catch(err => {

                    })
            },
            getInfo() {
                if (localStorage.getItem('token') != null && localStorage.getItem('token') !== '') {
                    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
                    this.localuserId = userinfo.userId
                }
                this.videoinfo = JSON.parse(this.$route.query.videoinfo)
                this.videoName = this.videoinfo.videoName
                this.videoId = this.videoinfo.videoId
                this.likeNum = this.videoinfo.videoFavors
                this.interestNum = this.videoinfo.videoCollections
                this.userId = this.videoinfo.userId
                console.log(this.videoName)
                if (process.env.VUE_APP_MODE !== 'production') {
                    this.videoUrl = 'api'+this.videoinfo.videoPath
                } else {
                    this.videoUrl = this.videoinfo.videoPath
                }
                this.checkSome(this.videoId)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        padding-top: 40px;
        height: inherit;
        display: flex;
        margin: 0 10%;
        box-sizing: border-box;
    }

    .left-container {
        min-height: 100%;
        width: 70%;
        padding: 4px 12px;
    }

    .right-container {
        min-height: 100%;
        width: 30%;
        padding: 4px 12px;
    }

    .video {
        height: 100%;
        width: 100%;
        object-fit: fill;
        position: absolute;
    }

    .video-container {
        width: 100%;
        padding-bottom: 56.25%;
        display: flex;
        height: 0;
        position: relative;
    }

    .title {
        font-size: 24px;
        text-align: start;
        margin-bottom: 12px;
    }

    .dynamic-box {
        margin-top: 8px;
        height: 40px;
        display: flex;
        line-height: 40px;
        font-size: 20px;
    }

    .dynamic-box .font-awesome-icon {
        height: 24px;
        width: 24px;
    }

    .dynamic-box div {
        width: 10%;
        margin: 0 12px;
        display: flex;
        align-items: center;
    }

    .pink {
        color: $pink;
    }

    .like:hover {
        color: $pink;
    }

    .star:hover {
        color: $yellow;
    }

    .yellow {
        color: $yellow;
    }

    .share:hover {
        color: $fade-blue;
    }

    .like, .star, .share{
        cursor: pointer;
        transition: color 0.3s linear;
    }

    .edit-box{
        transition: color 0.5s linear;
        cursor: pointer;
        color: grey;
        font-size: 30px;
        .font-awesome-icon {
            width: 30px;
            height: 30px;
        }

        .font-awesome-icon:hover {
            color: $dark-blue;
        }
    }

    .edit-box:hover {
        color: $dark-blue;
    }

</style>
