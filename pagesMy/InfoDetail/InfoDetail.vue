<template>
	<view class="wrap1" style="
	padding-bottom: 88upx;box-sizing: border-box;">
		<!-- 视频或者是图文的 -->
		<!-- 显示不是视频的 -->
		<view class="information">
			<view style="padding-top: 30upx;width: 100%;" v-if="kind== 0" >
				<!-- 头像名字 -->
				<view class="flex justify-center align-center top"  style="padding: 0 3%;">
					<view class="re newAvatar" @click.stop="MyInfo(item.user_id)">
						<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
						<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
					</view>
					
					
					<view style="flex: 1;" class="flex flex-d justify-around" @click.stop="MyInfo(item.user_id)">
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
					
					<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg()">
						<van-icon name="arrow-down" />
						<van-transition :show=" n==1" custom-class="block" >
						  <view class="jubaobtn">
						  	<view class="" v-if="item.is_creator == 1" @click.stop="del_zixun2(item)">
						  		删除
						  	</view>
						  	<view class="" v-if="item.is_creator == 0">
							
						  		<text v-show="item.is_report==0" @click.stop="jubao_zixun2(item)">举报</text>
								<text v-show="item.is_report==1">已举报</text>
						  	</view>
						  </view>
						</van-transition>
					</view>			
								
				</view>
				<!-- 描述 -->
				<view  class="oldContent" style="padding: 0 3%;" :class="{newContent:item.btn}">
					{{item.content}}
				</view>
				<!-- 全文那个 showTotalBtn-->
				<view class="" v-if="item.content.length>63">
					<view class="quanwen" v-if="item.btn" @click.stop="all(item)">
						全文
					</view>
					<view class="quanwen" v-else @click.stop="pack(item)">
						收起
					</view>
				</view>
				
				<view class="flex flex-wrap " style="padding-top: 20upx;" v-if="item.images.length>1">
					<image :src="img.src" mode="aspectFill" lazy-load="true" v-for="(img,index1) in item.images"  :key="index1" style="
					width: 226upx;height: 226upx;
					margin-bottom: 14upx;
					margin-left: 18upx;
					display: block;
					" @click.prevent.stop="preview(index1,item.images)"></image>
				</view>
				<view class="flex flex-wrap  zhuijia " style="padding: 20upx 30upx 0;" v-if="item.images.length==1">
					<image :src="img.src" mode="widthFix" lazy-load="true" v-for="(img,index1) in item.images"  :key="index1" style="
					margin-bottom: 14upx;
					display: block;
					" @click.prevent.stop="preview(index1,item.images)"></image>
				</view>
				<!-- 时间 -->
				<view class="flex justify-between time border-bottom-new1" >
					<view class="" v-if="item.created_at.length>0">
					{{item.created_at}}
						<!-- {{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}} -->
					</view>
				</view>
				<!-- 点赞转发 -->
				<view class="flex justify-between align-center" style="padding: 10upx 0px;">
					<view class="clint linshi re">
						<button  class="flex align-center diybtn justify-center" open-type="share" style="background-color: white;" 
						:data-id="item.id" :data-img="item.images[0].src" :data-title="item.content">
							<van-icon name="share" size="16px"  style="margin-right:10upx" />
							
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.transpond}}
							</view>
						</button>
					</view>
					
					<view class="flex align-center clint justify-center linshi re" >
						<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
						<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
							{{item.comments}}
						</view>
					</view>
					
					
					<view class="flex align-center clint justify-center linshi re" @click.stop="praise">
						<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
						<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
							{{item.upvotes}}
						</view>
					</view>
					
					<view class="clint" @click.stop="tiao(item.id)" style="text-align: center;">
						点赞列表
					</view>
				</view>
			</view>
			
			
			<!-- 显示是视频的 -->
			
			<view style="padding-top: 30upx;width: 100%;" v-else>
				<!-- 头像名字 -->
				<view class="flex justify-center align-center top"  style="padding: 0 3%;">
					<view class="re" @click.stop="MyInfo(item.user_id)">
						<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
						<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
					</view>
					
					
					<view style="flex: 1;" class="flex flex-d justify-around" @click.stop="MyInfo(item.user_id)">
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
					
					<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg()">
						<van-icon name="arrow-down" />
						<van-transition :show=" n==1" custom-class="block" >
						  <view class="jubaobtn">
						  	<view class="" v-if="item.is_creator == 1" @click.stop="del_zixun2(item)">
						  		删除
						  	</view>
						  	<view class="" v-if="item.is_creator == 0">
							
						  		<text v-show="item.is_report==0" @click.stop="jubao_zixun2(item)">举报</text>
								<text v-show="item.is_report==1">已举报</text>
						  	</view>
						  </view>
						</van-transition>
					</view>			
								
				</view>
				<!-- 描述 -->
				<view  class="oldContent" style="padding: 0 3%;"  :class="{newContent:item.btn}">
					{{item.content}}
				</view>
				<!-- 全文那个 showTotalBtn-->
				<view class="" v-if="item.content.length>63">
					<view class="quanwen" v-if="item.btn" @click.stop="all(item)">
						全文
					</view>
					<view class="quanwen" v-else @click.stop="pack(item)">
						收起
					</view>
				</view>
				
				<!-- 图片 -->
				<!-- 视频 -->
				<view class="zhuijia" style="padding-top: 20upx; width: 100%;height:388upx;margin-bottom: 20upx;" v-if="item.images[0]">
					<video :id="'tui'+index" :src="item.images[0].src"  page-gesture="true" controls="true" :poster="item.cover_url" style="width: 100%;height: 100%;"
					objectFit="cover"
					></video>
				</view>
				<!-- 时间 -->
				<view class="flex justify-between time border-bottom-new1" >
					<view class="" v-if="item.created_at.length>0">
					{{item.created_at}}
						<!-- {{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}} -->
					</view>
				</view>
				<!-- 点赞转发 -->
				<view class="flex justify-between align-center" style="padding: 10upx 0px;">
					<view class="clint linshi re">
						<button  class="flex align-center diybtn justify-center" open-type="share" style="background-color: white;" 
						:data-id="item.id" :data-img="item.images[0].src" :data-title="item.content">
							<van-icon name="share" size="16px"  style="margin-right:10upx" />
							
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.transpond}}
							</view>
						</button>
					</view>
					
					<view class="flex align-center clint justify-center linshi re" >
						<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
						<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
							{{item.comments}}
						</view>
					</view>
					
					
					<view class="flex align-center clint justify-center linshi re" @click.stop="praise">
						<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
						<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
							{{item.upvotes}}
						</view>
					</view>
					
					<view class="clint" @click.stop="tiao(item.id)" style="text-align: center;">
						点赞列表
					</view>
				</view>
			</view>

		</view>
		<!-- 评论 -->
		<view class="comment">
			<view class="title">
				全部{{comments.length}}条评论
			</view>
			<view class="content5 flex " v-for="(item,index) in comments" :key="index" >
				<view class="img re" @click="info(item.user_id)">
					<image :src="item.avatar" mode="aspectFill" lazy-load="true" ></image>
					<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
				</view>
				
				<view class="" style="flex: 1;">
					<view class="flex justify-between" style="
					font-size: 26upx;
					line-height: 48upx;
					color: #939393;
					margin-bottom: 10upx;">
						<view style=" overflow: hidden;text-overflow: ellipsis; white-space: nowrap; width: 400upx;" @click="info(item.user_id)">
							{{item.nickname}} 
							<text v-show="item.company && item.job">• {{item.job}} {{item.company}}</text>
						</view>
						
						<view class="" v-if="item.user_id=== user" @click.stop="del_zixun(item)">
							删除
						</view>
						<view class="" v-else>
							<view class="" v-if="item.is_report ==0" @click.stop="jubao_zixun(item)">
								举报
							</view>
							<view class="" v-else>
								已举报
							</view>
						</view>
					</view>
					
					<view >
						<view style="font-size: 14px;color: #333;line-height: 20px;display: block;text-align: justify;word-break: break-all;margin-bottom: 5px;">
							<text v-if="item.reply_name" style="color: #064DC5;">@{{item.reply_name}}:</text>{{item.content}}
						</view>
						
						
					</view>
					
					<view class="flex justify-between">
						<view style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);line-height:16px;flex: 1;">
							{{item.created_at.split(' ')[0].split('-')[1]}}.{{item.created_at.split(' ')[0].split('-')[2]}}
							
							{{item.created_at.split(' ')[1].split(':')[0]}}:{{item.created_at.split(' ')[1].split(':')[1]}}
						</view>
						
						<view class="" style="font-size:12px;font-weight:400;color:rgba(6,77,197,1);line-height:20px;margin-left: 10px;" @click.stop="reply(item,index)" v-if="item.user_id != user">
							回复
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下方发布内容 -->
		<view class="issue align-center">
			<input type="text" placeholder='请输入您的想法吧' v-model="thought"  :focus="inputShowed" confirm-type="send"/>
			<view class="btn" @click="send">
				发布
			</view>
		</view>
		<van-dialog id="van-dialog" />
		
		
	</view>
</template>

<script>
	var app = getApp().globalData
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				inputShowed:false,
				place:'请输入您的想法吧',
				reply_id:'',
			    user:'',
			    n:1000000,
			    msgShow:false,
			    item:{},
			    kind:'',
			    year:'',
			    time1:'',
			    time2:'',
			    id:'',//帖子的id
			    detail: {},
			    isPraise: false,
			    thought: '',
			    isFinish: false,
			    comments: [], // 评论列表
			    upvotes: 0,
			    avatar: [],
			    isDetail: false, // 可以查看
			    isDelete: false // 被删除了
			}
		},
		onShow() {
			this.getList()
			this.getData()
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中'
			});
			this.id = e.id
			this.user = uni.getStorageSync("userId")
		},
		onShareAppMessage:function(res) {
			this.$api.reports_transpond({
				token: uni.getStorageSync("token"),
				user_id: uni.getStorageSync("userId"),
				id:this.item.id
			}).then(res1=>{
				this.item.transpond++
			})
		    if (res.from === 'button') {// 来自页面内分享按钮
				return {
				  title: res.target.dataset.title?res.target.dataset.title.substring(0,30)+'...':'德申汇资讯圈详情',
				  imageUrl:res.target.dataset.img?res.target.dataset.img:app.shareImg,
				  path: '/pagesMy/InfoDetail/InfoDetail?id='+res.target.dataset.id
				}
		    }
			if(this.item.kind == 0){
				return {
				  title: this.item.content?this.item.content.substring(0,30)+'...':'资讯圈详情',
				  imageUrl:this.item.images[0].src?this.item.images[0].src:app.shareImg,
				  path: '/pagesMy/InfoDetail/InfoDetail?id='+this.item.id
				}
			}else{
				return {
				  title: this.item.content?this.item.content.substring(0,30)+'...':'资讯圈详情',
				  imageUrl:this.item.cover_url?this.item.cover_url:app.shareImg,
				  path: '/pagesMy/InfoDetail/InfoDetail?id='+this.item.id
				}
			}
		    
		},
		methods: {
			reply(it,ind){
				if(uni.getStorageSync('userId')){
					this.reply_id = it.user_id
					this.inputShowed = true
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
			// 跳转个人主页
			MyInfo(id){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'../../pagesMy/MyInfo/MyInfo?id='+id
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
			// 点赞
			praise(){
				if(uni.getStorageSync('userId')){
					if (this.item.is_upvotes) {
					       this.$api.NewsUpvotes({
					         token: uni.getStorageSync("token"),
					         user_id: uni.getStorageSync("userId"),
					         id: this.item.id
					       }).then(res => {
								  this.item.is_upvotes = false
								  this.item.upvotes --
								  uni.setStorageSync('unpraiseid',this.id)
								  uni.removeStorageSync('praiseid')
								  uni.showToast({
									title: res.data.msg,
									duration: 2000,
									icon:'none'
								  });
					
					       })
					     } else {
					       this.$api.NewsUpvotes({
					         token: uni.getStorageSync("token"),
					         user_id: uni.getStorageSync("userId"),
					         id: this.item.id
					       }).then(res => {
							  this.item.is_upvotes = true
							  this.item.upvotes ++
							  uni.setStorageSync('praiseid',this.id)
							  uni.removeStorageSync('unpraiseid')
							  uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon:'none'
							  });						
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
			// 展开全文
			all(it){
				it.btn = false
			},
			// 收起
			pack(it){
				it.btn = true
			},
			// 删除自己的评论
			del_zixun(it){
				if(uni.getStorageSync('userId')){
					Dialog.confirm({
					  title: '提示',
					  message:'您确定删除吗？'
					}).then(() => {
						// 删除评论
						this.$api.NewsUserDynamicsCommentsDel({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							id:it.id
						}).then(res=>{
							if (res.data.code === '200') {
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000,
									icon:'none'
								});
							  
							  this.getList()
							} else {
							  uni.showToast({
							      title: res.data.msg,
							      duration: 2000,
							  	icon:'none'
							  });
							  this.getList()
							}
							
						})
					  
					}).catch(() => {
					  
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
			// 举报评论
			jubao_zixun(item){
				uni.navigateTo({
					url:'../../pagesMy/Report/Report?type=2&id='+item.id
				})
			},
			// 显示举报或者删除、
			Msg(){
				if(uni.getStorageSync('userId')){
					if(this.n === 1){
						this.n = 1000000
					}else{
						this.n = 1
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
			// 跳到点赞列表
			tiao(id){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'../../pagesMy/PraiseList/PraiseList?id='+id
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
			// 发表评论
			send () {
				 if(uni.getStorageSync('userId')){
				 	if (this.thought.length && this.thought.trim().length) {
				 	  this.$api.comment_add({
				 	   token: uni.getStorageSync("token"),
				 	   user_id: uni.getStorageSync("userId"),
				 	   id: this.id,
				 	   content: this.thought,
				 						 reply_id:this.reply_id
				 	  }).then(res => {
				 	    if (res.data.code === '200') {
				 	      uni.showToast({
				 	      		title: res.data.msg,
				 	      		duration: 2000,
				 	      		icon:'none'
				 	      });
				 							this.reply_id = ''
				 	      this.thought = ''
				 	      this.getList()
				 	    } else if (res.data.code === '1073') {
				 	      uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none'
				 	      });
				 	    }
				 	  })
				 	  // }
				 	} else {
						   uni.showToast({
								title: '评论内容不可为空',
								duration: 2000,
								icon:'none'
						   });
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
			// 评论跳转个人首页
			info(id){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'../../pagesMy/MyInfo/MyInfo?id='+id
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
			// 图片预览
			preview(ind,img){
				 var arr = []
				 img.forEach((item,index)=>{
					 arr.push(item.src)
				 })
				 
				  uni.previewImage({
					 urls: arr,
					 current:ind
				 });
			},
			// 获取详情数据
			   getData () {
			      this.$api.NewsUserDynamicsDetail({
			        token: uni.getStorageSync("token")|| '',
			        user_id: uni.getStorageSync("userId")|| '',
			        id: this.id
			      }).then(res => {
			        if (res.data.code === '200') {
						if(res.data.data.content.length>63){
							res.data.data.btn = true
						}else{
							res.data.data.btn = false
						}
					  this.item = res.data.data
			          this.detail = res.data.data // 信息
			          this.upvotes = res.data.data.upvotes // 点赞数量
			          this.avatar = res.data.data.upvotes_avatar // 头像列表
			          this.isPraise = res.data.data.is_upvotes // 是否点赞
					  this.kind = res.data.data.kind
					  uni.hideLoading();
			       
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
			    },
			// 获取评论列表
			getList () {
			      this.$api.comment_list({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        id: this.id
			      }).then(res => {
			        this.comments = res.data.data
			      })
			},
		  // 删除自己的资讯圈
		  del_zixun2(it){
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
		  			// this.listtui = this.listtui.filter((item,index) => item.id != it.id)
		  			// this.listguan = this.listguan.filter((item,index) => item.id != it.id)
		  			// this.listv = this.listv.filter((item,index) => item.id != it.id)
					if (res.data.code === '200') {
						  uni.setStorageSync('delid',it.id)
						  uni.switchTab({
							url:'../../pages/information/information'
						  })
					}
		  		})
		  	  
		  	}).catch(() => {
		  	  
		  	});
		  		
		  },
		  // 举报资讯圈
		  jubao_zixun2(item){
		  	uni.navigateTo({
		  		url:'../../pagesMy/Report/Report?type=1&id='+item.id +'&abc=5'
		  	})
		  },
		}
	}
</script>

<style>
	@import url("./InfoDetail.css");
</style>
