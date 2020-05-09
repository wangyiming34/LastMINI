<template>
	<view style="padding-top: 44px;">
		<view class="headTab border-bottom-new2 flex justify-around">
			<view v-for="(item,index) in tabList" :key="index" class="headTabFor tabtitle" @click="tab(index)" :class="{tabActive:index==n}">
				{{item}}
			</view>
		</view>
		<view class="item1" v-if="list.length>0">
		  <view class="border-bottom-new2" v-for="(item, index) in list" :key="index" style="padding: 0;" @click="ClubAudit(item.id)">
		    <view class="abc flex align-center justify-between">
		      <view class="text">{{item.name}}</view>
		      <van-icon name="arrow" color="#ccc"/>
		    </view>
		  </view>
		</view>
		<view class="LuDingJi-no" v-else style="overflow: hidden;">
			<view class="LuDingJi-icon1">
				<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			<view class="LuDingJi-no-con">
				暂无需要审核的俱乐部
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				n:0,
				status:0,
				tabList:['待审核','已同意','已拒绝'],
				list:[]
			}
		},
		onShow() {
			// this.status = 0
			this.getData()
		},
		methods: {
			ClubAudit(id){
				uni.navigateTo({
					url:'../../pagesThree/ClubAudit/ClubAudit?id='+id
				})
			},
			getData(){
				this.$api.check_club_apply_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					status:this.status
				}).then(res=>{
					if (res.data.code === '200') {
					    this.list = res.data.data
					} else if (res.data.code === '1092') {
						uni.showToast({
						    title: '暂无权限',
						    mask: "true",
							icon:'none'
						});
					}
					
				})
			},
			tab(index){
				this.n = index
				this.status = index
				this.getData()
			}
		}
	}
</script>

<style>
	@import url("./ClubAuditList.css");
</style>
