<template>
	<view class="wrap1" style="padding-top: 60px;">
		<view class="qrimg" v-if="show">
		    <tki-qrcode
		    ref="qrcode"
		    :val="val"
		    :icon="icon"
			iconSize="15"
			size="180"
		    :loadingText="loadingText"
		    @result="qrR"/>
		</view>
		
		
		
		<view style="width: 270px;margin: 0 auto;background-color: white;padding: 40px 0;overflow: hidden;box-shadow: -2px -2px 10px 5px #CCCCCC;border-radius: 5px;" v-if="!show">
			<image src="../../static/img/logo.png" mode="" style="width: 60px;height: 60px;margin: 0 auto;display: block;"></image>
			<view class="" style="text-align: center;margin: 10px  0;">
				{{name}}
			</view>
			<view class="" style="text-align: center;margin: 10px  0;color: #ccc;font-size: 14px;">
				欢迎您的加入
			</view>
			<view style="width: 180px;margin: 0 auto;">
				<image :src="src" mode="widthFix"></image>
			</view>
			
			<view   style="margin-top: 40px;font-size: 17px;
    color: #666;text-align: center;">
               <text style="margin-right: 10px;">——</text> <text>立即扫码加入</text> <text style="margin-left: 10px;">——</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {tkiQrcode},
		data() {
			return {
				name:'',
				id:'',
				url:"",
				paramsUrl:'',
				val:'',
				icon:'../../static/img/logo.png',
				loadingText:"二维码生成中",
				src:'',
				show:true
			}
		},
		onLoad(e) {
			// console.log(e)
			this.id = e.id
			this.name = e.name
			this.val = 'https://web.detion.com/JoinClubCode/' + e.id + '?VNK=6de0b400'
			// this.val = 'https://www.baidu.com'
			// console.log(this.val)
			// console.log(this.$url.getCurrentPageUrlWithArgs())
			// console.log(this.$url.getCurrentPageUrl())
			// this.url = this.$url.getCurrentPageUrl()
			// this.paramsUrl = this.$url.getCurrentPageUrlWithArgs()
			setTimeout(()=>{ this.$refs.qrcode._makeCode() },1000)
		},
		methods: {
			qrR(e){
				// console.log(e)
				this.src = e
				this.show = false
			}
		}
	}
</script>

<style>

</style>
