<template>
	<view>
		<web-view :src="url" progress="true">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(e) {
			if(e.accounts){
				this.url = e.url + '?accounts='+e.accounts+ '&pwd=' + e.pwd
			}else{
				this.url = e.url
			}
			console.log(this.url)
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
