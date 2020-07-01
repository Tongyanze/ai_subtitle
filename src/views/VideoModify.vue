<template>
    <div class="global-container">
        <Header/>
        <div class="popwindow">
            {{tip}}
        </div>
        <div class="right-tools-box">
            <div class="right-tools">
                <div class="right-item" @click="select(1)" :class="[part === 1 ? 'clicked'  : '']">
                    <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'edit']"></font-awesome-icon>
                    <span>字幕</span>
                </div>
                <div class="right-item" @click="select(2)" :class="[part === 2 ? 'clicked'  : '']">
                    <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'magic']"></font-awesome-icon>
                    <span>特效</span>
                </div>
                <div class="right-item" @click="select(3)" :class="[part === 3 ? 'clicked'  : '']">
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
                    <div class="subtitle">{{text}}<br><span v-show="isEn" style="font-size: 24px">{{enText}}</span></div>
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
                <div v-show="part === 2" class="tx-control">
                    <div style="width: 60%">
                        <div>
                            <span>美白程度：</span>
                            <input type="range" min="0" max="100" step="1" v-model="mb" class="slider" ref="mb">
                            <span style="width: 28px; display: inline-block">{{mb}}</span>
                        </div>
                        <div>
                            <span>磨皮程度：</span>
                            <input type="range" min="0" max="100" step="1" v-model="mp" class="slider">
                            <span style="width: 28px; display: inline-block">{{mp}}</span>
                        </div>
                        <div>
                            <span>瘦脸程度：</span>
                            <input type="range" min="0" max="100" step="1" v-model="sl" class="slider">
                            <span style="width: 28px; display: inline-block">{{sl}}</span>
                        </div>
                        <div>
                            <span>大眼程度：</span>
                            <input type="range" min="0" max="100" step="1" v-model="dy" class="slider">
                            <span style="width: 28px; display: inline-block">{{dy}}</span>
                        </div>
                    </div>


                </div>
            </div>


            <div class="right-container">
                <div class="tools">
                    <div>
                        <font-awesome-icon title="保存字幕" class="font-awesome-icon save" :class="[canSave ? '': 'dis']" :icon="['fas', 'save']" @click="save">
                        </font-awesome-icon>
                    </div>
                    <div>
                        <font-awesome-icon :title="convertTip" id="convert-icon" class="font-awesome-icon convert"
                                           :class="[canConvert ? '': 'dis']" :icon="['fas', 'spinner']" @click="hcsp">
                        </font-awesome-icon>
                    </div>
                    <div>
                        <font-awesome-icon title="视频对比与下载" class="font-awesome-icon download"
                                           :class="[canDownload ? '': 'dis']" :icon="['fas', 'download']" @click="mdownload">
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
                        <font-awesome-icon title="删除此项" class="font-awesome-icon del" :icon="['fas', 'times']" @click.stop="del(index)">

                        </font-awesome-icon>
                        <textarea type="text" v-model="item.texts[0]" @blur="subtitleChange(index)" @click="pause"></textarea>
                        <textarea type="text" v-model="item.texts[1]" @blur="subtitleChange(index)" @click="pause"></textarea>
                    </div>


                </div>
                <div v-show="part === 2" class="lvjing-list">
                    <div class="tx-btn-group">
                        <div :class="{'tx-btn-clicked': txPart === 1}" class="tx-btn" @click="txPart=1">
                            视频滤镜
                        </div>
                        <div :class="{'tx-btn-clicked': txPart === 2}" class="tx-btn" @click="txPart=2">
                            自定封面
                        </div>
                        <div :class="{'tx-btn-clicked': txPart === 3}" class="tx-btn" @click="getAICover()">
                            AI换脸封面
                        </div>
                    </div>
                    <div class="radio-group" v-show="txPart === 1">
                        <div class="radio" @click="chooseLj(this, -1)" :class="{'radio-clicked': lj === -1}">
                            不添加
                        </div>
                        <div class="radio" @click="chooseLj(this, 0)" :class="{'radio-clicked': lj === 0}">
                            黑白
                        </div>
                        <div class="radio" @click="chooseLj(this, 1)" :class="{'radio-clicked': lj === 1}">
                            和风
                        </div>
                        <div class="radio" @click="chooseLj(this, 2)" :class="{'radio-clicked': lj === 2}">
                            摩卡
                        </div>
                        <div class="radio" @click="chooseLj(this, 3)" :class="{'radio-clicked': lj === 3}">
                            极地
                        </div>
                        <div class="radio" @click="chooseLj(this, 4)" :class="{'radio-clicked': lj === 4}">
                            电影
                        </div>
                        <div class="radio" @click="chooseLj(this, 5)" :class="{'radio-clicked': lj === 5}">
                            自然
                        </div>
                    </div>

                    <div class="radio-group" v-show="txPart === 2">

                        <input type="file" id="file" ref="cover" @change="showPic(this)" style="width: 10%; position: relative; margin-top: 20px">
                        <div class="choose-file btn-blue" @click="choosePic">选择文件</div>

                        <div class="btn-blue msubmit" @click="submitCover">提交</div>
                        <div style="position: relative; width: 90%; padding-bottom: 80%" v-show="showpic">
                            <img id="coverpic" style="position: absolute; width: 100%; height: 100%; left: 0" >
                        </div>
                    </div>
                    <div class="radio-group" v-show="txPart === 3">
                        <div class="ai-example">
                            <div v-for="(item, index) in aiExamp" :key="index" @click="chooseAiCover(index)">
                                <img :src="item.Url">
                                <div v-show="chooseAiNum === index">当前选中模板</div>
                            </div>
                        </div>
                        <div style="width: 100%; height: 50%; display: flex; flex-direction: column; align-items: center">
                            <div style="width: 100%;display: flex; padding: 4px 20px; box-sizing: border-box">
                                <input type="file" ref="aicover" id="aifile" @change="showAiPic(this)" style="width: 10%; position: relative; margin-top: 20px">
                                <div class="choose-file btn-blue"  style="margin-bottom: 8px" @click="chooseAiPic">选择文件</div>
                                <div class="btn-blue msubmit" style="margin-bottom:8px;margin-left: auto" @click="submitAiCover">提交</div>
                            </div>

                            <div style="position: relative; width: 60%; padding-bottom: 50%" v-show="showaipic">
                                <img id="aicoverpic" style="position: absolute; width: 100%; height: 100%; left: 0" >
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="part === 3" class="bianshen-list">
                    <h2>变声器选择</h2>
                    <div class="radio-group">
                        <div class="radio" @click="chooseSy(this, 0)" :class="{'radio-clicked': sy === 0}">
                            不变声
                        </div>
                        <div class="radio" @click="chooseSy(this, 1)" :class="{'radio-clicked': sy === 1}">
                            萝莉
                        </div>
                        <div class="radio" @click="chooseSy(this, 2)" :class="{'radio-clicked': sy === 2}">
                            大叔
                        </div>
                        <div class="radio" @click="chooseSy(this, 3)" :class="{'radio-clicked': sy === 3}">
                            肥仔
                        </div>
                        <div class="radio" @click="chooseSy(this, 4)" :class="{'radio-clicked': sy === 4}">
                            熊孩子
                        </div>
                        <div class="radio" @click="chooseSy(this, 5)" :class="{'radio-clicked': sy === 5}">
                            困兽
                        </div>
                        <div class="radio" @click="chooseSy(this, 6)" :class="{'radio-clicked': sy === 6}">
                            重机械
                        </div>
                        <div class="radio" @click="chooseSy(this, 7)" :class="{'radio-clicked': sy === 7}">
                            感冒
                        </div>
                        <div class="radio" @click="chooseSy(this, 8)" :class="{'radio-clicked': sy === 8}">
                            空灵
                        </div>
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
                canDownload: true,
                tip: '',
                reque: [],
                mb:0, //美白
                mp:0, //磨皮
                sl:0, //瘦脸
                dy:0, //大眼
                addCh: true,
                addEn: true,
                lj: -1, //滤镜
                sy: 0, //声音
                convertTip: '视频合成',
                txPart: 1,
                file: '',
                showpic: false,
                aiExamp: [],
                chooseAiNum: -1,
                showaipic: false,
                poptimer: ''

            }
        },
        mounted() {

            $('#arrow').addClass('arrow-turn')
            $('.popwindow').css('height', 0)
            this.getInfo()
            const _this = this
            let sliders = $('.slider')
            for (let i=0;i < sliders.length; ++i) {
                sliders[i].addEventListener("input", ()=>{
                    $(sliders[i]).css('background', 'linear-gradient(to right, #375CA0, white ' + sliders[i].value + '%, white)' )
                })
            }

        },
        methods: {
            mdownload() {
                let x = this.$router.resolve({path:'/mdownload',query:{videoinfo: JSON.stringify(this.videoId)}});
                window.open(x.href, '_blank');
            },
            chooseAiPic() {
                $('#aifile').click()
            },
            showAiPic(e) {
                this.showaipic = true
                let file = this.$refs.aicover.files[0]
                let reader = new  FileReader();
                reader.readAsDataURL(file);
                reader.onload = (ev) => {
                    $("#aicoverpic").attr("src", ev.target.result);
                }

            },

            submitAiCover() {


                if (this.chooseAiNum === -1) {
                    this.tip = '没有选择模板'
                    clearInterval(this.poptimer)
                    this.showpop()
                    return
                }

                if (this.showaipic === false) {
                    this.tip = '没有选择图片'
                    clearInterval(this.poptimer)
                    this.showpop()
                    return
                }
                this.showaipic = false

                https.fetchFilePost('/faceFusion', {
                    videoId: this.videoId,
                    MateriaId: this.aiExamp[this.chooseAiNum].MaterialId,
                    img: this.$refs.aicover.files[0]
                })
                    .then(res => {

                    })
                    .catch(err => {

                    })
                this.chooseAiNum = -1
            },
            chooseAiCover(x) {
              if (x === this.chooseAiNum) {
                  this.chooseAiNum = -1
              }
              else {
                  this.chooseAiNum = x
              }
            },
            getAICover() {
                this.txPart = 3
                https.fetchGet('/materialList', {})
                    .then(res => {
                        this.aiExamp = res.data.data
                        console.log(this.aiExamp)
                    })
                    .catch(err => {

                    })
            },
            choosePic() {
                $('#file').click()
            },
            showPic(e) {
                this.showpic = true
                let file = this.$refs.cover.files[0]
                let reader = new  FileReader();
                reader.readAsDataURL(file);
                reader.onload = (ev) => {
                    $("#coverpic").attr("src", ev.target.result);
                }

            },

            submitCover() {
                if (this.showpic === false) {
                    this.tip = '没有选择图片'
                    clearInterval(this.poptimer)
                    this.showpop()
                    return
                }
                this.showpic = false

                let params = {
                    videoId: this.videoId,
                    file: this.$refs.cover.files[0]
                }

                console.log(params)
                https.fetchFilePost('/uploader/image', params)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.tip = '更换封面成功'
                            clearInterval(this.poptimer)
                            this.showpop()
                        }
                    })
                    .catch(err => {

                    })
            },
            hcsp() {
                if (!this.canConvert) {
                    return
                }
                let tmp;
                if (this.mb + this.mp + this.sl + this.dy > 0) {

                    tmp = {
                        operationType: 'beautify', videoId: this.videoId, white: this.mb, smooth: this.mp,
                        facelift: this.sl, eye: this.dy
                    }
                    this.reque.push(tmp)
                }
                if (this.sy !== 0) {
                    tmp = {operationType: 'voiceChanger', videoId: this.videoId, audioType: this.sy}
                    this.reque.push(tmp)
                }

                if (this.lj !== -1) {
                    tmp = {operationType: 'filter', videoId: this.videoId, table: this.lj}
                    this.reque.push(tmp)
                }


                this.canConvert = false
                this.convertTip = '视频合成中...'
                let t = setInterval(() => {
                    $('#convert-icon').addClass('convert-infinite')

                    clearInterval(t)
                }, 100)


                https.fetchPost('/process', {jsonString: JSON.stringify(this.reque)})
                    .then(res => {

                    })
                    .catch(err => {

                    })
            },
            chooseSy(e, id){
                this.sy = id
            },
            chooseLj(e, id) {
                this.lj = id
                let video = this.$refs.video
                switch (id) {
                    case -1:
                        $(video).attr('class', 'video')
                        break;
                    case 0:
                        $(video).attr('class', 'video black-white-filter')
                        break;
                    case 1:
                        $(video).attr('class', 'video wind-filter')
                        break;
                    case 2:
                        $(video).attr('class', 'video moka-filter')
                        break;
                    case 3:
                        $(video).attr('class', 'video ice-filter')
                        break;
                    case 4:
                        $(video).attr('class', 'video film-filter')
                        break;
                    case 5:
                        $(video).attr('class', 'video nature-filter')
                        break;
                }

            },
            showpop() {
                $('.popwindow').css('height', 100)

                let t = this.poptimer = setInterval(() => {
                    $('.popwindow').css('height', 0)
                    clearInterval(t)
                }, 3000)
            },
            save() {
                if (!this.canSave) {
                    return
                }
                if (this.part === 1) {
                    https.fetchPost('/SubtitleSupport/json2srt', {
                        videoId: this.videoId,
                        subtitle: JSON.stringify(this.testtime)
                    })
                        .then(res => {
                            this.tip = '保存成功'
                            const _this = this
                            this.showpop()

                        })
                        .catch(err => {
                        })
                }
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
                this.newStart = this.newEnd = this.newSub = this.newEnSub = ''
            },
            del(x) {
                $('.subtitle-edit div:eq('+x+')').css('opacity', 0)
                const _this = this
                let t = setInterval(() => {
                    _this.testtime.splice(x, 1)
                    _this.testtt.splice(x, 1)
                    $('.subtitle-edit div:eq('+x+')').css('opacity', 1)
                    var timeDisplay;
                    //用秒数来显示当前播放进度
                    // timeDisplay = Math.floor(video.currentTime);
                    timeDisplay = _this.$refs.video.currentTime
                    let tt = _this.binarySearch(timeDisplay)
                    if (tt === -1) {
                        _this.text = ''
                        _this.enText = ''
                    } else {
                        _this.text = _this.testtt[tt].texts[0]
                        _this.enText = _this.testtt[tt].texts[1]
                    }
                    clearInterval(t)
                }, 500)

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
            async getInfo() {
                this.videoinfo = JSON.parse(this.$route.query.videoinfo)
                this.videoName = this.videoinfo.videoName
                this.videoId = this.videoinfo.videoId
                await https.fetchPost('/findVideoInfo', {videoId: this.videoId})
                    .then(res => {
                        let data = res.data.data
                        if (process.env.VUE_APP_MODE !== 'production') {
                            this.videoUrl = 'api'+data.videoPath

                        } else {
                            this.videoUrl = data.videoPath
                        }

                        let tmp = data.videoPath.split('/')
                        let s = ''
                        for (let i = 0;i < tmp[tmp.length-1].length; ++i) {
                            if (tmp[tmp.length-1][i] === '.') {
                                break;
                            }
                            s += tmp[tmp.length-1][i]
                        }
                        if (data.identifier !== s) {
                            this.canDownload = true
                        }
                        else {
                            this.canDownload = false
                        }
                    })
                    .catch(err => {

                    })

                https.fetchPost('/SubtitleSupport/getSubjson/', {videoId: this.videoId})
                    .then(res => {
                        if (res.data.code === 500) {
                            this.tip = '当前视频正在生成字幕，字幕编辑暂不可用'
                            this.showpop()
                            this.canSave = this.canConvert = this.canDownload = false
                            return
                        }
                        this.testtime = res.data.data

                        https.fetchPost('/getProgress', {videoId: this.videoId})
                            .then(res => {
                                if (res.data.data > 0 && res.data.data < 1) {
                                    this.canConvert = this.canDownload = false;
                                    this.convertTip = '视频合成中...'
                                    let t = setInterval(()=>{
                                        $('#convert-icon').addClass('convert-infinite')
                                        clearInterval(t)
                                    }, 100)

                                }
                            })
                            .catch(err => {

                            })

                        this.init()
                    })
                    .catch(err => {
                        this.tip = '当前视频正在生成字幕，字幕编辑暂不可用'
                        this.showpop()
                        this.canSave = this.canConvert = this.canDownload = false
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

                } else {
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

    .popwindow {
        position: fixed;
        background: white;
        border-radius: 0 0 12px 12px;
        width: 20%;
        left: 40%;
        top: 0;
        box-shadow: 0 1px 10px -6px rgba(0,0,0,0.42), 0 1px 10px 0 rgba(0,0,0,0.12), 0 4px 5px -2px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: height 0.3s linear;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        text-align: center;
        overflow: hidden;
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

    .convert-infinite{
        color: $dark-blue;
        animation:mround 0.6s linear infinite;
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
        overflow: hidden;
    }

    .lvjing-list, .bianshen-list {
        height: 80%;
        width: 100%;
        border: black 1px solid;
        z-index: 20;

        h2 {
            height: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }

        .tx-btn-group {
            height: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
    }

    .radio-group {
        position: relative;
        width: 100%;
        height: 90%;
        background: $theme-white;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .radio {
            width: 90%;
            flex: 1;
            margin: 8px 0;
            border-radius: 8px;
            transition: background-color 0.3s linear;
            background: white;
            box-shadow: 1px 3px 10px -6px rgba(0,0,0,0.42), 1px 3px 10px 0 rgba(0,0,0,0.12), 0 6px 7px -2px rgba(0,0,0,0.1);
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .radio:hover {
            background: $sky-blue;
        }

        .radio-clicked {
            background: $sky-blue;
        }

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

    .tx-control {
        margin-top: 12px;
        width: 100%;
        height: 30%;
        font-size: 20px;
        display: flex;
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
        z-index: 20;
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

    .slider {
        margin: 16px 12px;
        -webkit-appearance: none;
        width: 300px;
        border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    }
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 25px;
        width: 25px;
        margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
        background: #ffffff;
        border-radius: 50%; /*外观设置为圆形*/
        border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
        box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
        cursor: pointer;

    }

    .slider::-webkit-slider-runnable-track {
        height: 12px;
        border-radius: 10px; /*将轨道设为圆角的*/
        box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/
    }

    .slider:focus {
        outline: none;
    }

    .black-white-filter {
        filter: grayscale(100%);
    }

    .film-filter {
        filter: contrast(120%) saturate(160%) sepia(30%) ;
    }

    .ice-filter{
        filter:grayscale(0.2) brightness(90%) saturate(200%);
    }

    .wind-filter {
        filter: brightness(102%) saturate(130%);
    }

    .nature-filter {
        filter: grayscale(0.1) sepia(10%);
    }

    .moka-filter {
        filter: saturate(120%) sepia(36%)
    }

    .tx-btn{
        flex: 1;
        height: 100%;
        cursor: pointer;
        transition: background 0.3s linear;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }

    .tx-btn:hover, .tx-btn-clicked{
        background: $sky-blue;
    }

    .tx-btn:nth-child(2) {
        border-left: 1px solid black;
        border-right: 1px solid black;
    }

    .choose-file {
        position: absolute;
        line-height: 32px;
        font-size: 18px;
        margin-bottom: 20px;
        border-radius: 8px;
        padding: 8px 12px;
        width: 30%;
        margin-top: 12px;
    }

    .msubmit {
        line-height: 32px;
        font-size: 18px;
        margin-bottom: 20px;
        border-radius: 8px;
        padding: 8px 12px;
        top: 12px;
        width: 30%;
        margin-top: 12px;
    }

    #file {
        margin-top: 12px;
        height: 60px;
    }

    .ai-example {
        height: 60%;
        padding: 8px 0;
        width: 100%;
        display: flex;
        align-items: center;
        overflow: scroll;
        overflow-x: hidden;
        border-bottom: 4px solid grey;
        flex-direction: column;

        >div{
            width: 72%;
            padding-bottom: 80%;
            height: 0;
            position: relative;
            margin: 12px 0;
            img {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
            }

            div {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                background: $dark-blue;
                opacity: 0.8;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 20px;
            }
        }
    }

</style>
