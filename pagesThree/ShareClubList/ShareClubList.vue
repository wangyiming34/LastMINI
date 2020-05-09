<template>
	<view>
		<view v-for="(item,index) in list" :key="index" class="exitClub heightLine flex">
			
			<view class="exitClubImg">
				<image :src="item.url_image?item.url_image:'../../static/img/logo.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			
			
			<view class="flex1 re exitClubRight">
				<view class="name">
					{{item.name}}
				</view>
				<view class="title">
					<text>创始人：{{item.cdr}}</text>
					<text style="margin: 0 5px;"> I </text>
					<text>现任会长：{{item.nickname}}</text>
				</view>
				
			</view>
			
			
			<view class="re" style="width: 55px;align-self: center;height: 20px;font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;border-radius: 24px;
    border: 1px solid #064dc5;
    color: #064dc5;" @click="share(item)">
					分享
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			share(item){
				uni.navigateTo({
					url:'../../pagesThree/ShareClub/ShareClub?id='+item.id +"&name="+ item.name
				})
			},
			getData(){
				this.$api.club_login_out_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then((res)=>{
					// console.log(res)
					this.list = res.data.data
					for (let i = 0; i < this.list.length; i++) {
						  if (this.list[i].type === 1) {
							   this.list.splice(i, 1)
						    }
					      }
					this.list = this.list
				})
			}
			
		}
	}
</script>

<style>
	@import url("../../pagesTwo/ExitClubList/ExitClubList.css");
</style>
