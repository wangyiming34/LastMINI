<template>
	<view style="background:rgba(248,250,255,1);position: absolute;width: 100%;min-height: 100%;">
		<view class="title">
			人数总计：{{count}}人
		</view>
		<view v-for="(item,index) in list" :key="index" class="tab flex" @click.stop="MyInfo(item.user_id)">
			<view class="tab-img">
				<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
				<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
			</view>
			<view class="text-wrap border-bottom-new2">
				<view class="">
					<view class="flex align-center" style="height: 24px;margin-bottom: 3px;">
						<view style="margin-right: 9px;font-size:17px;font-weight:500;color:rgba(6,77,197,1);">
							{{item.nickname}}
						</view>
						<vip :no="item.no" :type="item.type" v-if="item.no"></vip>
					</view>
					<view style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);line-height:20px;">
						<text v-if="item.job">{{item.job}}</text>
						<text style="margin: 0 5px;" v-if="item.company"> I </text>
						<text v-if="item.company">{{item.company}}</text>
					</view>
				</view>
				<view class="">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityName:'',
				count:'',
				list:[]
			}
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中'
			});
			this.cityName = e.cityName
			this.$nextTick(()=>{
				this.getList()
			})
		},
		methods: {
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			getList(){
				this.$api.freedom_harbor_list_v2({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					city_name:this.cityName
				}).then(res=>{
					uni.hideLoading();
					console.log(res)
					if(res.data.code==='200'){
						this.list = res.data.data.list
						this.count = res.data.data.count
						// if(res.data.data.Renew){
						// 	this.Renew = res.data.data.Renew
						// }
						// console.log(this.clubList)
						// console.log(this.Renew)
					}
				})
			}
		}
	}
</script>

<style>
	@import url("./FreedomHarbor.css");
</style>
