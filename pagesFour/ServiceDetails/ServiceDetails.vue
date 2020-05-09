<template>
	<view class='SmallStretchPvw' v-if="finish" style="padding-bottom: 120upx;">
	  
	  <!-- 顶部图片 -->
	  <view class="" style="width: 100%;height: 500upx;">
		<image :src="Detail.img" lazy-load="true" class="imga" style="width: 100%;height: 100%;"></image>
	  </view>
	  <!-- 中间 -->
	  <view class="SmallStretchPvw-center" style="padding:30upx 32upx 40upx;">
		<view class="SmallStretchPvw-name" style="font-size: 36upx;">
			{{Detail.title}}
		</view>
		<view class="flex justify-between align-center" style="margin-bottom: 26upx;">
			<view class="cate_name">
				{{Detail.cate_name}}
			</view>
			<view class="city">
				{{Detail.city}}
			</view>
		</view>
		<view class="price">
			￥{{Detail.sprice}}-{{Detail.eprice}}
		</view>
		<view class="viewname flex justify-between align-center re" style="width: 80%;">
			<view class="">
				浏览：{{Detail.view}}
			</view>
			<view class="">
				咨询：{{Detail.contact}}
			</view>
			<view class="">
				收藏：{{Detail.collect}}
			</view>
			<view class="ab" style="width: 60px;height: 50px;right: -140upx;top: -50upx;" v-if="check==0">
				<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.AHyjVpZxpyuC04293f13be90fb3688bda3dfeaea2c6b.png" mode=""></image>
			</view>
		</view>
		
		<view class="huangtiao re">
			<view class="huangTitle">
				德申VIP优惠
			</view>
			<view class="huangName">
				{{Detail.discounts?Detail.discounts:'暂无优惠'}}
			</view>
			<view class="ab kaitong" v-if="!vip" @click.stop="pay">
				立即开通
			</view>
		</view>
	  </view>
	  
	  <!-- 公司介绍-->
	  <view class="company flex align-center" @click.stop="company">
	  	<view class="companyimg">
	  		<image :src="Detail.company_logo" mode=""></image>
	  	</view>
		<view class="companyname flex1">
			{{Detail.company_name}}
		</view>
		<van-icon name="arrow" size="16px" color="#666666" />
	  </view>
	  
	  
	  <!-- 下面简介和内容 -->
	  <view class="SmallStretchPvw-bottom">
		<!-- 图片 -->
		<view class="SmallStretchPvw-bottom-img">
			<!-- Detail.image?index>0:index>-1 -->
			<view  class="SmallStretchPvw-bottom-img-box" v-for="(img, index) in Detail.imgs"  :key="index">
				<image :src="img" lazy-load="true" class="imga" mode="widthFix"></image>
			</view>
			
		</view>

		<!-- 文字 -->
		<view class="xiangxixinxineirong" v-if="Detail.desc">
		   {{Detail.desc}}
		</view>
	  </view>

	  <!-- 最后的发送 -->
	
	  <view class="SmallStretchPvw-bottom-cccline">

	  </view>
	  <!-- ----关注和咨询---- -->
	  <view class="SmallStretchPvw-bottom-vote-new flex align-center justify-around" v-if="!isMe">
		  <view class="Small-vote flex align-center" @click="vote">
			  <image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.JjHLg0PLMbc8c4d76d7929b8b9b6a11460c53fa6e917.png" mode="" v-if="is_collect===0" class="serImg"></image>
			  <image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.jzv7OyzawxrD947e033de5204873e2dd5d045a96f918.png" mode="" v-else class="serImg"></image>
			  <view class="shoucang" style="margin-left: 5px;">
			  	{{is_collect===1?'已收藏':'收藏'}}
			  </view>
		  </view>
		  
		  <view class="Smal-consult" @click="tel">电话咨询</view>
	  </view>
	  
	  <view class="SmallStretchPvw-bottom-vote-new flex align-center justify-between" v-if="isMe&&status==1" style="padding: 0 32upx;">
	  		  <view class="jixubianji" @click="againEdit">继续编辑</view>
	  		  
	  		  <view class="lijifabu" @click="PublishImmediately">立即发布</view>
	  </view>
	  
	  <view class="SmallStretchPvw-bottom-vote-new flex align-center justify-between" v-if="isMe&&status==0" style="padding: 0 32upx;">
	  		  <view class="jixubianji" @click="del">删除</view>
	  		  <view class="lijifabu" @click="edit">编辑</view>
	  </view>
	  
	  <van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				img:'', //上传后的主图
				imgs:[],//上传后的下面的图片
				id:0,
				status:100,
				finish:false,
				isMe:false,
				is_collect:100,
				Detail:{},
				detail:{},
				vip:false,
				user_id:'',//不是自己的id，是传过来的id也可能是自己的
				finished:false,
				check:100
			}
		},
		onShareAppMessage:function(res) {
			// 正常分享
			if(this.status==0){
				return {
				  title: this.Detail.title?this.Detail.title.substring(0,30)+'...':'德申汇服务详情',
				  imageUrl:this.Detail.img?this.Detail.img:app.shareImg,
				  path: '/pagesFour/ServiceDetails/ServiceDetails?id='+this.id +'&status=0'+"&user_id="+this.user_id
				}
			}else{
				uni.showToast({
				    title: '预览界面请不要分享！',
				    mask: "true",
					icon:'none'
				});
			}

		},
		onLoad(e) {
			if(uni.getStorageSync("isVip")==1){
				this.vip = true
			}
			// 审核中
			if(e.check){
				this.check = e.check
			}
			if(e.id){
				this.id = Number(e.id) 
			}
			// 服务id
			if(e.status){
				this.status = e.status
			}
			// 在哪里进来的
			
			// console.log(e)
			// 是不是自己
			if(uni.getStorageSync("userId")==e.user_id){
				this.user_id = e.user_id
				this.isMe = true
			}
			// console.log(this.isMe)
			// 0就是正常点服务进来的，1就是预览
			if(this.status=='0'){
				uni.showLoading({
				    title: '加载中',
					mask:"true"
				});
				this.getData()
			}
			if(this.status==1){
				uni.showLoading({
				    title: '加载中',
					mask:"true"
				});
				this.detail = JSON.parse(decodeURIComponent(e.detail))
				this.myself()
			}
		},
		watch: {
		    finished () {
		      if (this.finished) {
				this.imgs = JSON.stringify(this.imgs)
				// console.log(this.imgs)
		        uni.hideLoading();
		        this.$api.sp_post({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
		          title: this.Detail.title,
		          cate_id: this.Detail.cate_id,
		          cate_pid: this.Detail.cate_pid,
				  sprice: this.Detail.sprice,
				  eprice: this.Detail.eprice,
				  province: this.Detail.province,
				  city: this.Detail.city,
				  desc: this.Detail.desc,
				  discounts: this.Detail.discounts,
				  img: this.img,
				  imgs: this.imgs,
				  id:this.id
		        }).then(res => {
				  uni.showToast({
				      title: res.data.msg,
				      mask: "true",
					  icon:'none'
				  });
		          // console.log(res)
		          if (res.data.code === '200') {
					  uni.redirectTo({
						  url:'/pagesFour/ServiceStatus/ServiceStatus?type=0'
					  })
					 
		          }
		        })
		      }
		    }
		},
		methods: {
			
			edit(){
				if(uni.getStorageSync('userId')){
					// console.log(111)
					uni.navigateTo({
						url:'/pagesFour/ServiceEdit/ServiceEdit?status=100&id=' + this.id
					})	
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
				
			},
			// 删除
			del(){
				if(uni.getStorageSync('userId')){
					Dialog.confirm({
					  title: '提示',
					  message: '您正在删除服务操作，该操作不可撤回是否确认删除。',
					  confirmButtonText:'确认'
					}).then(() => {
						this.$api.sp_del({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							id:this.id
						}).then(res=>{
							uni.showToast({
							    title: res.data.msg,
							    duration: 2000,
								icon:'none'
							})
							if(res.data.code=="200"){
								uni.redirectTo({
									url:'/pagesFour/MyService/MyService'
								})
							}
							
						})
					}).catch(() => {
					  // on cancel
					});
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
				
				
			},
			// 主图下面的图片
			sendTwo(){
				var that = this
				async function put () {
				  for (let i = 0; i < that.Detail.imgs.length; i++) {
						if(that.Detail.imgs[i].indexOf('aliyuncs.com')!=-1){
							that.imgs.push({
								 url_image:that.Detail.imgs[i]
							})
						}else{
							await  uni.uploadFile({
									  url: app.aliUrl,
									  filePath: that.Detail.imgs[i],
									  name: 'file',
									  formData: {
										key:"wx/"+"${filename}",
										signature: app.signature,
										policy:app.policy,
										OSSAccessKeyId:app.OSSAccessKeyId,
										success_action_status:'201'
									  }
							 }).then(res=>{
								 that.imgs.push({
									 url_image:res[1].data.split('<Location>')[1].split("</Location>")[0]
								 })
							 })
						}
						
						if(that.Detail.imgs.length === that.imgs.length){
							that.finished = true
						}
						  
			          }
				}
				 put()
			},
			// 立即发布
			PublishImmediately(){
				if(uni.getStorageSync('userId')){
					var that = this
					// console.log(that.Detail.img)
					if(that.Detail.img.indexOf('aliyuncs.com')!=-1){
						that.img = that.Detail.img
						setTimeout(()=>{
							that.sendTwo()
						}, 500);
						
					}else{
						Dialog.confirm({
						  title: '发布提示',
						  message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
						}).then(() => {
						  uni.showLoading({
						      title: '加载中！'
						  });
						  uni.uploadFile({
							  url: app.aliUrl,
							  filePath: that.Detail.img,
							  name: 'file',
							  formData: {
								key:"wx/"+"${filename}",
								signature: app.signature,
								policy:app.policy,
								OSSAccessKeyId:app.OSSAccessKeyId,
								success_action_status:'201'
							  }
						 }).then(res=>{
							 that.img = res[1].data.split('<Location>')[1].split("</Location>")[0]
							 setTimeout(()=>{
								 that.sendTwo()
							 }, 500);
							 
						 })
						  
						}).catch(() => {
									
						})
					}
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
				
				
			},
			// 返回上一页继续编辑
			againEdit(){
				uni.navigateBack({
				    delta: 1
				})
			},
			// 我的企业状态
			myself(){
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
						this.detail.company_id = res.data.data.id
						this.detail.company_name = res.data.data.company_name
						this.detail.tel = res.data.data.tel
						this.detail.company_logo = res.data.data.url_image
						this.$nextTick(function(){
							uni.hideLoading()
							this.Detail = this.detail
							this.finish = true
						})
					}
				})
			},
			// 跳转公司
			company(){
				if(uni.getStorageSync('userId')){
					if(this.status==0){
						uni.navigateTo({
							url:'/pagesTwo/MyBusiness/MyBusiness?id='+this.Detail.company_id
						})
					}
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
				
			},
			// 开通
			pay(){
				if(this.status==0){
					if(uni.getStorageSync('userId')){
						if(uni.getStorageSync('setInfo') ===0){
							uni.showToast({
							    title: '请完善个人信息',
							    duration: 2000,
								icon:'none'
							});
							
							setTimeout(function() {
								uni.navigateTo({
									url:'/pages/PersonalIdcard/PersonalIdcard'
								})
							}, 1000);
							
						}else{
							if (uni.getStorageSync('isVip') === 0) {
								Dialog.confirm({
								  title: '提示',
								  message: '您要开通vip吗？',
								  confirmButtonText:'立即开通'
								}).then(() => {
									uni.navigateTo({
										url:'/pagesMy/pay/pay'
									})
								}).catch(() => {
								  // on cancel
								});
							  } 
						}
						
					}else{
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.showToast({
						    title: '请登录',
						    duration: 2000,
							icon:'none'
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 1000);
					}
				}
				
			},
			tel(){
				if(uni.getStorageSync('userId')){
					uni.makePhoneCall({
						phoneNumber:this.Detail.tel,
						success:()=>{
							this.$api.sp_add_count({
								id:this.id
							}).then(res=>{
								this.Detail.contact++
							})
						}
					})
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
				
			},
			// 收藏
			vote(){
				if(uni.getStorageSync('userId')){
					// 0就是没关注要关注
					if(this.is_collect==0){
						this.$api.collect_sp({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							type:1,
							id:this.id
						}).then(res=>{
							// console.log(res)
							if(res.data.code=="200"){
								uni.showToast({
								    title: '收藏成功',
								    duration: 2000,
									icon:'none'
								});
								this.is_collect = 1
								this.Detail.collect++
							}
						})
					}else{
						this.$api.collect_sp({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							type:0,
							id:this.id
						}).then(res=>{
							if(res.data.code=="200"){
								uni.showToast({
								    title: '取消收藏',
								    duration: 2000,
									icon:'none'
								});
								this.is_collect = 0
								this.Detail.collect--
							}
						})
					}
					
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
			},
			// 获取详情
			getData(){
				this.$api.sp_detail({
					token: uni.getStorageSync("token")||'',
					user_id: uni.getStorageSync("userId")||'',
					id:this.id
				}).then(res=>{
					uni.hideLoading()
					
					if(res.data.code=="200"){
						this.Detail = res.data.data.data
						this.is_collect = res.data.data.is_collect
						// console.log(this.Detail.imgs)
						this.$nextTick(()=>{
							this.finish = true
						})
					}else if(res.data.code=="40010"){
						uni.showToast({
						    title: res.data.msg,
						    mask: "true",
							icon:'none'
						});
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1500);
					}
				})
			},
		}
	}
</script>

<style>
	@import url("../../pagesMy/SmallStretchPvw/SmallStretchPvw.css");
	@import url("./ServiceDetails.css");
</style>
