<template>
    <div id="global-uploader">

        <!-- 上传 -->
        <uploader
                ref="uploader"
                :options="options"
                :autoStart="false"
                @file-added="onFileAdded"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
                class="uploader-app">
            <uploader-unsupport></uploader-unsupport>

            <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>

            <uploader-list v-show="panelShow && conf">
                <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
                    <div class="file-title">
                        <h2>文件列表</h2>
                        <div class="operate">
                            <div @click="fileListShow" type="text" :title="collapse? '展开':'折叠' " style="margin-right: 8px">
                                <font-awesome-icon class="font-awesome-icon" :icon="collapse ? ['fas', 'angle-up'] : ['fas', 'minus']"></font-awesome-icon>
                            </div>
                            <div @click="close" type="text" title="关闭">
                                <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'times']"></font-awesome-icon>
                            </div>
                        </div>
                    </div>

                    <ul class="file-list">
                        <li v-for="file in props.fileList" :key="file.id">
                            <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
                        </li>
                        <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
                    </ul>
                </div>
            </uploader-list>

        </uploader>

    </div>
</template>

<script>
    /**
     *   全局上传插件
     *   调用方法：Bus.$emit('openUploader', {}) 打开文件选择框，参数为需要传递的额外参数
     *   监听函数：Bus.$on('fileAdded', fn); 文件选择后的回调
     *            Bus.$on('fileSuccess', fn); 文件上传成功的回调
     */

    import {ACCEPT_CONFIG} from '@/assets/js/config';
    import Bus from '@/assets/js/bus';
    import SparkMD5 from 'spark-md5';
    import $ from 'jquery'
    import https from "@/https";

    export default {
        name: 'globalUploader',
        data() {
            return {
                conf: false,
                needMerge: false,
                videoName: '',
                identifier: '',
                attrs: {
                    accept: ACCEPT_CONFIG.getAll()
                },
                panelShow: false,   //选择文件后，展示上传panel
                collapse: false,
                options: {

                    target: process.env.VUE_APP_MODE !== 'production' ? 'api/uploader/chunk' : 'uploader/chunk',
                    chunkSize: '2048000',
                    fileParameterName: 'file',
                    maxChunkRetries: 3,
                    testChunks: true,   //是否开启服务器分片校验
                    // 服务器分片校验函数，秒传及断点续传基础
                    // checkChunkUploadedByResponse: function (chunk, message) {
                    //     let objMessage = JSON.parse(message);
                    //     console.log(message)
                    //     return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
                    // },
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    query() {}
                },
            }
        },
        mounted() {

            Bus.$on('openUploader', query => {
                this.params = query || {};
                this.conf = false
                if (this.$refs.uploadBtn) {
                    $('#global-uploader-btn').click();
                }
            });

            Bus.$on('changeName', query => {
                this.params = query || {};
                this.conf = this.params.conf;
                this.videoName = this.params.videoName
                this.needMerge = true
                this.computeMD5(this.params.file);
            });
        },
        computed: {
            //Uploader实例
            uploader() {
                return this.$refs.uploader.uploader;
            }
        },
        methods: {
            onFileAdded(file) {
                this.panelShow = true;
                Bus.$emit('fileAdded', {
                    videoName: file.name,
                    file: file
                });
                file.pause()



            },
            onFileProgress(rootFile, file, chunk) {
                console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
            },
            onFileSuccess(rootFile, file, response, chunk) {
                let res = JSON.parse(response);
                console.log(response)
                if (res.code === 200 && this.needMerge) {
                    this.statusSet(file.id, 'success');
                    https.fetchPost('/uploader/mergeFile', {videoName: this.params.videoName, identifier: this.identifier})
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(err => {

                        })
                    this.needMerge = false
                    return
                }
                // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
                if (!res.result) {
                    // 文件状态设为“失败”
                    this.statusSet(file.id, 'failed');
                    return
                }


                // 如果服务端返回需要合并
                if (res.needMerge) {
                    // 文件状态设为“合并中”
                    this.statusSet(file.id, 'merging');

                    api.mergeSimpleUpload({
                        tempName: res.tempName,
                        fileName: file.name,
                        ...this.params,
                    }).then(res => {
                        // 文件合并成功
                        Bus.$emit('fileSuccess');

                        this.statusRemove(file.id);
                    }).catch(e => {});

                // 不需要合并
                } else {
                    Bus.$emit('fileSuccess');
                    console.log('上传成功');
                }
            },
            onFileError(rootFile, file, response, chunk) {

            },

            /**
             * 计算md5，实现断点续传及秒传
             * @param file
             */
            computeMD5(file) {
                let fileReader = new FileReader();
                let time = new Date().getTime();
                let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                let currentChunk = 0;
                const chunkSize = 10 * 1024 * 1000;
                let chunks = Math.ceil(file.size / chunkSize);
                let spark = new SparkMD5.ArrayBuffer();

                // 文件状态设为"计算MD5"
                this.statusSet(file.id, 'md5');
                file.pause();

                loadNext();

                fileReader.onload = (e => {
                    spark.append(e.target.result);

                    if (currentChunk < chunks) {
                        currentChunk++;
                        loadNext();

                        // 实时展示MD5的计算进度
                        this.$nextTick(() => {
                            $(`.myStatus_${file.id}`).text('校验MD5 '+ ((currentChunk/chunks)*100).toFixed(0)+'%')
                        })
                    } else {
                        let md5 = spark.end();
                        this.computeMD5Success(md5, file);
                        console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
                    }
                });

                fileReader.onerror = function () {
                    this.error(`文件${file.name}读取出错，请检查该文件`)
                    file.cancel();
                };

                function loadNext() {
                    let start = currentChunk * chunkSize;
                    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

                    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
                }
            },

            computeMD5Success(md5, file) {
                // 将自定义参数直接加载uploader实例的opts上
                Object.assign(this.uploader.opts, {
                    query: {
                        // ...this.params,
                        videoName: this.videoName
                    }
                })

                file.uniqueIdentifier = md5;
                this.identifier = md5;
                file.resume();
                this.statusRemove(file.id);
            },

            fileListShow() {
                let $list = $('#global-uploader .file-list');

                if ($list.is(':visible')) {
                    $list.slideUp();
                    this.collapse = true;
                } else {
                    $list.slideDown();
                    this.collapse = false;
                }
            },
            close() {
                this.uploader.cancel();

                this.panelShow = false;
            },

            /**
             * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
             * @param id
             * @param status
             */
            statusSet(id, status) {
                let statusMap = {
                    md5: {
                        text: '校验MD5',
                        bgc: '#fff'
                    },
                    merging: {
                        text: '合并中',
                        bgc: '#e2eeff'
                    },
                    transcoding: {
                        text: '转码中',
                        bgc: '#e2eeff'
                    },
                    failed: {
                        text: '上传失败',
                        bgc: '#e2eeff'
                    },
                    success: {
                        text: '上传成功',
                        bgc: '#e2eeff'
                    }
                }

                this.$nextTick(() => {
                    $(`<p class="myStatus_${id}"></p>`).appendTo(`.file_${id} .uploader-file-status`).css({
                        'position': 'absolute',
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'zIndex': '1',
                        'backgroundColor': statusMap[status].bgc
                    }).text(statusMap[status].text);
                })
            },
            statusRemove(id) {
                this.$nextTick(() => {
                    $(`.myStatus_${id}`).remove();
                })
            },

            error(msg) {
                this.$notify({
                    title: '错误',
                    message: msg,
                    type: 'error',
                    duration: 2000
                })
            }
        },
        watch: {},
        destroyed() {
            Bus.$off('openUploader');
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    h2 {
        margin: 0;
    }

    #global-uploader {
        position: fixed;
        z-index: 20;
        right: 15px;
        bottom: $footer-height+10px;

        .uploader-app {
            width: 520px;
        }

        .file-panel {
            background-color: #fff;
            border: 1px solid #e2e2e2;
            border-radius: 7px 7px 0 0;
            box-shadow: 0 0 10px rgba(0, 0, 0, .2);

            .file-title {
                display: flex;
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                border-bottom: 1px solid #ddd;

                .operate {
                    margin-left: auto;
                    display: flex;
                    text-align: right;
                }
            }

            .file-list {
                position: relative;
                height: 240px;
                overflow-x: hidden;
                overflow-y: auto;
                background-color: #fff;

                > li {
                    background-color: #fff;
                }
            }

            &.collapse {
                .file-title {
                    background-color: #E7ECF2;
                }
            }
        }

        .no-file {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
        }

        /deep/.uploader-file-icon {
            &:before {
                content: '' !important;
            }

            &[icon=image] {
                /*background: url(./images/image-icon.png);*/
            }
            &[icon=video] {
                /*background: url(./images/video-icon.png);*/
            }
            &[icon=document] {
                /*background: url(./images/text-icon.png);*/
            }
        }

        /deep/.uploader-file-actions > span {
            margin-right: 6px;
        }
    }

    /* 隐藏上传按钮 */
    #global-uploader-btn {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
</style>
