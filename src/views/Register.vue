<template>
    <div style="position: relative">
        <Header/>
    <div class="bea">

        <table class="local">
            <tr>
                <td colspan="2">
                    <h1>注册账户</h1>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <p1>
                        已有账号?</p1><a href="#">戳我登入</a>
                </td>
            </tr>
            <tr >
                <td colspan="2">
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'user']"></font-awesome-icon>
                        <input type="text" placeholder="请输入用户名" name="keyword">
                    </div>
                </td>
            </tr>
            <tr >
                <td colspan="2">
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'lock']"></font-awesome-icon>
                        <input type="password" placeholder="请输入您的密码" name="keyword">
                    </div>
                </td>
            </tr>
            <tr >
                <td colspan="2">
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'lock']"></font-awesome-icon>
                        <input type="password" placeholder="请再次输入您的密码" name="keyword">
                    </div>
                </td>
            </tr>
            <tr >
                <td colspan="2">
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'mail-bulk']"></font-awesome-icon>
                        <input type="text" placeholder="请输入您的邮箱" name="keyword" >
                    </div>
                </td>
            </tr>
            <tr >
                <td >
                    <div class="input-box">
                        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'info']"></font-awesome-icon>
                        <input type="text" placeholder="请输入您收到的验证码" name="keyword" >
                    </div>
                </td>
                <td>
                    <input type="button" value="点击发送验证码" class="bigbutton btn-blue">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button class="bigbigbut btn-blue">注册</button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <a href="#">隐私条款</a><input type="checkbox" >我已阅读并同意隐私条款
                </td>
            </tr>
        </table>

    </div>
        <div style="clear: both"></div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    export default {
        name: "Register",
        components: {Footer, Header}
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
        background: aliceblue;
        width: 500px;
        height: 600px;
        border-spacing: 30px;
        border-radius: 20px;
        box-shadow: 10px 10px 5px #092452;
        position: relative;
        opacity: 0.8;
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
        border: solid 2px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        background: none;
    }

    .input-box input:active, .input-box input:focus{
        border: none;
    }
</style>
