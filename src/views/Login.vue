<template>
    <div>
        <Header/>
        <div id="Login" class="login_form">
            <div id="content">
                <div>
                    <img id="leftimg" src="../assets/dong.png">
                </div>
                <div id="box">
                    <div class="title">AI字幕菌</div>
                    <div class="login_header">
                        <span @click="cur=0" :class="{active:cur==0}">账号登录</span>
                        <span @click="cur=1" :class="{active:cur==1}">手机登录</span>
                        <span @click="cur=2" :class="{active:cur==2}">邮箱登录</span>
                    </div>
                    <div class="login_content">
                        <!-- 在cur==0时此板块显示 其他时候此板块不显 -->
                        <div v-show="cur==0" class="Cbody_item">
                            <div class="input">
                                <input type="text" id="username" value="" placeholder="账号"/>
                                <br>
                                <input type="password" id="password" placeholder="密码"/>
                                <br>
                                <input type="checkword" id="checkword1" placeholder="验证码"/>
                                <br>
                                <button type="button" id="login-button">马上登录</button>
                            </div>
                        </div>
                        <!-- 在cur==1时此板块显示 其他时候此板块不显 -->
                        <div v-show="cur==1" class="Cbody_item">
                            <div class="input">
                                <input type="text" id="username" value="" placeholder="手机号"/>
                                <br>
                                <input type="password" id="password" placeholder="密码"/>
                                <br>
                                <input type="checkword" id="checkword1" placeholder="验证码"/>
                                <br>
                                <button type="button" id="login-button">马上登录</button>
                            </div>

                        </div>
                        <!-- 在cur==2时此板块显示 其他时候此板块不显 -->
                        <div v-show="cur==2" class="Cbody_item">
                            <!--			<div class="qcode"><img src="../../assets/img/qcode.png" width="160" height="160" alt="二维码" /></div> -->
                            <div class="input">
                                <input type="text" id="username" value="" placeholder="邮箱"/>
                                <br>
                                <input type="password" id="password" placeholder="密码"/>
                                <br>
                                <input type="checkword" id="checkword1" placeholder="验证码"/>
                                <br>
                                <button type="button" id="login-button">马上登录</button>
                            </div>
                        </div>
                    </div>

                    <router-link id="forgetpass" to='/retrieve'>忘记密码？</router-link>
                    <a id="register" href='http://www.baidu.com'>注册</a>
                    <br>
                    <br>
                    <br>
                    <span id="other">第三方登录</span>
                    <span>
			<img id="logo" src="../assets/WB.png">
			<img id="logo" src="../assets/WC.png">
			<img id="logo" src="../assets/QQ.png">
		</span>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";

    export default {
        name: 'Login',
        components: {Header, Footer},
        data() {
            return {
                cur: 0 //默认选中第一个tab
            }
        }
    }

</script>


<style scoped src=@/assets/css/login.css>
</style>

