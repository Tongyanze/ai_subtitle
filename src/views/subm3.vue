<template>
    
	    <div class="body_item">
			<div class = "space-right-top">
				<div class = "headline">已读评论</div>
			</div>
            <div class = "space-right-bottom">
                <div v-for="(msg,i) in msglist" :key="msg.msgId"> 
                      <div class = "content"  @click="read(msg)">
                           <div class = "top">来自{{msg.fromUserName}}</div>
                           <div class = "bottom">{{msg.msgContent}}</div>
                       </div>   
                       <!--<div class = "content" v-if="i=='2'">{{msg.msgContent}}</div>-->
                       
                    </div>
				</div>
			</div>
		</div>
    
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import https from "@/https.js";

    export default {
		name:'subm3',
		components: {Header, Footer},
        data() {
			return {
                msglist:[],
                cur: 0 //默认选中第一个tab
            }
		},
		mounted: function()
		{
            
                let params = {type:"notread"};
                https.fetchPost('/msg', params)
                    .then(data => {
                        console.log(data.data.data)
                        this.msglist=data.data.data
                    }).catch(err =>{
                        alert(err.toString())
                })
            

        },

        methods: {
            read(msg){
                    let params = {msgId:msg.msgId};
                    console.log(params);
                    https.fetchPost('/msg/read', params)
                    .then(data => {
                        console.log(data.data.data)
                        
                    }).catch(err =>{
                        alert(err.toString())
                    })
                
                }

        }
    }
	</script>

	<style lang = "scss" scoped src=@/assets/scss/message.scss>
    </style>