<template>
    <div class="global-container">
        <Header/>
        <div class="container">
            <div style="width: 100%">
                <span>视频标题名称<span style="color: red">*</span>：</span>
                <input type="text" v-model="videoName" class="video-name" placeholder="标题名称">
            </div>
            <div v-show="filename.length > 0" style="margin-bottom: 12px">已选文件：{{filename}}</div>
            <GlobalUploader></GlobalUploader>
            <button @click="upload" class="btn-blue" style="cursor: pointer">点击此处上传文件</button>
            <button @click="conf" class="btn-red" style="margin-top: 24px">确认上传</button>
        </div>

        <Footer/>
    </div>

</template>

<script>
    import $ from 'jquery'
    import GlobalUploader from "@/components/globalUploader";
    import Bus from '@/assets/js/bus'
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    export default {
        name: "uploader",
        components: {
            Footer,
            Header,
            GlobalUploader
        },
        data() {
            return{
                videoName: '',
                file: '',
                filename: ''
            }
        },
        mounted() {

            Bus.$on('fileAdded', query => {
                this.params = query || {};
                this.filename = this.params.videoName
                if (this.videoName.trim().length === 0) this.videoName = this.params.videoName
                this.file = this.params.file
            });
            // 文件上传成功的回调
            Bus.$on('fileSuccess', () => {
                console.log('文件上传成功')
            });
        },
        methods: {
            upload() {
                // 打开文件选择框

                Bus.$emit('openUploader', {
                    videoName: this.videoName,  // 传入的参数
                    conf: false
                })
            },
            conf() {
                if (this.file === '') {
                    alert('请选择文件')
                    return
                }
                Bus.$emit('changeName', {
                    conf: true,
                    file: this.file,
                    videoName: this.videoName,  // 传入的参数
                })
                this.videoName = ''
                this.filename = ''
                this.file = ''
            }
        },
        destroyed() {
            Bus.$off('fileAdded');
            Bus.$off('fileSuccess');

        }
    }
</script>

<style lang="scss" scoped>
    .container{
        padding-top: $header-height+20px;
        justify-content: center;
        align-items: center;
        display: flex;
        height: inherit;
        box-sizing: border-box;
        padding-bottom: $footer-height;
        flex-direction: column;
    }

    .global-container{
        padding-bottom: 0;
    }

    button{
        border: none;
        padding: 16px 24px;
    }

    .video-name {
        line-height: 24px;
        font-size: 16px;
        margin-bottom: 12px;
        width: 30%;
        height: 24px;
        padding: 4px;
    }
</style>
