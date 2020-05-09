<template>
	<view class="wrap1">
		<view class="" v-if="list.length>0">
			<view v-for="(item,index) in list" :key="index" class="product" @click="myProduct(item)">
				<view class="productTop border-bottom-new2 flex">
					<view class="productImg">
						<image :src="item.url_image" lazy-load="true"  mode="aspectFill"></image>
					</view>
					<view class="productWrap">
						<view class="title line-clamp2">
							{{item.title}}
						</view>
						<view class="description line-clamp2">
							{{item.description}}
						</view>
					</view>
				</view>
				<view class="productBottom flex justify-between">
					<view class="flex align-center">
						<van-icon name="eye-o" size="16px"/>
					    <text class="textmargin">{{item.click}}</text>	
					</view>
					<view class="flex align-center">
						<van-icon name="edit"  size="16px" @click.stop="edit(item)"/>
						<text class="textmargin" @click.stop="edit(item)">编辑</text>
						<van-icon name="delete"  size="16px" style="margin-left: 20px;" @click.stop="del(item)"/>
						<text class="textmargin" @click.stop="del(item)">删除</text>	
					</view>
				</view>
			</view>
		</view>
		<view class="LuDingJi-no" v-else>
			<view class="LuDingJi-icon">
				<van-icon name="description" />
			</view>
			<view class="LuDingJi-no-con">
				暂未发布企业产品服务
			</view>
		</view>
		
		<!-- 发布 -->
		<view class="gotoTop">
			<view class="gotoTop-send"  @click="Issue" >
				<van-icon name="records" size="20px"/>
				<view>
					发布
				</view>
			</view>
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
				id:'',
				list:[]
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getData()
		},
		methods: {
			// 编辑
			edit(item){
				uni.navigateTo({
					url:'../../pagesTwo/MyProductSend/MyProductSend?type='+item.type+'&id='+item.id
				})
			},
			// 去发布
			Issue(){
				uni.navigateTo({
					url:'../../pagesTwo/MyProductSend/MyProductSend?type=1000'
				})
			},
			// 详情
			myProduct(item){
				uni.navigateTo({
					url:'../../pagesTwo/MyProduct/MyProduct?id='+item.id + "&type="+item.type
				})
			},
			// 删除
			del(item){
				Dialog.confirm({
				  title: '提示',
				  message: '您确定删除吗？'
				
				}).then(() => {
					this.$api.del_company_services_products({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						id:item.id,
						type:item.type
					}).then(res=>{
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000,
							icon:'none'
						});
						if(res.data.code=='200'){
							this.getData()
						}
					})
					
				}).catch(() => {
				  // on cancel
				});
				
			},
			getData(){
				
				this.$api.company_services_products({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					company_id:this.id
				}).then(res=>{
					console.log(res)
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import url("./MyBusinessProduct.css");
</style>
