<template>
    <div class="global-container">
        <Header/>
<div id="UserInfo" class="Info_form" >
    <div id="content">
        <div id="left_part">
        <div id= "head">
            个人中心
        </div>
        <div class="list">
            <router-link :to="{name: 'basicinfo'}" class="blue-link"  ><div @click="setCur(1)" :class="{'clicked': cur===1}">基本信息</div></router-link>
            <router-link :to="{name: 'contribute'}" class="blue-link" > <div  @click="setCur(2)" :class="{'clicked': cur===2}">我的作品</div></router-link>
            <router-link :to="{name: 'Message'}"  class="blue-link" ><div  @click="setCur(3)" :class="{'clicked': cur===3}">我的消息</div></router-link>

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
                cur: 1 //默认选中第一个tab
            }
        },
        methods: {
            setCur(x) {
                console.log(this.cur)
                this.cur = x;
            }
        }
    }

</script>

<style  scoped lang = "scss" src=@/assets/scss/userinfo.scss >

</style>
