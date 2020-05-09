<template>
	<view class="wrap1" >
		
		<view class="">
			<view class="information" v-for="(item,index) in list" :key="index" >
				<!-- 显示不是视频的 -->
				<view style="padding-top: 30upx;width: 100%;" v-if="item.kind=== 0" >
					<!-- 头像名字 -->
					<view class="flex justify-center align-center top"  style="padding: 0 3%;">
						<view class="re" @click.stop="MyInfo(item.user_id)">
							<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
						</view>
						
						
						<view style="flex: 1;" class="flex flex-d justify-around">
								<view class="nick flex align-center">
									<view class="nickname">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view>
								
								<view class="company" v-show="item.company!==null">
									<text v-if="item.job">{{item.job}}</text><text v-if="item.job" style="margin: 0 3px;">I</text><text>{{item.company}}</text>
								</view>
						</view>
						
						<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg(item,index)">
							<van-icon name="arrow-down" />
							<van-transition :show="n===index" custom-class="block" >
							  <view class="jubaobtn">
							  	<view class="" v-if="item.is_creator === 1" @click.stop="del_zixun(item,index)">
							  		删除
							  	</view>
							  	<view class="" v-if="item.is_creator === 0">
									<!-- item.is_report -->
							  		<text v-show="item.is_report===0" @click.stop="jubao_zixun(item,index)">举报</text>
									<text v-show="item.is_report===1">已举报</text>
							  	</view>
							  </view>
							</van-transition>
						</view>			
									
					</view>
					<!-- 描述 -->
					<view  class="content" style="padding: 0 3%;" @click="detail(item.id)" :class="item.btn==true?item.cl:''">
						{{item.content}}
					</view>
					<!-- 全文那个 showTotalBtn-->
					<!-- <view class="" v-if="item.showTotalBtn==true">
						<view class="quanwen" v-if="item.all" @click.stop="all(item,index)">
							全文
						</view>
						<view class="quanwen" v-else @click.stop="pack(item,index)">
							收起
						</view>
					</view> -->
					
					<!-- 图片 -->
					<view class="flex flex-wrap  zhuijia " style="padding-top: 20upx;" v-if="item.image.length>1">
						<image :src="img" mode="aspectFill" lazy-load="true" v-for="(img,index1) in item.image"  :key="index1" style="
						width: 226upx;height: 226upx;
						margin-bottom: 14upx;
						margin-left: 18upx;
						display: block;
						" @click.prevent.stop="preview(index1,item.image)"></image>
					</view>
					<view class="flex flex-wrap  zhuijia " style="padding: 20upx 30upx 0;" v-if="item.image.length==1">
						<image :src="img" mode="widthFix" lazy-load="true" v-for="(img,index1) in item.image"  :key="index1" style="
						margin-bottom: 14upx;
						display: block;
						" @click.prevent.stop="preview(index1,item.image)"></image>
					</view>
					<!-- 时间 -->
					<view class="flex justify-between time border-bottom-new1 "  :class="{newtime:item.image.length==0}" @click="detail(item.id)">
						<view class="">
							{{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}}
						</view>
						<view style="padding-right: 15px;color: #ffff00;" v-if="item.status == 0 && isMe">
							审核中
						</view>
						<view style="padding-right: 15px;color: #0055ff;" v-if="item.status == 2 && isMe">
							审核失败
						</view>
					</view>
					<!-- 点赞转发 -->
					<view class="flex justify-between align-center" style="padding: 5px 60upx;">
						<view >
							<button  class="flex align-center diybtn" open-type="share" style="background-color: white;" 
							:data-id="item.id" :data-img="item.image[0]" :data-title="item.content">
								<van-icon name="share" size="16px"  style="margin-right:10upx" />
								
								<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
									{{item.transpond}}
								</view>
							</button>
						</view>
						
						<view class="flex align-center" @click="detail(item.id)">
							<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.comments}}
							</view>
						</view>
						
						
						<view class="flex align-center" @click.stop="praise(item)">
							<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.upvotes}}
							</view>
						</view>
						
					</view>
				</view>
				
				<!-- 显示是视频的 -->
				<view style="padding: 30upx 3% 0;width: 100%;" v-if="item.kind=== 1 && item.image">
		
					<!-- 头像名字 -->
					<view class="flex justify-center align-center top"  style="padding: 0 3% 0 0;">
						<view class="re" @click.stop="MyInfo(item.user_id)">
							<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
						</view>
						
						
						<view style="flex: 1;" class="flex flex-d justify-around">
								<view class="nick flex align-center">
									<view class="nickname">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view>
								
								<view class="company" v-show="item.company!==null">
									<text v-if="item.job">{{item.job}}</text><text v-if="item.job" style="margin: 0 3px;">I</text><text>{{item.company}}</text>
								</view>
						</view>
						
						<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg(item,index)">
							<van-icon name="arrow-down" />
							<van-transition :show="n===index" custom-class="block" >
							  <view class="jubaobtn">
							  	<view class="" v-if="item.is_creator === 1" @click.stop="del_zixun(item,index)">
							  		删除
							  	</view>
							  	<view class="" v-if="item.is_creator === 0">
									<!-- item.is_report -->
							  		<text v-show="item.is_report===0" @click.stop="jubao_zixun(item,index)">举报</text>
									<text v-show="item.is_report===1">已举报</text>
							  	</view>
							  </view>
							</van-transition>
						</view>			
									
					</view>
					<!-- 描述 -->
					<view  class="content"  @click="detail(item.id)" :class="item.btn==true?item.cl:''">
						{{item.content}}
					</view>
					<!-- 全文那个 showTotalBtn-->
					<!-- <view class="" v-if="item.showTotalBtn==true">
						<view class="quanwen" v-if="item.all" @click.stop="all(item,index)">
							全文
						</view>
						<view class="quanwen" v-else @click.stop="pack(item,index)">
							收起
						</view>
					</view> -->
					<!-- 视频 -->
					<!-- <view class="zhuijia" style="padding-top: 20upx; width: 100%;height:388upx;margin-bottom: 20upx;" v-if="item.image.length>0">
						<video :id="'tui'+index" :src="item.image[0]"  controls="true"  style="width: 100%;height: 100%;"
						@play="video_play" objectFit="cover"
						></video>
					</view> -->
					
					<view class="cover" :class="item.size.height>item.size.width?'long':'short'" v-if="indexCurrent == 'tui'+index">
					    <video :id="'tui'+index" :src="item.image[0]" v-if="indexCurrent == 'tui'+index"  custom-cache="false" objectFit="cover" style="width: 100%;height: 100%;" autoplay="true"></video>
					</view>
					<view class="cover" v-else @click.stop="videoPlay('tui'+index)" :class="item.size.height>item.size.width?'long':'short'">
						<van-icon name="play-circle-o"/>
					    <image :src="item.cover_url" mode="scaleToFill"></image>
					</view>
					
					
					<!-- 时间 -->
					<view class="flex justify-between time border-bottom-new1" @click="detail(item.id)" style="padding: 0 0 8px 0%">
						<view class="">
							{{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}}
						</view>
						<view style="padding-right: 15px;color: #ffff00;" v-if="item.status == 0 && isMe">
							审核中
						</view>
						<view style="padding-right: 15px;color: #0055ff;" v-if="item.status == 2 && isMe">
							审核失败
						</view>
					</view>
					<!-- 点赞转发 -->
					<view class="flex justify-between align-center" style="padding: 5px 60upx;">
						<view>
							<button  class="flex align-center diybtn" open-type="share" style="background-color: white;"
							:data-id="item.id" :data-img="item.cover_url" :data-title="item.content">
								<van-icon name="share" size="16px"  style="margin-right:10upx" />
								<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
									{{item.transpond}}
								</view>
							</button>
						</view>
						
						<view class="flex align-center" @click="detail(item.id)">
							<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.comments}}
							</view>
						</view>
						
						
						<view class="flex align-center" @click.stop="praise(item)">
							<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.upvotes}}
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="LuDingJi-no" v-if="list.length===0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
			<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
				<image src="https://web.detion.com/static/img/empty_info.png" lazy-load="true"  mode="aspectFill"></image>
			</view>
			<view class="LuDingJi-no-con">
				暂无发布资讯圈
			</view>
		</view>
		
		<view  class="noMore1" v-if="showTitle&&list.length>0">
				暂无更多内容
		</view>
		<view style="height: 88upx;display: flex;  width: 100%;" v-if="loading">
			   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
		</view>
		<van-dialog id="van-dialog" />
		
		<!-- 下面的发布 -->
		<view class="gotoTop" v-if="isMe"  style="width: 110upx;height: 110upx;">
		        <view class="gotoTop-send"  @click="Issue" >
					<van-icon name="records" size="20px"/>
					<view>
						发布
					</view>
		        </view>
		</view>
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				  id:'',//路由传过来的用户userid看是自己点的自己还是点的别人的
				  list: [],
				  page: 1, // 关注当前页
				  hasMore: false, // 提示暂无更多,
				  allLoaded: false, // 分页加载
				  isMe: false,
				  page_id: '',
				  loading:false,
				  allowload:false,
				  isPraise: false,
				  detailId:'',
				  showNum:60,
				  n:1000000,
				  indexCurrent:null,
				  showTitle:false
			}
		},
		// onShareAppMessage(res) {
		// 	this.$api.reports_transpond({
		// 		token: uni.getStorageSync("token"),
		// 		user_id: uni.getStorageSync("userId"),
		// 		id:res.target.dataset.id
		// 	}).then(res=>{
		// 		// console.log(res)
		// 	})
		//     if (res.from === 'button') {// 来自页面内分享按钮
		//     }
		//     return {
		//       title: res.target.dataset.title,
		// 	  imageUrl:res.target.dataset.img,
		// 	  path: '/pagesMy/InfoDetail/InfoDetail?id='+res.target.dataset.id
		//     }
		// },
		onReachBottom(){
			if(this.allowload){
				// console.log(1)
				this.allowload = false				
				if(this.list.length>0){
					this.page_id = this.list[this.list.length-1].id
				}
				this.loading = true
				this.getData()
				// setTimeout(() => {
					
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
		},
		onPullDownRefresh(){
			this.page_id = ''
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
		onShow() {
			// if(this.indexCurrent){
			// 	var videoContextPrev = uni.createVideoContext(this.indexCurrent)
			// 	videoContextPrev.pause()
			// }
			this.indexCurrent = null
			// 控制举报的
			if(uni.getStorageSync('reportid')){
				this.list.forEach((item,index)=>{
					if(uni.getStorageSync('reportid') == item.id){
						item.is_report = 1
					}
				})
				setTimeout(function() {
					uni.removeStorageSync('reportid')
				}, 1500);
			}
			// 详情删除,需要到界面过滤出去
			if(uni.getStorageSync('delid')){
				this.list = this.list.filter((item,index) => item.id != uni.getStorageSync('delid'))
				setTimeout(function() {
					uni.removeStorageSync('delid')
				}, 1500);
			}
			
			// 详情点赞之后回到界面需要显示已经点赞
			if(uni.getStorageSync('praiseid')){
				console.log(uni.getStorageSync('praiseid'))
				this.list.forEach((item,index)=>{
					if(uni.getStorageSync('praiseid') == item.id){
						item.is_upvotes = true
						item.upvotes++
					}
				})
				
				setTimeout(function() {
					uni.removeStorageSync('praiseid')
				}, 1500);
			}
			
			if(uni.getStorageSync('unpraiseid')){
				this.list.forEach((item,index)=>{
					if(uni.getStorageSync('unpraiseid') == item.id){
						item.is_upvotes = false
						if(item.upvotes>0){
							item.upvotes--
						}
						
					}
				})
				setTimeout(function() {
					uni.removeStorageSync('unpraiseid')
				}, 1500);
			}
		},
		onHide() {
			this.n = 1000000
			if(this.indexCurrent){
				var videoContextPrev = uni.createVideoContext(this.indexCurrent)
				videoContextPrev.pause()
			}
			
		},
		onLoad(e) {
			
			uni.showLoading({
			    title: '加载中'
			});
			
			// 这个是点击他的资讯圈或者是我的资讯圈带过来的 那个人的id
			this.id = e.id
			
			if (e.id != uni.getStorageSync('userId')) {
			      this.isMe = false
			    } else {
			      this.isMe = true
			 }
			 this.getData()

		},
		methods: {
			// 发布
			Issue(){
				uni.navigateTo({
					url:'../../pagesMy/informationSend/informationSend'
				})
			},
			// 视频播放
			videoPlay(e){
				this.indexCurrent=e
			},
			// 视频播放
			video_play(e){
				// console.log(e)
				var curIdx = e.currentTarget.id;
				      // 没有播放时播放视频
				      // console.log(curIdx)
				      if (!this.indexCurrent) {				        
				        this.indexCurrent=curIdx
				        var videoContext = uni.createVideoContext(curIdx) //这里对应的视频id
				        videoContext.play()
				      } else { // 有播放时先将prev暂停，再播放当前点击的current
				        var videoContextPrev = uni.createVideoContext(this.indexCurrent)//this是在自定义组件下，当前组件实例的this，以操作组件内 video 组件（在自定义组件中药加上this，如果是普通页面即不需要加）
				        if (this.indexCurrent != curIdx) {
				          // console.log(123)
				          videoContextPrev.pause()
				          this.indexCurrent=curIdx				          
				          var videoContextCurrent = uni.createVideoContext(curIdx)
				          videoContextCurrent.play()
				        }
				}
			},
			// 删除自己的资讯圈
			del_zixun(it,index){
				Dialog.confirm({
				  title: '提示',
				  message:'您确定删除吗？'
				}).then(() => {
					this.$api.del_user_dynamic({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						dynamic_id:it.id
					}).then(res=>{
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000,
							icon:'none'
						});
						this.list = this.list.filter((item,index) => item.id != it.id)
					})
				  
				}).catch(() => {
				  
				});
					
			},
			// 举报资讯圈
			jubao_zixun(item,index){
				uni.navigateTo({
					url:'../../pagesMy/Report/Report?type=1&id='+item.id +"&person=222"
				})
			},
			// 显示举报或者删除、
			Msg(item,ind){
				if(this.n === ind){
					this.n = 1000000
				}else{
					this.n = ind
				}
			},
			// 获取头像列表,看点赞人用的
			getAvatar () {
			      this.$api.NewsUpvotesAvatar({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        id: this.id
			      }).then(res => {
			        if (res.data.code === '200') {
			          // this.upvotes = res.data.data.upvotes // 点赞数量
			          this.isPraise = res.data.data.is_upvotes // 是否点赞
			        }
			      })
			},
			// 详情
			detail(id){
				this.detailId = id
				uni.navigateTo({
					url:'../../pagesMy/InfoDetail/InfoDetail?id='+id
				})
			},
			// 跳转个人主页
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			 // 图片预览
			preview(ind,img){
				  uni.previewImage({
					 urls: img,
					 current:ind
				 });
			},
			  // 点赞
			praise(item){
				   if (item.is_upvotes) {
				          this.$api.NewsUpvotes({
				            token: uni.getStorageSync("token"),
				            user_id: uni.getStorageSync("userId"),
				            id: item.id
				          }).then(res => {
				            // this.$toast(res.msg)
							uni.showToast({
							    title: res.data.msg,
							    duration: 2000,
								icon:'none'
							});
				            item.is_upvotes = false
				            item.upvotes = item.upvotes - 1
				          })
				        } else {
				          this.$api.NewsUpvotes({
				            token: uni.getStorageSync("token"),
				            user_id: uni.getStorageSync("userId"),
				            id: item.id
				          }).then(res => {
				            uni.showToast({
				                title: res.data.msg,
				                duration: 2000,
				            	icon:'none'
				            });
				            item.is_upvotes = true
				            item.upvotes = item.upvotes + 1
				          })
				 }     
			},
			getData () {
			      this.$api.MyselfUserDynamics({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        other_id: this.id,
			        page_id: this.page_id
			      }).then(res => {
					  console.log(res)
					  uni.hideLoading();
			        if (res.data.code === '200') {					
			            if(!this.page_id){
							this.list = res.data.data
			            	if(res.data.data.length>=10){
			            		this.allowload = true
			            	}else{
			            		this.showTitle = true
			            		this.allowload = false
			            	}														
			            }else{
							this.list = this.list.concat(res.data.data)
			            	if(res.data.data.length>=10){
			            		this.allowload = true
			            	}else{
			            		this.allowload = false
								this.showTitle = true
			            	}	
			            }
						this.loading = false
			        } else if (res.data.code === '1000') {
			          uni.clearStorageSync()
			          uni.showToast({
			              title: '登录过期，请重新登录',
			              duration: 2000,
			          	icon:'none'
			          });
			          
			          uni.reLaunch({
			          	url: '../../pages/login/login'
			          })
			        
					}
					 
			    })
			}
		}
	}
</script>

<style>
	@import url("./MyInformation.css");
	@import url("../../pages/information/information.css");
</style>
