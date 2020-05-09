<template>
	<view style="padding-bottom: 10px;">
		<!-- 上面的蓝色卡片 -->
		<view class="head-wrap">
			<view class="head-card">
				<view class="card-title">
					{{clubData.name}}
				</view>
				<view  style="margin: 10px 0 20px;" class="card-des">
					简介：{{clubData.description}}
				</view>
				<view class="card-num flex justify-between align-center">
					<view class="card-num-wrap">
						编号：{{clubData.sn?clubData.sn:'暂无'}}
					</view>
					<view class="card-num-wrap">
						{{clubData.tagname?clubData.tagname:'标签：暂无'}}
					</view>
					<view class="card-num-wrap">
						成员：{{clubData.user_count}}
					</view>
				</view>
			</view>
		</view>
		<!-- 选项卡 -->
		<view class="tab-wrap border-bottom-new2 flex justify-around align-center" :class="{tabFixed:isFixed}">
			<view v-for="(item,index) in tabList" :key="index" class="tab" :class="{tabac:index===n}" @click="tab(index)">
				{{item}}
			</view>
		</view>
		<!-- 第一个成员界面 -->
		<view class="tab1" v-if="n===0" >
			<view v-for="(item,index) in headList" :key="index" class="tab1-list">
				<view style="width:100%;height:10px;background:rgba(250,250,250,1);" v-show="item.show">
					
				</view>
				<!-- 职位栏 -->
				<view class="flex justify-between align-center border-bottom-new2" style="width: 100%;height: 54px;padding: 0 15px;" v-show="item.show" @click="duty(item.club_duty_id)">
					
					<view class="flex align-center">
						<view class="fangkuai">
							
						</view>
						<view style="margin-left: 8px;font-size:17px;font-weight:600;color:rgba(68,68,68,1);">
							{{item.dutyname}}
						</view>
					</view>
					
					<view style="width:68px;height:23px;border-radius:3px;border:1px solid rgba(6,77,197,1);font-size:12px;font-weight:500;color:rgba(6,77,197,1);text-align: center;line-height: 21px;">
						岗位职责
					</view>
					
				</view>
				
				<view style="padding: 16px 15px 0;" class="flex" @click.stop="MyInfo(item.user_id)">
					<view style="width: 40px;height:40px;border-radius: 100%;" class="re">
						<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill" style="border-radius: 100%;"></image>
						<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
					</view>
					<view  style="margin-left: 15px;flex: 1;padding: 0 0 16px;" class="bordernew2">
						<view style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);" class="flex align-center">
							<view class="newName">
								{{item.nickname}}
							</view>
							<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
						</view>
						<view style="margin-top: 3px;font-size:14px;font-weight:400;color:rgba(102,102,102,1);">
							<text v-if="item.job">{{item.job}}</text>
							<text v-if="item.company" style="margin: 0 6px;"> I </text>
							<text v-if="item.company">{{item.company}}</text>
						</view>
					</view>
				</view>
				
			</view>
			<!-- 下面的普通会员 -->
			<view style="width:100%;height:10px;background:rgba(250,250,250,1);">
			</view>
			<!-- 职位栏 -->
			<view class="flex justify-between align-center border-bottom-new2" style="width: 100%;height: 54px;padding: 0 15px;" @click="duty(20)" v-if="vipList.length>0">
				
				<view class="flex align-center">
					<view class="fangkuai">
						
					</view>
					<view style="margin-left: 8px;font-size:17px;font-weight:600;color:rgba(68,68,68,1);">
						会员
					</view>
				</view>
				
				<view style="width:68px;height:23px;border-radius:3px;border:1px solid rgba(6,77,197,1);font-size:12px;font-weight:500;color:rgba(6,77,197,1);text-align: center;line-height: 21px;">
					岗位职责
				</view>
				
			</view>
			<view v-for="(item,index) in vipList" :key="index" class="tab1-list">
				
				<view style="padding: 16px 15px 0;" class="flex">
					<view style="width: 40px;height:40px;border-radius: 100%;" class="re">
						<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill" style="border-radius: 100%;"></image>
						<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
						
					</view>
					<view  style="margin-left: 15px;flex: 1;padding: 0 0 16px;" class="bordernew2">
						<view style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);" class="flex align-center">
							<view class="newName">
								{{item.nickname?item.nickname:''}}
							</view>
							<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
							
						</view>
						<view style="margin-top: 3px;font-size:14px;font-weight:400;color:rgba(102,102,102,1);">
							<text v-if="item.job">{{item.job}}</text>
							<text v-if="item.company" style="margin: 0 6px;"> I </text>
							<text v-if="item.company">{{item.company}}</text>
						</view>
					</view>
				</view>
				
			</view>
			<!-- 触底加载 -->
			<view style="height: 88upx;background-color: #C0C0C0; display: flex;  width: 100%;" v-if="loading1">
				 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		<!-- 第二个活动界面 -->
		<view class="tab2" v-if="n===1">
			<view class="" v-if="active_limit">
				<!-- <view class="cubao"></view> -->
				<view class="tab2-wrap flex flex-wrap justify-between" v-if="acList.length>0">
					<view v-for="(item,index) in acList" :key="index" class="tab2-list" @click="goDetail(item.id)">
						<view class="tab2-img">
							<image :src="item.url_image" lazy-load="true" class="imga" mode="aspectFill"></image>
							<view class="tab2-state ab" :style="{background:item.state===0?'#FFBF3F':item.state===1?'#FF6464':'#000000'}">
								{{item.state===0?'未开始':item.state===1?'进行中':'已结束'}}
							</view>
							<view class="tab2-type ab">
								{{item.cate}}
							</view>
						</view>
						<view style="font-size:15px;font-weight:500;color:rgba(51,51,51,1);line-height:21px;margin-bottom: 21px;">
							{{item.name}}
						</view>
						<view style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);line-height:20px;margin-bottom: 6px;">
							{{item.address}}
						</view>
						<view style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);line-height:20px;">
							{{item.start_date.replace(/-/g, '/').substr(0,10)}}
						</view>
					</view>
				</view>
				<view class="LuDingJi-no" v-else>
					<view class="LuDingJi-icon">
						<van-icon name="description" />
					</view>
					<view class="LuDingJi-no-con">
						暂无活动
					</view>
				</view>
				<!-- 触底加载 -->
				<view style="height: 88upx;background-color: #C0C0C0; display: flex;  width: 100%;" v-if="loading2">
					 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
				</view>
			</view>
			<view class="LuDingJi-no" v-else>
				<view class="LuDingJi-icon">
					<van-icon name="description" />
				</view>
				<view class="LuDingJi-no-con">
					非本俱乐部成员不可见
				</view>
			</view>
		</view>
		
		
		<!-- 第三个动态界面 -->
		<view v-if="n === 2">
				<!-- <view class="cubao"></view> -->
		        <view class="dynamicsCon" v-if="timeList.length">
		          <view class="list" v-for="(item,index) in timeList" :key="index">
		            <view class="time flex align-center">
		              <view class="icon"></view>
					  <view class="text">
					  	{{item.created_at}}
					  </view>
		            </view>
		            <view class="con">
		              <view class="description">{{item.title}}</view>
		              <view class="pictureList">
		                <view>
		                  <view class="pic_ratio" style="--aspect-ratio: 43/26">
		                    <view class=" flex align-center" @click="pre(index)">
							  <image :src="item.image" lazy-load="true" class="imga" mode="widthFix"></image>
		                    </view>
		                  </view>
		                </view>
		              </view>
		            </view>
		          </view>
		        </view>
		        <view class="LuDingJi-no" v-else>
		        	<view class="LuDingJi-icon">
		        		<van-icon name="description" />
		        	</view>
		        	<view class="LuDingJi-no-con">
		        		暂无动态
		        	</view>
		        </view>
		</view>
		
		<!-- 第四个公告界面 -->
		<view v-if="n === 3" class="activityCon" style="position: relative;margin-top: 10px;">
			<!-- <view class="cubao"></view> -->
			<view v-if="notice_limit">
			  <view class="noticeList" v-if="notice_list.length">
				<view class="border-bottom" v-for="item in notice_list" :key="item.id">
				  
					<view class="description">{{item.content}}</view>
					<view class="det flex align-center justify-between" style="margin-top: 5px">
					  <view class="time flex align-center "><van-icon name="clock-o" /> <text style="margin-left: 5px;">{{item.created_at}}</text> </view>
					  <view class="number flex align-center"><van-icon name="eye-o" />  <text style="margin-left: 5px;">{{item.read}}</text> </view>
					</view>
				  
				</view>
			  </view>
			  <view class="LuDingJi-no" v-else>
			  	<view class="LuDingJi-icon">
			  		<van-icon name="description" />
			  	</view>
			  	<view class="LuDingJi-no-con">
			  		暂无公告
			  	</view>
			  </view>
			</view>
			<view class="LuDingJi-no" v-else>
				<view class="LuDingJi-icon">
					<van-icon name="description" />
				</view>
				<view class="LuDingJi-no-con">
					非本俱乐部成员不可见
				</view>
			</view>
		</view>
			  
			  
			  
		<!-- @@@@@@@@@@@@-固定定位等一些组件@@@@@@@@@@@@@@@ -->
		<!-- 加入俱乐部 -->
		<view class="joinclub" v-if="isJoin==0&&type==0" @click="join">
			加入
		</view>
		<!-- 只要是自己俱乐部的成员都能查看应续费人数 -->
		<view class="redMoney" v-if="renew" @click="ShouldRenew">
			应续费VIP
		</view>
		<!-- 提示框 -->
		<van-dialog
		  use-slot
		  title="岗位职责"
		  :show="showMsg"
		  @confirm="ok"
		>
		  <view style="width: 250px;max-height: 300px;margin: 0 auto;text-align: center;overflow: auto;">
		  	<rich-text :nodes="msg"></rich-text>
		  </view>
		  
		</van-dialog>
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
				renew:false,
				showMsg:false,
				msg:'',
				abc:false,
				showJoin:false,
				isFixed:false,
				clubId:'',
				clubData:'',
				headList:[],
				vipList:[],
				loading1:false,
				allow1:false,
				userPage:1,
				tabList:['成员',"活动","动态","公告"],
				n:0,
				loading2:false,
				allow2:false,
				acPage:1,
				acList:[],
				actime:false,
				active_limit: false, // 活动权限
				establish:'',
				timeList:[],
				img:[],
				notice_limit:false, //公告权限
				notice_list: [],
				isJoinThisClub:false,
				type:0,
				isJoin:0
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: this.clubData.name?this.clubData.name.substring(0,30)+'...':'德申汇-俱乐部',
			  imageUrl:app.shareImg,
			  path: '/pagesTwo/ClubIndex/ClubIndex?id='+this.clubId
			}
		},
		// 触底加载
		onReachBottom(){
			// 第一页的上拉加载
			if(this.n ===0 && this.allow1){
				this.allow1 = false
				this.loading1 = true
				setTimeout(() => {
					this.userPage++
					this.getUser()
					uni.showToast({
						title: '加载成功',
						duration: 1000,
						icon:'none'
					});
				  }, 1500)	
			}
			
			// 第2页的上拉加载
			if(this.n ===1 && this.allow2){
				this.allow2 = false
				this.loading2 = true
				setTimeout(() => {
					this.acPage++
					this.getActivity()
					uni.showToast({
						title: '加载成功',
						duration: 1000,
						icon:'none'
					});
				  }, 1500)	
			}
		},
		onShow() {
			if(uni.getStorageSync('isJoin')==1){
				this.showJoin = false
			}else{
				this.showJoin = true
			}
			
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中'
			});
			this.clubId = e.id
			this.isJoin = uni.getStorageSync('isJoin')
			if(e.type){
				this.type = e.type
				// console.log(this.type)
			}
			// console.log(e)
			// console.log(this.isJoin)
			this.getHome()
			this.getActivity()
			this.getTimer()
			this.getNotice()
			this.getMyClub()
		},
		onPageScroll(e) {
			// console.log(e.scrollTop)
			if(e.scrollTop>200){
				this.isFixed = true
			}else{
				this.isFixed = false
			}
		},
		methods: {
			// 应续费
			ShouldRenew(){
				uni.navigateTo({
					url:'../../pagesThree/RenewCityClub/RenewCityClub?id='+this.clubId
				})
			},
			join(){
				// 判断状态
				this.$api.join_club_status({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then((res)=>{
					if (res.data.code === '1023' || res.data.code === '1022') { // 可以申请
						  uni.navigateTo({
							url:'../../pagesTwo/JoinClubContent/JoinClubContent?id='+this.clubId
						  })
					} else if (res.data.code === '1019' || res.data.code === '1021') { // 审核中和驳回
					  uni.navigateTo({
					  	url:'../../pagesTwo/JoinClubStatus/JoinClubStatus'
					  })
					}
				})
				
			},
			goDetail(id){
				uni.navigateTo({
					url:'../../pagesTwo/ActivityDetail/ActivityDetail?id='+id
				})
			},
			getMyClub(){
				this.$api.club_renew({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					club_id:this.clubId
				}).then(res=>{
					// console.log(res)
					if(res.data.code=="200"){
						this.renew = true
					}
				})
			},
			// 预览
			pre(ind){
				uni.previewImage({
				    urls: this.img,
					current:ind
				})
			},
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			// 公告
			getNotice(){
				this.$api.club_notice({
					club_id:this.clubId,
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					if (res.data.code === '200') {
						  this.notice_list = res.data.data
						  this.notice_limit = true
						} else {
						  this.notice_limit = false
					}
					
				})
			},
			// 动态时间轴
			getTimer(){
				this.$api.club_timer({
					club_id:this.clubId
				}).then(res=>{
					// console.log(res)
					this.establish = res.data.data.establish
					this.timeList = res.data.data.list
					for(var i = 0; i<this.timeList.length; i++){
						this.timeList[i].created_at = (this.timeList[i].created_at || '').split(' ')[0].split('-')[0]+"年"+(this.timeList[i].created_at || '').split(' ')[0].split('-')[1]+"月"+(this.timeList[i].created_at || '').split(' ')[0].split('-')[2]+"日"
						this.img.push(this.timeList[i].image)
					}
				})
			},
			// 活动
			getActivity(){
				this.$api.club_activity({
					club_id:this.clubId,
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					page:this.acPage
				}).then(res=>{
					var time = new Date().getTime()
					if(res.data.code === '200'){
						if(this.acPage === 1){
							if(res.data.data.length>=10){
								this.acList = res.data.data
								this.allow2 = true
								this.loading2 = false
							}else{
								this.acList = res.data.data
								this.allow2 = false
								this.loading2 = false
							}														
						}else{
							if(res.data.data.length>=10){
								this.acList = this.acList.concat(res.data.data)
								this.allow2 = true
								this.loading2 = false
							}else{
								this.acList = this.acList.concat(res.data.data)
								this.allow2 = false
								this.loading2 = false
							}	
						}
						
						for (let i = 0; i < this.acList.length; i++) {
						            if (new Date(this.acList[i].start_date.replace(/-/g, '/')).getTime() > time) { // 开始时间大于当前时间 未开始
						              this.acList[i].state = 0
						            } else if (new Date(this.acList[i].start_date.replace(/-/g, '/')).getTime() < time && time < new Date(this.acList[i].finish_date.replace(/-/g, '/')).getTime()) { // 当前时间大于开始时间小于结束时间 进行中
						              this.acList[i].state = 1
						            } else if (new Date(this.acList[i].finish_date.replace(/-/g, '/')).getTime() < time) { // 当前时间大于结束时间 已结束
						              this.acList[i].state = 2
						            }
						    }
							
						this.active_limit = true
						
					}else{
						this.active_limit = false
					}
					
					// console.log(this.acList)
				})
			},
			ok(){
				this.showMsg = false
			},
			// 岗位职责
			duty(id){
				this.$api.Club_duty_content({
					duty_id: id
				}).then(res=>{
					// console.log(res)
					if (res.data.data.content !== null && res.data.data.content !== '') {
						this.msg = res.data.data.content
					  } else {
						this.msg = '暂无'
					  }
					this.$nextTick(()=>{
						this.showMsg = true
					})
				})
					
			},
			tab(ind){
				this.n =ind
				uni.pageScrollTo({
					scrollTop:0,
					duration:200
				})
			},
			getHome(){
				this.$api.club_homepage({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					club_id:this.clubId
				}).then(res=>{
					
					uni.hideLoading();
					this.clubData = res.data.data
					// this.type = Number(res.data.data.type) 
					// console.log(this.type)
					// console.log(typeof this.type)
					this.headList = res.data.data.club_people
					if (this.headList.length === 1) {
						this.headList[0].show = true
					}
				    for (let i = 1; i < this.headList.length; i++) {
						this.headList[0].show = true
						if (this.headList[i].dutyname === this.headList[i - 1].dutyname) {
						  this.headList[i].show = false 
						} else {
						  this.headList[i].show = true
						}
					}
					this.$nextTick(()=>{
						this.getUser()
					})
				})
			},
			getUser(){
				this.$api.club_users({
					club_id:this.clubId,
					page:this.userPage
				}).then(res=>{
					if(res.data.code === '200'){
						if(this.userPage === 1){
							if(res.data.data.length>=20){
								this.vipList = res.data.data
								this.allow1 = true
								this.loading1 = false
							}else{
								this.vipList = res.data.data
								this.allow1 = false
								this.loading1 = false
							}														
						}else{
							if(res.data.data.length>=20){
								this.vipList = this.vipList.concat(res.data.data)
								this.allow1 = true
								this.loading1 = false
							}else{
								this.vipList = this.vipList.concat(res.data.data)
								this.allow1 = false
								this.loading1 = false
							}	
						}
					}
					
					
				})
			}
		}
	}
</script>

<style>
	@import url("./ClubIndex.css");
</style>
