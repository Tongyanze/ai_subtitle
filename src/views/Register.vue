<template>
    <div style="position: relative">
        <Header/>
    <div class="bea">

        <table class="local">
            <div style="width: 60%;">


            <tr>
                <td colspan="2">
                    <h1>注册账户</h1>
                </td>
            </tr>
            <tr >
                <td colspan="2">
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'user']"></font-awesome-icon>
                        <input type="text" placeholder="请输入用户名" name="keyword" v-model="username">
                    </div>
                </td>
            </tr>
            <tr >
                <td colspan="2">
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'lock']"></font-awesome-icon>
                        <input type="password" placeholder="请输入您的密码" name="keyword" v-model="password">
                    </div>
                </td>
            </tr>
            <tr >
                <td colspan="2">
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'lock']"></font-awesome-icon>
                        <input type="password" placeholder="请再次输入您的密码" name="keyword" v-model="repassword">
                    </div>
                </td>
            </tr>
            <tr >
                <td colspan="2">
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'mail-bulk']"></font-awesome-icon>
                        <input type="email" placeholder="请输入您的邮箱" name="keyword" v-model="email">
                    </div>
                </td>
            </tr>
            <tr >
                <td >
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'info']"></font-awesome-icon>
                        <input type="text" placeholder="请输入您收到的验证码" name="keyword" v-model="vcode">
                    </div>
                </td>
                <td>
                    <button value="点击发送验证码" class="bigbutton btn-blue" @click="sendvcode">
                        点击发送验证码
                    </button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button class="bigbigbut btn-blue" @click="register">注册</button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <a href="#" class="blue-link">隐私条款</a><input type="checkbox" >我已阅读并同意隐私条款
                </td>
            </tr>
            </div>
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
        </table>

    </div>
        <div style="clear: both"></div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import https from "@/https.js";
    export default {
        name: "Register",
        components: {Footer, Header},
        data(){
            return{
                username:'',
                password:'',
                repassword:'',
                email:'',
                vcode:''
            }
        },
        methods:{
            register(){
                let params ={
                    username:this.username,
                    password:this.password,
                    email:this.email,
                    vcode:this.vcode
                };
                https.fetchPost('/user/regist', params).then(data => {
                        alert(JSON.stringify(data.data))
                    }).catch(err =>{
                        alert(err.toString())
                })
            },
            sendvcode(){
                let params ={
                    email:this.email
            }
            https.fetchPost('/user/sendvcode', params).then(data => {
                        alert(JSON.stringify(data.data))
                    }).catch(err =>{
                        alert(err.toString())
                })
            }

        }
    }
</script>

<style scoped>
    div>input{float:left;border:none;height:40px;line-height:30px;width:100%; text-indent:16px;}

    .bigbutton{
        width: 150px;
        height:40px;
    }
    button.bigbigbut{
        width: 420px;
        height:40px;
    }
    table.local{
        background: white;
        width: 50%;
        border-spacing: 30px;
        border-radius: 4px;
        box-shadow: 10px 10px 5px #092452;
        position: relative;
        display: flex;
        padding: 12px;
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

    td {
        width: 100%;
    }

    .d-right{
        width: 40%;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }



</style>
