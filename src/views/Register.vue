<template>
    <div style="position: relative">
        <Header/>
    <div class="bea">

        <div class="local">
            <table style="width: 60%;">

            <tr>
                <th style="width: 70%"></th>
                <th style="width: 30%"></th>
            </tr>
            <tr>
                <td style="justify-content: center">
                    <h1>注册账户</h1>
                </td>
            </tr>
            <tr >
                <td>
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'user']"></font-awesome-icon>
                        <input type="text" placeholder="请输入用户名" name="keyword" v-model="username">
                    </div>
                    <div class="hint">
                        <div class="hint-wrong" v-if="checkname === 1">
                            <span class="svg-container">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconava_error"></use>
                                </svg>
                            </span>
                            <span>
                                用户名已存在
                            </span>

                        </div>
                        <div class="hint-right" v-if="checkname === 2">
                            <span class="svg-container">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconava_tick"></use>
                                </svg>
                            </span>
                            <span>
                            </span>
                        </div>
                    </div>
                </td>
            </tr>
            <tr >
                <td>
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'lock']"></font-awesome-icon>
                        <input type="password" placeholder="请输入您的密码(至少8位)" name="keyword" v-model="password">
                    </div>
                    <div class="hint">

                    </div>
                </td>
            </tr>
            <tr >
                <td>
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'lock']"></font-awesome-icon>
                        <input type="password" placeholder="请再次输入您的密码" name="keyword" v-model="repassword" @blur="checkpasswdFunc">
                    </div>
                    <div class="hint">
                        <div class="hint-wrong" v-if="checkpasswd === 1">
                            <span class="svg-container">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconava_error"></use>
                                </svg>
                            </span>
                            <span>
                                {{passwdTip}}
                            </span>

                        </div>
                        <div class="hint-right" v-if="checkpasswd === 2">
                            <span class="svg-container">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconava_tick"></use>
                                </svg>
                            </span>
                            <span>

                            </span>
                        </div>
                    </div>
                </td>
            </tr>
            <tr >
                <td>
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'mobile']"></font-awesome-icon>
                        <input type="tel" placeholder="请输入手机号码" name="keyword" v-model="phone" @blur="phoneExist">
                    </div>
                    <div class="hint">
                        <div class="hint-wrong" v-if="checkphone === 1">
                            <span class="svg-container">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconava_error"></use>
                                </svg>
                            </span>
                            <span>
                                {{phoneTip}}
                            </span>

                        </div>
                        <div class="hint-right" v-if="checkphone === 2">
                            <span class="svg-container">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconava_tick"></use>
                                </svg>
                            </span>
                            <span>

                            </span>
                        </div>
                    </div>
                </td>
            </tr>
            <tr >
                <td>
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'mail-bulk']"></font-awesome-icon>
                        <input type="email" placeholder="请输入您的邮箱" name="keyword" v-model="email" @blur="emailExist" @focus="checkemail=0">
                    </div>
                    <div class="hint">
                        <div class="hint-wrong" v-if="checkemail === 1">
                            <span class="svg-container">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconava_error"></use>
                                </svg>
                            </span>
                            <span>
                                {{emailTip}}
                            </span>

                        </div>
                        <div class="hint-right" v-if="checkemail === 2">
                            <span class="svg-container">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconava_tick"></use>
                                </svg>
                            </span>
                            <span>

                            </span>
                        </div>
                    </div>
                </td>
            </tr>
            <tr >
                <td>
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'info']"></font-awesome-icon>
                        <input type="text" placeholder="请输入您收到的验证码" name="keyword" v-model="vcode">
                    </div>
                    <div style="width: 36%">
                        <button id="vcode-btn" value="点击发送验证码" style="margin-right: auto; margin-left: auto;" class="bigbutton btn-blue" @click="sendvcode">
                            {{sendTip}}
                        </button>
                    </div>

                </td>
            </tr>
            <tr>
                <td style="width: 88%; margin: 24px 0">
                    <button class="bigbigbut btn-blue" @click="register">注册</button>
                </td>
            </tr>
            <tr>
                <td style="justify-content: center">
                    <a href="#" class="blue-link">隐私条款</a><input type="checkbox" @click="readme">我已阅读并同意隐私条款
                </td>
            </tr>
            </table>
            <div style="border-left: rgba(0, 0, 0, 0.3) solid 2px; margin: 10% 0;width: 2px">

            </div>
            <div class="d-right">
                <div>
                    <span>
                        已有账号?
                    </span>
                    <router-link to="/login" class="blue-link">戳我登入</router-link>
                </div>

            </div>
        </div>

    </div>
        <div style="clear: both"></div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import https from "@/https.js";
    import $ from 'jquery'
    export default {
        name: "Register",
        components: {Footer, Header},
        data(){
            return{
                username:'',
                password:'',
                repassword:'',
                email: '',
                vcode:'',
                phone: '',
                checkname: 0,
                checkpasswd: 0,
                checkemail: 0,
                checkphone: 0,
                passwdTip: '',
                conf: false,
                phoneTip: '',
                emailTip: '',
                sendTip: '点击发送验证码',
                canSend: true,
                timer: ''
            }
        },
        mounted(){

        },
        methods:{
            register(){
                if (this.conf !== true) {
                    alert('请先同意隐私条款');
                    return;
                }
                if (this.checkpasswd !== 2 || this.checkemail !== 2 || this.checkphone !== 2 ||
                    this.checkpasswd !== 2 || this.vcode === '') {
                    return;
                }
                let params ={
                    userName:this.username,
                    userPassword:this.password,
                    userEmail:this.email,
                    emailCode:this.vcode,
                    userPhoneNumber: this.phone
                };
                https.fetchPost('/user/regist', params).then(res => {
                        if (res.data.code === 200) {
                            alert('注册成功')
                            this.$router.push('/login')
                        }
                    }).catch(err =>{
                        console.log(err.toString())
                })
            },
            phoneExist() {
                if (this.phone.length < 11) {
                    this.phoneTip = '手机号码格式不正确';
                    this.checkphone = 1;
                    return;
                }
                https.fetchPost('/user/regist/validPhone', {userPhoneNumber: this.phone})
                    .then(res => {
                        if (res.data.code === 602) {
                            this.checkphone = 1;
                            this.phoneTip = '该手机号已被注册'
                        }
                        else {
                            this.checkphone = 2;
                            this.phoneTip = ''
                        }
                    })
                    .catch(err => {

                    })
            },
            emailExist() {
                if (this.email.length === 0) {
                    this.checkemail = 1;
                    this.emailTip = '邮箱格式不正确';
                    return;
                }
                let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

                if (reg.test(this.email) === false) {
                    this.checkemail = 1;
                    this.emailTip = '邮箱格式不正确';
                    return;
                }
                https.fetchPost('/user/regist/validEmail', {userEmail: this.email})
                    .then(res => {
                        if (res.data.code === 601) {
                            this.checkemail = 1;
                            this.emailTip = '该邮箱已被注册'
                        }
                        else {
                            this.emailTip = ''
                            this.checkemail = 2
                        }
                    })
                    .catch(err => {

                    })
            },
            sendvcode(){
                if (this.checkemail !== 2 || this.canSend === false) {
                    return;
                }

                let params ={
                    email:this.email
            };
            https.fetchPost('/email/sendCode', params).then(data => {

                    }).catch(err =>{
                        console.log(err.toString())
                })
                this.canSend = false
                let _this = this;
                let x = 59
                this.sendTip = '('+ 60 +'s)后重新发送'
                $("#vcode-btn").removeClass("btn-blue").addClass("btn-grey");
                this.timer = setInterval(() => {
                    _this.mcount(x--);
                }, 1000);
            },
            mcount(x) {

                this.sendTip = '('+ x +'s)后重新发送'
                if (x === 0) {
                    clearInterval(this.timer)
                    this.canSend = true
                    this.sendTip = '点击发送验证码'
                    $("#vcode-btn").removeClass("btn-grey").addClass("btn-blue");
                    return;
                }
            },
            checkpasswdFunc() {
                if (this.password.length < 8) {
                    this.passwdTip = '密码长度少于8位'
                    this.checkpasswd = 1
                }
                else if(this.password !== this.repassword) {
                    this.passwdTip = '两次输入的密码不一致'
                    this.checkpasswd = 1
                }
                else {
                    this.checkpasswd = 2
                }
            },
            usernameExist() {

            },
            readme() {
                this.conf = this.conf !== true;

            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>

<style lang="scss" scoped>
    div>input{float:left;border:none;height:40px;line-height:30px;width:100%; text-indent:16px;}

    .bigbutton{
        height:40px;
        border: none;
        border-radius: 4px;
        min-width: 105px;
    }
    button.bigbigbut{
        width: 100%;
        height:40px;
        border: none;
        border-radius: 4px;
    }
    div.local{
        background: white;
        width: 50%;

        border-radius: 4px;
        box-shadow: 10px 10px 5px #092452;
        position: relative;
        display: flex;
        padding: 12px 12px 12px 40px;
    }

    .local table{
        table-layout: fixed;
    }

    div.bea{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
        background: #5aa4ff;
        background: url("../assets/jpg/first2.jpg");
        background-position: center top;
    }

    .footer{
        position: relative;
    }

    .input-box{
        background:none;
        padding: 0 8px;
        align-items: center;
        font-size: 20px;
        display: flex;
        line-height: 40px;
        width: 64%;
    }

    .input-box .font-awesome-icon{
        width: 24px;
        height: 24px;
        max-width: 24px;
    }

    .input-box input{
        margin-left: 16px;
        border-bottom: solid 2px rgba(0, 0, 0, 0.2);
        background: none;
        outline: medium;
        transition: border-bottom-color 1s;
    }

    .input-box input:active, .input-box input:focus{
        margin-left: 16px;
        border-bottom: solid 2px rgba(107, 154, 255, 0.8);
        background: none;
        outline: none;
    }

    tr {
        display: block;
        margin: 8px 4px 16px 4px;
    }

    td {
        display: flex;
        width: 100%;
    }


    .d-right{
        width: 40%;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hint {
        text-align: center;
        width: 36%;
        text-overflow: clip;
        position: relative;
        display: flex;
        align-items: center;
    }

    .hint div{
        position: absolute;
        font-size: 14px;
    }

    .svg-container {
        font-size: 16px;
    }

    .hint-right{
        color: green;
    }

    .hint-wrong {
        color: red;

    }

</style>
