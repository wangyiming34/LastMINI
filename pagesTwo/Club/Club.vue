<template>
	<view style="width:100%;height: 100%;background-color: #FAFAFA;">
		<scroll-view scroll-y="true" class="scroll-Y" enable-back-to-top="true">
			<view style="width: 100%;padding:30upx;">
				<!-- 头部 -->
				
				<!--未加入普通俱乐部-->
				<view class="flex" v-if="normal_club.length === 0">
					<view style="margin-right: 15px;text-align: center;" @click="joinClub">
						<image src="https://web.detion.com/static/image/club/icon1.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
						<view class="head-title">
							加入俱乐部
						</view>
					</view>
					
					<view style="margin-right: 15px;text-align: center;" @click="goCreateClub">
						<image src="https://web.detion.com/static/image/club/icon2.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
						<view class="head-title">
							创建俱乐部
						</view>
					</view>
					
				</view>
				<!--    已有普通-->
				<view class="flex" v-else style="padding-top: 30upx;">
					  <view style="margin-right: 15px;text-align: center;" @click="goCreateClub">
						<image src="https://web.detion.com/static/image/club/icon2.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
						<view class="head-title">
							创建俱乐部
						</view>
					  </view>
					  
					  <view style="margin-right: 15px;text-align: center;" @click="goExitClub" v-if="info.CREATE_CDR === 0 && info.CDR === 0">
					  	<image src="https://web.detion.com/static/image/club/icon3.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
					  	<view class="head-title">
					  		退出俱乐部
					  	</view>
					  </view>
					  
					  <view style="margin-right: 15px;text-align: center;" @click="ShareClub" class="re">
						<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wxa2eeaf66a51d1ed0.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.ZWQo6g0ps0fC8c8e967d338983c9219ecf57669dba56.png" lazy-load="true" class="ab"  style="top: -12px;left: 50%;transform: translateX(-50%);width: 64px;height: 21px;"></image>
					  	<image src="https://web.detion.com/static/image/club/icon4.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
					  	<view class="head-title">
					  		俱乐部二维码
					  	</view>
					  </view>
					  
					  <view style="margin-right: 15px;text-align: center;" @click="fund" v-if="hasApply">
					  	<image src="https://web.detion.com/static/image/club/icon5.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
					  	<view class="head-title">
					  		经费申请
					  	</view>
					  </view>
					  <!-- <view class="list_item" @click="$router.push({name: 'EditClub'})" v-if="info.CREATE_CDR === 0 && info.CDR === 0">
				CREATE_CDR.cdr 0不是，1是会长或创会会长
						<img src="/static/image/club/icon3.png" alt="" class="icon">
						<view class="text">退出俱乐部</view>
					  </view> -->
					  <!-- <view class="list_item" @click="$router.push({name: 'ShareList'})">
						<img src="/static/image/club/icon4.png" alt="" class="icon">
						<view class="text">分享俱乐部</view>
					  </view> -->
					  <!-- <view class="list_item" @click="$router.push({name: 'FundsApplyList',params:{id: city_club.id}})" v-if="hasApply">
						<img src="/static/image/club/icon5.png" alt="" class="icon">
						<view class="text">经费申请</view>
					  </view> -->
				</view>
					
				<!-- <view class="flex">
					<view style="margin-right: 15px;text-align: center;" @click="goCreateClub">
						<image src="../../static/img/user_icon.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
						<view class="head-title">
							创建俱乐部
						</view>
					</view>
					<view style="margin-right: 15px;text-align: center;" @click="goExitClub" v-if="myClub.length>0">
						<image src="../../static/img/user_icon.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
						<view class="head-title">
							退出俱乐部
						</view>
					</view>
					<view style="margin-right: 15px;text-align: center;" v-if="myClub.length>0">
						<image src="../../static/img/user_icon.png" lazy-load="true" class="head-img" mode="aspectFill"></image>
						<view class="head-title">
							分享俱乐部
						</view>
					</view>
				</view> -->
				<!-- 下部 -->
				<view class="bottom-wrap">
					<view class="flex align-center" style="margin-bottom: 15px;">
						<view class="blue_left"></view>
						<view class="my-club">
							我的俱乐部
						</view>
					</view>
					<!-- 自己俱乐部的列表 -->
					<view class="" v-if="myClub.length>0">
						<view v-for="(item,index) in myClub" :key="index" class="haveClub flex" :class="{redClub:item.type==1}" @click="goClubIndex(item.id)">
							<view class="haveClub-left">
								<image :src="item.url_image?item.url_image:'../../static/img/logo.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							</view>
							<view class="haveClub-right" style="flex: 1;">
								<view style="font-size:18px;font-weight:500;color:rgba(255,255,255,1);margin-bottom: 10upx;">
									{{item.name}}
								</view>
								<view style="font-size:15px;font-weight:400;color:rgba(255,255,255,1);margin-bottom: 20upx;">
									<text>创会会长：{{item.cdr}}</text> <text style="margin: 0 5px;" v-if="item.nickname"> I </text><text v-if="item.nickname">现任会长：{{item.nickname}}</text>
								</view>
								<view class="re flex" style="font-size:13px;font-weight:400;color:rgba(255,255,255,.8);">
									<view style="border-radius:2px;border:1px solid rgba(255,255,255,.5);padding: 0 5px;">
										编号：{{item.sn==null?'暂无':item.sn}}
									</view>
									<view style="margin-left: 7px;border-radius:2px;border:1px solid rgba(255,255,255,.5);padding: 0 5px;">
										成员：{{item.user_count}}
									</view>
									<view class="haveClub-ab" v-show="item.type==1">
										城市
										<view class="sanjiao">
											
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 如果没有俱乐部 -->
					<view class="noclub flex" v-else>
						<view style="font-size:16px;font-weight:400;color:rgba(51,51,51,1);">
							<view class="">
								您还未加入俱乐部，
							</view>
							<view class="">
								暂无数据！
							</view>
							<view style="margin-top: 24upx;width:187upx;height:54upx;border-radius:72upx;border:1px solid rgba(6,77,197,1);font-size:26upx;font-weight:400;color:rgba(6,77,197,1);line-height:50upx;text-align: center;" @click="joinClub">
								加入俱乐部
							</view>
						</view>
						<view class="">
							<image src="https://web.detion.com/static/img/no_club.png" lazy-load="true" class="noclub-img" mode="aspectFill"></image>
						</view>
					</view>
					
					<!-- 下面其他俱乐部选项卡 -->
					<view class="flex align-center justify-between" style="margin-bottom: 15px;margin-top: 20px;">
						<view class="flex align-center">
							<view class="blue_left"></view>
							<view class="my-club">
								其他俱乐部
							</view>
						</view>
						<view class="flex align-center" @click="other">
							<view style="margin-right: 5px;">
								{{type===1?'国内':"国外"}}
							</view>
							<van-icon name="arrow-down" />
						</view>
					</view>
					
					<!-- 其他俱乐部列表 -->
					<view v-for="(item,index) in otherClub" :key="index" class="other-wrap flex-d flex" @click="goCityClub(item)">
						<view class="other-top flex justify-between align-center">
							<view class="flex align-center">
								<view style="font-size:19px;font-weight:500;color:rgba(255,255,255,1);">{{item.name}}</view>
								<view class="shu"></view>
								<view style="font-size:15px;font-weight:500;color:rgba(255,255,255,.8);align-self: flex-end;">城市会长：{{item.CDR?item.CDR:'暂无'}}</view>
							</view>
							<view class="det">
								详情
							</view>
						</view>
						<view class="other-bottom flex justify-around align-center" style="flex: 1;">
							<view class="flex-d flex align-center justify-between">
								<view class="other-content">
									{{item.club_count}}
								</view>
								<view class="other-text">
									俱乐部数
								</view>
							</view>
							<view class="flex-d flex align-center justify-between">
								<view class="other-content">
									{{item.user_count.all_count}}
								</view>
								<view class="other-text">
									人员总数
								</view>
							</view>
							<view class="flex-d flex align-center justify-between">
								<view class="other-content">
									{{item.user_count.free_count}}
								</view>
								<view class="other-text">
									自由港人数
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	var app = getApp().globalData
	export default {
		data() {
			return {
				myClub:[],
				otherClub:[],
				type:1,
				info:'',
				city_index:0,
			    city_club: {}, // 城市俱乐部详情
			    normal_club: [], // 普通俱乐部详情,有特殊情况存在两个普通俱乐部
			    hasClub: false, // 有俱乐部信息
			    hasCityClub: false, // 有城市俱乐部信息
				isJoin:0,
				hasApply:false
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: '德申汇-俱乐部',
			  imageUrl:app.shareImg,
			  path: '/pagesTwo/Club/Club'
			}
		},
		onLoad() {
			uni.showLoading({
			    title: '加载中'
			});
			this.getMyClub()
			this.getOtherClub()
			this.isJoin = Number(uni.getStorageSync("isJoin"))
		},
		methods: {
			// 经费审批
			fund(){
				uni.navigateTo({
					url:'../../pagesThree/FundsApplyList/FundsApplyList?clubId='+ this.city_club.id
				})
			},
			// 分享俱乐部
			ShareClub(){
				uni.navigateTo({
					url:'../../pagesThree/ShareClubList/ShareClubList'
				})
			},
			// 加入俱乐部判断状态
			joinClub(){
				this.$api.join_club_status({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then((res)=>{
					if (res.data.code === '1023' || res.data.code === '1022') { // 可以申请
					  uni.navigateTo({
					  	url:'../../pagesTwo/JoinClub/JoinClub'
					  })
					} else if (res.data.code === '1019' || res.data.code === '1021') { // 审核中和驳回
					  
					  uni.navigateTo({
					  	url:'../../pagesTwo/JoinClubStatus/JoinClubStatus'
					  })
					}
					//  else if (res.data.code === '1021') { // 审核驳回
					//   this.$router.push({name: 'JoinFail', params: {reason: res.data.length ? res.data : '空'}})
					// }
				})
				// uni.navigateTo({
				// 	url:'../../pagesTwo/JoinClub/JoinClub'
				// })
			},
			goExitClub(){
				this.$api.Club_club_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then((res)=>{
					// console.log(res)
					if(res.data.data.length>0){
						uni.navigateTo({
							url:'../../pagesTwo/ExitClubList/ExitClubList'
						})
					}else{
						uni.showToast({
						    title: '您还没有加入俱乐部',
						    mask: "true",
							icon:'none'
						});
					}
				})
			},
			goCreateClub(){
				this.$api.create_city_status({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then((res)=>{
					console.log(res)
					uni.showToast({
					    title: res.data.msg,
					    mask: "true",
						icon:'none'
					});
					if(res.data.code=="1022"){
						this.getMyClub()
					}
					if(res.data.code=="1023"){
						uni.navigateTo({
							url:'../../pagesTwo/CreateClubOne/CreateClubOne'
						})
					}
					if(res.data.code=="1019"){
						uni.navigateTo({
							url:'../../pagesTwo/CreateClubDetail/CreateClubDetail?code='+'1019'
						})
					}
					if(res.data.code=="1021"){
						
						uni.navigateTo({
							url:'../../pagesTwo/CreateClubDetail/CreateClubDetail?code='+'1021'+"&reason=" + res.data.data
						})
					}
				})
			
			},
			goClubIndex(id){
				uni.navigateTo({
					url:'../../pagesTwo/ClubIndex/ClubIndex?id='+id
				})
			},
			other(){
				uni.showLoading({
				    title: '加载中'
				});
				if(this.type===1){
					this.type = 2
					this.getOtherClub()
				}else{
					this.type = 1
					this.getOtherClub()
				}
			},
			goCityClub(item){
				uni.navigateTo({
					url:'../../pagesTwo/CityClub/CityClub?type='+this.type+'&cityName='+item.name
				})
			},
			getMyClub(){
				this.$api.Club_index_myself({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					this.myClub = res.data.data
					if (this.myClub.length) { // 已加入俱乐部
						this.hasClub = true
						if (this.myClub.length === 1) {
						  if (this.myClub[0].type === 0) { // 判断俱乐部类型，0普通俱乐部1城市俱乐部
							this.normal_club = this.myClub
							this.hasCityClub = false
						  } else {
							this.city_club = this.myClub[0]
							this.hasCityClub = true
							this.getAuth()
						  }
						} else {
						  for (let i = 0; i < this.myClub.length; i++) {
							if (this.myClub[i].type === 1) {
							  this.city_club = this.myClub[i]
							  this.city_index = i
							  this.hasCityClub = true
							  this.getAuth()
							}
						  }
						  // this.myClub.splice(this.city_index, 1)
						  this.normal_club = this.myClub
						 
						}
					  } else { // 未加入俱乐部
						this.hasClub = false
					  }
					  
					  this.$api.MyselfSetDefaultMobileWechat({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId")
					  }).then(res => {
						this.info = res.data.data
					  })
				})
			},
			// 经费申请权限
			getAuth () {
			      this.$api.city_index_v2({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        club_id: this.city_club.id
			      }).then(res => {
			        if (res.data.code === '200') {
			          this.hasApply = res.data.data.Funding_approval
			        }
			      })
			},
			getOtherClub(){
				this.$api.Club_index_other({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type:this.type
				}).then(res=>{
					// console.log(res)
					uni.hideLoading();
					this.otherClub = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import url("./Club.css");
</style>
