<template>
<div  class="Cbody_item">
                        <div class="mainInfo">
                        <span id="headIcon">     
                            <img   width=80px height=80px src="../assets/dong.png">
                        </span>
                         <span class="accountInfo">     
                            <div id="username">                         
                             {{username}}
                            </div>
                             <div id="useraccount" class="subInfo">
                                账号：
                                <span>{{accountNum}}</span>
                            </div>
                            <div id="usersign" class="subInfo">
                                个性签名：<span>{{usersign}}</span>
                            </div>
                        </span>
                        <div>
                            <router-link :to="{name: 'changeinfo'}" id="changeInfo-button" >修改资料</router-link>
                        </div>
                        </div>
                        <div >
                        <span class="beforeline">基本信息</span>
                        <span >
                        <hr class="cutline">
                        </span>
                        </div>
                        <div class="mainInfo">
                         <span >   
                             <span id="left">  
                            <div id="usersex" class="basicInfo">
                                性别：<span>{{usergender}}</span>
                            </div>
                            <div id="userage" class="basicInfo">
                                年龄：<span>{{userage}}</span>
                            </div>
                            <div id="userage" class="basicInfo">
                                生日：<span>{{userbirth}}</span>
                            </div>
                             </span>
                            <span id="right">
                             <div id="userloc" class="basicInfo">
                                所在地：<span>{{userloc}}</span>
                            </div>
                             <div id="userlcol" class="basicInfo">
                                学校：<span>{{usercol}}</span>
                            </div>
                            <div id="userlcol" class="basicInfo">
                                长相：<span>在当地较为帅气</span>
                            </div>
                            </span>
                        </span>
                        </div>
                         <span class="beforeline">账号设置</span>
                         <hr class="cutline">
                          <div class="mainInfo">
                          <span class="basicInfo">   
                             <span id="left">  
                            <div id="userphone" class="basicInfo">
                                绑定手机号：<span>{{userphone}}</span> <router-link :to="{name: 'changephone'}" id="changebind" >修改手机</router-link> 
                            </div>                            
                           
                             </span>
                            <span id="right">
                             <div id="useremail" class="basicInfo">
                                绑定邮箱：<span>{{useremail}}</span><router-link :to="{name: 'changemail'}" id="changebind" >修改邮箱</router-link> 
                            </div>
                            </span>
                        </span>
                        </div>
                        
                         <span class="beforeline">更多玩法尽情期待</span>
                         <hr class="cutline">
                        </div>
</template>

<script>
    export default {
        name: "basicinfo",
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
