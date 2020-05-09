<template>
	<view v-if="finish" style="padding: 30upx 30upx 0;" :class="list.length==0?'wrap':''">
		<view v-for="(item,index) in list" :key="index"  @click.stop="ServiceDetails(item)" style="padding: 30upx;background-color: white;" class="newMyService">
			<view class="flex" style="margin-bottom: 30upx;">
				<!-- 图片 -->
				<view class="serviceimg" style="width: 147upx;height: 98upx;margin: 0 21upx 0 0;">
					<image :src="item.img" mode=""></image>
				</view>
				<!-- 公司名字等 -->
				<view class="item_name_wrap" style="width: 450upx;">
					<view class="service_item_name">
						{{item.title}}
					</view>
				</view>
				
			</view>
			
			<view class="flex justify-between align-center">
				<view class="shenhe" :class="item.status==0?'dai':item.status==1?'tong':'bai'">
					{{item.status==0?'审核中':item.status==1?'已通过':'审核失败'}}
				</view>
				
				<view class="flex align-center">
					<view class="edit" @click.stop="edit(item)">
						{{item.status==0?'编辑':item.status==1?'编辑':'重新发布'}}
					</view>
					<view class="edit" @click.stop="del(item)">
						删除
					</view>
				</view>
			</view>
		</view>
		
		<view  class="noMore" v-if="list.length>0">
		  		——— 暂无更多内容 ———
		</view>
		
		<view class="LuDingJi-no"  v-if="list.length == 0" style="overflow: hidden;height: 100%;width: 100%;">
			<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
				<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.nZMvHF3iN2Fo64511dab222652a44bd628217cd11fd9.png" lazy-load="true"  mode="aspectFill"></image>
			</view>
			<view class="LuDingJi-no-con">
				暂无内容
			</view>
		</view>
		
		<view class="fabufuwu" v-if="list.length == 0" @click.stop="ServiceSend">
			发布服务
		</view>
		
		<view class="newSend" @click.stop="ServiceSend" v-if="list.length>0">
			<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.ApzLaUjRrcekeb4d56d9fbd789772690058fc08ffe93.png" mode=""></image>
		</view>
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				finish:false,
				list:[]
			}
		},
		onLoad() {
			
		},
		onShow() {
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.getData()
		},
		methods: {
			edit(item){
				// console.log(111)
				uni.navigateTo({
					url:'/pagesFour/ServiceEdit/ServiceEdit?status=100&id=' + item.id
				})	
			},
			del(item){
				Dialog.confirm({
				  title: '提示',
				  message: '您正在删除服务操作，该操作不可撤回是否确认删除。',
				  confirmButtonText:'确认'
				}).then(() => {
					this.$api.sp_del({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						id:item.id
					}).then(res=>{
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000,
							icon:'none'
						})
						if(res.data.code=="200"){
							this.getData()
						}
						
					})
				}).catch(() => {
				  // on cancel
				});
				
			},
			ServiceDetails(item){
				// console.log(item) 
				// 审核中
				if(item.status==0){
					uni.navigateTo({
						url:'/pagesFour/ServiceDetails/ServiceDetails?id='+item.id +'&status=0'+"&user_id=" + item.user_id +'&check=0'
					})
				}else if(item.status==1){
					// 已通过
					uni.navigateTo({
						url:'/pagesFour/ServiceDetails/ServiceDetails?id='+item.id +'&status=0'+"&user_id=" + item.user_id
					})
				}else{
					// 未通过
					uni.navigateTo({
						url:'/pagesFour/ServiceStatus/ServiceStatus?type=1&id='+item.id + '&reason=' + item.reason
					})
				}
				
			},
			ServiceSend(){
				this.$api.company_status({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					if(res.data.code === '1124'){
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000,
							icon:'none'
						});
					}else if(res.data.code === '1019'||res.data.code === '1055'||res.data.code === '1057'){
						uni.navigateTo({
							url:'/pagesTwo/EnterpriseCertification/EnterpriseCertification'
						})
					}else if(res.data.code === '1123'){
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000,
							icon:'none'
						});
						
						this.$nextTick(function(){
							uni.navigateTo({
								url:"/pagesTwo/EditEnterpriseIndex/EditEnterpriseIndex?status="+'1'+'&id='+res.data.data.id
							})
						})
					}else if(res.data.code === '200'){
						uni.setStorageSync('company_id',Number(res.data.data.id))
						uni.navigateTo({
							url:'/pagesFour/ServiceEdit/ServiceEdit'
						})
					}
				})
				
			},
			getData(){
				this.$api.my_sp({
					token: uni.getStorageSync("token"),
					// user_id: 177
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					// console.log(res)
					if(res.data.code=="200"){
						uni.hideLoading()
						this.list = res.data.data
						this.$nextTick(function(){
							this.finish = true
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
	
</style>
