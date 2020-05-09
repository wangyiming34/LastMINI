<template>
	<view class="fundsCon">
		    <view class="search_type_list border-bottom">
		      <view class="type" :class="{'active': current === index}" v-for="(item, index) in menu" :key="index" @click="nav(index)">{{item}}</view>
		    </view>
		    <view class="funds_approval_list" ref="list">
		      <view v-if="list.length">
		        <view class="list"  v-for="(item, index) in list" :key="index" @click="FundsApprovalDetail(item.id)">
		          <view class="number border-bottom-new2 flex align-center justify-between">
		            <view class="num">编号：{{item.number}}</view>
		            <view class="state color_FF2A2A" v-if="current === 1 && item.status === 3">已拒绝</view>
		            <view class="state color_2565D3" v-if="current === 1 && item.status === 4">已通过</view>
		          </view>
		          <view class="detail">
		            <view class="title">{{item.name}}</view>
		            <view class="name">经办人:{{item.nickname}}</view>
		            <view class="btn" v-if="current === 0">审批</view>
		            <image src="https://web.detion.com/static/img/next.png" alt="" class="next" v-if="current === 1" style="height: 12px;">
		          </view>
		        </view>
		      </view>
			  
			  <view class="LuDingJi-no" v-else style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
			  	<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
			  		<image src="https://web.detion.com/static/img/empty_information.png" lazy-load="true"  mode="aspectFill"></image>
			  	</view>
			  	<view class="LuDingJi-no-con">
			  		暂无数据
			  	</view>
			  </view>
		    </view>
		<!-- 提示框 -->
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				menu: ['待审批', '已完成'],
			    current: 0,
			    list: [],
			    type: 1
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			FundsApprovalDetail(id){
				uni.navigateTo({
					url:'../../pagesMy/FundsApprovalDetail/FundsApprovalDetail?id='+id
				})
			},
			getData () {
			      this.$api.manage_fund_list({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        type: this.type
			      }).then(res => {
			        if (res.data.code === '200') {
			          this.list = res.data.data
			        } else if (res.data.code === '1099') {
			          Toast(res.data.msg)
			        }
			      })
			},
			nav (index) {
			  this.list = []
			  this.current = index
			  this.type = index + 1
			  this.getData()
			}
		}
	}
</script>

<style>
	 @import url("../../pagesThree/FundsApplyDetail/FundsApplyDetail.css");
</style>
