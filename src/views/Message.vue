<template>
    <div>

        <Header :a=0></Header>
        <div class = "container">
			<div class= "space-left">
				<div class = "title">消息中心</div>
					<div class = "list">
                        <div class = "item" >
					        <div @click="cur=0" :class="{active:cur==0}">
								<router-link :to="{name: 'subm1'}" class="item">系统通知</router-link>
							</div>
					        <div @click="cur=1" :class="{active:cur==1}">
								<router-link :to="{name: 'subm2'}" class="item">@我的</router-link>
							</div>
							<div @click="cur=2" :class="{active:cur==2}">
								<router-link :to="{name: 'subm3'}" class="item">未读消息</router-link>
							</div>
							<div @click="cur=3" :class="{active:cur==3}">
								<router-link :to="{name: 'subm1'}" class="item">已读消息</router-link>
							</div>
							<div @click="cur=4" :class="{active:cur==4}">
							    <router-link :to="{name: 'subm2'}" class="item">等等</router-link>	
							</div> 					
                        </div>
					</div>
					
			    
				
			</div>
			<div class = "space-right">
				<router-view></router-view>
			</div>
                 
        </div>

		
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import https from "@/https.js";

    export default {
		name:'message',
		components: {Header, Footer},
        data() {
			return {

                cur: 0 //默认选中第一个tab
            }
		}
	
	}
	</script>

	<style lang = "scss" scoped src=@/assets/scss/message.scss>
</style>