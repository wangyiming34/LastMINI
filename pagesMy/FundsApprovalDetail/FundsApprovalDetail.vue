<template>
	<view class="" style="background: #fafafa;overflow: auto;padding-bottom: 80px" v-if="isFinish">
	    <view class="approval_detail" style="padding-top: 20px">
	      <view class="title" style="margin-top: 0">经费申请信息</view>
	      <view class="detail">
	        <view class="con flex align-start">
	          <view class="label">发起时间</view>
	          <view class="text">{{info.created_at}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">编号</view>
	          <view class="text">{{info.number}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">发起方</view>
	          <view class="text">{{info.name}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">经办人</view>
	          <view class="text">{{info.nickname}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">申请金额</view>
	          <view class="text color_FF2A2A">￥{{info.money}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">汇款用户</view>
	          <view class="text">{{info.account_name}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">开户行</view>
	          <view class="text">{{info.bank_name}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">汇款账号</view>
	          <view class="text">{{info.bank_card_number}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">申请理由</view>
	          <view class="text">{{info.apply_reason}}</view>
	        </view>
	        <view class="con flex align-start">
	          <view class="label">图片</view>
			  <view class="image">
			    <view v-for="(pic, p_index) in info.images" :key="p_index" @click="imagePreview(pic.url_image)">
			      <view class="pic_ratio" style="--aspect-ratio: 1/1">
			        <view class="flex align-center justify-center size">
			          <image :src="pic.url_image" class="iimg">
			        </view>
			      </view>
			    </view>
			  </view>
	          
	        </view>
	      </view>
	      <image src="https://web.detion.com/static/image/funds/2.png" alt="" class="status_icon" v-if="info.status === 2">
	      <image src="https://web.detion.com/static/image/funds/3.png" alt="" class="status_icon" v-else-if="info.status === 3">
	      <image src="https://web.detion.com/static/image/funds/4.png" alt="" class="status_icon" v-else-if="info.status === 4">
	    </view>
	    <view class="check_info" v-if="info.objection">
	      <view class="title" style="background: #fff">审核进度</view>
	      <view class="approval_check">
	        <view class="tit flex align-center">
	          <view class="w35">审核人员</view>
	          <view class="w30">状态</view>
	          <view class="w35">时间</view>
	        </view>
	        <view class="con border-bottom" v-for="(item, index) in info.objection" :key="index" :style="item.status === 2 || (item.status === 1 && item.grounds_reconsent.length)?'background: #f5f5f5;padding-bottom: 10px':''">
	          <view class="flex align-center detail">
	            <view class="flex align-center" style="width: 100%">
	              <view class="w35">{{item.nickname}}</view>
	              <view class="w30" v-if="item.status === 0">待审核</view>
	              <view class="w30" v-else-if="item.status === 1">已通过</view>
	              <view class="w30" v-else-if="item.status === 2">已拒绝</view>
	              <view class="w35" v-if="item.status === 1 || item.status === 2">{{item.updated_at.substr(0,10)}}<br>{{item.updated_at.substr(11,5)}}</view>
	            </view>
	          </view>
	          <view class="reason" v-if="item.grounds_reconsent.length">重新同意理由:{{item.grounds_reconsent}}</view>
	          <view class="reason" v-if="item.objection.length && item.status === 2">拒绝理由:{{item.objection}}</view>
	        </view>
	      </view>
	
	      <view v-if="isFirst">
	        <view class="submit_btn flex align-center justify-around" v-if="btn_status_z === 0">
	          <view class="refuse agree_new" @click="refuse_popup = true">拒绝</view>
	          <view class="refuse" @click="agree">同意</view>
	        </view>
	        <view class="submit_btn" v-if="(btn_status_z === 1 && (btn_status_x === 0 || btn_status_x === 1)) || (btn_status_z === 1  && reason_z.length)">
	          <view class="agree" style="background:#cccccc">已同意</view>
	        </view>
	        <view class="submit_btn" v-if="btn_status_z === 2 || (btn_status_x === 2 && reason_z.length === 0)">
	          <view class="agree" @click="agree_popup = true">重新同意</view>
	        </view>
	      </view>
	      <view v-if="btn_status_z === 1 && isSecond">
	        <view class="submit_btn flex align-center justify-between" v-if="btn_status_x === 0 && reason_z.length === 0">
	          <view class="refuse agree_new" @click="refuse_popup = true">拒绝</view>
	          <view class="refuse" @click="agree">同意</view>
	        </view>
	        <view class="submit_btn" v-if="btn_status_x === 1">
	          <view class="agree" style="background:#cccccc">已同意</view>
	        </view>
	        <view class="submit_btn" v-if="btn_status_x === 2">
	          <view class="agree" style="background:#cccccc">已拒绝</view>
	        </view>
	      </view>
		  
		  <van-popup
		    :show="refuse_popup"
		    closeable
		    close-icon-position="top-left"
		    position="bottom"
		    custom-style="min-height:100px"
		    @close="onClose"
		    @click-overlay="onClose"
		  >
		  	<view class="confirm_apply">
		  	  <view class="apply_title border-bottom">经费信息操作 <image src="https://web.detion.com/static/img/delete.png" alt="" @click="refuse_popup = false"></view>
		  	  <view class="textarea_reason">
		  		<textarea  placeholder="请输入拒绝理由"   placeholder-style="font-size:14px;color:#333;line-height:24px"  v-model="reason"></textarea>
		  	  </view>
		  	  <view class="submit_btn" style="padding-top: 0px;padding-bottom: 10px;position: relative;">
		  		<view class="agree" @click="confirm_refuse">确认拒绝</view>
		  	  </view>
		  	</view>
		  </van-popup>
		  
		  <van-popup
		    :show="agree_popup"
		    closeable
		    close-icon-position="top-left"
		    position="bottom"
		    custom-style="min-height:100px"
		    @close="onClose1"
		    @click-overlay="onClose1"
		  >
		  	<view class="confirm_apply">
		  	  <view class="apply_title border-bottom">经费信息操作 <image src="https://web.detion.com/static/img/delete.png" alt="" @click="agree_popup = false"></view>
		  	  <view class="textarea_reason">
		  		<textarea  placeholder="请输入重新同意理由"   placeholder-style="font-size:14px;color:#333;line-height:24px"  v-model="reason_agree"></textarea>
		  	  </view>
		  	  <view class="submit_btn" style="padding-top: 0px;padding-bottom: 10px;position: relative;">
		  		<view class="agree" @click="confirm_agree">重新同意</view>
		  	  </view>
		  	</view>
		  </van-popup>
	      
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
	export default {
		data() {
			return {
				  id:'',
				  info: {},
				  pic: [],
				  refuse_popup: false, // 拒绝弹窗
				  agree_popup: false, // 重新同意弹窗
				  reason: '', // 拒绝理由
				  reason_agree: '', // 重新同意理由
				  my_user_id: '', // 我的user_id
				  isFinish: false,
				  isFirst: false, // 是张总
				  btn_status_z: 0, // 张总底部按钮状态  0未操作 1已同意 2已拒绝
				  reason_z: '', // 张总重新同意理由
				  isSecond: false, // 是许总
				  btn_status_x: 0 // 许总底部按钮状态  0未操作 1已同意 2已拒绝
			}
		},
		onLoad(e) {
			this.my_user_id = uni.getStorageSync("userId")
			this.id = e.id
			this.getData()
		},
		methods: {
			// 重新同意
			confirm_agree () {
			      if (this.reason_agree.trim().length || this.reason_agree.length) {
			        this.$api.manage_agree_to({
			          fund_id: this.id,
			          token: uni.getStorageSync("token"),
			          user_id: uni.getStorageSync("userId"),
			          grounds_reconsent: this.reason_agree
			        }).then(res => {
			          if (res.data.code === '200') {
			            Toast('操作成功')
			            this.agree_popup = false
			            this.getData()
			          } else {
			            Toast(res.data.msg)
			          }
			        })
			      } else {
			        Toast('请输入同意理由')
			      }
			},
			// 确认拒绝
			confirm_refuse () {
			      if (this.reason.trim().length || this.reason.length) {
			        this.$api.manage_refuse({
			          fund_id: this.id,
			          token: uni.getStorageSync("token"),
			          user_id: uni.getStorageSync("userId"),
			          objection: this.reason
			        }).then(res => {
			          if (res.data.code === '200') {
			            Toast('操作成功')
			            this.refuse_popup = false
			            this.getData()
			          } else {
			            Toast(res.data.msg)
			          }
			        })
			      } else {
			        Toast('请输入拒绝理由')
			      }
			},
			// 关闭拒绝理由弹窗
			onClose(){
				this.refuse_popup = false
			},
			// 关闭同意理由弹窗
			onClose1(){
				this.agree_popup = false
			},
			// 同意
			agree () {
				Dialog.confirm({
				  title: '提示',
				  message: '是否同意该项经费申请，该操作不可撤回请谨慎操作'
				}).then(() => {
					this.$api.manage_agree({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						fund_id: this.id
					}).then(res=>{
						if (res.data.code === '200') {
						  this.getData()
						}
					})
				}).catch(() => {
				  // on cancel
				});
			},
			// 图片预览
			imagePreview(url){
				uni.previewImage({
					urls:[url]
				})
			},
			getData () {
			      this.$api.manage_fund_detail({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        id: this.id
			      }).then(res => {
			        if (res.data.code === '200') {
			          this.info = res.data.data
			          let arr = []
			          if (this.info.images) {
			            for (let i = 0; i < this.info.images.length; i++) {
			              arr.push(this.info.images[i].url_image)
			            }
			            this.pic = arr
			          }
			          for (let j = 0; j < this.info.objection.length; j++) {
			            this.btn_status_z = this.info.objection[0].status // 张总的状态
			            this.btn_status_x = this.info.objection[1].status // 许总的状态
			            this.reason_z = this.info.objection[0].grounds_reconsent // 张总重新同意理由
			            if (Number(this.my_user_id) === this.info.objection[j].user_id) {
			              if (j === 0) {
			                this.isFirst = true
			              } else if (j === 1) {
			                this.isSecond = true
			              }
			            }
			          }
			          this.$nextTick(() => {
			            this.isFinish = true
			          })
			        }
			      })
			},
		}
	}
</script>

<style>
	@import url("../../pagesThree/FundsApplyDetail/FundsApplyDetail.css");
</style>
