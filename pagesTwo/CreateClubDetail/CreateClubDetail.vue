<template>
	<view>
		<!-- 展示审核中的界面 -->
		<view style="overflow: hidden;" v-if="code==1019">
			
			<view class="LuDingJi-no">
				<view class="LuDingJi-icon">
					<van-icon name="description" />
				</view>
				<view class="LuDingJi-no-con">
					<view class="">
						您的申请正在审核中
					</view>
					<view class="">
						请耐心等待
					</view>
				</view>
			</view>
		</view>
		
		<!-- 驳回的界面 -->
		<view style="overflow: hidden;" v-if="code==1021">
			<view class="LuDingJi-no">
				<view class="LuDingJi-icon">
					<van-icon name="description" />
				</view>
				<view class="LuDingJi-no-con">
					<view>很抱歉，您的创会申请被驳回</view>
		            <view>驳回理由：{{reason}}</view>
					<view>如有疑问，可以联系德申秘书处</view>                          
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:1019,
				reason:''
			}
		},
		onLoad(e) {
			this.code = Number(e.code)
			if(e.reason){
				this.reason = e.reason
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
