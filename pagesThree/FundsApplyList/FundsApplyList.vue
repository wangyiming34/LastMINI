<template>
	<view v-if="isFinish" class="wrap1" style="padding-bottom: 44px;">
		<!-- 全屏透明遮罩 -->
		<view class="zhezhao" v-show="showActive" @click.stop="showActive = !showActive">
			
		</view>
		<view class="content">
			<view class="title flex align-center title justify-center re" @click.stop="showActive = !showActive">
					{{cate}}
				<text class="bottomSanjiao" style="margin-left: 5px;border-top-color: rgb(51, 51, 51);">
				</text>
				
				<view class="san" v-if="showActive">
					
				</view>
				<view class="sannei" v-if="showActive">
					
				</view>
				<view class="ab acti" v-if="showActive">
					<view v-for="(item,index) in condition_list" :key="index" class="acfor border-bottom-new2" @click.stop="tab(item,index)">
						{{item}}
					</view>
				</view>
			</view>
			
			<view class="" v-if="list.length>0">
				<view v-for="(item,index) in list" :key="index" class="contentFor" @click="goContent(item)">
					<!-- 头部时间和状态 -->
					<view class="timewrap flex justify-between align-center border-bottom-new2">
						<view class="time">
							{{item.created_at.split(' ')[0].split('-').join('.')}}
						</view>
						<view class="sta" v-if="item.status==0" style="color: #ffc250;">
							提交中
						</view>
						<view class="sta" v-else-if="item.status==1" style="color: #9a9a9a;">
							已取消
						</view>
						<view class="sta" v-else-if="item.status==2" style="color: #ffc250;">
							审核中
						</view>
						<view class="sta" v-else-if="item.status==3" style="color: #ff2a2a;">
							已拒绝
						</view>
						<view class="sta" v-else style="color: #2565d3;">
							已通过
						</view>
					</view>
					
					<!-- 下面 -->
					<view class="forbottom">
						<view class="money">
							经费金额:￥{{item.money}}
						</view>
						<view class="flex align-center">
							<view class="wrapimg">
								<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							</view>
							<view class="name">
								<text>经办人:{{item.nickname}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="LuDingJi-no" v-else style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
				<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
					<image src="https://web.detion.com/static/img/empty_info.png" lazy-load="true"  mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无申请
				</view>
			</view>
			
		</view>
		
		<view class="publicSend" @click="apply">
			 提交新的申请
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showActive:false,
				clubId:'',
				list: [],
			    isFinish: false,
			    condition_list: ['提交中', '已取消', '审核中', '已拒绝', '已通过', '全部'],
			    show_menu: false,
			    default_list: [],
			    cate: '筛选',
				status:'',
				list2:[]
			}
		},
		onShow() {
			this.getData()
			this.cate = '筛选'
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.clubId = e.clubId
			
		},
		methods: {
			apply(){
				uni.navigateTo({
					url:'../../pagesThree/FundsApply/FundsApply?clubId='+ this.clubId
				})
			},
			// 详情
			goContent(item){
				uni.navigateTo({
					url:'../../pagesThree/FundsApplyDetail/FundsApplyDetail?id='+ item.id
				})
			},
			tab(item,ind){
				this.cate = item
				this.showActive = !this.showActive
				if(ind == 5){
					this.list = this.list2
				}else{
					// console.log(ind)
					this.list = this.list2.filter((item,index) => item.status== ind)
				}
				
			},
			getData(){
				this.$api.fund_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					club_id:this.clubId
				}).then(res=>{
					uni.hideLoading();
					if(res.data.code=="200"){
						this.list = res.data.data
						this.list2 = res.data.data
						this.isFinish = true
					}else{
						uni.showToast({
						    title: res.data.msg,
						    mask: "true",
							icon:'none'
						});
					}
					
				})
			}
		}
	}
</script>

<style>
	@import url('./FundsApplyList.css');
</style>
