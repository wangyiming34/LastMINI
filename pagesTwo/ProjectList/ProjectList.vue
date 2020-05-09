<template>
	<view style="padding-top: 40px;" class="tabtab">
		<!-- 上面可滑动的选项卡 -->
		<view class="scrollTab flex justify-between align-center border-bottom-new2">
			<view style="width: 680upx;height: 100%;">
				<scroll-view class="scroll-view_H" scroll-x="true" style="height: 100%;">
					
						<view :id="'id'+index" v-for="(item,index) in TotalLable" :key="index" class="scroll-view-item_H classify-name" @click.stop="tab(index,item)" :class="{tabBlue:n==index}">
							{{item}}
						</view>
					
				</scroll-view>
			</view>
			<view style="height: 44px;" class="flex align-center justify-center flex1" @click.stop="goTab">
				<van-icon name="wap-nav" size="20px"/>
			</view>
		</view>
		
		
		
		<!-- 热门项目 -->
		 <view class="hot" style="background-color: white;width: 100%;" v-if="hotList.length>0">
					 
					  <view class="b-line re" style="padding: 30upx 0 18upx;" v-for="(item,index) in hotList" :key="index" @click.stop="InformationDetail(item.id)">
					  	<view class="flex" style="align-items: center; margin-bottom: 28upx;" @click.stop="MyInfo(item.user_id)">
												
					  		<view  style="width: 80upx;height: 80upx;" class="re">
					  			<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" style="height: 100%; width: 100%;border-radius: 50%;"></image>
								<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
					  		</view>					
							
							<view  style="flex: 1; margin-left: 20upx;">
								<!-- <view class="name">
									<view class="newName">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view> -->
								<view class="name flex align-center">
									<view class="newName">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view>
								
								<view class="ceo">
									<text v-if="item.job">{{item.job}}</text>
									<text style="margin: 0 4upx;" v-if="item.company"> I </text>
									<text v-if="item.company">{{item.company}}</text>
								</view>
							</view>
												
					  	</view>
						<view class="flex" style="width: 100%;">
							<view style="flex: 1; margin-right: 36upx;">
								<view style="
								margin-bottom: 10upx;
								width: 100%;
								word-break:break-all;
								overflow:hidden;
								display:-webkit-box; 
								text-overflow:ellipsis;
								-webkit-line-clamp:2;
								-webkit-box-orient:vertical;
								white-space:normal;
								font-size:30upx;
								font-weight:400;
								color:rgba(51,51,51,1);
								line-height:42upx;">
									<text style="margin-right: 10px;font-weight:400;color:rgba(255,255,255,1);font-size: 12px;padding: 0px 5px;border-radius:2px;" v-if="item.op_type == 1||item.op_type == 2" :class="item.op_type == 1?'colorblue':item.op_type == 2?'coloryellow':''">
										{{item.op_type == 1 ? '合作':item.op_type == 2 ?'资源':''}}
									</text>
									{{item.title}}
								</view>
								<view  style="width: 100%;height: 18px;flex-wrap: wrap;overflow: hidden;margin-top: 10px;" class="flex">
									<view class="" v-for="(item2,index2) in item.label" :key="index2" style="height:18px;background:rgba(240,240,240,1);border-radius:2px;line-height: 18px;padding: 0 5px;font-weight:400;color:rgba(153,153,153,1);font-size: 12px;margin-right: 7px;">
										{{item2.name}}
									</view>
								</view>
								
							</view>
							<view style="width: 200upx; height: 145upx;">
								<image :src="item.images[0].url_image" mode="aspectFill"></image>
							</view>
						</view>
						
						<view class="flex justify-between" style="margin-top: 15px;">
							<view style="
							font-size:24upx;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:24upx;
							">
								<text style="margin-right: 30upx;">{{item.created_at.split(' ')[0]}}</text>
								<text>{{item.click}}阅读</text>
							</view>
							
							<view class="starColor flex align-center">
								<van-icon :name="item.vote_status?'star':'star-o'" size="13px" style="margin-right: 5px;" :class="{starActive:item.vote_status}" />
								<!-- <van-icon name="star" /> -->
								<view style="font-size: 12px;">
									{{item.like}}
								</view>
							</view>
						</view>
					  </view>
		 </view>
		 <view class="LuDingJi-no" v-else>
		 	<view class="LuDingJi-icon1">
		 		<image src="https://web.detion.com/static/img/empty_info.png" lazy-load="true" class="imga" mode="aspectFill"></image>
		 	</view>
		 	<view class="LuDingJi-no-con">
		 		暂无数据
		 	</view>
		 </view>
		
		<view  class="noMore1" v-if="showTitle&&hotList.length>0">
				暂无更多内容
		</view>
		<!-- 加载中 -->
		<view style="height: 88upx;display: flex;  width: 100%;" v-if="loading">
			<van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTitle:false,
				guodu:[],
				scrollId:'',
				TotalLable:[],
				// defaultLable:[],
				// addLable:[],
				n:0,
				page:1,
				cate_name:'',
				loading:false,
				allowloading:false,
				hotList:[] //热门项目
			}
		},
		onPullDownRefresh(){
			this.page = 1
			this.getData()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 1000);
		},
		onReachBottom(){
			if(this.allowloading){
				this.allowloading = false
				this.loading = true
				this.page++
				this.getData()
				// setTimeout(() => {
				// 	this.page++
				// 	this.getData()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
		},
		onLoad() {
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.getLable()
		},
		onShow() {
			this.getAddLable()
		},
		methods: {
			goTab(){
				uni.navigateTo({
					url:'../../pagesTwo/TabSelectNew/TabSelectNew'
				})
			},
			tab(ind,it){
				this.scrollId = 'id'+ind
				this.n = ind
				this.cate_name = it
				this.getData()
			},
			// 会友汇详情
			InformationDetail(id){
				uni.navigateTo({
					url:'../../pagesMy/InformationDetail/InformationDetail?id='+id
				})
			},
			// 跳转个人主页
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			// 获取列表
			getData(){
			      this.$api.opportunity_list({
			              token: uni.getStorageSync("token"),
			              user_id: uni.getStorageSync("userId"),
			              page: this.page,
						  cate_name : this.cate_name
			            }).then(res => {
							if(res.data.code=== '200'){
								if(this.page===1){
									uni.hideLoading();
									this.hotList = res.data.data
									if(res.data.data.length>=20){
										this.allowloading= true
										this.loading =false
									}else{
										this.allowloading= false
										this.loading =false
										this.showTitle = true
									}
								}else{
									this.hotList = this.hotList.concat(res.data.data)
									if(res.data.data.length>=20){
										this.allowloading= true
										this.loading =false
									}else{
										this.allowloading= false
										this.loading =false
										this.showTitle = true
									}
								}
								
							}
			            })
					
			},
			// 获取自己添加的标签
			getAddLable(){
				this.$api.myself_label({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
				}).then(res=>{
					
					// this.addLable = res.data.data
					this.TotalLable = this.guodu.concat(res.data.data)
					
					this.cate_name = this.TotalLable[this.n]
					// console.log(this.n)
					// console.log(res.data.data)
					this.getData()
					
				})
			},	
			// 获取默认选项
			getLable(){
				this.$api.default_label({
				}).then(res => {
					// this.defaultLable = res.data.data
					this.guodu = res.data.data
					this.TotalLable = this.TotalLable.concat(res.data.data)
					this.$nextTick(()=>{
						this.getAddLable()
					})
					
				})
			}
		}
	}
</script>

<style>
	@import url("./ProjectList.css");
	@import url("../../pages/index/index.css");
</style>
