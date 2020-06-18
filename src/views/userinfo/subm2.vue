<template>

	<div  class="body_item">
					<div class = "space-right-top">
					   <div class = "headline">@我的</div>
				    </div>
                    <div class = "space-right-bottom">
					    <div class = "content">
						   <div>
                                <img class="img" src="../../assets/dong.png">
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
		name:'subm2',
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
