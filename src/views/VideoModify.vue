<template>
    <div class="global-container">
        <Header/>

        <div class="right-tools-box">
            <div class="right-tools">
                <div v-show="showright" class="right-item" @click="select(1)" :class="[part === 1 ? 'clicked'  : '']">
                    <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'edit']"></font-awesome-icon>
                    <span>字幕</span>
                </div>
                <div v-show="showright" class="right-item" @click="select(2)" :class="[part === 2 ? 'clicked'  : '']">
                    <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'magic']"></font-awesome-icon>
                    <span>特效</span>
                </div>
                <div v-show="showright" class="right-item" @click="select(3)" :class="[part === 3 ? 'clicked'  : '']">
                    <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'music']"></font-awesome-icon>
                    <span>声音</span>
                </div>
            </div>
            <div class="right-tool-arrow"  @click="arrowClick">
                <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'chevron-right']" id="arrow"></font-awesome-icon>
            </div>
        </div>


        <div class="container">
            <div class="left-container">
                <div class="video-container">
                    <video ref="video" id="video" class="video" :src="videoUrl" controls></video>
                    <div class="subtitle">{{text}}<br><span v-show="isEn">{{enText}}</span></div>
                </div>
                <div v-show="part === 1" class="add-subtitle">
                    <div style="font-size: 28px; margin-bottom: 12px">
                        新增字幕
                    </div>
                    <div class="edit-time">
                        <span>开始时间<span style="color: red">*</span>：</span>
                        <input type="text" placeholder="HH:MM:SS,mmm" v-model="newStart">
                        <span style="margin-left: 32px">结束时间<span style="color: red">*</span>：</span>
                        <input type="text" placeholder="HH:MM:SS,mmm" v-model="newEnd">
                        <span style="margin-left: 32px">显示英文</span>
                        <input type="checkbox" v-model="isEn">
                    </div>
                    <div style="display: flex; align-items: center;justify-content: center">
                        <span>字幕内容：</span>
                        <textarea v-model="newSub" placeholder="中文字幕"></textarea>
                        <textarea v-model="newEnSub" placeholder="英文字幕"></textarea>
                    </div>
                    <div>
                        <button class="btn-blue" @click="addNewSub">添加</button>
                        <button class="btn-blue" @click="clearSub">重置</button>

                    </div>
                </div>
            </div>


            <div class="right-container">
                <div class="tools">
                    <div>
                        <font-awesome-icon title="保存" class="font-awesome-icon save" :class="[canSave ? '': 'dis']" :icon="['fas', 'save']" @click="save">
                        </font-awesome-icon>
                    </div>
                    <div>
                        <font-awesome-icon title="视频转换" class="font-awesome-icon convert" :class="[canConvert ? '': 'dis']" :icon="['fas', 'spinner']">
                        </font-awesome-icon>
                    </div>
                    <div>
                        <font-awesome-icon title="下载" class="font-awesome-icon download" :class="[canDownload ? '': 'dis']" :icon="['fas', 'download']">
                        </font-awesome-icon>
                    </div>
                </div>
                <span v-show="part === 1" style="font-size: 20px">字幕内容可更改，时间不可修改</span>
                <div v-show="part === 1" class="subtitle-edit">
                    <div  v-for='(item, index) in testtime' :key="index" @click="jump(index)">
                        <span>字幕起止时间:</span>
                        <span>{{item.begin}}</span>
                        <span style="margin: 0 12px">-</span>
                        <span>{{item.end}}</span>
                        <font-awesome-icon title="删除此项" class="font-awesome-icon del" :icon="['fas', 'times']" @click="del(index)">

                        </font-awesome-icon>
                        <textarea type="text" v-model="item.texts[0]" @blur="subtitleChange(index)" @click="pause"></textarea>
                        <textarea type="text" v-model="item.texts[1]" @blur="subtitleChange(index)" @click="pause"></textarea>
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
    import $ from 'jquery';
    import https from "@/https";
    import Index from "./index";

    export default {
        name: "VideoModify",
        components: {Index, Footer, Header},
        data() {
            return {
                a: true,
                testtime: [
                ],
                testtt: [],
                timer: '',
                nowtime: 0,
                text: '',
                showright: true,
                videoinfo: '',
                videoUrl: '',
                videoName: '',
                isLike: false,
                isInterest: false,
                likeNum: 0,
                interestNum: 0,
                shareNum: 0,
                videoId: 0,
                part: 1,
                last: -1,
                now: -1,
                newStart: '',
                newEnd: '',
                newSub: '',
                enText: '',
                newEnSub: '',
                isEn: true,
                canSave: true,
                canConvert: true,
                canDownload: true
            }
        },
        mounted() {
            this.getInfo()
            // https.fetchPost('/video/own', {begin: 1, end: 10})
            //     .then(res => {
            //         console.log(res.data)
            //     })
            //     .catch(err => {
            //
            //     })
            $('#arrow').addClass('arrow-turn')


            console.log(this.testtt)



        },
        methods: {
            save() {
                if (!this.canSave) {
                    return
                }
                https.fetchPost('/SubtitleSupport/json2srt', {videoId: this.videoId, subtitle: JSON.stringify(this.testtime)})
                    .then(res => {})
                    .catch(err => {})
            },
            addNewSub() {
                this.newStart = this.newStart.replace('：', ':').replace('，', ',').replace(' ', '');
                this.newEnd = this.newEnd.replace('：', ':').replace('，', ',').replace(' ', '');
                let reg = /^[0-9]{2}:[0-5][0-9]:[0-5][0-9](,[0-9]+)*$/
                if (reg.test(this.newStart) === false ) {
                    alert('开始时间格式有误')
                    return
                }
                if (reg.test(this.newEnd) === false ) {
                    alert('结束时间格式有误')
                    return
                }
                this.testtime.push({
                    'begin': this.newStart,
                    'end': this.newEnd,
                    'texts': [this.newSub, this.newEnSub]
                });
                this.clearSub()
                this.testtime.sort(function (a, b) {
                    if (a.begin < b.begin) {
                        return -1
                    }
                    else if (a.begin === b.begin) {
                        if (a.end === b.end) {
                            return 0
                        }
                        else if (a.end < b.end){
                            return -1
                        }
                        else return 1
                    }
                })
                for (var i = 0;i < this.testtime.length; ++i) {
                    let tmp = this.testtime[i]
                    let be = tmp.begin.split(':')
                    let en = tmp.end.split(':')
                    let st = parseInt(be[0])*3600 + parseInt(be[1]) * 60 + parseInt(be[2].split(',')[0]) + parseFloat('0.'+be[2].split(',')[1])
                    let een = parseInt(en[0])*3600 + parseInt(en[1]) * 60 + parseInt(en[2].split(',')[0]) + parseFloat('0.'+en[2].split(',')[1])
                    let itm = {'begin': st, 'end': een, 'texts': tmp.texts}
                    this.testtt[i] = itm
                }
            },
            clearSub() {
                this.newStart = this.newEnd = this.newSub = ''
            },
            del(x) {
                $('.subtitle-edit div:eq('+x+')').css('opacity', 0)
                const _this = this
                let t = setInterval(() => {
                    _this.testtime.splice(x, 1)
                    $('.subtitle-edit div:eq('+x+')').css('opacity', 1)
                    clearInterval(t)
                }, 300)

            },
            pause() {
                this.$refs.video.pause();
            },
            subtitleChange(x) {

                this.testtt[x].texts = this.testtime[x].texts

            },
            select(x) {
                this.part = x
            },
            init() {
                for (var i = 0;i < this.testtime.length; ++i) {
                    let tmp = this.testtime[i]
                    let be = tmp.begin.split(':')
                    let en = tmp.end.split(':')
                    let st = parseInt(be[0])*3600 + parseInt(be[1]) * 60 + parseInt(be[2].split(',')[0]) + parseFloat('0.'+be[2].split(',')[1])
                    let een = parseInt(en[0])*3600 + parseInt(en[1]) * 60 + parseInt(en[2].split(',')[0]) + parseFloat('0.'+en[2].split(',')[1])
                    let itm = {'begin': st, 'end': een, 'texts': tmp.texts}
                    this.testtt[i] = itm
                }
                const video = this.$refs.video
                const _this = this
                video.addEventListener("timeupdate",function(){
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
                        _this.enText = ''
                    } else {
                        _this.text = _this.testtt[t].texts[0]
                        _this.enText = _this.testtt[t].texts[1]
                    }

                },false);
            },
            getInfo() {
                this.videoinfo = JSON.parse(this.$route.query.videoinfo)
                this.videoName = this.videoinfo.videoName
                this.videoId = this.videoinfo.videoId
                console.log(this.videoName)
                if (process.env.VUE_APP_MODE !== 'production') {
                    this.videoUrl = 'api'+this.videoinfo.videoPath
                } else {
                    this.videoUrl = this.videoinfo.videoPath
                }

                https.fetchPost('/SubtitleSupport/getSubjson/', {videoId: this.videoId})
                    .then(res => {
                        if (res.data.code === 500) {
                            alert('当前视频正在生成字幕，字幕编辑暂不可用')
                            this.canSave = this.canConvert = this.canDownload = false
                            return
                        }
                        this.testtime = res.data.data
                        this.init()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
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
                    $('.right-tools-box').css('z-index', 0)
                    arrow.removeClass('arrow-turn').addClass('arrow-turn1')
                    this.a = false
                    const _this = this
                    let t = setInterval(() => {
                        _this.showright = !_this.showright
                        clearInterval(t)
                    }, 500)



                } else {
                    const _this = this
                    let t = setInterval(() => {
                        _this.showright = !_this.showright
                        clearInterval(t)
                    }, 200)
                    $('.right-tools-box').css('z-index', 100)
                    s.css('width', '84%')
                    arrow.removeClass('arrow-turn1').addClass('arrow-turn')
                    this.a = true
                }
            },
            jump(x) {
                this.$refs.video.currentTime = this.testtt[x].begin
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
        margin: 0 8%;
        box-sizing: border-box;
        padding-top: 24px;
        display: flex;
        z-index: 1;
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

    .tools{
        height: 10%;
        display: flex;
        width: 100%;
        padding: 12px 8px;
        box-sizing: border-box;

        div {
            width: 48px;
            height: 48px;
            margin: auto auto;
            position: relative;
            .font-awesome-icon {
                width: 48px;
                height: 48px;
            }
        }
    }

    .save, .convert, .download {
        color: $icon-grey;
        cursor: pointer;
        transition: color 0.5s linear;
    }

    .save.dis, .convert.dis, .download.dis {
        cursor: not-allowed;

    }

    .convert {
        transform-origin: center center;
    }

    .convert:not([class*="dis"]):hover {
        animation:mround 0.6s linear 1;
    }

    .download:not([class*="dis"]):hover{
        animation:up-down 0.6s linear 1;
    }

    .save {
        transform-origin: center center;
    }

    .save:not([class*="dis"]):hover {
        animation:left-right 0.6s linear 1;
    }

    @keyframes mround {
        0%{transform: rotate(0deg)}
        25%{transform: rotate(90deg)}
        50%{transform: rotate(180deg)}
        75%{transform: rotate(270deg)}
        100%{transform: rotate(360deg)}
    }

    @keyframes up-down {
        0%{transform: translateY(0);}
        20%{transform: translateY(-8px);}
        40%{transform: translateY(8px);}
        60%{transform: translateY(-8px);}
        80%{transform: translateY(8px);}
        100%{transform: translateY(0);}
    }

    @keyframes left-right {
        0%{transform: rotate(0deg)}
        20%{transform: rotate(-30deg)}
        40%{transform: rotate(30deg)}
        60%{transform: rotate(-30deg)}
        80%{transform: rotate(30deg)}
        100%{transform: rotate(0deg)}
    }



    .save:not([class*="dis"]):hover, .convert:not([class*="dis"]):hover, .download:not([class*="dis"]):hover{
        color: $dark-blue;
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
        z-index: 1;
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

    .subtitle-edit {
        height: 70%;
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        border: black 1px solid;
        z-index: 20;
        padding: 12px 4px;
        background: $theme-white;
        position: relative;
        >div {
            cursor: pointer;
            margin: 0 12px 20px 12px;
            padding: 20px 0;
            background: white;
            outline: none;
            border-radius: 4px;
            box-shadow: 0 1px 10px -6px rgba(0,0,0,0.42), 0 1px 10px 0 rgba(0,0,0,0.12), 0 4px 5px -2px rgba(0,0,0,0.1);
            transition: all 0.5s ease-in-out ;
        }

        textarea {
            resize: none;
            width: 90%;
            margin: 8px auto 0 auto;
            height: 60px;
            line-height: 20px;
            font-size: 18px;
            background: white;
            border: 2px solid grey;
        }

        input {
            width: 30%;
            background: $theme-white;
            border: 2px solid grey;
            padding: 0 4px;
            box-sizing: border-box;
        }



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

    .del {
        margin-left: 28px;
        color: red;
        cursor: pointer;
        transition: color 0.3s linear;
    }

    .del:hover{
        color: darkred;
    }

    .edit-time {
        height: 32px;
        line-height: 32px;
        font-size: 20px;
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
        height: 100%;
        width: 100%;
        object-fit: fill;
        position: absolute;
    }

    .video-container {
        width: 100%;
        padding-bottom: 56.25%;
        position: relative;
        display: flex;
        height: 0;
    }

    .add-subtitle {
        margin-top: 12px;
        width: 100%;
        height: 30%;
        font-size: 20px;
        textarea {
            resize: none;
            font-size: 20px;
            line-height: 32px;
            height: 64px;
            padding: 4px 8px;
            margin-top: 12px;
            width: 30%;
            margin-left: 12px;
            margin-right: 12px;
        }

        button {
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            font-size: 18px;
            margin: 12px 12px;
        }
    }

    .subtitle {
        position: absolute;
        bottom: 12%;
        height: 32px;
        font-size: 28px;
        line-height: 32px;
        text-align: center;
        -webkit-text-stroke: 2px black;
        -webkit-text-fill-color: white;
        width: 100%;
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
        height: 20px;
        font-size: 20px;
    }

    .right-item:hover, .clicked{
        background: $theme-white;
        color: $dark-blue;
    }




</style>
