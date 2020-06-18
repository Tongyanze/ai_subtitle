<template>
<div id="UserInfo" class="Info_form" >
    <div id="content">
        <div id="left_part">
        <div id= "head">
            <img   width=30px height=30px src="../assets/usericon.png">
            个人中心
        </div>
        <div class="list">
            <div ><router-link :to="{name: 'basicinfo'}" class="blue-link" >基本信息</router-link></div>
            <div >我的作品</div>
            <div >我的收藏</div>
            <div >我的消息</div>
             
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
</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {
                username:"冬冬",
                accountNum:631570777,
                usersign: "我想去学校。。",
                userage:9,
                userloc:"江苏",
                usergender:"男",
                usercol:"牛津大学",
                useremail:"631570777@qq.com",
                userphone:10086,
                userbirth:"1840年9月7日",
                cur: 0 //默认选中第一个tab
            }
        }
    }
   
</script>

<style  scoped lang = "scss" src=@/assets/scss/userinfo.scss >

</style>
