<template>
	<view class="joinClubList" v-if="finish">
		<!-- 遮罩 -->
		<view class="pickerWrap" v-if="visible" @click.stop="fix">
			
		</view>
		<!-- picker确定取消 -->
		<view class="flex justify-between" style="position: fixed;z-index:100;bottom: 200px;left: 0;height: 40px;background-color: white;width: 100%;padding: 0 20px;line-height: 40px;" v-if="visible">
			<view class="" @click.stop="cancel">
				取消
			</view>
			<view  style="color: #004DC5;" @click.stop="ok">
				确定
			</view>
		</view>
		<!-- picker -->
		<picker-view v-if="visible" style="width: 100%;height: 200px;position: fixed;z-index: 100;left: 0;bottom: 0;background-color: white;"  @change="bindChange" >
			<picker-view-column>
				<view class="item" v-for="(item,index) in city" :key="index">{{item}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in cityList" :key="index">{{item.name}}</view>
			</picker-view-column>
		</picker-view>
		
		<!-- 头部 -->
		<view class="title flex align-center justify-between" style="position: fixed;left: 0;top: 0;z-index: 10;background:rgba(250,250,250,1);">
			<view class="flex align-center">
				<view class="blueShu">
				</view>
				<view style="font-size:17px;font-weight:600;color:rgba(68,68,68,1);margin-left: 10px;">
					俱乐部
				</view>
			</view>
			<view class="flex align-center" @click.stop="choose">
				<view style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">
					{{cityName}}
				</view>
				<van-icon name="arrow-down" style="margin-left: 5px;"/>
			</view>
		</view>
		<!-- 俱乐部列表 -->
		<view v-for="(item,index) in clubList" :key="index" class="clubLIst" @click.stop="goClub(item.id)">
			<view class="listTop flex justify-between align-center" style="font-size: 13px;font-weight:400;color:rgba(153,153,153,1);">
				<view class="">
					编号：{{item.sn}}
				</view>
				<view class="">
					成员：{{item.user_count}}
				</view>
			</view>
			<view style="width: 100%;height:1px;background:rgba(221,221,221,1);">
				
			</view>
			<view class="flex listBottom">
				<view class="exitClubImg">
					<image :src="item.url_image?item.url_image:'../../static/img/logo.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>
				<view class="flex1 re exitClubRight">
					<view class="name">
						{{item.name}}
					</view>
					<view class="title1" style="padding: 0;">
						<text>创会会长：{{item.cdr}}</text>
						<text style="margin: 0 5px;"> I </text>
						<text>现任会长：{{item.nickname}}</text>
					</view>
				</view>
				<view class="re" style="width: 55px;align-self: center;height: 20px;">
					<view class="ab exitbtn" @click.stop="goJoin(item.id)" style="background-color: #004DC5;color: white;border: none;">
						加入
					</view>
				</view>
			</view>
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				finish:false,
				cityName:'哈尔滨',
				cityList:[],
				visible:false,
				city:['国内','国外'],
				value:0,
				clubList:[]
			}
		},
		onLoad() {
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.cityName = uni.getStorageSync('city')
			this.getCity()
			this.getData()
		},
		methods: {
			goClub(id){
				uni.navigateTo({
					url:'../../pagesTwo/ClubIndex/ClubIndex?id='+id
				})
			},
			goJoin(id){
				uni.navigateTo({
					url:'../../pagesTwo/JoinClubContent/JoinClubContent?id='+id
				})
			},
			getData(){
				this.$api.join_club_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					city_name:this.cityName
				}).then(res=>{
					uni.hideLoading();
					if(res.data.code=='200'){
						this.clubList = res.data.data
						this.finish = true
					}
				})
			},
			ok(){
				this.cityName = this.cityList[this.value].name
				this.visible = false
				this.getData()
				this.value = 0
			},
			choose(){
				this.visible = true
				this.getCity()
			},
			cancel(){
				this.visible = false
				this.value = 0
			},
			fix(){
				this.visible = false
				this.value = 0
			},
			bindChange(e){
				if(e.detail.value.length==2){
					this.value = e.detail.value[1]
				}
				if(e.detail.value[0]==0){
					this.getCity()
					
				}else{
					this.getOther()
					
				}
			},
			getCity(){
				this.$api.city_choose({
				}).then(res=>{
					this.cityList = res.data.data.cn
				})
			},
			getOther(){
				this.$api.city_choose({
				}).then(res=>{
					this.cityList = res.data.data.other
				})
			}
		}
	}
</script>

<style>
	@import url("./JoinClub.css");
	@import url("../ExitClubList/ExitClubList.css");
</style>
