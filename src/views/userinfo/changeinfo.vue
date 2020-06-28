<template>
      <div  class="changebasic">
                           
                           
                        
                            <div  class="changesubInfo">
                               
                                昵称： <input type="text" id="changename"  class="change" v-model="username"/>
                            </div>
                               <div  class="changesubInfo">
                                签名： <textarea type="text" id="changesign" class="change" v-model="usersign"/>
                            </div>
                            <div  class="changesubInfo">
                                性别： <button class="selectgender" @click="setmale" id="male">男</button> 　<button @click="setfemale" class="selectgender" id="female">女</button>　　                       
                            </div>
                            <div  class="changesubInfo">
                                生日： <input type="date" id="changebirth" class="change" v-model="userbirth"/>
                            </div>
                       
                        <span >
                        <hr class="cutline2">
                        </span>
                          <button id="submit" @click="changeinfo">保存</button>
                        </div>
</template>

<script>
import https from "@/https.js";
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
                useremail:"",
                userphone:10086,
                userbirth: '',
                cur: 0 //默认选中第一个tab
            }

        },
        mounted() {
            this.getUserInfo()
        },
         methods: {
             setmale(){
                 this.usergender='male'
             },
              setfemale(){
                 this.usergender='female'
             },
              getUserInfo() {
                let userinfo = JSON.parse(localStorage.getItem('userinfo'))
                console.log(userinfo)
                this.username = userinfo.userName
                this.usergender = userinfo.userGender 
                this.userbirth = userinfo.userBirthday
                this.usersign=userinfo.userSignature
                this.useremail = userinfo.userEmail
                this.userphone = userinfo.userPhoneNumber
            },
            changeinfo() {
                console.log(this.userbirth)
                let params = {userName: this.username, userGender: this.usergender,userBirthday:this.userbirth,userSignature:this.usersign};
                https.fetchPost('/user/userModify', params)
                    .then(data => {
                        if(data.data.code==200){
                            let userinfo=data.data.data
                            console.log(userinfo)
                            localStorage.setItem('userinfo', JSON.stringify(userinfo))
                            this.$router.push('/userinfo/basicinfo')
                        }
                        else{
                            alert('错误码:'+data.data.data)
                        }
                    }).catch(err =>{
                        alert(err.toString())
                })
            }

        }
        
        
    }
   
</script>

<style  scoped lang = "scss" src=@/assets/scss/userinfo.scss >

</style>
