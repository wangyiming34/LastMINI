<template>
	<view style="padding: 30px 31upx 0;">
		<view class="search-fix">
			<van-search
			  :value="value"
			  placeholder="请输入搜索关键词"
			  show-action
			  @change="onChange"
			  @cancel="onCancel"
			/>
			
			
		</view>
		
		<view class="every " v-if="!value">
			<view class="every-title">
				大家都在搜
			</view>
			<view class="flex align-center" style="flex-wrap: wrap;">
				<view class="everybody" v-for="(item,index) in hot_search" :key="index" @click="hot(item.search_key)">
					{{item.search_key}}
				</view>
			</view>
			
		</view>
		
		<view class="tab" v-else>
			<view class="tab-list flex justify-between align-center">
				<view v-for="(item,index) in dataList" :key="index" class="tab-content" :class="{tabActive:index===n}" @click="tab(index)">
					{{item}}
				</view>
			</view>
			
			<!-- 全部 -->
			<view class="globalList" v-show="n===0">
				<view class="" v-if="globalList.length>0">
					<view v-for="(item1,index1) in globalList" :key="index1" class="globalList-global flex" @click.stop="MyInfo(item1.user_id)">
						<view class="globalList-left re">
							<image :src="item1.avatar?item1.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item1.type" :v_type="item1.add_v_type"></head-logo>
						</view>
						
						<view class="globalList-right" style="flex: 1;">
							<view class="flex align-center" style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);">
								<!-- {{item1.nickname}} -->
								<view class="newName">
									{{item1.nickname}}
								</view>
								<level :type="item1.type" :v_type="item1.add_v_type" :vip_level="item1.vip_level"></level>
							</view>
							
							<view v-for="(item2,index2) in item1.club_data" :key="index2" class="flex" style="overflow:hidden ;margin: 3px 0;" v-show="item1.club_data.length>0">
								<view style="flex: 1; font-size:14px;font-weight:400;color:rgba(153,153,153,1);">
									{{item2.name}}{{item2.dutyname}}
								</view>
								<van-icon name="arrow" v-if="index2<1" style="align-self: flex-start;color:rgba(153,153,153,1);font-size: 12px;margin-top: 6upx;"/>
							</view>
							<view style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);">
								<text v-if="item1.job">{{item1.job}}</text><text v-if="item1.company"> I </text><text v-if="item1.company">{{item1.company}}</text>
							</view>
							
							<view class="globalList-right-content1" v-if="item1.description">
								<view class="globalList-right-content">
									{{item1.description}}
								</view>
							</view>
						</view>
					</view>
				</view>
				
				
				<view class="flex align-center justify-center flex-d"  style="width: 100%;height: 600upx; background-color: white;" v-if="globalList.length==0">
					  <!-- <van-icon name="failure" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/> -->
					  <van-icon name="graphic" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/>
					  <view class="text">暂无搜索内容</view>	
				</view>
				
			</view>
			
			<!-- 人脉 -->
			<view class="globalList" v-show="n===1">
				<view v-if="personList.length>0">
					<view v-for="(item1,index1) in personList" :key="index1" class="globalList-global flex" style="margin-bottom: 40upx;" @click.stop="MyInfo(item1.user_id)">
						<view class="globalList-left re">
							<image :src="item1.avatar?item1.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item1.type" :v_type="item1.add_v_type"></head-logo>
						</view>
						
						<view class="globalList-right border-bottom-new2" style="flex: 1;padding: 0 0 25px;">
							<view style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);" v-if="item1.nickname.toLowerCase().indexOf(value.toLowerCase())!= -1">
								<text >{{item1.nickname.slice(0,item1.nickname.toLowerCase().indexOf(value.toLowerCase()))}}</text>
								<text style="color:#2A70FE">{{item1.nickname.slice(item1.nickname.toLowerCase().indexOf(value.toLowerCase()),
								item1.nickname.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
								<text>{{item1.nickname.substr(item1.nickname.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
							</view>
							
							<view style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);" v-else class="flex align-center">
								{{item1.nickname}}
							</view>
							
							<view v-for="(item2,index2) in item1.club_data" :key="index2" class="flex" style="overflow:hidden ;margin: 3px 0;" v-show="item1.club_data.length>0">
								<view style="flex: 1; font-size:14px;font-weight:400;color:rgba(153,153,153,1);">
									{{item2.name}}{{item2.dutyname}}
								</view>
								<van-icon name="arrow" v-if="index2<1" style="align-self: flex-start;color:rgba(153,153,153,1);font-size: 12px;margin-top: 6upx;"/>
							</view>
							<view style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);">
								<text v-if="item1.job">{{item1.job}}</text><text v-if="item1.company"> I </text><text v-if="item1.company">{{item1.company}}</text>
							</view>
						</view>
					</view>
					
					<!-- 上拉加载 -->
					<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingPerson">
						   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
					</view>
				</view>
				
				<view  class="noMore1" v-if="showTitle1&&personList.length>0">
						暂无更多内容
				</view>
				<view class="flex align-center justify-center flex-d"  style="width: 100%;height: 600upx; background-color: white;" v-if="personList.length==0">
					  <!-- <van-icon name="failure" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/> -->
					  <van-icon name="graphic" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/>
					  <view class="text">暂无搜索内容</view>	
				</view>
				
			</view>
		
			<!-- 资讯 -->
			<view class="globalList" v-show="n===2">
				<view class="" v-if="informationList.length>0">
					<view v-for="(item1,index1) in informationList" :key="index1" class="globalList-global flex border-bottom-new2" style="margin-bottom: 40upx;padding-bottom: 40upx;" @click.stop="imdetail(item1.id)">

							<view style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);flex: 1; margin-right: 15px;" class="lefttitle" v-if="item1.title.toLowerCase().indexOf(value.toLowerCase())!= -1">
								<!-- <text>{{item1.title}}</text>
								<text>{{value}}</text> -->
								<text>{{item1.title.slice(0,item1.title.toLowerCase().indexOf(value.toLowerCase()))}}</text>
								<text style="color:#2A70FE">{{item1.title.slice(item1.title.toLowerCase().indexOf(value.toLowerCase()),
								item1.title.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
								<text>{{item1.title.substr(item1.title.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
							</view>
							
							<view style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);flex: 1; margin-right: 15px;" class="lefttitle" v-else>
								{{item1.title}}
							</view>
							<view style="width:109px;height:78px;" v-if="item1.img">
								<image :src="item1.img" lazy-load="true" class="imga" mode="aspectFill" style="height: 100%;width: 100%;"></image>
							</view>
					</view>
					
					<!-- 上拉加载 -->
					<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingInformation">
						   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
					</view>
				</view>
				
				<view  class="noMore1" v-if="showTitle2&&informationList.length>0">
						暂无更多内容
				</view>
				<view class="flex align-center justify-center flex-d"  style="width: 100%;height: 600upx; background-color: white;" v-if="informationList.length==0">
					  <!-- <van-icon name="failure" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/> -->
					  <van-icon name="graphic" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/>
					  <view class="text">暂无搜索内容</view>	
				</view>
				
			</view>
						
			<!-- 路顶记 -->
			<view class="globalList" v-show="n===3">
				<view class="" v-if="luList.length>0">
					<view v-for="(item1,index1) in luList" :key="index1" class="globalList-global border-bottom-new2" style="margin-bottom: 40upx;padding-bottom: 40upx;" @click.stop="LuDingJiDetails(item1.id)">		
					
							<!-- 项目简介和图片 -->
							<view class="LuDingJi-swiper-bottom flex">
								<view class="LuDingJi-swiper-left">
									<view class="LuDingJi-swiper-title" v-if="item1.title.toLowerCase().indexOf(value.toLowerCase())!= -1">
										<text>{{item1.title.slice(0,item1.title.toLowerCase().indexOf(value.toLowerCase()))}}</text>
										<text style="color:#2A70FE">{{item1.title.slice(item1.title.toLowerCase().indexOf(value.toLowerCase()),
										item1.title.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
										<text>{{item1.title.substr(item1.title.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
									</view>
									
									<view class="LuDingJi-swiper-title" v-else>
										{{item1.title}}
									</view>
									
									<view v-if ="item1.company===null||item1.company===''|| item1.company=== undefined" class="LuDingJi-swiper-company" @click.stop="MyInfo(item1.user_id)">
										<view class="">
											{{item1.nickname}}
										</view>
									</view>
									<view class="LuDingJi-swiper-company" v-else @click.stop="MyInfo(item1.user_id)">
										<view >{{item1.nickname}} <text style="margin: 0 4px;"> I </text> {{item1.company}}</view>
									</view>
								</view>
								
								<view class="LuDingJi-swiper-right">
									<image :src="item1.path" lazy-load="true"></image>
								</view>
								
							</view>
							
					</view>
					
					<!-- 上拉加载 -->
					<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingLu">
						   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
					</view>
				</view>
				
				<view  class="noMore1" v-if="showTitle3&&luList.length>0">
						暂无更多内容
				</view>
				<view class="flex align-center justify-center flex-d"  style="width: 100%;height: 600upx; background-color: white;" v-if="luList.length==0">
					  <!-- <van-icon name="failure" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/> -->
					  <van-icon name="graphic" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/>
					  <view class="text">暂无搜索内容</view>	
				</view>
				
			</view>
			
			<!-- 小申展 -->
			<view class="globalList" v-show="n===4">
				<view class="" v-if="xiaoList.length>0">
					<view v-for="(item1,index1) in xiaoList" :key="index1" class="juhuasuan-loadmore-con" style="margin-bottom: 30upx;" @click.stop="SmallStretchPvw(item1.id)">
							<view class="juhuasuan-con border-bottom">
								  <view class="juhuasuan-con-img re" v-if="item1.images">
									<image :src="item1.images[0].url_image" lazy-load="true"  mode="aspectFill"></image>
									<view style="width:45px;height:18px;background:rgba(0,0,0,0.6);border-radius:1px 0px 1px 0px;position: absolute;left: 0;bottom: 0;z-index: 8;line-height: 18px;text-align: center;font-weight:500;color:rgba(255,255,255,1);font-size: 12px;">
										{{item1.is_high_quality===1?'友好物':'聚划算'}}
									</view>
								  </view>
								 <view>
									<view class="juhuasuan-con-title" v-if="item1.name.toLowerCase().indexOf(value.toLowerCase())!= -1">
									    <text>{{item1.name.slice(0,item1.name.toLowerCase().indexOf(value.toLowerCase()))}}</text>
									    <text style="color:#2A70FE">{{item1.name.slice(item1.name.toLowerCase().indexOf(value.toLowerCase()),
									    item1.name.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
									    <text>{{item1.name.substr(item1.name.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
									</view>
									<view class="juhuasuan-con-title" v-else>{{item1.name}}</view>
									<view class="juhuasuan-con-tap">
									  <view class="juhuasuan-con-zhekou">
										<image src="https://web.detion.com/static/images/youhui.png" lazy-load="true"  mode="aspectFill"></image>
										<view>{{parseInt(item1.current_price/item1.original_price*10*10)/10}}折</view>
									  </view>
		
									  <text v-if="n===0 && item1.cate_name" class="juhuasuan-con-biaoqian">
										  {{item1.cate_name}}
									  </text>
									</view>
									<view class="juhuasuan-con-price">
										<text>¥{{item1.current_price.split('.')[0]}}.</text>
										<text>{{item1.current_price.split('.')[1]}}</text>
										<text>¥{{item1.original_price}}</text>
									</view>
								 </view>
							 </view>
					</view>
					
					<!-- 上拉加载 -->
					<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingXiao">
						   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
					</view>
				</view>
				
				<view  class="noMore1" v-if="showTitle4&&xiaoList.length>0">
						暂无更多内容
				</view>
				<view class="flex align-center justify-center flex-d"  style="width: 100%;height: 600upx; background-color: white;" v-if="xiaoList.length==0">
					  <!-- <van-icon name="failure" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/> -->
					  <van-icon name="graphic" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/>
					  <view class="text">暂无搜索内容</view>	
				</view>
				
			</view>
			
			<!-- 会友汇项目机会 -->
			<view class="globalList" v-show="n===5">
				<view class="" v-if="huiList.length>0">
					<view v-for="(item1,index1) in huiList" :key="index1" class="globalList-global flex border-bottom-new2 align-center" style="margin-bottom: 40upx;padding-bottom: 40upx;" @click.stop="InformationDetail(item1.id)">
							<view style="flex: 1;">
								<view style="font-size:15px;font-weight:400;color:#333333; margin-right: 15px;" class="lefttitle" v-if="item1.title.toLowerCase().indexOf(value.toLowerCase())!= -1">
									<text style="margin-right: 3px;font-weight:400;color:rgba(255,255,255,1);font-size: 12px;padding: 0px 5px;background:rgba(252,189,59,1);border-radius:2px;" v-if="item1.type == 1||item1.type == 2">
										{{item1.type == 1 ? '合作':item1.type == 2 ?'资源':''}}
									</text>
									<text>{{item1.title.slice(0,item1.title.toLowerCase().indexOf(value.toLowerCase()))}}</text>
									<text style="color:#2A70FE">{{item1.title.slice(item1.title.toLowerCase().indexOf(value.toLowerCase()),
									item1.title.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
									<text>{{item1.title.substr(item1.title.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</text>
								</view>
								
								<view style="font-size:15px;font-weight:400;color:#333333; margin-right: 15px;" class="lefttitle" v-else>
									<text style="margin-right: 3px;font-weight:400;color:rgba(255,255,255,1);font-size: 12px;padding: 0px 5px;background:rgba(252,189,59,1);border-radius:2px;" v-if="item1.type == 1||item1.type == 2">			  
									{{item1.type == 1 ? '合作':item1.type == 2 ?'资源':''}}
										<!-- {{item1.type == 0 ? '合作':'资源'}} -->
									</text>
									{{item1.title}}
								</view>
								
								<view class="huititle" @click.stop="MyInfo(item1.user_id)">
									<text>{{item1.nickname}}</text><text style="margin: 0 5px;" v-if="item1.company"> I </text><text v-if="item1.company">{{item1.company}}</text>
								</view>
							</view>
							
							<view style="width:160upx;height:125upx;" v-if="item1.images[0].url_image">
								<image :src="item1.images[0].url_image" lazy-load="true" class="imga" mode="aspectFill" style="height: 100%;width: 100%;"></image>
							</view>
					</view>
					
					<!-- 上拉加载 -->
					<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingHui">
						   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
					</view>
				</view>
				
				<view  class="noMore1" v-if="showTitle5&&huiList.length>0">
						暂无更多内容
				</view>
				<view class="flex align-center justify-center flex-d"  style="width: 100%;height: 600upx; background-color: white;" v-if="huiList.length==0">
					  <!-- <van-icon name="failure" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/> -->
					  <van-icon name="graphic" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/>
					  <view class="text">暂无搜索内容</view>	
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
				bluekey:'',
				n:0,
				value:'',
				hot_search:[],
				dataList:['全部','人脉','资讯','路顶记','小申展','项目/机会'],
				globalList:[],
				personList:[],
				informationList:[],
				luList:[],
				xiaoList:[],
				huiList:[],
				pagePerson:1,
				loadingPerson:false,
				allowPerson:false,
				pageInformation:1,
				loadingInformation:false,
				allowInformation:false,
				
				pageLu:1,
				loadingLu:false,
				allowLu:false,
				
				pageXiao:1,
				loadingXiao:false,
				allowXiao:false,
				
				pageHui:1,
				loadingHui:false,
				allowHui:false,
				showTitle1:false,
				showTitle2:false,
				showTitle3:false,
				showTitle4:false,
				showTitle5:false,
				showTitle6:false
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: '德申汇惠全球',
			  imageUrl:app.shareImg,
			  path: '/pagesMy/Search/Search'
			}
		},
		// 触底加载
		onReachBottom(){
			if(this.allowPerson&&this.n===1){	
				this.allowPerson = false				
				this.loadingPerson = true
				this.pagePerson++
				this.searchPerson()
				// setTimeout(() => {
					
				// 	this.pagePerson++
				// 	this.searchPerson()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
			
			if(this.allowInformation&&this.n===2){
				this.allowInformation = false				
				this.loadingInformation = true
				this.pageInformation++
				this.searchInformation()
				// setTimeout(() => {
				// 	this.pageInformation++
				// 	this.searchInformation()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
			
			if(this.allowLu&&this.n===3){
				this.allowLu = false				
				this.loadingLu = true
				this.pageLu++
				this.searchLu()
				// setTimeout(() => {
				// 	this.pageLu++
				// 	this.searchLu()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
			
			if(this.allowXiao&&this.n===4){
				this.allowXiao = false				
				this.loadingXiao = true
				this.pageXiao++
				this.searchXiao()
				// setTimeout(() => {
				// 	this.pageXiao++
				// 	this.searchXiao()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
			
			if(this.allowHui&&this.n===5){
				this.allowHui = false				
				this.loadingHui = true
				this.pageHui++
				this.searchHui()
				// setTimeout(() => {
				// 	this.pageHui++
				// 	this.searchHui()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
		},
		onLoad() {
			this.everybody()
		},
		methods: {
			
			// 资讯详情
			imdetail(id){
				uni.navigateTo({
					url:'../../pagesMy/InfoDetail/InfoDetail?id='+id
				})
			},
			// 路顶记详情
			LuDingJiDetails(id){
				uni.navigateTo({
					url:'../../pagesMy/LuDingJiDetails/LuDingJiDetails?id='+id
				})
			},
			// 小申展详情
			SmallStretchPvw(id){
				uni.navigateTo({
					url:'../../pagesMy/SmallStretchPvw/SmallStretchPvw?id='+id
				})
			},
			// 项目详情
			InformationDetail(id){
				uni.navigateTo({
					url:'../../pagesMy/InformationDetail/InformationDetail?id='+id
				})
			},
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			hot(key){
				this.value= key
				uni.showLoading({
				    title: '加载中'
				});
				setTimeout(()=>{
					this.searchIndex()
				}, 300);
				
			},
			
			tab(ind){
				this.n = ind
				if(this.n==0){
					uni.showLoading({
					    title: '加载中'
					});
					setTimeout(()=>{
						this.searchIndex()
						uni.pageScrollTo({
							scrollTop:0,
							duration:0
						})
					}, 300);
				}
				
				if(this.n==1){
					this.pagePerson = 1
					uni.showLoading({
					    title: '加载中'
					});
					setTimeout(()=>{
						uni.pageScrollTo({
							scrollTop:0,
							duration:0
						})
						this.searchPerson()
					}, 300);
				}
				
				if(this.n==2){
					this.pageInformation = 1
					uni.showLoading({
					    title: '加载中'
					});
					setTimeout(()=>{
						uni.pageScrollTo({
							scrollTop:0,
							duration:0
						})
						this.searchInformation()
					}, 300);
				}
								
				if(this.n==3){
					this.pageLu = 1
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(()=>{
						uni.pageScrollTo({
							scrollTop:0,
							duration:0
						})
						this.searchLu()
					}, 300);
				}
				
				if(this.n==4){
					this.pageXiao = 1
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(()=>{
						uni.pageScrollTo({
							scrollTop:0,
							duration:0
						})
						this.searchXiao()
					}, 300);
				}
								
				if(this.n==5){
					this.pageHui = 1
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(()=>{
						uni.pageScrollTo({
							scrollTop:0,
							duration:0
						})
						this.searchHui()
					}, 300);
				}						
								
			},
			
			// 会友汇
			searchHui(){
				this.$api.op_index_search({
					search:this.value,
					page:this.pageHui
				}).then(res=>{
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.pageHui===1){
							uni.hideLoading();
							this.huiList = res.data.data
							if(res.data.data.length>=20){
								this.allowHui= true
								this.loadingHui =false
							}else{
								this.allowHui= false
								this.loadingHui =false
								this.showTitle5 = true
							}
						}else{
							this.huiList =this.huiList.concat(res.data.data) 
							if(res.data.data.length>=20){
								this.allowHui= true
								this.loadingHui =false
							}else{
								this.allowHui= false
								this.loadingHui =false
								this.showTitle5 = true
							}
						}
						
					}
				})
			},
			// 小申展
			searchXiao(){
				this.$api.et_index_search({
					search:this.value,
					page:this.pageXiao
				}).then(res=>{
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.pageXiao===1){
							uni.hideLoading();
							this.xiaoList = res.data.data
							if(res.data.data.length>=20){
								this.allowXiao= true
								this.loadingXiao =false
							}else{
								this.allowXiao= false
								this.loadingXiao =false
								this.showTitle4 = true
							}
						}else{
							this.xiaoList =this.xiaoList.concat(res.data.data) 
							if(res.data.data.length>=20){
								this.allowXiao= true
								this.loadingXiao =false
							}else{
								this.allowXiao= false
								this.loadingXiao =false
								this.showTitle4 = true
							}
						}
						
					}
				})
			},
			// 路顶记
			searchLu(){
				this.$api.search_ppt({
					search:this.value,
					page:this.pageLu
				}).then(res=>{
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.pageLu===1){
							uni.hideLoading();
							this.luList = res.data.data
							if(res.data.data.length>=20){
								this.allowLu= true
								this.loadingLu =false
							}else{
								this.allowLu= false
								this.loadingLu =false
								this.showTitle3 = true
							}
						}else{
							this.luList =this.luList.concat(res.data.data) 
							if(res.data.data.length>=20){
								this.allowLu= true
								this.loadingLu =false
							}else{
								this.allowLu= false
								this.loadingLu =false
								this.showTitle3 = true
							}
						}
						
					}
				})
			},
			// 资讯
			searchInformation(){
				this.$api.search_news_v2({
					search:this.value,
					page:this.pageInformation
				}).then(res=>{
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.pageInformation===1){
							uni.hideLoading();
							this.informationList = res.data.data
							if(res.data.data.length>=20){
								this.allowInformation= true
								this.loadingInformation =false
							}else{
								this.allowInformation= false
								this.loadingInformation =false
								this.showTitle2 = true
							}
						}else{
							this.informationList =this.informationList.concat(res.data.data) 
							if(res.data.data.length>=20){
								this.allowInformation= true
								this.loadingInformation =false
							}else{
								this.allowInformation= false
								this.loadingInformation =false
								this.showTitle2 = true
							}
						}
						
					}
				})
			},
			// 人脉
			searchPerson(){
				this.$api.search_user_v2({
					search:this.value,
					page:this.pagePerson
				}).then(res=>{
					if(res.data.code=== '200'){
						if(this.pagePerson===1){
							uni.hideLoading();
							this.personList = res.data.data
							if(res.data.data.length>=20){
								this.allowPerson= true
								this.loadingPerson =false
								
							}else{
								this.allowPerson= false
								this.loadingPerson =false
								this.showTitle1 = true
							}
						}else{
							this.personList =this.personList.concat(res.data.data) 
							if(res.data.data.length>=20){
								this.allowPerson= true
								this.loadingPerson =false
							}else{
								this.allowPerson= false
								this.loadingPerson =false
								this.showTitle1 = true
							}
						}
						
					}
				})
			},
			// 全部
			searchIndex(){
				this.$api.search({
					key:this.value,
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					// console.log(res)
					uni.hideLoading();
					if(res.data.code === '200'){
						this.globalList = res.data.data
					}
				})
			},
			everybody(){
				this.$api.Swiper({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
					
				}).then(res=>{
					// console.log(res)
					this.hot_search = res.data.data.hot_search
				})
			},
			onChange(e){
				console.log(e)
				this.value = e.detail
				if(this.value==''){
					this.n=0
				}
				uni.showLoading({
				    title: '加载中'
				});
				
				if(this.n === 0){
					setTimeout(()=>{
						this.searchIndex()
					}, 300);
				}
				
				if(this.n === 1){
					this.pagePerson = 1
					setTimeout(()=>{
						this.searchPerson()
					}, 300);
				}
				
				if(this.n === 2){
					this.pageInformation = 1
					setTimeout(()=>{
						this.searchInformation()
					}, 300);
				}
				
				if(this.n === 3){
					this.pageLu = 1
					setTimeout(()=>{
						this.searchLu()
					}, 300);
				}
				
				if(this.n === 4){
					this.pageXiao = 1
					setTimeout(()=>{
						this.searchXiao()
					}, 300);
				}
				
				if(this.n === 5){
					this.pageHui = 1
					setTimeout(()=>{
						this.searchHui()
					}, 300);
				}
				
			},
			onCancel(){
				this.value=''
				this.n = 0
			}
		}
	}
</script>

<style>
	@import url("./Search.css");
</style>
