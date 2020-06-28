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
                        <font-awesome-icon class="font-awesome-icon like" :icon="['fas', 'heart']"></font-awesome-icon>
                        <div>
                            {{likeNum}}
                        </div>
                    </div>
                    <div>
                        <font-awesome-icon class="font-awesome-icon star" :icon="['fas', 'star']"></font-awesome-icon>
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
                shareNum: 0
            }
        },
        mounted() {
            this.getInfo()
        },
        methods: {
            getInfo() {
                this.videoinfo = JSON.parse(this.$route.query.videoinfo)
                this.videoName = this.videoinfo.videoName
                console.log(this.videoName)
                if (process.env.VUE_APP_MODE !== 'production') {
                    this.videoUrl = 'api'+this.videoinfo.videoPath
                } else {
                    this.videoUrl = this.videoinfo.videoPath
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        padding-top: 24px;
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
        margin-top: 24px;
        font-size: 24px;
        text-align: start;
        margin-bottom: 12px;
    }

    .dynamic-box {
        margin-top: 12px;
        height: 48px;
        display: flex;
        line-height: 48px;
        font-size: 24px;
    }

    .dynamic-box .font-awesome-icon {
        height: 30px;
        width: 30px;
    }

    .dynamic-box div {
        width: 30%;
        margin: 0 auto;
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

</style>
