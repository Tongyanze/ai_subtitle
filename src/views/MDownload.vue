<template>
    <div class="global-container">
        <Header/>
        <div class="container">
            <div class="video-box">
                <div class="video-container">
                    <video ref="video1" :src="video1url"></video>
                </div>
                <div class="video-container">
                    <video ref="video2" :src="video2url"></video>
                </div>
            </div>
            <div style="width: 100%; height: 44px;display: flex; " class="control">

                <font-awesome-icon v-if="isplaying" class="font-awesome-icon convert" :icon="['fas', 'pause-circle']" @click="mplay">
                </font-awesome-icon>
                <font-awesome-icon v-else class="font-awesome-icon convert" :icon="['fas', 'play-circle']" @click="mplay">
                </font-awesome-icon>
                <div style="display: flex;  margin: 0 24px">
                    <div class="radio-btn" style="border-radius: 8px 0 0 8px" :class="{'radio-clicked': sound === 1}"
                         @click="setSound(1)">
                        声音左
                    </div>
                    <div class="radio-btn" style="border-radius:  0 8px 8px 0" :class="{'radio-clicked': sound === 2}"
                         @click="setSound(2)">
                        声音右
                    </div>
                </div>
                <input class="slider" type="range" min="0" :max="mduration" id="timebar" step="0.05" @change="setTime" ref="timebar">
                <span style="height: 44px; line-height: 44px; font-size: 18px">{{nowTime}}</span>
            </div>
            <div class="download-box">
                <div>

                    <a :href="zh">
                    <font-awesome-icon title="中文字幕合成视频下载" class="font-awesome-icon download"
                                       :icon="['fas', 'download']" @click="mdownload(1)">
                    </font-awesome-icon>
                    </a>

                    <a :href="en">
                    <font-awesome-icon title="英文字幕合成视频下载" class="font-awesome-icon download"
                                       :icon="['fas', 'download']" @click="mdownload(2)">
                    </font-awesome-icon>
                    </a>

                    <a :href="merge">
                    <font-awesome-icon title="中英文字幕合成视频下载" class="font-awesome-icon download"
                                       :icon="['fas', 'download']" @click="mdownload(3)">
                    </font-awesome-icon>
                    </a>
                </div>
                <div>
                    <div>
                        中文字幕合成视频下载
                    </div>
                    <div>
                        英文字幕合成视频下载
                    </div>
                    <div>
                        中英文字幕合成视频下载
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
    import https from "@/https";
    import $ from 'jquery';
    export default {
        name: "MDownload",
        components: {Footer, Header},
        data() {
            return {
                video1url: '',
                video2url: '',
                videoInfo: '',
                videoId: '',
                video1: '',
                video2: '',
                mduration: 0,
                timebar: '',
                sound: 1,
                soundVal: 100,
                nowTime: '',
                isplaying: false,
                zh: '',
                en: '',
                merge: ''

            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            mdownload(x) {

            },
            setSound(x) {
                this.sound = x
                if (x === 1) {
                    this.video2.muted  = 1
                    this.video1.muted = 0
                }
                else {
                    this.video1.muted  = 1
                    this.video2.muted = 0
                }
            },
            mplay() {
                if (this.video1.paused) {
                    this.video1.play()
                    this.isplaying = true
                }
                else {
                    this.video1.pause()
                    this.isplaying = false
                }
            },
            setTime() {
                this.video1.currentTime = this.video2.currentTime = this.timebar.value
                $('#timebar').css('background-size', this.timebar.value/this.mduration*100 + '% 100%' )
            },
            setVideoControl() {
                this.video1 = this.$refs.video1
                this.video2 = this.$refs.video2
                this.timebar = this.$refs.timebar
                this.timebar.addEventListener("input", () => {
                    $('#timebar').css('background-size', this.timebar.value/this.mduration*100 + '% 100%' )
                })
                this.video2.muted  = 1
                this.video1.muted = 0

                this.video1.addEventListener("play", () => {
                        this.video2.play()
                    this.isplaying = true;
                    }
                )
                this.video2.addEventListener("play", () => {
                        this.video1.play()
                    }
                )
                this.video1.addEventListener("pause", () => {
                        this.video2.pause()
                    this.isplaying = false;
                    }
                )
                this.video1.addEventListener("pause", () => {
                        this.video1.pause()
                    }
                )

                this.video1.addEventListener("timeupdate", () => {
                    this.timebar.value  = this.video1.currentTime
                    $('#timebar').css('background-size', this.timebar.value/this.mduration*100 + '% 100%' )
                    let tmp = this.video1.currentTime.toString().split('.')
                    let x = parseInt(tmp[0])
                    let s = x%60
                    let m = parseInt(x/60)%60
                    let h = parseInt(x/3600)
                    if (s < 10) s = '0'+s
                    if (m < 10) m = '0'+m
                    if (h < 10) h = '0'+h
                    this.nowTime = h+':'+m+':'+s
                })

            },
            getInfo() {
                this.videoId = this.$route.query.videoId

                console.log(this.videoId)
                https.fetchPost('/findVideoInfo', {videoId: this.videoId})
                    .then(res => {
                        let data = res.data.data
                        this.videoInfo = data
                        this.mduration = data.videoDuration
                        if (process.env.VUE_APP_MODE !== 'production') {
                            this.video1url = 'api/video/'+data.identifier+'/'+data.identifier+'.'+data.videoFormat
                            this.video2url = 'api'+data.videoPath
                            this.zh = 'api/video/'+data.identifier+'/'+data.identifier+'-zh.'+data.videoFormat
                            this.en = 'api/video/'+data.identifier+'/'+data.identifier+'-en.'+data.videoFormat
                            this.merge = 'api/video/'+data.identifier+'/'+data.identifier+'-merge.'+data.videoFormat

                        } else {
                            this.video1url = '/video/'+data.identifier+'/'+data.identifier+'.'+data.videoFormat
                            this.video2url = data.videoPath
                            this.zh = '/video/'+data.identifier+'/'+data.identifier+'-zh.'+data.videoFormat
                            this.en = '/video/'+data.identifier+'/'+data.identifier+'-en.'+data.videoFormat
                            this.merge = '/video/'+data.identifier+'/'+data.identifier+'-merge.'+data.videoFormat
                        }
                        this.setVideoControl();
                    })
                    .catch(err => {

                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .global-container {
        height: auto;
    }

    .container {
        min-height: 100%;
        height: inherit;
        margin: 0 8%;
        box-sizing: border-box;
        padding-top: 24px;
        display: flex;
        z-index: 1;
        flex-direction: column;
    }

    .video-box {
        width: 100%;
        height: 50vh;
        display: flex;
    }

    .video-container {
        width: 48%;
        height: 0;
        position: relative;
        padding-bottom: 27%;
        margin: 0 8px;
        video {
            position: absolute;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }

    .slider {
        margin: 16px 12px;
        -webkit-appearance: none;
        width: 70%;
        border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
        background: -webkit-linear-gradient($dark-blue, $dark-blue) no-repeat;
        background-size: 0% 100%;
    }
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        margin-top: -6px; /*使滑块超出轨道部分的偏移量相等*/
        background: #ffffff;
        border-radius: 50%; /*外观设置为圆形*/
        border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
        box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
        cursor: pointer;

    }

    .slider::-webkit-slider-runnable-track {
        height: 8px;
        border-radius: 10px; /*将轨道设为圆角的*/
        box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/
    }

    .slider:focus {
        outline: none;
    }

    .radio-btn {
        background: $theme-white;
        height: 28px;
        line-height: 28px;
        padding: 8px 20px;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.5s linear;
    }

    .radio-clicked, .radio-btn:hover{
        background: $dark-blue;
        color: white;
    }

    .control {
        .font-awesome-icon {
            height: 44px;
            width: 44px;
            transition: color 0.3s linear;
            cursor: pointer;
            color: $dark-blue;
        }

        .font-awesome-icon:hover {
            color: $fade-blue;
        }
    }

    .download-box {
        width: 100%;
        height: 120px;
        display: flex;
        margin-top: 40px;
        flex-direction: column;

        div {
            width: 100%;
            height: 60px;
            display: flex;

            div {
                font-size: 18px;
                height: 48px;
                margin: 0 auto;
                text-align: center;
                display: flex;
                justify-content: center;
            }
        }

        .font-awesome-icon, a {
            height: 48px;
            width: 48px;
            margin: 0 auto;

        }


    }

    .download {
        color: $icon-grey;
        cursor: pointer;
        transition: color 0.5s linear;
    }

    .download:hover{
        animation:up-down 0.6s linear 1;
    }

    @keyframes up-down {
        0%{transform: translateY(0);}
        20%{transform: translateY(-8px);}
        40%{transform: translateY(8px);}
        60%{transform: translateY(-8px);}
        80%{transform: translateY(8px);}
        100%{transform: translateY(0);}
    }

    .download:hover{
        color: $dark-blue;
    }
</style>
