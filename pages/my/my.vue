<template>
	<view class="wrap scroll" v-if="isFinish">
		<view class="personalHead">
			  <image src="https://web.detion.com/static/img/set_icon.png" class="set" @click.prevent.stop="set"></image>
			  <image src="https://web.detion.com/static/img/mes_icon1.png" v-if="info.messageBoxCount" class="mes" @click.prevent.stop="notice"></image>
			  <image src="https://web.detion.com/static/img/mes_icon.png" v-else class="mes" @click.prevent.stop="notice"></image>
			  <view class="member">
				<view class="info flex align-center" style="position: relative;padding: 0 4%" @click="MyInfo">
					
					
				  <!-- <view class="user flex align-center justify-center re">
					<image :src="info.avatar?info.avatar:'../../static/img/user_icon.png'"></image>
					<head-logo :type="info.type" :v_type="info.add_v_type"></head-logo>
				  </view> -->
				  
				  <view  class="re">
				  	<view class="imgWrapTal user" style="width: 120upx;height: 120upx;">
				  		<image :src="info.avatar?info.avatar:'../../static/img/user_icon.png'"  mode="aspectFill"></image>
				  	</view>
				  	<head-logo :type="info.type" :v_type="info.add_v_type"></head-logo>
				  </view>		
				  
				  
				  <view class="con">
					<view class="name flex align-center">
					  <view class="nickname">
						{{info.nickname}}
					  </view>
					  <!--普通用户-->
					  <view class="sn re" v-if="isVip === 0">
						<image src="https://web.detion.com/static/img/no_member.png" class="icon"></image>
						<head-logo :type="info.type" :v_type="info.add_v_type"></head-logo>
						<view class="text">普通用户</view>
					  </view>
					  <!--普通用户-->
					  <!--VIP用户-->
					  <view class="sn flex align-center" v-else-if="isVip === 1">
						<image src="https://web.detion.com/static/img/member.png" class="star"></image>
						<view class="number flex align-center justify-center">
						  <view v-if="info.type === '1'">C</view>
						  <view v-else-if="info.type === '2'">C</view>
						  <view v-else-if="info.type === '3'">G</view>
						  <view v-else-if="info.type === '4'">E</view>
						  <view v-else-if="info.type === '5'">T</view>
						  <view v-else-if="info.type === '6'">V</view>
						  <view v-else-if="info.type === '7'">B</view>
						  <view>{{info.no}}</view>
						</view>
					  </view>
					  <level :type="info.type" :v_type="info.add_v_type" :vip_level="info.vip_level"></level>
					  <!--VIP用户-->
					</view>
					<view class="company" v-if="info.company">{{info.company}}·{{info.job}}</view>
				  </view>
				  <image src="https://web.detion.com/static/img/back_white.png" class="back"></image>
				</view>
				<!--粉丝-->
				<view class="fansGroup  flex align-center">
				  <view class="list" @click="goVoteList(0)">
					<view class="number">{{fans.FenSi?fans.FenSi:0}}</view>
					<view class="title">粉丝</view>
				  </view>
				  <view class="list"  @click="goVoteList(1)">
					<view class="number">{{fans.GuanZhu?fans.GuanZhu:0}}</view>
					<view class="title">关注</view>
				  </view>
				  <view class="list" @click="goVoteList(2)">
					<view class="number">{{fans.HuGuan?fans.HuGuan:0}}</view>
					<view class="title">互相关注</view>
				  </view>
				</view>
			  </view>

			</view>
			<!--俱乐部信息-->
			<view class="club_info flex align-center" @click="goclub">
			  <image src="https://web.detion.com/static/img/logo_small.png" class="logo"></image>
			  <view class="info_list" v-if="is_join">
				<view class="list" v-for="(item,index) in info.club_data" :key="index">{{item.name}} {{item.dutyname}}</view>
			  </view>
			  <view class="info_list flex align-center justify-between" v-else>
				<view class="list">您暂未加入俱乐部</view>
				<view class="look">点击查看</view>
			  </view>
			  <image src="https://web.detion.com/static/img/next3.png" class="more"></image>
			</view>
			<!--会员卡-->
			<view class="cardNew">
			  <view>
				<image src="https://web.detion.com/static/img/card_bg1.png"></image>
				<view class="con flex align-center justify-between" @click="vip">
				  <view class="tips flex align-center">
					<image src="https://web.detion.com/static/img/icon27.png" class="icon"></image>
					<view class="text">德申VIP用户</view>
				  </view>
				  <view class="ope flex align-center">
					<view class="text" v-if="isVip === 1">用户续费</view>
					<view class="text" v-else-if="isVip === 0">开通VIP</view>
					<image src="https://web.detion.com/static/img/next3.png" class="more"></image>
				  </view>
				</view>
			  </view>
			</view>

			<view class="myList" style="margin-bottom: 10px">
			  <view class="title">我的服务</view>
			  <view class="list_group">
				<view class="list" v-if="isVip === 0" @click="goclub">
				  <image src="https://web.detion.com/static/image/my/icon.png" class="icon"></image>
				  <view class="text">俱乐部</view>
				</view>
				<view class="list" @click="goclub" v-if="isVip === 1" >
				  <image src="https://web.detion.com/static/image/my/icon.png" class="icon"></image>
				  <view class="text">俱乐部</view>
				</view>
				
				<view class="list" @click="myCompany">
				  <image src="https://web.detion.com/static/img/icon_my1.png" class="icon"></image>
				  <view class="text">我的企业</view>
				</view>
				<view class="list" @click="MyActivity">
					<image src="https://web.detion.com/static/img/icon_my2.png" class="icon"></image>
					<view class="text">我的活动</view>
				</view>
				
				<view class="list" @click="DistrictAssistant">
					<image src="https://web.detion.com/static/img/icon_my3.png" class="icon"></image>
					<view class="text">地区助手</view>
				</view>
				<view class="list" v-if="isVip === 0" @click.stop="MyInformation">
				  <image src="https://web.detion.com/static/img/icon_my4.png" class="icon"></image>
				  <view class="text">我的资讯圈</view>
				</view>
				<view class="list" v-if="isVip === 1" @click.stop="MyInformation">
					<image src="https://web.detion.com/static/img/icon_my4.png" class="icon"></image>
					<view class="text">我的资讯圈</view>
				</view>
				
				<view class="list">
				  <navigator url="../../pagesMy/MyProject/MyProject">
					<image src="https://web.detion.com/static/img/icon_my8.png" class="icon"></image>
					<view class="text">我的项目/机会</view>
				  </navigator>
				</view>
			
				<view class="list" @click="PaymentHistory">
					<img src="https://web.detion.com/static/img/icon_my5.png" alt="" class="icon">
					<view class="text">缴费历史</view>
				</view>

				<view class="list" @click="question">
					<img src="https://web.detion.com/static/img/icon_my11.png" alt="" class="icon">
					<view class="text">常见问题</view>
				</view>
				<view class="list" @click="newUser">
					<img src="https://web.detion.com/static/img/icon_my12.png" alt="" class="icon">
					<view class="text">新用户</view>
				</view>
				<view class="list" @click="Recommend">
					<img src="https://detions.oss-accelerate.aliyuncs.com//wx/wxa2eeaf66a51d1ed0.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.V6XnyAHOdjVyd884c9133a8a0f6a1be57759b0360429.png" alt="" class="icon">
					<view class="text">我的推荐</view>
				</view>
				<view class="list" @click="Integral">
					<img src="https://web.detion.com/static/img/icon_my14.png" alt="" class="icon">
					<view class="text">积分排行</view>
				</view>
	
				<view class="list" v-if="is_fund" @click="goPermission">
					<img src="https://web.detion.com/static/img/icon_my15.png" alt="" class="icon">
					<view class="text">统计与审批</view>
				</view>
				
				<view class="list" @click.stop="goTradingVolume">
					<img src="https://web.detion.com/static/image/my/icon1.png" alt="" class="icon">
					<view class="text">交易额</view>
				</view>
				
				<view class="list" @click.stop="MyCollect">
					<img src="https://web.detion.com/static/img/icon_my18.png" alt="" class="icon">
					<view class="text">我的收藏</view>
				</view>
				
			  </view>
		</view>
		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		
		data() {
			return {
			  info:{}, //个人信息数据
			  isFinish:false, //数据请求完成
			  company_id:0, //如果有公司，公司的id
			  fans: {}, // 粉丝列表
			  id:uni.getStorageSync('userId'), // 用户userid
			  isVip: uni.getStorageSync('isVip'), // 是否为VIP
			  appid: 'wxf96de80f86c7cb7a',
			  is_join: false, // 是否有俱乐部信息（是否加入俱乐部）
			  is_auth: false, // 是否显示俱乐部申请（城市会长+张总）
			  is_report: false, // 是否显示报表系统 （创始人）
			  fund_num: 0, // 审批数量
			  is_fund: false, // 审批权限

			}
		},
		// onShareAppMessage:function(res) {
		// 	return {
		// 	  title: '德申汇惠全球',
		// 	  imageUrl:app.shareImg,
		// 	  path: '/pages/my/my'
		// 	}
		// },
		onShow() {
			this.MyselfIndex()
			uni.showLoading({
			    title: '加载中'
			});
			
		},
		methods: {
			// 我的收藏
			MyCollect(){
				uni.navigateTo({
					url:'/pagesFour/CollectionService/CollectionService'
				})
			},
			// 交易额
			goTradingVolume(){
				uni.navigateTo({
					url:'../../pagesTwo/TradingVolume/TradingVolume'
				})
			},
			// 会员服务
			vip(){
				if (Number(uni.getStorageSync('setInfo')) === 1) {
					this.$api.is_get_badge({
					  token: uni.getStorageSync("token"),
					  user_id: uni.getStorageSync("userId")
					}).then(res => {
					  if (res.data.code === '1016') { // 不是vip
							uni.navigateTo({
								url:'../../pagesMy/pay/pay'
							})
					  } else if (res.data.code === '1079') { // 缴费成功未选择礼包
							uni.navigateTo({
								url:'../../pagesMy/PayStep/PayStep'
							})
					  } else if (res.data.code === '1081' || res.data.code === '1077') { // 10000之后领取礼包完成可以正常续费或10000之前没有领取资格
							uni.navigateTo({
								url:'../../pagesMy/Renew/Renew'
							})
					  } else if (res.data.code === '1099') {
							uni.navigateTo({
								url:'../../pages/PersonalIdcard/PersonalIdcard'
							})
					  } else {
						uni.showToast({
						    title: res.data.msg,
						    mask: "true",
							icon:'none'
						});
					  }
					})
				  } else if (Number(uni.getStorageSync('setInfo')) === 0) {
					uni.navigateTo({
						url:'../../pages/PersonalIdcard/PersonalIdcard'
					})
				  }
			},
			// 跳转同级审批
			goPermission(){
				uni.navigateTo({
					url:'../../pagesThree/Permission/Permission'
				})
			},
			// 报表系统查看权限
			getReport(){
				this.$api.report_auth({
				  user_id: uni.getStorageSync('userId')
				}).then(res => {
				  this.is_report = res.data.data
				})
			},
			
			// 经费审批权限
			 
			getFund () {
			  this.$api.fund_auth({
			    user_id: uni.getStorageSync('userId'),
			    token: uni.getStorageSync('token')
			  }).then(res => {
			    if (res.data.code === '200') {
			      this.fund_num = res.data.data
			      this.is_fund = true
			    } else {
			      this.is_fund = false
			    }
			  })
			},
			// 获取审核列表权限
			getAuth () {
			  this.$api.ReportCheckClubApplyList({
			    user_id: uni.getStorageSync('userId'),
			    token: uni.getStorageSync('token')
			  }).then(res => {
				  // console.log(res)
			    if (res.data.code === '200') {
			      this.is_auth = true
			    } else {
			      this.is_auth = false
			    }
			  })
			},
			// 积分排行
			Integral(){
				uni.navigateTo({
					url:'../../pagesThree/Integral/Integral'
				})
			},
			// 我的推荐
			Recommend(){
				uni.navigateTo({
					url:'../../pagesThree/Recommend/Recommend'
				})
			},
			// 新用户
			newUser(){
				uni.navigateTo({
					url:'../../pagesThree/NewUser/NewUser'
				})
			},
			// 常见问题
			question(){
				uni.navigateTo({
					url:'../../pagesThree/Question/Question'
				})
			},
			// 缴费历史
			PaymentHistory(){
				if(uni.getStorageSync('setInfo') ===0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 2000,
						icon:'none'
					});
					
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
						})
					}, 1000);
					
				}else{
					if (uni.getStorageSync('isVip') === 0) {
						Dialog.confirm({
						  title: '提示',
						  message: '您还不是VIP用户,去支付？',
						  confirmButtonText:'去支付'
						}).then(() => {
							uni.navigateTo({
								url:'../../pagesMy/pay/pay'
							})
						}).catch(() => {
						  // on cancel
						});
					  } else if (uni.getStorageSync('isVip') === 1) {
						uni.navigateTo({
							url:'../../pagesThree/PaymentHistory/PaymentHistory'
						})
					  } 
				}
			},
			// 地区助手
			DistrictAssistant(){
				uni.navigateTo({
					url:'../../pagesTwo/DistrictAssistant/DistrictAssistant'
				})
			},
			// 我的活动
			MyActivity(){
				uni.navigateTo({
					url:'../../pagesTwo/MyActivity/MyActivity'
				})
			},
			// 我的企业
			myCompany(){
				if(uni.getStorageSync('setInfo') === 0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 1000,
						icon:'none'
					});
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
						})
					}, 1000);
				}else{
					this.$api.myself_company({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId")
					}).then(res=>{
						// console.log(res)
						if(res.data.code === '1054'){
							uni.navigateTo({
								url:'../../pagesTwo/EnterpriseCertification/EnterpriseCertification'
							})
						}else if(res.data.code === '200'){
							this.company_id = res.data.data.id
							uni.setStorageSync('company_id',Number(this.company_id))
							uni.navigateTo({
								url:'/pagesTwo/MyBusiness/MyBusiness?id='+uni.getStorageSync("company_id")
							})
						}
					})
					
				}
			},
			// 关注列表
			goVoteList(e){
				uni.navigateTo({
					url:'../../pagesTwo/MyVoteList/MyVoteList?n='+e
				})
			},
			goclub(){
				if(uni.getStorageSync('setInfo') ===0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 2000,
						icon:'none'
					});
					
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
						})
					}, 1000);
					
				}else{
					if (uni.getStorageSync('isVip') === 0) {
						Dialog.confirm({
						  title: '提示',
						  message: '您还不是VIP用户,去支付？',
						  confirmButtonText:'去支付'
						}).then(() => {
							uni.navigateTo({
								url:'../../pagesMy/pay/pay'
							})
						}).catch(() => {
						  // on cancel
						});
					  } else if (uni.getStorageSync('isVip') === 1) {
						uni.navigateTo({
							url:'../../pagesTwo/Club/Club'
						})
					  } 
				}
				
			},
			// 资讯圈
			MyInformation(){
				 uni.navigateTo({
					url:"../../pagesMy/MyInformation/MyInformation?id="+ this.id
				 })				 
			},
			// 跳转个人主页
			MyInfo(){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+this.id
				})
			},
			// 设置界面跳转
			set(){
				uni.navigateTo({
					url:"../../pagesMy/Setting/Setting"
				})
			},
			// 未读消息跳转
			notice () {
			      uni.navigateTo({
			      	url: '../../pagesMy/Notice/Notice'
			      })
			},
			// 获取我的界面数据
			MyselfIndex(){
				this.$api.MyselfIndex({
				        token: uni.getStorageSync("token"),
				        user_id: uni.getStorageSync("userId")
				      }).then(res => {
						  // console.log(res)
						  if(res.data.code === '200'){
							  this.info = res.data.data
							  // console.log(this.info)
							  // 是否有自己的公司 有的话存上公司的id
							  if (res.data.data.company_data) {
								  this.company_id = res.data.data.company_data.id
								  // localStorage.company_id = this.company_id
								  uni.setStorageSync('company_id',this.company_id)
								}
								// 获取粉丝和列表审核
								this.getFans()
								this.getAuth()
								this.getFund()
								this.getReport()
							  // 判断是否有俱乐部
							  if (this.info.club_data && this.info.club_data.length) { // 缓存普通俱乐部clubid
									  for (let i = 0; i < this.info.club_data.length; i++) {
										if (this.info.club_data[i].club_type === 0) {
										  uni.setStorageSync('club_id',this.info.club_data[i].club_id)
										}
									  }
									  uni.setStorageSync('isJoin','1')
									  this.is_join = true
									  // console.log(this.is_join)
									} else {
									  uni.setStorageSync('isJoin','0')
									  this.is_join = false
									  uni.removeStorageSync('club_id')
									}
									// localStorage.setItem('isVip', res.data.is_vip)
									// console.log(typeof this.info.is_vip)
									// console.log(this.info.is_vip)
									uni.setStorageSync('isVip',this.info.is_vip)
									if (res.data.data.vip_ended_at) {
									  uni.setStorageSync('vipEnd',res.data.data.vip_ended_at)
									}
								
						  }
						  else if (res.data.code === '1010') {
						            uni.clearStorageSync()
									uni.showToast({
									    title: '登录过期，请重新登录',
									    duration: 2000,
										icon:'none'
									});
						            // this.$router.replace({name: 'Login', params: {id: -1}})
									uni.reLaunch({
										url: '../login/login'
									})
						          }
								  // 完成数据控制整个界面的显示和隐藏
						          this.isFinish = true
						          uni.hideLoading();
					  })
			},
			// 粉丝/关注/互关
			getFans () {
			      this.$api.MyFans({
			        user_id: uni.getStorageSync('userId'),
			        token: uni.getStorageSync('token')
			      }).then(res => {
					  // console.log(res)
			        if (res.data.code === '200') {
			          this.fans = res.data.data
			          this.isFinish = true
			        } else if (res.data.code === '1010') {
			          uni.clearStorageSync()
			          uni.showToast({
			              title: '登录过期，请重新登录',
			              duration: 2000,
			          	  icon:'none'
			          });
			          // this.$router.replace({name: 'Login', params: {id: -1}})
			          uni.reLaunch({
			          	url: '../login/login'
			          })
			        }
			      })
			    },
				
		}
	}
</script>

<style>
	@import url("./my.css");
		
</style>
