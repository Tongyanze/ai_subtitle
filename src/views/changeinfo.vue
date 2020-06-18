<template>
      <div  class="changebasic">
                           <div  class="changesubInfo">
                                昵称： <input type="text" id="changename"  class="change" v-model="username"/>
                            </div>
                               <div  class="changesubInfo">
                                签名： <textarea type="text" id="changesign" class="change" v-model="usersign"/>
                            </div>
                            <div  class="changesubInfo">
                                性别： <button class="selectgender" >男</button> 　<button class="selectgender" >女</button> 　<button class="selectgender" >保密</button> 　　
                                
                            </div>
                            <div  class="changesubInfo">
                                生日： <input type="date" id="changebirth" class="change" v-model="userbirth"/>
                            </div>
                       
                        <span >
                        <hr class="cutline2">
                        </span>
                          <button id="submit" >保存</button>
                        </div>
</template>

<script>
    export default {
        name: "changeinfo",
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
