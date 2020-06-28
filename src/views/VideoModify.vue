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
                    <div class="subtitle">{{text}}</div>
                </div>
                <div class="add-subtitle">
                    <div style="font-size: 28px; margin-bottom: 12px">
                        新增字幕
                    </div>
                    <div class="edit-time">
                        <span>开始时间<span style="color: red">*</span>：</span>
                        <input type="text" placeholder="HH:MM:SS,mmm" v-model="newStart">
                        <span style="margin-left: 32px">结束时间<span style="color: red">*</span>：</span>
                        <input type="text" placeholder="HH:MM:SS,mmm" v-model="newEnd">
                    </div>
                    <div style="display: flex; align-items: center;justify-content: center">
                        <span>字幕内容：</span>
                        <textarea v-model="newSub"></textarea>
                    </div>
                    <div>
                        <button class="btn-blue" @click="addNewSub">添加</button>
                        <button class="btn-blue" @click="clearSub">重置</button>
                    </div>
                </div>
            </div>


            <div class="right-container">
                <div class="subtitle-edit">
                    <div  v-for='(item, index) in testtime' :key="index">
                        <span>字幕起止时间:</span>
                        <span>{{item.begin}}</span>
                        <span style="margin: 0 12px">-</span>
                        <span>{{item.end}}</span>
                        <font-awesome-icon title="删除此项" class="font-awesome-icon del" :icon="['fas', 'times']" @click="del(index)">

                        </font-awesome-icon>
                        <textarea type="text" v-model="item.text" @blur="subtitleChange(index)" @click="pause"></textarea>
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
                    {'begin': '00:00:17,5', 'end': '00:00:18,5', 'text': '我们是警察'},
                    {'begin': '00:00:19', 'end': '00:00:20', 'text': '我们不会怕'},
                    {'begin': '00:00:20', 'end': '00:00:21', 'text': '你请说'},
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
                newSub: ''
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

            for (var i = 0;i < this.testtime.length; ++i) {
                let tmp = this.testtime[i]
                let be = tmp.begin.split(':')
                let en = tmp.end.split(':')
                let st = parseInt(be[0])*3600 + parseInt(be[1]) * 60 + parseInt(be[2].split(',')[0]) + parseFloat('0.'+be[2].split(',')[1])
                let een = parseInt(en[0])*3600 + parseInt(en[1]) * 60 + parseInt(en[2].split(',')[0]) + parseFloat('0.'+en[2].split(',')[1])
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
            addNewSub() {
                this.testtime.push({
                    'begin': this.newStart,
                    'end': this.newEnd,
                    'text': this.newSub
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
                    let itm = {'begin': st, 'end': een, 'text': tmp.text}
                    this.testtt[i] = itm
                }
            },
            clearSub() {
                this.newStart = this.newEnd = this.newSub = ''
            },
            del(x) {
                this.testtime.splice(x, 1)
            },
            pause() {
                this.$refs.video.pause();
            },
            subtitleChange(x) {

                this.testtt[x].text = this.testtime[x].text


            },
            select(x) {
                this.part = x
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
        height: 80%;
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        border: black 1px solid;
        z-index: 20;
        padding: 12px 4px;

        >div {
            margin-bottom: 8px;
            background: $theme-white;
            outline: none;
        }

        textarea {
            resize: none;
            width: 90%;
            margin: 8px auto 0 auto;
            height: 60px;
            line-height: 20px;
            font-size: 18px;
            background: $theme-white;
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
            width: 50%;
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
        bottom: 8%;
        height: 48px;
        font-size: 36px;
        line-height: 48px;
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
