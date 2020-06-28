<template>
    <div class="global-container">
        <Header/>

        <div class="right-tools-box">
            <div class="right-tools">
                <div v-show="showright" class="right-item">
                    <span>字幕</span>
                </div>
                <div v-show="showright" class="right-item">
                    <span>特效</span>
                </div>
                <div v-show="showright" class="right-item">
                    <span>声音</span>
                </div>
            </div>
            <div class="right-tool-arrow"  @click="arrowClick">
                <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'chevron-right']" id="arrow"></font-awesome-icon>
            </div>
        </div>


        <div class="container">
            <div class="video-container">
                <video ref="video" id="video" class="video" src="api/video/f74dc68f824167f6e265dd576c9768b5/f74dc68f824167f6e265dd576c9768b5.mp4" controls></video>
                <div class="subtitle">{{text}}</div>
            </div>

        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import $ from 'jquery';
    import https from "@/https";

    export default {
        name: "VideoModify",
        components: {Footer, Header},
        data() {
            return {
                a: true,
                testtime: [
                    {'begin': '00:00:06', 'end': '00:00:07', 'text': '刘先生'},
                    {'begin': '00:00:07', 'end': '00:00:08', 'text': '你好你好你好'},
                    {'begin': '00:00:10', 'end': '00:00:11', 'text': '有什么事情我们能帮到你'},
                    {'begin': '00:00:13', 'end': '00:00:14', 'text': '我要说的事'},
                    {'begin': '00:00:16', 'end': '00:00:17.0', 'text': '你们千万别害怕'},
                    {'begin': '00:00:17.5', 'end': '00:00:18.5', 'text': '我们是警察'},
                    {'begin': '00:00:19', 'end': '00:00:20', 'text': '我们不会怕'},
                    {'begin': '00:00:20', 'end': '00:00:21', 'text': '你请说'},
                ],
                testtt: [],
                timer: '',
                nowtime: 0,
                text: '',
                showright: true
            }
        },
        mounted() {

            // https.fetchPost('/video/own', {begin: 1, end: 10})
            //     .then(res => {
            //         console.log(res.data)
            //     })
            //     .catch(err => {
            //
            //     })

            $('#arrow').addClass('arrow-turn')

            for (var i = 0;i < this.testtime.length; ++i) {
                let tmp = this.testtime[i]
                let be = tmp.begin.split(':')
                let en = tmp.end.split(':')
                let st = parseInt(be[0])*3600 + parseInt(be[1]) * 60 + parseInt(be[2].split('.')[0]) + parseFloat('0.'+be[2].split('.')[1])
                let een = parseInt(en[0])*3600 + parseInt(en[1]) * 60 + parseInt(en[2].split('.')[0]) + parseFloat('0.'+en[2].split('.')[1])
                let itm = {'begin': st, 'end': een, 'text': tmp.text}
                this.testtt[i] = itm
            }
            console.log(this.testtt)
            const video = this.$refs.video
            const _this = this
            this.$refs.video.addEventListener("timeupdate",function(){
                // _this.nowtime = Math.floor(video.currentTime)
                // this.timer = setInterval(() => {
                //     _this.nowtime = Math.floor(video.currentTime)
                //     console.log(_this.nowtime)
                // }, 500)

                var timeDisplay;
                //用秒数来显示当前播放进度
                // timeDisplay = Math.floor(video.currentTime);
                timeDisplay = video.currentTime
                console.log(video.currentTime)
                let flag = false
                let t = _this.binarySearch(timeDisplay)
                if (t === -1) {
                    _this.text = ''
                } else {
                    _this.text = _this.testtt[t].text
                }

            },false);


        },
        methods: {
            binarySearch(x) {
                let arr = this.testtt
                let st=0, en = arr.length-1, mid;
                mid = parseInt(st + (en - st) / 2);

                while (st < en && !(arr[mid].begin <= x && arr[mid].end >= x) ) {
                    if (arr[mid].end < x) {
                        st = mid+1
                    }
                    else if (arr[mid].begin > x) {
                        en = mid
                    }
                    mid = parseInt((st + en) / 2);
                }
                if (arr[mid].begin <= x && arr[mid].end >= x) {
                    return mid;
                }
                return -1;
            },
            arrowClick() {

                let s = $('.right-tools')
                let arrow = $('#arrow')

                if (this.a===true) {
                    s.css('width', 0)
                    arrow.removeClass('arrow-turn').addClass('arrow-turn1')
                    this.a = false
                    const _this = this
                    let t = setInterval(() => {
                        _this.showright = !_this.showright
                        clearInterval(t)
                    }, 900)



                } else {
                    this.showright = !this.showright
                    s.css('width', '84%')
                    arrow.removeClass('arrow-turn1').addClass('arrow-turn')
                    this.a = true
                }
            },
            jump() {
                let v = {'code': 200, 'name': '123123'}
                console.log(v)
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        min-height: 100%;
        height: inherit;
    }

    .right-tools-box {
        z-index: 100;
        position: fixed;
        right: 0;
        width: 10%;
        height: 50%;
        top: 25%;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;

    }

    .right-tools {
        border-radius: 4px 0 0 4px;
        width: 84%;
        height: 100%;
        background: $dark-blue;
        transition: width 1s ease-out;
        box-shadow: 1px 3px 10px -6px rgba(0,0,0,0.42), 1px 3px 10px 0 rgba(0,0,0,0.12), 0 6px 7px -2px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;
    }

    .right-tool-arrow {
        border-radius: 4px 0 0 4px;
        cursor: pointer;
        width: 12%;
        height: 16%;
        background: $dark-blue;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(217, 217, 217);;
        z-index: 10;
    }

    #arrow {

        transform-origin: center center;
    }

    .arrow-turn {
        transform:rotate(0deg);
        transition:transform 0.3s linear;
    }

    .arrow-turn1 {
        transform:rotate(180deg);
        transition:transform 0.3s linear;
    }

    .video {
        margin-top: 20px;
        height: 90%;
        width: 90%;
        object-fit: fill;
    }

    .video-container {
        width: 60%;
        height: 70%;
        margin-left: 20px;
        position: relative;
        display: flex;
    }

    .subtitle {
        position: absolute;
        bottom: 16%;
        height: 48px;
        font-size: 36px;
        line-height: 48px;
        text-align: center;
        -webkit-text-stroke: 2px black;
        -webkit-text-fill-color: white;
        width: 90%;
        font-weight: bold;
    }

    .right-item {
        cursor: pointer;
        margin: 12px 0;
        border-radius: 8px;
        background: $dark-blue;
        transition: all 0.5s ease-out;
        width: 72%;
        padding: 32% 0 32% 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $theme-white;
    }

    .right-item:hover {
        background: $theme-white;
        color: $dark-blue;
    }

</style>
