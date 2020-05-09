<template>
	<view v-if="finish">
		<!-- 上面的蓝色卡片 -->
		<view class="head-wrap" style="padding: 0;margin-bottom: 20px;">
			<view class="head-card" style="border-radius: 0;background: #064DC5;">
				<view class="card-title">
					{{clubData.name}}
				</view>
				<view  style="margin: 10px 0 20px;" class="card-des">
					简介：{{clubData.description}}
				</view>
				<view class="card-num flex justify-between align-center">
					<view class="card-num-wrap">
						编号：{{clubData.sn?clubData.sn:'暂无'}}
					</view>
					<view class="card-num-wrap">
						{{clubData.tagname?clubData.tagname:'标签：暂无'}}
					</view>
					<view class="card-num-wrap">
						成员：{{clubData.user_count}}
					</view>
				</view>
			</view>
		</view>
		<!-- 文本域 -->
		<textarea  placeholder="请填写您的加入申请" style="width:660upx;height:98px;background:rgba(245,246,247,1);border-radius:6px 7px 7px 7px;padding: 10px;text-indent: 5px;margin: 0 auto;margin-bottom: 280upx;" placeholder-style="font-size:14px;font-weight:500;color:rgba(102,102,102,1);line-height:20px" v-model.trim="content"/>
		<view class="tijiao" @click="commit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				finish:false,
				club_id:'',
				clubData:{},
				content:''
			}
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			// console.log(e)
			this.club_id = e.id
			this.getHome()
		},
		methods: {
			commit(){
				if(!this.content){
					uni.showToast({
						title:"请填写加入申请",
						mask:'true',
						icon:"none"
					})
				}else{
					this.$api.join_club_info_v2({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						club_id:this.club_id,
						content:this.content
					}).then(res=>{
						uni.showToast({
							title:res.data.msg,
							mask:'true',
							icon:"none"
						})
						if(res.data.code == '200'){
							uni.reLaunch({
								url:'../../pagesTwo/Club/Club'
							})
						}
					})
				}
			},
			getHome(){
				this.$api.club_homepage({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					club_id:this.club_id
				}).then(res=>{
					uni.hideLoading();
					this.clubData = res.data.data
					this.finish = true
					// console.log(this.clubData)
				})
			},
			
		}
	}
</script>

<style>
	@import url("./JoinClubContent.css");
	@import url("../ClubIndex/ClubIndex.css");
</style>
