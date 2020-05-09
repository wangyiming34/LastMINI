<template>
	<view class="LuDingJi-wrap" >
		<!-- 头部选项卡 -->
		<view class="LuDingJi-head flex border-bottom-new2 align-center">
			<view style="width: 660upx;">
				<scroll-view  scroll-x="true"  style="width: 100%;height: 44px;overflow: hidden;white-space: nowrap;">
						<view v-for="(item,index) in tablist" :key="index" class="re" :class="index===n?'LuDingJiActive':''" @click="tab(index)" style="padding: 0 10px;height: 100%;display: inline-block;line-height: 44px;">
							{{item}}
						</view>
				</scroll-view>
			</view>
			

			<view class="LuDingJi-search" @click.stop="search">
				<van-icon name="search" size="22px" style="margin: 0 auto;"/>
			</view>
		</view>
		<!-- 内容列表 -->
		<view class="LuDingJi-swiper-wrap">
			<!-- 第一界面推荐 -->
			<view class="LuDingJi-swiper" v-show="n===0">
				<view class="LuDingJi-swiper-for" v-if="list1.length>0">
					<view v-for="(item1,index1) in list1" :key="index1" class="re border-bottom-new2 LuDingJi-swiper-xunhuan">
						<!-- 头像和公司 -->
						<view class="LuDingJi-swiper-top flex" @click.stop="MyInfo(item1.user_id)">
							<view class="LuDingJi-swiper-avatar">
								<image :src="item1.avatar?item1.avatar:'../../static/img/user_icon.png'" lazy-load="true" ></image>
							</view>
							<view class="LuDingJi-swiper-name">
								<text>{{item1.nickname}}</text>
								<text v-if="item1.job"> I </text>
								<text v-if="item1.job">{{item1.job}}</text>
							</view>
						</view>
						
						<!-- 项目简介和图片 -->
						<view class="LuDingJi-swiper-bottom flex" @click.stop="LuDetails(item1.id)">
							<view class="LuDingJi-swiper-left">
								<view class="LuDingJi-swiper-title">
									{{item1.title}}
								</view>
								<view v-if ="item1.company===null||item1.company===''|| item1.company=== undefined">
								
								</view>
								<view class="LuDingJi-swiper-company" v-else>
									<view >{{item1.company}}</view>
									<!-- <view v-if="item1.company.length>=11">{{item1.company.substr(0,8)}}...{{item1.company.substr(item1.company.length-4)}}</view> -->
								</view>
							</view>
							
							<view class="LuDingJi-swiper-right">
								<image :src="item1.path" lazy-load="true"></image>
							</view>
							
						</view>
						
						
					</view>
				</view>
				
				<view class="LuDingJi-no" v-else>
					<view class="LuDingJi-icon1">
						<image src="https://web.detion.com/static/img/empty_information.png" lazy-load="true" class="imga" mode="aspectFill"></image>
					</view>
					<view class="LuDingJi-no-con">
						暂无数据
					</view>
				</view>
				<view  class="noMore1" v-if="showTitle1&&list1.length>0">
						暂无更多内容
				</view>
				<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingOne">
					 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
				</view>
			</view>
			<!-- 第二界面国内 -->
			<view class="LuDingJi-swiper" v-show="n===1">
				<view class="LuDingJi-swiper-for" v-if="list2.length>0">
					<view v-for="(item2,index2) in list2" :key="index2" class="re border-bottom-new2 LuDingJi-swiper-xunhuan1">
						<view class="m-tuijian" @click.stop="LuDetails(item2.id)">
							  <view class="m-tui-ranking">
									<view v-if="index2<3" style="width: 41upx;height:52upx">
										<image :src="index2==0?oneImg:index2==1?twoImg:index2==2?threeImg:''" lazy-load="true" ></image>
									</view>
									
									<view class="ranking-title" v-else>
									  {{index2 > 8 ?index2+1 :'0'+(index2+1)}}
									</view>
							  </view>
							  <view class="m-tui-img">
								<image :src="item2.path?item2.path:'../../static/img/logo.png'" lazy-load="true" ></image>
							  </view>
							  <view class="m-tui-content">
								<view>
										  {{item2.title}}
								</view>

								<view class="m-vote">
									 <view class="m-china-popul">
									   当前人气 : <text>{{item2.vote}}</text>
									 </view>
									 <view class="m-china-vote" :style="item2.vote_status?voteBack:voteCcc" @click.stop="voteCom(item2)">
									   {{item2.vote_status?'投票':'已投票'}}
									 </view>
								</view>

								<view class="m-tui-person" @click.stop="MyInfo(item2.user_id)">
									<view>
									  <image :src="item2.avatar?item2.avatar:'../../static/img/user_icon.png'" lazy-load="true" ></image>
									</view>
									<view  id="abc">
									  {{item2.nickname}}<text v-show="item2.company">|</text>
									  <text v-show="item2.company">{{item2.company}}</text><text v-show="item2.job">·</text>
									  <text v-show="item2.job">{{item2.job}}</text>
									</view>
								</view>
							</view>
						</view>
						
						
						
						
					</view>
				</view>
				
				<view class="LuDingJi-no" v-else>
					<view class="LuDingJi-icon1">
						<image src="https://web.detion.com/static/img/empty_information.png" lazy-load="true" class="imga" mode="aspectFill"></image>
					</view>
					<view class="LuDingJi-no-con">
						暂无数据
					</view>
				</view>
				<view  class="noMore1" v-if="showTitle2&&list2.length>0">
						暂无更多内容
				</view>
				<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingTwo">
					 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
				</view>
			</view>
			<!-- 第三界面海外 -->
			<view class="LuDingJi-swiper" v-show="n===2">
				<view class="LuDingJi-swiper-for" v-if="list3.length>0">
					<view v-for="(item3,index3) in list3" :key="index3" class="re border-bottom-new2 LuDingJi-swiper-xunhuan">
						<!-- 头像和公司 -->
						<view class="LuDingJi-swiper-top flex" @click.stop="MyInfo(item3.user_id)">
							<view class="LuDingJi-swiper-avatar">
								<image :src="item3.avatar?item3.avatar:'../../static/img/user_icon.png'" lazy-load="true" ></image>
							</view>
							<view class="LuDingJi-swiper-name">
								<text>{{item3.nickname}}</text>
								<text v-if="item3.job"> I </text>
								<text v-if="item3.job">{{item3.job}}</text>
							</view>
						</view>
						
						<!-- 项目简介和图片 -->
						<view class="LuDingJi-swiper-bottom flex" @click.stop="LuDetails(item3.id)">
							<view class="LuDingJi-swiper-left">
								<view class="LuDingJi-swiper-title">
									{{item3.title}}
								</view>
								<view v-if ="item3.company===null||item3.company===''|| item3.company=== undefined">
								
								</view>
								<view class="LuDingJi-swiper-company" v-else>
									<view >{{item3.company}}</view>
									<!-- <view v-if="item1.company.length>=11">{{item1.company.substr(0,8)}}...{{item1.company.substr(item1.company.length-4)}}</view> -->
								</view>
							</view>
							
							<view class="LuDingJi-swiper-right">
								<image :src="item3.path" lazy-load="true"></image>
							</view>
							
						</view>
						
						
					</view>
				</view>
				
				<view class="LuDingJi-no" v-else>
					<view class="LuDingJi-icon1">
						<image src="https://web.detion.com/static/img/empty_information.png" lazy-load="true" class="imga" mode="aspectFill"></image>
					</view>
					<view class="LuDingJi-no-con">
						暂无数据
					</view>
				</view>
				<view  class="noMore1" v-if="showTitle3&&list3.length>0">
						暂无更多内容
				</view>
				<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingThree">
					 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
				</view>
			</view>
			<!-- 第四界面招商引资 -->
			<view class="LuDingJi-swiper" v-show="n===3">
				<view class="LuDingJi-swiper-for" v-if="list4.length>0">
					<view v-for="(item4,index4) in list4" :key="index4" class="re border-bottom-new2 LuDingJi-swiper-xunhuan">
						<!-- 头像和公司 -->
						<view class="LuDingJi-swiper-top flex" @click.stop="MyInfo(item4.user_id)">
							<view class="LuDingJi-swiper-avatar">
								<image :src="item4.avatar?item4.avatar:'../../static/img/user_icon.png'" lazy-load="true" ></image>
							</view>
							<view class="LuDingJi-swiper-name">
								<text>{{item4.nickname}}</text>
								<text v-if="item4.job"> I </text>
								<text v-if="item4.job">{{item4.job}}</text>
							</view>
						</view>
						
						<!-- 项目简介和图片 -->
						<view class="LuDingJi-swiper-bottom flex" @click.stop="LuDetails(item4.id)">
							<view class="LuDingJi-swiper-left">
								<view class="LuDingJi-swiper-title">
									{{item4.title}}
								</view>
								<view v-if ="item4.company===null||item4.company===''|| item4.company=== undefined">
								
								</view>
								<view class="LuDingJi-swiper-company" v-else>
									<view >{{item4.company}}</view>
									<!-- <view v-if="item1.company.length>=11">{{item1.company.substr(0,8)}}...{{item1.company.substr(item1.company.length-4)}}</view> -->
								</view>
							</view>
							
							<view class="LuDingJi-swiper-right">
								<image :src="item4.path" lazy-load="true"></image>
							</view>
							
						</view>
						
						
					</view>
				</view>
				
				<view class="LuDingJi-no" v-else>
					<view class="LuDingJi-icon1">
						<image src="https://web.detion.com/static/img/empty_information.png" lazy-load="true" class="imga" mode="aspectFill"></image>
					</view>
					<view class="LuDingJi-no-con">
						暂无数据
					</view>
				</view>
				<view  class="noMore1" v-if="showTitle4&&list4.length>0">
						暂无更多内容
				</view>
				<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingFour">
					 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
				</view>
			</view>
			
			<!-- 第五界面精准扶贫 -->
			<view class="LuDingJi-swiper" v-show="n===4">
				<view class="LuDingJi-swiper-for" v-if="list5.length>0">
					<view v-for="(item4,index4) in list5" :key="index4" class="re border-bottom-new2 LuDingJi-swiper-xunhuan">
						<!-- 头像和公司 -->
						<view class="LuDingJi-swiper-top flex" @click.stop="MyInfo(item4.user_id)">
							<view class="LuDingJi-swiper-avatar">
								<image :src="item4.avatar?item4.avatar:'../../static/img/user_icon.png'" lazy-load="true" ></image>
							</view>
							<view class="LuDingJi-swiper-name">
								<text>{{item4.nickname}}</text>
								<text v-if="item4.job"> I </text>
								<text v-if="item4.job">{{item4.job}}</text>
							</view>
						</view>
						
						<!-- 项目简介和图片 -->
						<view class="LuDingJi-swiper-bottom flex" @click.stop="LuDetails(item4.id)">
							<view class="LuDingJi-swiper-left">
								<view class="LuDingJi-swiper-title">
									{{item4.title}}
								</view>
								<view v-if ="item4.company===null||item4.company===''|| item4.company=== undefined">
								
								</view>
								<view class="LuDingJi-swiper-company" v-else>
									<view >{{item4.company}}</view>
									<!-- <view v-if="item1.company.length>=11">{{item1.company.substr(0,8)}}...{{item1.company.substr(item1.company.length-4)}}</view> -->
								</view>
							</view>
							
							<view class="LuDingJi-swiper-right">
								<image :src="item4.path" lazy-load="true"></image>
							</view>
							
						</view>
						
						
					</view>
				</view>
				
				<view class="LuDingJi-no" v-else>
					<view class="LuDingJi-icon1">
						<image src="https://web.detion.com/static/img/empty_information.png" lazy-load="true" class="imga" mode="aspectFill"></image>
					</view>
					<view class="LuDingJi-no-con">
						暂无数据
					</view>
				</view>
				<view  class="noMore1" v-if="showTitle5&&list5.length>0">
						暂无更多内容
				</view>
				<view style="height: 88upx;display: flex;  width: 100%;" v-if="loadingFive">
					 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	var app = getApp().globalData
	export default {
		data() {
			return {
				oneImg: 'https://web.detion.com/static/images/one.png',
				twoImg: 'https://web.detion.com/static/images/two.png',
				threeImg: 'https://web.detion.com/static/images/three.png',
				vote: '投票',
			    voteBack: 'background:rgba(6,77,197,1)',
			    voteCcc: 'background:#ccc',
				tablist:['推荐', '国内专栏', '海外专栏', '招商引资','精准扶贫'],
				n:0,
				page1:1,
				list1:[],
				page2:1,
				list2:[],
				page3:1,
				list3:[],
				page4:1,
				list4:[],
				page5:1,
				list5:[],
				loadingOne:false,
				loadingTwo:false,
				loadingThree:false,
				loadingFour:false,
				loadingFive:false,
				allowOne:false,
				allowTwo:false,
				allowThree:false,
				allowFour:false,
				allowFive:false,
				scrollTop1:0,
				scrollTop2:0,
				scrollTop3:0,
				scrollTop4:0,
				scrollTop5:0,
				showTitle1:false,
				showTitle2:false,
				showTitle3:false,
				showTitle4:false,
				showTitle5:false
			}
		},
		onLoad(e) {
			this.getData1()
			this.getData2()
			this.getData3()
			this.getData4()
			this.getData5()
			// uni.clearStorageSync('ludingji')
			uni.removeStorageSync('ludingji')
		},
		onShareAppMessage:function(res) {
			return {
			  title: '路顶记',
			  imageUrl:app.shareImg,
			  path: 'pagesMy/LuDingJi/LuDingJi'
			}
		},
		onShow() {
			if(this.n == 1 && uni.getStorageSync('ludingji')){
				var lId = uni.getStorageSync('ludingji')
				for (var val of this.list2){
					if(val.id == lId){
						val.vote++
						val.vote_status = false
						uni.removeStorageSync('ludingji')
					}
				}
			}else{
				uni.removeStorageSync('ludingji')
			}
		},
		// 监听界面滚动
		onPageScroll(e) {
			// console.log(e.scrollTop)
			if(this.n === 0){
				this.scrollTop1 = e.scrollTop
			}
			if(this.n === 1){
				this.scrollTop2 = e.scrollTop
			}
			if(this.n === 2){
				this.scrollTop3 = e.scrollTop
			}
			if(this.n === 3){
				this.scrollTop4 = e.scrollTop
			}
			if(this.n === 4){
				this.scrollTop5 = e.scrollTop
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
				if(this.n === 0){
					this.page1 = 1
					this.getData1()
					setTimeout(function () {
					    uni.stopPullDownRefresh();
						uni.showToast({
						    title: '刷新成功',
						    duration: 1000,
							icon:'none'
						});
					}, 1000);
					
				}
				
				if(this.n === 1){
					this.page2 = 1
					this.getData2()
					setTimeout(function () {
					    uni.stopPullDownRefresh();
						uni.showToast({
						    title: '刷新成功',
						    duration: 1000,
							icon:'none'
						});
					}, 1000);
					
				}
				
				if(this.n === 2){
					this.page3 = 1
					this.getData3()
					setTimeout(function () {
					    uni.stopPullDownRefresh();
						uni.showToast({
						    title: '刷新成功',
						    duration: 1000,
							icon:'none'
						});
					}, 1000);
					
				}
				
				if(this.n === 3){
					this.page4 = 1
					this.getData4()
					setTimeout(function () {
					    uni.stopPullDownRefresh();
						uni.showToast({
						    title: '刷新成功',
						    duration: 1000,
							icon:'none'
						});
					}, 1000);
					
				}
				
				if(this.n === 4){
					this.page5 = 1
					this.getData5()
					setTimeout(function () {
					    uni.stopPullDownRefresh();
						uni.showToast({
						    title: '刷新成功',
						    duration: 1000,
							icon:'none'
						});
					}, 1000);
					
				}
				
		        
		},
		// 上拉加载更多
		onReachBottom(){
			// 第一页的上拉加载
			if(this.n ===0 && this.allowOne){
				this.allowOne = false
				this.loadingOne = true
				this.page1++
				this.getData1()
				// setTimeout(() => {
				//         this.page1++
				//         this.getData1()
				// 		uni.showToast({
				// 		    title: '加载成功',
				// 		    duration: 1000,
				// 			icon:'none'
				// 		});
				//       }, 1500)	
			}
			
			if(this.n ===1 && this.allowTwo){
				this.allowTwo = false
				this.loadingTwo = true
				this.page2++
				this.getData2()
				// setTimeout(() => {
				//         this.page2++
				//         this.getData2()
				// 		uni.showToast({
				// 		    title: '加载成功',
				// 		    duration: 1000,
				// 			icon:'none'
				// 		});
				//       }, 1500)	
			}
			
			if(this.n ===2 && this.allowThree){
				this.allowThree = false
				this.loadingThree = true
				this.page3++
				this.getData3()
				// setTimeout(() => {
				//         this.page3++
				//         this.getData3()
				// 		uni.showToast({
				// 		    title: '加载成功',
				// 		    duration: 1000,
				// 			icon:'none'
				// 		});
				//       }, 1500)	
			}
			
			if(this.n ===3 && this.allowFour){
				this.allowFour = false
				this.loadingFour = true
				this.page4++
				this.getData4()
				// setTimeout(() => {
				//         this.page4++
				//         this.getData4()
				// 		uni.showToast({
				// 		    title: '加载成功',
				// 		    duration: 1000,
				// 			icon:'none'
				// 		});
				//       }, 1500)	
			}
			
			if(this.n ===4 && this.allowFive){
				this.allowFive = false
				this.loadingFive = true
				this.page5++
				this.getData5()
				// setTimeout(() => {
				//         this.page5++
				//         this.getData5()
				// 		uni.showToast({
				// 		    title: '加载成功',
				// 		    duration: 1000,
				// 			icon:'none'
				// 		});
				//       }, 1500)	
			}
		},
		methods: {
			search(){
				uni.navigateTo({
					url:'../../pagesMy/Search/Search'
				})
			},
			// 投票
			voteCom(item){
				if(item.vote_status){
					item.vote_status = false
					item.vote++
					this.$api.LuDingJiVote({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						id:item.id
					}).then(res=>{
						uni.showToast({
						    title: res.data.msg,
						    duration: 1000,
							icon:'none'
						});
					})
				}else{
					uni.showToast({
					    title: '每天只能投一票哦！',
					    duration: 1000,
						icon:'none'
					});
				}
			},
			// 跳转路顶记详情
			LuDetails(id){
				uni.navigateTo({
					url:'../../pagesMy/LuDingJiDetails/LuDingJiDetails?id='+id
				})
			},
			// 跳转个人主页
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			tab(ind){
				this.n = ind
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 0
				});
				
			},
			getData1(){
				this.$api.NewsRoadShowsProject({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type:1,
					page:this.page1
				}).then(res=>{
					if(res.data.code === '200'){
						if(this.page1 === 1){
							if(res.data.data.length>=20){
								this.list1 = res.data.data
								this.allowOne = true
								this.loadingOne = false
							}else{
								this.list1 = res.data.data
								this.allowOne = false
								this.loadingOne = false
								this.showTitle1 = true
							}														
						}else{
							if(res.data.data.length>=20){
								this.list1 = this.list1.concat(res.data.data)
								this.allowOne = true
								this.loadingOne = false
							}else{
								this.list1 = this.list1.concat(res.data.data)
								this.allowOne = false
								this.loadingOne = false
								this.showTitle1 = true
							}	
						}
							
						
					}
					
				})
			},
			getData2(){
				this.$api.NewsRoadShowsProject({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type:2,
					page:this.page2
				}).then(res=>{
					if(res.data.code === '200'){
						if(this.page2 === 1){
							if(res.data.data.length>=20){
								this.list2 = res.data.data
								this.allowTwo = true
								this.loadingTwo = false
							}else{
								this.list2 = res.data.data
								this.allowTwo = false
								this.loadingTwo = false
								this.showTitle2 = true
							}														
						}else{
							if(res.data.data.length>=20){
								this.list2 = this.list2.concat(res.data.data)
								this.allowTwo = true
								this.loadingTwo = false
							}else{
								this.list2 = this.list2.concat(res.data.data)
								this.allowTwo = false
								this.loadingTwo = false
								this.showTitle2 = true
							}	
						}
							
						
					}
				})
			},
			getData3(){
				this.$api.NewsRoadShowsProject({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type:3,
					page:this.page3
				}).then(res=>{
					if(res.data.code === '200'){
						if(this.page3 === 1){
							if(res.data.data.length>=20){
								this.list3 = res.data.data
								this.allowThree = true
								this.loadingThree = false
							}else{
								this.list3 = res.data.data
								this.allowThree = false
								this.loadingThree = false
								this.showTitle3 = true
							}														
						}else{
							if(res.data.data.length>=20){
								this.list3 = this.list3.concat(res.data.data)
								this.allowThree = true
								this.loadingThree = false
							}else{
								this.list3 = this.list3.concat(res.data.data)
								this.allowThree = false
								this.loadingThree = false
								this.showTitle3 = true
							}	
						}
							
						
					}
				})
			},
			getData4(){
				this.$api.NewsRoadShowsProject({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type:4,
					page:this.page4
				}).then(res=>{
					if(res.data.code === '200'){
						if(this.page4 === 1){
							if(res.data.data.length>=20){
								this.list4 = res.data.data
								this.allowFour = true
								this.loadingFour = false
							}else{
								this.list4 = res.data.data
								this.allowFour = false
								this.loadingFour = false
								this.showTitle4 = true
							}														
						}else{
							if(res.data.data.length>=20){
								this.list4 = this.list4.concat(res.data.data)
								this.allowFour = true
								this.loadingFour = false
							}else{
								this.list4 = this.list4.concat(res.data.data)
								this.allowFour = false
								this.loadingFour = false
								this.showTitle4 = true
							}	
						}
							
						
					}
				})
			},
			getData5(){
				this.$api.NewsRoadShowsProject({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type:5,
					page:this.page5
				}).then(res=>{
					if(res.data.code === '200'){
						if(this.page5 === 1){
							if(res.data.data.length>=20){
								this.list5 = res.data.data
								this.allowFive = true
								this.loadingFive = false
							}else{
								this.list5 = res.data.data
								this.allowFive = false
								this.loadingFive = false
								this.showTitle5 = true
							}														
						}else{
							if(res.data.data.length>=20){
								this.list5 = this.list5.concat(res.data.data)
								this.allowFive = true
								this.loadingFive = false
							}else{
								this.list5 = this.list5.concat(res.data.data)
								this.allowFive = false
								this.loadingFive = false
								this.showTitle5 = true
							}	
						}
							
						
					}
				})
			}
		}
	}
</script>

<style>
	@import url("./LuDingJi.css");
</style>
