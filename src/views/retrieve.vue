
<template>
    <div>
        <Header/>
    <div class="card">
        <img src="../assets/dong.png" style="width:100%">

        <h1>找回密码</h1>
        <div class="container" v-if="!step1">

            <label for="cname"><p align="left"><svg t="1592207759650" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2761" width="20" height="20"><path d="M990.666667 575.333333c14.266667 0 25.866667-11.6 25.866666-25.866666V214.666667c0-20.666667-6.533333-39.866667-17.333333-55.733334-0.4-0.666667-0.533333-1.6-1.066667-2.266666-0.8-1.066667-2-1.733333-3.066666-2.666667-18-22.666667-45.466667-37.6-76.666667-37.6H105.6C51.333333 116.533333 7.466667 160.533333 7.466667 214.666667v594.666666c0 54.266667 43.866667 98.133333 98.133333 98.133334h812.8c54.266667 0 98.133333-43.866667 98.133333-98.133334v-81.733333c-0.133333-14.133333-11.6-25.733333-25.866666-25.733333s-25.733333 11.466667-25.866667 25.733333v76.666667c0 28.533333-23.2 51.6-51.6 51.6H110.8c-28.533333 0-51.733333-23.066667-51.733333-51.6V219.866667c0-2.8 0.4-5.466667 0.8-8.266667L511.466667 580h0.133333c4 2.933333 8.666667 4.266667 13.2 4.8 1.333333 0.266667 2.666667 0.133333 4 0.133333s2.666667 0 4-0.133333c4.666667-0.533333 9.2-1.733333 13.2-4.8h0.133333l418.4-363.866667c0.133333 1.2 0.4 2.533333 0.4 3.733334v329.6c-0.133333 14.266667 11.466667 25.866667 25.733334 25.866666zM110.8 168.266667h802.4c6.8 0 13.2 1.333333 19.2 3.733333L528.8 524.666667 96.133333 170.666667c4.666667-1.466667 9.466667-2.4 14.666667-2.4z m0 0" fill="" p-id="2762"></path></svg>&nbsp&nbsp&nbsp邮箱</p></label>
            <input type="email" id="cname" name="cname" style="width:100%" v-model="email" value="" placeholder="请输入注册邮箱..">
            <div class="email-hint" v-if="checkemail">
                该邮箱未注册！
            </div>
            <!--<button class="button" style="vertical-align:middle"  @click="emailVerify"><span>验证邮箱</span></button>-->

            <label for="cname"><p align="left"> <svg t="1592206389930" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4716" width="20" height="20"><path d="M565.304 267.574c-124.207 124.21-248.412 248.434-372.727 372.544-7.702 7.695-14.182 16.11-19.247 25.665-22.152 41.81-38.102 85.97-49.497 131.815-4.282 17.235-7.56 34.66-6.822 52.585 0.357 8.67 2.872 16.155 9.602 22.34 9.2 8.45 17.845 17.515 26.585 26.45 3.557 3.645 7.702 5.815 12.63 6.795 12.775 2.52 25.49 1.075 38.01-1.26 53.027-9.875 103.31-27.915 151.192-52.55 8.675-4.46 17.38-9.885 24.23-16.715 126.04-125.565 251.799-251.419 377.659-377.169 0.935-0.94 2.4-1.35 3.39-1.885-64.565-64.565-128.035-128.022-192.169-192.152C567.189 265.237 566.359 266.519 565.304 267.574zM693.368 457.926C586.813 564.413 480.236 670.893 373.807 777.508c-9.89 9.905-20.58 18.555-32.542 25.71-38.247 22.885-77.922 42.8-120.335 56.79-8.715 2.875-17.907 4.39-26.967 6.07-5.952 1.1-11.165-0.545-15.49-5.385-5.155-5.775-10.782-11.14-16.407-16.47-3.262-3.08-4.572-6.69-4.545-11.03 0.06-10.135 2.737-19.765 5.825-29.275 11.97-36.85 28.98-71.42 47.732-105.2 2.485-4.48 5.147-8.855 7.747-13.265 7.84-13.305 17.265-25.26 28.26-36.22 106.24-105.95 212.292-212.079 318.374-318.182 1.04-1.042 1.72-2.443 2.405-3.43 43.085 43.072 85.4 85.377 128.385 128.355C695.458 456.509 694.248 457.054 693.368 457.926zM885.638 230.737c-30.845-30.865-61.7-61.712-92.57-92.55-28.44-28.41-69.91-28.372-98.4 0.092-30.345 30.305-60.65 60.64-91.01 90.925-0.955 0.947-2.33 1.475-3.295 2.065 64.355 64.347 127.825 127.8 191.604 191.57 0.845-0.8 1.75-1.635 2.625-2.507 30.33-30.312 60.665-60.622 90.98-90.957C914.243 300.677 914.268 259.382 885.638 230.737zM846.808 293.067c-3 9.66-7.79 18.57-14.89 25.735-13.365 13.477-27.215 26.465-40.715 39.512-41.76-41.74-84.01-83.975-127.06-127.002 1.295-0.947 2.965-1.9 4.285-3.207 10.57-10.47 21.025-21.047 31.6-31.512 11.945-11.83 25.85-20.06 42.815-22.077 13.075-1.558 24.675 1.597 34.255 11.287 19.34 19.55 38.505 39.302 58.445 58.237C850.483 258.237 852.538 274.612 846.808 293.067zM556.784 809.578c-24.72-0.01-44.93 20.055-45.035 44.71-0.108 24.925 19.98 45.23 44.82 45.3 24.915 0.08 45.185-20.05 45.225-44.9C601.828 829.808 581.654 809.578 556.784 809.578zM691.798 809.578c-24.865 0.015-45.03 20.255-44.98 45.145 0.05 24.685 20.18 44.815 44.88 44.865 24.89 0.065 45.145-20.09 45.165-44.955C736.883 829.758 716.673 809.558 691.798 809.578zM826.848 809.578c-24.71 0.025-44.885 20.12-44.955 44.795-0.08 24.905 20.045 45.175 44.9 45.22 24.895 0.055 45.135-20.12 45.14-44.985C871.943 829.753 851.723 809.548 826.848 809.578z" p-id="4717"></path></svg>&nbsp&nbsp&nbsp验证码</p></label>
            <input type="text" id="cname" name="cname" style="width:63%" v-model="vcode" placeholder="请输入验证码..">

            <button id="send-btn" class="button btn-blue" style="vertical-align:middle" @click="emailVerify" ><span style="height: 19px">{{sendTip}}</span></button>

            <br>
            <br>

            <button class="button button1" style="vertical-align:middle" @click="codeVerify" ><span>下一步</span></button>

        </div>

        <div class="container" v-if="step1">
            <label for="cname"><p align="left"><svg t="1592242809077" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2073" width="20" height="20"><path d="M861.157959 446.149948l-574.103933-0.934c-0.225-76.547991-21.025998-195.146977 44.895995-267.129969a261.217969 261.217969 0 0 1 180.143979-89.004989c106.739987 0 186.540978 79.576991 225.188974 178.085979 11.223999 28.395997 21.175998 43.697995 44.895994 44.520994 59.859993 1.796 56.119993-60.645993 44.894995-89.042989C771.25397 80.474991 666.533982 0.037 511.794 0.037c-105.167988 0-163.082981 21.325998-225.189974 89.04399-95.027989 103.446988-90.313989 270.719968-90.089989 356.134958l-33.671996 0.972a55.894993 55.894993 0 0 0-56.567993 55.184993v467.325945a55.894993 55.894993 0 0 0 56.567993 55.296994h697.454918a55.894993 55.894993 0 0 0 56.568994-55.296994V501.372941a55.819993 55.819993 0 0 0-56.531994-55.184993z m-32.099996 443.869948a42.388995 42.388995 0 0 1-13.244999 31.538996 43.623995 43.623995 0 0 1-31.875996 13.093998H242.420032a43.211995 43.211995 0 0 1-31.837997-13.093998 42.762995 42.762995 0 0 1-13.281998-31.539996V577.808932a44.895995 44.895995 0 0 1 45.119995-44.521994H783.899968a44.895995 44.895995 0 0 1 45.119995 44.521994V890.019896z" p-id="2074"></path></svg>&nbsp&nbsp&nbsp新密码</p></label>
            <input type="text" id="cname" name="cname" style="width:100%" v-model="passwd" placeholder="请输入新密码(不少于8位)..">

            <input type="text" id="cname" name="cname" style="width:100%" v-model="repasswd" placeholder="请再次输入密码.." @blur="checkPasswd">
            <div class="passwd-hint" v-if="checkpasswd === 1">
                {{passwdTip}}
            </div>
            <button class="button button1" style="vertical-align:middle;width:100%" @click="pwVerify" ><span>确认</span></button>

        </div>
    </div>
        <Footer/>
    </div>
</template>

<style lang="scss" scoped src= @/assets/scss/retrieve.scss>
</style>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import https from "@/https.js";
    import $ from 'jquery'
    export default {
        components: {Header, Footer},
        data() {
            return {
                email: '',
                vcode: '',
                step1: false,
                passwd: '',
                repasswd: '',
                timer: '',
                sendTip: '获取验证码',
                passwdTip: '',
                checkpasswd: 0,
                checkemail: 0
            }
        },

        methods: {
           emailVerify(){
                let params ={accountnum : this.email };
                https.fetchPost('/findpassword/selectuserinfo',params)
                    .then(data => {
                        if (data.data.code === 200){
                            this.checkemail = 0
                            this.sendCode();
                            let _this = this;
                            let x = 59
                            this.sendTip = '('+ 60 +'s)'
                            $("#send-btn").removeClass("btn-blue").addClass("btn-grey");
                            this.timer = setInterval(() => {
                                _this.mcount(x--);
                            }, 1000);

                        }
                        else {
                            this.checkemail = 1
                        }

                    }).catch(err =>{
                        alert(err.toString())
                        })
           },
            mcount(x) {

                this.sendTip = '('+ x +'s)'
                if (x === 0) {
                    clearInterval(this.timer)
                    this.canSend = true
                    this.sendTip = '获取验证码'
                    $("#send-btn").removeClass("btn-grey").addClass("btn-blue");
                    return;
                }
            },
           sendCode(){
              let fff ={email : this.email };
                 https.fetchPost('/email/sendCode',fff)
                    .then(data =>{

                    }).catch(err =>{
                        console.log(err.toString())
                 })
           },

           codeVerify(){
               let params ={emailCode : this.vcode};
               https.fetchPost('/findpassword/validatecode',params)
                .then(data =>{
                    if(data.data.code === 200){
                        this.step1 = true
                        let cookies = document.cookie;
                        let st = cookies.indexOf('token') + 6;
                        let token = unescape(cookies.substring(st, cookies.toString().length))
                        sessionStorage.setItem('tmptoken', token)
                    }
                    else {alert("验证码错误！")}
                })
           },
            pwVerify(){
                if (this.passwd === this.repasswd) {
                    let params = {newpassword: this.passwd}
                    https.fetchPost('/findpassword/update', params)
                        .then(res => {
                            if (res.data.code === 200) {
                                alert('修改成功')
                                this.$router.push('/login')
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            checkPasswd() {
                if (this.passwd !== this.repasswd) {
                    this.checkpasswd = 1
                    this.passwdTip = '两次密码不一致'
                    return
                }
                else if (this.repasswd.length < 8) {
                    this.checkpasswd = 1
                    this.passwdTip = '密码长度少于8位'
                    return;
                }
                this.checkpasswd = 0
            },

            /*emailLogin() {
                let params = {userPassword: this.vcode, userEmail: this.email};
                https.fetchPost('/user/login', params)
                    .then(data => {
                        alert(JSON.stringify(data.data))
                    }).catch(err =>{
                        alert(err.toString())
                })
            }*/

        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>
