<template>
<div  class="Cbody_item">
                        <div class="mainInfo">
                        <span id="headIcon">
                            <img   width=80px height=80px :src="userIcon">

                        </span>
                         <span class="accountInfo">
                            <div id="username">
                             {{username}}
                            </div>
                             <div id="useraccount" class="subInfo">
                                账号：
                                <span>{{accountNum}}</span>
                            </div>
                            <div id="usersign" class="subInfo">
                                个性签名：<span>{{usersign}}</span>
                            </div>
                             <div  class="subInfo">
                                <div v-show="filename.length > 0" style="margin-bottom: 12px">已选文件：{{filename}}</div>
                               <input type="file" name="file" @change="selectIcon" class="btn-blue" style="cursor: pointer">
                               <button @click="changeIcon" class="btn-red" style="margin-top: 24px">上传头像</button>
                            </div>
                        </span>
                        <div>
                            <router-link :to="{name: 'changeinfo'}" id="changeInfo-button" >修改资料</router-link>
                        </div>
                        </div>
                        <div >
                        <span class="beforeline">基本信息</span>
                        <span >
                        <hr class="cutline">
                        </span>
                        </div>
                        <div class="mainInfo">
                         <span >
                             <span id="left">
                            <div id="usersex" class="basicInfo">
                                性别：<span>{{usergender}}</span>
                            </div>


                             </span>
                            <span id="right">
                        <div id="userage" class="basicInfo">
                                生日：<span>{{userbirth}}</span>
                            </div>
                            </span>
                        </span>
                        </div>
                         <span class="beforeline">账号设置</span>
                         <hr class="cutline">
                          <div class="mainInfo">
                          <span class="basicInfo">
                             <span id="left">
                            <div id="userphone" class="basicInfo">
                                绑定手机号：<span>{{userphone}}</span> <router-link :to="{name: 'changephone'}" id="changebind" >修改手机</router-link>
                            </div>
                            <div id="changepass" class="basicInfo">
                                <router-link :to="{name: 'changepass'}" id="changebind" >修改密码</router-link>
                            </div>
                             </span>
                            <span id="right">
                             <div id="useremail" class="basicInfo">
                                绑定邮箱：<span>{{useremail}}</span><router-link :to="{name: 'changemail'}" id="changebind" >修改邮箱</router-link>
                            </div>
                            </span>
                        </span>
                        </div>

                         <span class="beforeline">更多玩法尽情期待</span>
                         <hr class="cutline">
                        </div>
</template>

<script>
import https from "@/https.js";
import axios from 'axios'
import qs from 'qs'

    export default {
        name: "basicinfo",
        data() {
            return {
                username:"",
                accountNum:631570777,
                usersign: "我想去学校。。",
                userage:9,
                userIcon: '',
                userloc:"江苏",
                usergender:"男",
                usercol:"牛津大学",
                useremail:"631570777@qq.com",
                userphone:10086,
                userbirth:new Date("1840-09-07"),
                file: '',
                filename: '',
                cur: 0, //默认选中第一个tab,
                env: ''
            }
        },
        mounted() {
            this.getUserInfo()
        },
        methods:{
            getUserInfo() {
                let userinfo = JSON.parse(localStorage.getItem('userinfo'))
                console.log(userinfo)
                this.username = userinfo.userName
                this.usergender = userinfo.userGender === 'male' ? '男' : '女'
                this.userbirth = userinfo.userBirthday
                this.useremail = userinfo.userEmail
                this.accountNum=userinfo.userId
                this.userphone = userinfo.userPhoneNumber

                this.env = process.env.VUE_APP_MODE
                if (process.env.VUE_APP_MODE !== 'production') {
                    this.userIcon = 'api' + userinfo.image
                } else {
                    this.userIcon = userinfo.image
                }
                console.log(this.userIcon)
                this.usersign = userinfo.userSignature
            },
            selectIcon(e) {
                var that = this;
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function(e){
                    that.file  = e.target.result;
                }
                reader.readAsDataURL(file);
            },
            changeIcon(){
                var formData= new FormData();
                formData.append('file',document.querySelector('input[type=file]').files[0])
                let params = {file:this.file}
                console.log(this.file)
                axios.post('/uploader/image', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                 .then(data => {
                        if(data.data.code==200){
                            let userinfo=data.data.data
                            console.log(userinfo)
                            localStorage.setItem('userinfo', JSON.stringify(userinfo))
                            this.getUserInfo()
                            location.reload();

                        }
                        else{
                            alert('错误码:'+data.data.data)
                        }
                }, err => {
                    alert(err);
                })
                .catch((error) => {
                    alert(error)
                })
                // https.fetchPost('/uploader/image', formData)
                //     .then(data => {
                //         if(data.data.code==200){
                //             let userinfo=data.data.data
                //             console.log(userinfo)
                //             localStorage.setItem('userinfo', JSON.stringify(userinfo))
                //             this.$router.push('/userinfo/basicinfo')
                //         }
                //         else{
                //             alert('错误码:'+data.data.data)
                //         }
                //     }).catch(err =>{
                //         alert(err.toString())
                // })
            }
        }
    }

</script>

<style  scoped lang = "scss" src=@/assets/scss/userinfo.scss >

</style>
