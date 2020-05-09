<template>
	<view style="position: absolute;width: 100%;height: 100%;" class="flex flex-d">
		<!-- 头部选项卡 -->
		<view class="flex align-center justify-around border-bottom-new2" style="padding: 0 10px;width: 100%;height: 44px;">
			<view v-for="(item,index) in tablist" :key="index" :class="tabindex===index?'tabActive':''" @click="tab(index)">
				{{item}}
			</view>
		</view>
		
		<view class="" style="flex: 1;position: relative;padding: 0 10px;">
			<swiper class="swiper"  style="height: 100%;" :current="tabindex" @change="changeSwiper">
				<!-- 第一个 =============================================================================================================-->
				<swiper-item>
					<view style="height: 100%;">
						<scroll-view scroll-y="true" class="scroll-Y"  style="height: 100%;" :enable-back-to-top="true" upper-threshold="2" @scrolltoupper="topvote" v-if="voteList.length>0" lower-threshold='5' @scrolltolower="bottomvote">
							<view style="height: 88upx;background-color: white; display: flex;  width: 100%;" v-if="votetop">
								 <van-loading size="24px"  type="spinner" style="margin: auto;">下拉刷新中...</van-loading>
							</view>
							<view class="b-line re" style="padding: 30upx 0 18upx;" v-for="(item,index) in voteList" :key="index">
								<view class="flex" style="margin-bottom: 28upx;" @click.stop="MyInfo(item.user_id)">
														
									<view  style="width: 80upx;height: 80upx;" class="re">
										<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" style="height: 100%; width: 100%;border-radius: 50%;"></image>
										<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
									</view>					
									
									<view  style="flex: 1; margin-left: 20upx;">
										<view class="name flex justify-between align-center">
											<view class="flex align-center">
												<view class="newName">
													{{item.nickname}}
												</view>
												<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
											</view>
											<view style="width: 23px;height: 13px;border: 1px solid #dfdfdf;border-radius: 10px;line-height: 9px;font-size: 10px;text-align: center;" @click.stop="del(item.id)">
												x
											</view>
										</view>
										<view class="ceo">
											<text v-if="item.job">{{item.job}}</text>
											<text style="margin: 0 4upx;" v-if="item.company"> I </text>
											<text v-if="item.company">{{item.company}}</text>
										</view>
									</view>
														
								</view>
								<view class="flex" style="width: 100%;" @click.stop="InformationDetail(item.id)">
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
						    </view>
							
							<view style="height: 88upx;background-color: white; display: flex;  width: 100%;" v-if="votebottom">
								 <van-loading size="24px"  type="spinner" style="margin: auto;">触底加载中...</van-loading>
							</view>
						</scroll-view>
						
						
						<view class="LuDingJi-no" v-if="voteList.length==0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
							<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
								<image src="https://web.detion.com/static/img/empty_fans.png" lazy-load="true"  mode="aspectFill"></image>
							</view>
							<view class="LuDingJi-no-con">
								暂无收藏
							</view>
						</view>
						<!-- <view class="emptyList flex align-center justify-center" v-if="voteList.length==0" style="position: relative;height: 180px;margin-top: 8px;padding-bottom: 0">
						      <view class="con">
						        
								<van-icon name="send-gift-o" size="60px"/>
						        <view class="text">暂未收藏项目</view>
						      </view>
						</view>	 -->
					</view>
				</swiper-item>
				<!-- 第二个 =========================================================================================================-->
				<swiper-item>
					<view style="height: 100%;">
						<scroll-view  scroll-y="true" class="scroll-Y" style="height: 100%;" :enable-back-to-top="true" upper-threshold="2" @scrolltoupper="tophis" v-if="historyList.length>0" lower-threshold='5' @scrolltolower="bottomhis">
							<view style="height: 88upx;background-color: white; display: flex;  width: 100%;" v-if="historytop">
								 <van-loading size="24px"  type="spinner" style="margin: auto;">下拉刷新中...</van-loading>
							</view>
							<view  v-for="(item1,index1) in historyList" :key="index1" class="b-line re" style="padding: 30upx 0 18upx;" @click.stop="InformationDetail(item1.id)">
								<!-- 上部分 -->
								<view class="flex" style="width: 100%;">
									<!-- 左边标题等 -->
									<view style="flex: 1;" class="flex flex-d justify-between">
										<view style="width: 100%;font-size: 15px;line-height: 24px;height: 48px;color: #333;" class="line-clamp2">
											{{item1.title}}
										</view>
										<view style="font-size: 13px;color: #999;" class="flex justify-between">
											<view class="">
												<text style="margin-right: 30upx;">{{item1.created_at.split(' ')[0]}}</text>
												<text>{{item1.click}}阅读</text>
											</view>
											
											<view class="flex justify-between align-center">
												<view>
												  <van-icon name="star-o" v-if="item1.vote_status===false" size="13px"/>
												  <van-icon name="star" color="#064DC5" v-else size="13px"/>
												</view>
												  
												<text style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);margin-left: 5px;">{{item1.like}}</text>
											</view>
										</view>
									</view>
									<!-- 右边图片 -->
									<view style="width: 100px;height: 80px;margin-left: 15px;">
										<image :src="item1.images[0].url_image" lazy-load="true" class="imga" mode="aspectFill"></image>
									</view>
								</view>
								<!-- 下部分 -->
								<view style="margin-top: 10px;justify-content: flex-end; " class="flex align-center">
									
										<text class="edit" @click.stop="edit(item1.id)">编辑</text>
										<text style="margin-left: 10px;" class="edit" @click.stop="del2(item1.id)">删除</text>
									
								</view>
							
							</view>
							
							<view style="height: 88upx;background-color: white; display: flex;  width: 100%;" v-if="historybottom">
								 <van-loading size="24px"  type="spinner" style="margin: auto;">触底加载中...</van-loading>
							</view>
						</scroll-view>
						
						
						<view class="LuDingJi-no" v-if="historyList.length==0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
							<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
								<image src="https://web.detion.com/static/img/empty_fans.png" lazy-load="true"  mode="aspectFill"></image>
							</view>
							<view class="LuDingJi-no-con">
								暂无发布历史
							</view>
						</view>
						<!-- <view class="emptyList flex align-center justify-center" v-if="historyList.length==0" style="position: relative;height: 180px;margin-top: 8px;padding-bottom: 0">
						      <view class="con">
								<van-icon name="send-gift-o" size="60px"/>
						        <view class="text">暂未发布项目</view>
						      </view>
						</view> -->
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		
		<view class="gotoTop">
		        <view class="gotoTop-send"  @click="Issue">
					<van-icon name="records" size="20px"/>
					<view style="text-align: center;">
						发布
					</view>
		        </view>
		</view>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				tabindex:0,
				tablist:['我的收藏',"发布历史"],
				voteList:[],
				votetop:false,
				voteallowtop:true,
				votebottom:false,
				voteallowbottom:false,
				voteId:'',
				historyList:[],
				historyId:'',
				historytop:false,
				historyallowtop:true,
				historybottom:false,
				historyallowbottom:false,
			}
		},
		onShow() {
			
			uni.showLoading({
			    title: '加载中'
			});
			this.voteId = ''
			this.historyId = ''
			this.getVote()
			this.getHistory()
			
		},
		onLoad(e) {
			
		},
		methods: {
			edit(id){
				uni.navigateTo({
					url:'../../pagesMy/EditMyProject/EditMyProject?id='+id
				})
			},
			// 发布
			Issue(){
				uni.navigateTo({
					url:'../../pagesMy/MyProjectChoose/MyProjectChoose'
				})
			},
			bottomhis(){
				if(this.historyallowbottom){
					this.historybottom = true
					this.historyallowbottom = false
					this.voteId = this.voteList[this.historyList.length-1].id
					setTimeout(()=> {
						this.getHistory()
					}, 1000);
					
				}
			},	
			tophis(){
				if(this.historyallowtop){
					this.historytop = true
					this.historyallowtop =false
					this.historyId=''
					this.getHistory()
				}
			},
			bottomvote(){
				if(this.voteallowbottom){
					this.votebottom = true
					this.voteallowbottom = false
					this.voteId = this.voteList[this.voteList.length-1].vote_id
					setTimeout(()=> {
						this.getVote()
					}, 1000);
					
				}
			},
			topvote(){
				if(this.voteallowtop){
					this.votetop = true
					this.voteallowtop =false
					this.voteId=''
					this.getVote()
				}
			},
			del(id){
				Dialog.confirm({
				  title: '提示',
				  message: '你确定要取消收藏吗？'
				  // confirmButtonText:'我要拨打'
				}).then(() => {
					this.voteList = this.voteList.filter((item,index)=>item.id != id)
					this.$api.Opportunity_vote({
					  user_id: uni.getStorageSync("userId"),
					  token: uni.getStorageSync("token"),
					  id:id
					}).then(res => {
						
					  if (res.data.code === '1039') {
							uni.showToast({
								title: '取消收藏成功',
								duration: 2000,
								icon:'none'
							});
						  }
					  })
					
				}).catch(() => {
				  // on cancel
				});
				
			},
			del2(id){
				Dialog.confirm({
				  title: '提示',
				  message: '你确定要删除吗？'
				  // confirmButtonText:'我要拨打'
				}).then(() => {
					
					this.$api.Opportunity_del_op({
					  user_id: uni.getStorageSync("userId"),
					  token: uni.getStorageSync("token"),
					  id:id
					}).then(res => {
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none'
						});
					  if (res.data.code === '200') {
							this.historyList = this.historyList.filter((item,index)=>item.id != id)
						  }
					  })
					
				}).catch(() => {
				  // on cancel
				});
				
			},
			// 详情
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
			// 关注的
			getVote(){
				// console.log(this.voteId)
				this.$api.myself_vote({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					page_id:this.voteId
				}).then(res=>{
					uni.hideLoading();
					if(!this.voteallowtop){
						setTimeout(()=>{
							uni.showToast({
							    title: '刷新成功',
							    duration: 1000,
								icon:'none'
							});
							this.votetop = false
							this.voteallowtop = true
						}, 2000);
					}
					if(!this.voteId){
						if(res.data.data.length>=20){
							this.voteList = res.data.data
							this.voteallowbottom = true
							
						}else{
							this.voteList = res.data.data
							this.voteallowbottom = false
						}														
					}else{
						
						if(res.data.data.length>=20){
							this.voteList = this.voteList.concat(res.data.data)
							// console.log(this.voteList)
							this.voteallowbottom = true
							setTimeout(()=>{
								uni.showToast({
								    title: '加载成功',
								    duration: 1000,
									icon:'none'
								});
								this.votebottom = false
							}, 1000);
							 
						}else{
							this.voteList = this.voteList.concat(res.data.data)
							this.voteallowbottom = false
							setTimeout(()=>{
								uni.showToast({
								    title: '加载成功',
								    duration: 1000,
									icon:'none'
								});
								this.votebottom = false
							}, 1000);
							
						}
						
						
					}
					
					
				})
			},
			// 历史
			getHistory(){
				this.$api.myself_Oppor({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					page_id:this.historyId
				}).then(res=>{

					uni.hideLoading();
					if(!this.historyallowtop){
						setTimeout(()=>{
							uni.showToast({
							    title: '刷新成功',
							    duration: 1000,
								icon:'none'
							});
							this.historytop = false
							this.historyallowtop = true
						}, 2000);
					}
					if(!this.historyId){
						if(res.data.data.length>=20){
							this.historyList = res.data.data
							this.historyallowbottom = true
							
						}else{
							this.historyList = res.data.data
							this.historyallowbottom = false
						}														
					}else{
						
						if(res.data.data.length>=20){
							this.historyList = this.historyList.concat(res.data.data)
							
							this.historyallowbottom = true
							setTimeout(()=>{
								uni.showToast({
								    title: '加载成功',
								    duration: 1000,
									icon:'none'
								});
								this.historybottom = false
							}, 1000);
							 
						}else{
							this.historyList = this.historyList.concat(res.data.data)
							this.historyallowbottom = false
							setTimeout(()=>{
								uni.showToast({
								    title: '加载成功',
								    duration: 1000,
									icon:'none'
								});
								this.historybottom = false
							}, 1000);
							
						}
						
						
					}
				})
			},
			changeSwiper(e){
				this.tabindex = e.detail.current
			},
			tab(ind){
				this.tabindex = ind
			}
		}
	}
</script>

<style>
	@import url("./MyProject.css");
	::-webkit-scrollbar{
		display: none;
	}
</style>
