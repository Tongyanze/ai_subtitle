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
                    <div class="subtitle"><span v-if="isCh">{{text}}</span><br><span v-if="isEn" style="font-size: 24px">{{enText}}</span></div>
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
                    <div style="width: auto">
                        <input type="checkbox" v-model="isCh"> <span>显示中文</span>
                        <input type="checkbox" style="margin-left: 40px" v-model="isEn"> <span>显示英文</span>

                    </div>
                </div>
            </div>
            <div class="right-container">
                <div v-if="userId === localuserId" class="edit-box" title="编辑视频" @click="edit">
                    <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'edit']"></font-awesome-icon>
                    <span>编辑视频</span>
                </div>
                <div class="title">推荐</div>
                <table class="recommend-video" v-for="(item,index) in recommendList" :key="index">
                    <tr>
                        <td class="video-cover" rowspan="2"><img class="cover" v-bind:src="item.videoCover" @click="play(item)" alt="photo"></td>
                        <td class="video-name">{{item.videoName}}</td>
                    </tr>
                    <tr>
                        <td class="video-favor">{{item.videoBrowses}}播放 {{item.videoFavors}}点赞 {{item.videoCollections}}收藏</td>
                    </tr>
                </table>
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
                userId: -1,
                enText: '',
                text: '',
                testtime: [],
                testtt: [],
                isCh: true,
                isEn: true,

                searchNum: 20, //search只能实现搜索包含key的begin到end条，故在[1,searchNum]范围内实现随机
                recommendNum: 6, //要推荐多少条
                totalNum: 0, //搜到了多少条
                totalList: [],
                recommendList: []
            }
        },
        mounted() {

            this.getInfo()
            this.search()
        },
        methods: {
            edit() {
                this.$router.push({path:'/videomodify', query:{videoinfo: JSON.stringify(this.videoinfo)}})
            },
            add(s) {
                let tmp = localStorage.getItem('token');
                if (tmp == null || tmp === '') {
                    alert('点赞、收藏请先登录')
                    return
                }
                https.fetchPost('/userOpVideo/search', {videoId: this.videoId})
                    .then(res => {
                        let data = JSON.parse(res.data.data)
                        this.isLike = data.favor === 1
                        this.isInterest = data.collection === 1

                        if  (s === 'like') {
                            if (this.isLike) {
                                https.fetchPost('/userOpVideo/delete', {type: 'favor', videoId: this.videoId})
                                    .then(res => {
                                        this.getNum()
                                    })
                                    .catch(err => {})
                            } else {
                                https.fetchPost('/userOpVideo/add', {type: 'favor', videoId: this.videoId})
                                    .then(res => {
                                        this.getNum()
                                    })
                                    .catch(err => {})
                            }

                            this.isLike = this.isLike === false;
                            console.log(this.isLike)

                        } else if  (s === 'interest') {
                            if (this.isInterest) {
                                https.fetchPost('/userOpVideo/delete', {type: 'collection', videoId: this.videoId})
                                    .then(res => {
                                        this.getNum()
                                    })
                                    .catch(err => {
                                    })
                            } else {
                                https.fetchPost('/userOpVideo/add', {type: 'collection', videoId: this.videoId})
                                    .then(res => {
                                        this.getNum()
                                    })
                                    .catch(err => {})
                            }

                            this.isInterest = this.isInterest  === false;
                        }
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
            init() {
                try {
                    for (var i = 0; i < this.testtime.length; ++i) {
                        let tmp = this.testtime[i]
                        let be = tmp.begin.split(':')
                        let en = tmp.end.split(':')
                        let st = parseInt(be[0]) * 3600 + parseInt(be[1]) * 60 + parseInt(be[2].split(',')[0]) + parseFloat('0.' + be[2].split(',')[1])
                        let een = parseInt(en[0]) * 3600 + parseInt(en[1]) * 60 + parseInt(en[2].split(',')[0]) + parseFloat('0.' + en[2].split(',')[1])
                        let itm = {'begin': st, 'end': een, 'texts': tmp.texts}
                        this.testtt[i] = itm
                    }
                    const video = this.$refs.video
                    const _this = this
                    video.addEventListener("timeupdate", function () {
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

                    }, false);
                }
                catch (e) {
                    console.log(e)
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
            getNum() {
                https.fetchPost('/findVideoInfo', {videoId: this.videoId})
                    .then(res => {
                        let data = res.data.data
                        this.likeNum = data.videoFavors
                        this.interestNum = data.videoCollections
                        if (process.env.VUE_APP_MODE !== 'production') {
                            this.videoUrl = 'api'+data.videoPath
                        } else {
                            this.videoUrl = data.videoPath
                        }
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
                this.getNum()

                https.fetchPost('/SubtitleSupport/getSubjson/', {videoId: this.videoId})
                    .then(res => {
                        if (res.data.code === 500) {
                            return
                        }
                        this.testtime = res.data.data
                        this.init()
                    })
                    .catch(err => {
                    })

                this.userId = this.videoinfo.userId
                console.log(this.videoName)

                this.checkSome(this.videoId)
            },
            async search () {
                let done = false
                let params = {key:'',begin:1,end:this.recommendNum};
                await https.fetchPost('/video/search',params)
                    .then(response =>{
                    console.log(response.data)
                    this.totalList = response.data.data
                    this.totalNum = response.data.code - 1000;
                    if (process.env.VUE_APP_MODE !== 'production') {
                        for (var i=0;i<this.totalList.length;i++) {
                            this.totalList[i].videoCover = "api" + this.totalList[i].videoCover
                        }
                    }
                })

                let memo=new Set();
                if(this.totalNum>this.recommendNum){
                    while(memo.size<this.recommendNum){
                        let num = Math.floor(Math.random()*this.totalNum);
                        if(!memo.has(num)){
                            memo.add(num)
                            this.recommendList.push(this.totalList[num])
                        }
                    }
                }
                else{
                    while(memo.size<this.totalNum){
                        let num = Math.floor(Math.random()*this.totalNum);
                        console.log('num'+num)
                        if(!memo.has(num)){
                            memo.add(num)
                            this.recommendList.push(this.totalList[num])
                        }
                    }
                }

            },
            play(videoMsg){
                console.log('videoMsg:'+videoMsg)
                //this.$router.go(0)
                let x = this.$router.resolve({path:'/videodetail',query:{videoinfo: JSON.stringify(videoMsg)}});
                window.open(x.href, '_blank');
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
        margin-left: 12px;
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

    .subtitle {
        position: absolute;
        bottom: 12%;
        height: 36px;
        font-size: 32px;
        line-height: 32px;
        text-align: center;
        -webkit-text-stroke: 2px black;
        -webkit-text-fill-color: white;
        width: 100%;
        font-weight: bold;
    }

    //右边的视频列表
    table{
        margin: 10px;
    }
    td{
        text-align: left;
    }
    .video-cover{
        width: 40%;
    }
    .cover{
        width: 100%;
        height: 100px;
        cursor: pointer;
    }
    .video-name{
        font-size: 18px;
        color:#505050;
        max-width: 100px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .video-favor{
        font-size: 15px;
        color:#7c7b7b;
    }
</style>
