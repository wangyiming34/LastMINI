<template>
	<view style="font-size: 14px;">
		<view class="vvv">
			{{detail.question}}
		</view>
		<view class="" style="padding: 10px;">
			<rich-text :nodes="content" type = 'node'  class="con"></rich-text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				detail:'',
				content:''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getData()
		},
		methods: {
			getData(){
				this.$api.faq_detail({
					id:this.id
				}).then(res=>{
					console.log(res)
					this.detail = res.data.data
					this.content = res.data.data.answer.replace(/\width: 471px/gi, 'width:100%').replace(/\width: 470px/gi, 'width:100%').replace(/\<img/gi, '<img style="width:100%;height:auto"')
				})
			}
		}
	}
</script>

<style>
.vvv{
	font-size: 18px;
	line-height: 44px;
	color: #333333;
	text-align: center;
}
</style>
