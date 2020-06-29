<template>
    <div class="global-container">
        <Header/>
<div id="UserInfo" class="Info_form" >
    <div id="content">
        <div id="left_part">
        <div id= "head">
            <img   width=30px height=30px>
            个人中心
        </div>
        <div class="list">
            <div ><router-link :to="{name: 'basicinfo'}" class="blue-link" >基本信息</router-link></div>
            <div ><router-link :to="{name: 'contribute'}" class="blue-link" >我的作品</router-link></div>
            <div ><router-link :to="{name: 'favourition'}" class="blue-link" >我的收藏</router-link></div>
            <div ><router-link to="/Message" class="blue-link" >我的消息</router-link></div>

        </div>
        </div>
        <div id="right_part">
            <div class="lnfo_content">
                        <!-- 在cur==0时此板块显示 其他时候此板块不显 -->
                        <router-view></router-view>

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
    export default {
        name: "UserInfo",
        components: {
          Header, Footer
        },
        data() {
            return {
                cur: 0 //默认选中第一个tab
            }
        }
    }

</script>

<style  scoped lang = "scss" src=@/assets/scss/userinfo.scss >

</style>
