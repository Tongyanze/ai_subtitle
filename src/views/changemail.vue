<template>
 <div  class="changebasic">
                           <div  class="changesubInfo">
                                输入密码： <input type="password" id="changename"  class="change" />
                                <br>
                                输入新邮箱： <input type="text" id="newemail"  class="change" v-model="useremail"/>
                                
                            </div>
                        <span >
                        <hr class="cutline2">
                        </span>
                          <button id="submit" >保存</button>
                        </div>
</template>

<script>
    export default {
        name: "changemail",
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
