<template>
	<view style="padding-top: 44px;">
		<view class="classify border-bottom-new2 flex align-center justify-between" style="background-color: white;position: fixed;z-index: 100;left: 0;top: 0;height: 44px;">
				<view class="flex align-center">
					<view v-for="(item,index) in classifyList" :key="index" class="scroll-view-item_H classify-name"
					@click="classifyChange(index,item.id)" :class="n===index?'classifyActive':''" style="padding-top: 3px;padding-bottom: 3px;">
						{{item}}
					</view>
				</view>
				<!-- <picker @change="bindPickerChange" :range="countryList" mode="multiSelector" range-key="name"> -->
				<view class="flex align-center" v-if="n == 1" style="margin-right: 30upx;" @click.stop="pic">
					
					<strong><van-icon name="location" color="#064DC5"/></strong>
					<view style="font-size: 12px;color: #333;margin-left: 3px;">
						{{city_name}}
					</view>
				</view>
				<!-- </picker> -->
		</view>
		<view class="" v-if="hotList.length>0">
			<view class="re" v-for="(item,index) in hotList" :key="index" style="margin-top: 8px;" @click="goDetail(item.id)">
				<view class="ab astatus" :style="{background:item.state?'#cc3055':'#ccc'}">
					{{item.state?'进行中':'已结束'}}
				</view>
				<view class="" style="width: 100%;height: 340upx;">
					<image :src="item.url_image" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>
				<view class="" style="padding: 8px 10px;">
					<view class="" style="font-size: 17px;line-height: 24px;color: #333;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;margin-bottom: 5px;">
						{{item.name}}
					</view>
					<view class="flex justify-between align-center">
						<view class="flex align-center" style="flex: 1;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
							<van-icon name="location-o" color="#999"/>
							<view style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size: 13px;line-height: 20px;color: #999;">{{item.address}}</view>
						</view>
						
						<view class="flex align-center" style="margin-left: 10px;">
							<van-icon name="clock-o" color="#999" style="margin-right: 3px;"/>
							<view style="font-size: 13px;line-height: 20px;color: #999;">{{item.start_date.split(' ')[0].split('-').join('.')}}-</view>
							<view style="font-size: 13px;line-height: 20px;color: #999;">{{item.finish_date.split(' ')[0].split('-').join('/')}}</view>
						</view>
					</view>
				</view>
			</view>
			<view  class="noMore1" v-if="showTitle">
					暂无更多内容
			</view>
		</view>
		
		<view class="LuDingJi-no" v-else style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
			<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
				<image src="https://web.detion.com/static/img/empty_info.png" lazy-load="true"  mode="aspectFill"></image>
			</view>
			<view class="LuDingJi-no-con">
				暂无数据
			</view>
		</view>
		
		
		
		<view style="height: 88upx; display: flex;  width: 100%;" v-if="loading">
		     <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
		</view>
		
		<lb-picker ref="picker" :props="myProps" :list="countryList" mode="multiSelector" @confirm="picok"></lb-picker>
	</view>
</template>

<script>
	import LbPicker from '@/pagesTwo/base/lb-picker'
	var app = getApp().globalData
	export default {
		components: {
		    LbPicker
		},
		data() {
			return {
				n:0,
				classifyList:['平台活动','俱乐部活动'],
				time: new Date().getTime(),
				page:1,
				hotList:[],
				loading:false,
				allowloading:false,
				city_name: '全部',
				choose_city: '',
				inside_list: [], // 国内城市列表
				outside_list: [], // 国外城市列表
				countryList:[],
				myProps: {
				  label: 'name',
				  value: 'id',
				  children: 'child'
				},
				showTitle:false
			}
		},
		onLoad() {
			this.getActivity()
		},
		onShareAppMessage:function(res) {
			return {
			  title: '德申汇活动',
			  imageUrl:app.shareImg,
			  path: 'pagesTwo/Activity/Activity'
			}
		},
		onPullDownRefresh(){
			this.page = 1
			this.getActivity()
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
				this.getActivity()
				// setTimeout(() => {
				// 	this.page++
				// 	this.getActivity()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
		},
		methods: {
			goDetail(id){
				uni.navigateTo({
					url:'../../pagesTwo/ActivityDetail/ActivityDetail?id='+id
				})
			},
			picok(e){
				// console.log(e.item[1].name)
				this.city_name = e.item[1].name
				this.$nextTick(()=>{
					this.page = 1
					this.getClub()
				})
			},
			pic(){
				this.$refs.picker.show()
			},
			classifyChange(ind,id){
				uni.pageScrollTo({
					scrollTop:0
				})
				setTimeout(()=>{
					this.n = ind
					this.page = 1 
					this.getActivity()
				}, 200);
				
				
			},
			getActivity () {
			  if (this.n === 0) {
			    this.getStage()
			  } else if (this.n === 1) {
			    this.getClub()
			    this.getCity()
			  }
			},
			getStage(){
				this.$api.activity_public_list({
				  token: uni.getStorageSync("token"),
				  user_id: uni.getStorageSync("userId"),
				  page: this.page
				}).then(res => {
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.page===1){
							
							this.hotList = res.data.data
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle =false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle = true
							}
						}else{
							this.hotList = this.hotList.concat(res.data.data)
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle =false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle = true
							}
						}
						
						for (let j = 0; j < this.hotList.length; j++) {
						  if (new Date(this.hotList[j].finish_date.replace(/-/g, '/')).getTime() > this.time) { // 结束时间大于当前时间
						    this.hotList[j].state = true
						  } else {
						    this.hotList[j].state = false
						  }
						}
						
					}
				})
			},
			getClub(){
				this.$api.activity_private_list({
				  token: uni.getStorageSync("token"),
				  user_id: uni.getStorageSync("userId"),
				  page: this.page,
				  city_name:this.city_name == '全部'?'':this.city_name
				}).then(res => {
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.page===1){
							
							this.hotList = res.data.data
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle =false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle =true
							}
						}else{
							this.hotList = this.hotList.concat(res.data.data)
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle =false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle =true
							}
						}
						
						for (let j = 0; j < this.hotList.length; j++) {
						  if (new Date(this.hotList[j].finish_date.replace(/-/g, '/')).getTime() > this.time) { // 结束时间大于当前时间
						    this.hotList[j].state = true
						  } else {
						    this.hotList[j].state = false
						  }
						}
						
					}
				})
			},
			getCity () {
			  this.$api.city_choose().then(res => {
			    if (res.data.code === '200') {
					// console.log(res)
			      this.inside_list = res.data.data.cn
			      this.outside_list = res.data.data.other
			      let country = new Array(1)
			      country[0] = ({name: '全部',child: [{name: '全部'}]})
			      country[1] = ({name: '国内', child: this.inside_list})
			      country[2] = ({name: '国外', child: this.outside_list})
			      this.countryList = country
			      // console.log(this.countryList)
			      // if (this.countryList) {
			      //   this.myAddressSlots[0].values = this.getProvinceArr()
			      //   this.myAddressSlots[2].values = this.getCityArr('全部')
			      // }
			    }
			  })
			}
		}
	}
</script>

<style>
	@import url("../../pagesMy/SmallStretch/SmallStretch.css");
	.astatus{
		width: 44px;
		height: 24px;
		font-size: 12px;
		line-height: 24px;
		text-align: center;
		color: #fff;
		position: absolute;
		right: 3%;
		top: 0;
	}
</style>
