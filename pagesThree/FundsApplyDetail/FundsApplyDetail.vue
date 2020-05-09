<template>
	<view class="" style="background: #fafafa;padding-bottom: 80px" v-if="isFinish">
	    <view class="approval_detail" style="padding-top: 20px;padding-bottom: 30px">
	      <view class="title" style="margin-top: 0">经费申请信息</view>
	      <view class="detail">
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
	      </view>
	      <image src="https://web.detion.com/static/image/funds/0.png" alt="" class="status_icon" v-if="info.status === 0">
	      <image src="https://web.detion.com/static/image/funds/1.png" alt="" class="status_icon" v-else-if="info.status === 1">
	      <image src="https://web.detion.com/static/image/funds/2.png" alt="" class="status_icon" v-else-if="info.status === 2">
	      <image src="https://web.detion.com/static/image/funds/3.png" alt="" class="status_icon" v-else-if="info.status === 3">
	      <image src="https://web.detion.com/static/image/funds/4.png" alt="" class="status_icon" v-else-if="info.status === 4">
	    </view>
	    <view class="approval_detail" style="padding-bottom: 20px;padding-top: 15px;margin-top: 10px">
	      <view class="detail" style="margin-top: 0">
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
	    </view>
	    <view class="team_con" v-if="info.status === 0">
	      <view class="team_intro">
	        <view class="title">联合申请人</view>
	        <view class="small">(联合申请人全部确认提交后，才发送到服务中心审批)</view>
	      </view>
	      <view class="user_list">
	        <view class="list border-bottom-new2 flex align-center justify-between" v-for="(item, index) in user_list" :key="index">
	          <view class="info flex align-center">
	            <view class="avatar flex align-center justify-center">
	              <image :src="item.avatar" alt="">
	            </view>
	            <image src="https://web.detion.com/static/image/funds/icon6.png" alt="" class="icon" v-if="item.status === 1">
	            <image src="https://web.detion.com/static/image/funds/icon5.png" alt="" class="icon" v-if="item.status === 2">
	            <view class="nickname duty">{{item.nickname}}</view>
	            <view class="nickname">{{item.dutyname}}</view>
	          </view>
	          <view class="state flex align-center">
	            <view class="signature flex align-start justify-center" v-if="item.status === 1">
	              <image :src="item.signature" alt="" @click="signPreview(item.signature)">
	            </view>
	            <view class="reason" v-else-if="item.status === 2" @click="message(item.reason)">拒绝理由</view>
	            <image src="https://web.detion.com/static/img/next.png" alt="" class="next">
	          </view>
	        </view>
	      </view>
	    </view>
	    <view class="approval_detail" v-else-if="info.status ===  3" style="margin-top: 10px;padding-bottom: 10px;padding-top: 15px">
	      <view class="detail" style="margin-top: 0">
	        <view class="con">
	          <view class="label">拒绝理由</view>
	          <view class="text_reason">{{objection}}</view>
	        </view>
	      </view>
	    </view>
	    <view class="check_info" v-if="info.status === 0">
	      <view class="submit_btn flex align-center justify-around" v-if="btn_status === 0">
	        <view class="refuse agree_new" @click="refuse_popup = true">拒绝</view>
	        <view class="refuse" @click="agree">同意</view>
	      </view>
	      <view class="submit_btn" v-else-if="btn_status === 1">
	        <view class="agree" style="background:#cccccc">已同意</view>
	      </view>
	      <view class="submit_btn" v-else-if="btn_status === 2">
	        <view class="agree" @click="agree">重新同意</view>
	      </view>
	      <view class="submit_btn" v-else-if="btn_status === 3">
	        <view class="agree" @click="cancel">取消审批</view>
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
			  <view class="submit_btn" style="padding-top: 0px;padding-bottom: 10px">
				<view class="agree" @click="confirm_refuse">确认拒绝</view>
			  </view>
			</view>
		</van-popup>
	    
		<van-dialog id="van-dialog" />
	  </view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				id:'',
				isFinish: false,
			    info: {},
			    pic: [], // 预览图片列表
			    objection: '', // 拒绝理由
			    user_list: [], // 执委团队
			    my_user_id:'', // 我的user_id
			    apply_user_id: 0, // 发布者user_id
			    btn_status: 0, // 底部按钮状态  0未操作 1已同意 2已拒绝 3我是发布者
			    refuse_popup: false, // 拒绝弹窗
			    reason: '' // 拒绝理由
			}
		},
		onShow() {
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.getData()
		},
		onLoad(e) {
			
			this.my_user_id = uni.getStorageSync("userId")
			this.id = e.id
			
		},
		methods: {
			// 取消审批
			cancel () {
				Dialog.confirm({
				  title: '提示',
				  message: '确定要取消吗？'
				}).then(() => {
					this.$api.cancel_approval({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						id:this.id
					}).then(res=>{
						if(res.data.code=="200"){
							uni.showToast({
							    title: '取消成功',
							    mask: "true",
								icon:'none'
							});
							this.getData()
						}else{
							uni.showToast({
							    title: res.data.msg,
							    mask: "true",
								icon:'none'
							});
						}
					})
				}).catch(() => {
				  // on cancel
				});
			},
			// 同意和重新同意
			agree () {
				uni.navigateTo({
					url:'../../pagesThree/Sign/Sign?id='+this.id
				})
			},
			// 确认拒绝
			confirm_refuse(){
				if (this.reason.trim().length > 0 && this.reason.length > 0) {
				        this.$api.Clubmanage_refuse({
				          id: this.id,
				          token: uni.getStorageSync("token"),
				          user_id: uni.getStorageSync("userId"),
				          reason: this.reason
				        }).then(res => {
				          if (res.data.code === '200') {
				            uni.showToast({
				                title: '操作成功',
				                mask: "true",
				            	icon:'none'
				            });
				            this.refuse_popup = false
				            this.getData()
				          } else {
				            uni.showToast({
				                title: res.data.msg,
				                mask: "true",
				            	icon:'none'
				            });
				          }
				        })
				      } else {
						uni.showToast({
						    title: '请输入拒绝理由',
						    mask: "true",
							icon:'none'
						});
				      }
			},
			// 关闭拒绝理由弹窗
			onClose(){
				this.refuse_popup = false
			},
			// 拒绝理由
			message(title){
				Dialog.alert({
				  title: '拒绝理由',
				  message: title
				}).then(() => {
				  // on close
				});
			},
			// 图片预览
			imagePreview(url){
				uni.previewImage({
					urls:[url]
				})
			},
			// 签名预览
			signPreview(url){
				uni.previewImage({
					urls:[url]
				})
			},
			getData(){
				this.$api.fund_detail({
				        token: uni.getStorageSync("token"),
				        user_id: uni.getStorageSync("userId"),
				        id: this.id
				      }).then(res => {
						 uni.hideLoading();
				        if (res.data.code === '200') {
				          this.info = res.data.data
				          let arr = []
				          if (this.info.images) {
				            for (let i = 0; i < this.info.images.length; i++) {
				              arr.push(this.info.images[i].url_image)
				            }
				            this.pic = arr
				          }
				          if (this.info.status === 0) {
				            this.user_list = this.info.commissioner_team
				            if (Number(this.my_user_id) === this.info.user_id) { // 我是发布者
				              this.btn_status = 3
				            } else {
				              for (let i = 0; i < this.user_list.length; i++) {
				                if (Number(this.my_user_id) === this.user_list[i].user_id) {
				                  this.btn_status = this.user_list[i].status
				                }
				              }
				            }
				          } else if (this.info.status === 3) { // 审批拒绝
				            this.objection = this.info.objection
							console.log(this.info)
				          }
				          this.$nextTick(() => {
				            this.isFinish = true
				          })
				        }
				      })
			}
		}
	}
</script>

<style>
	@import url("./FundsApplyDetail.css");
</style>
