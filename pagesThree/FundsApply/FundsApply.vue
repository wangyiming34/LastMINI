<template>
	<view class="create_con" style="overflow: auto;background: #fafafa;padding-bottom: 80px">
	    <view class="approval_detail infoCon club" style="padding-top: 20px;padding-bottom: 30px;width: 100%!important;">
	      <view class="title" style="margin-top: 0;margin-bottom: 10px">经费申请信息</view>
	      <view class="text flex align-center border-bottom">
	        <label for="money">申请金额</label>
	        <input type="text" v-model="money" placeholder="请输入经费申请金额（元）" id="money">
	      </view>
	      <view class="text flex align-center border-bottom">
	        <label for="account_name">汇款户名</label>
	        <input type="text" v-model="account_name" placeholder="请输入汇款户名" id="account_name">
	      </view>
	      <view class="text flex align-center border-bottom">
	        <label for="account_number">汇款账号</label>
	        <input type="text" v-model="account_number" placeholder="请输入汇款账号" id="account_number">
	      </view>
		  <picker mode="selector" :range="bankList" @change="bankChoose">
		  	<view class="text flex align-center border-bottom  choose" style="padding-right:30px ;">
		  				  
		  	  <label for="bank">开户行</label>
		  	  <input type="text" v-model="bank" placeholder="请选择汇款银行" id="bank" disabled="">
		  	</view>
		  </picker>
	      
	      <view class="text" style="padding-bottom: 0">
	        <label for="reason">申请理由</label>
	        <textarea name="" v-model="reason" id="reason" placeholder="请输入申请理由"></textarea>
	      </view>
	      <view class="text">
	        <label style="width: auto!important;">图片上传（最多4张）</label>
	        <view class="uploadCon upload">
				<van-uploader :file-list="fileList" :max-count="4" @after-read="afterRead" multiple='true' @delete="del"/>
	          <!-- <input @change="fileChange($event)" accept="image/*" type="file" id="upload_file" multiple style="display: none" />
	          <view class="upload_warp_img">
	            <view class="upload_warp_img_view" v-for="(item,index) of imgList" :key="index" v-show="imgList.length!=0">
	              <view class="upload_warp_img_view_top flex align-center justify-center">
	                <image src="/static/img/delete1.png" class="upload_warp_img_view_del" @click="fileDel(index)">
	              </view>
	              <view class="pic_ratio" style="--aspect-ratio: 1/1">
	                <view class="flex align-center justify-center">
	                  <image :src="item.file.src">
	                </view>
	              </view>
	            </view>
	            <view class="upload_warp" v-show="imgList.length<4">
	              <view class="upload_warp_left" @click="fileClick">
	                <image src="https://web.detion.com/static/img/add1.png">
	              </view>
	            </view>
	          </view> -->
	        </view>
	      </view>
	
	    </view>
	    <view class="team_con">
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
	            <view class="nickname duty">{{item.nickname}}</view>
	            <view class="nickname">{{item.dutyname}}</view>
	          </view>
	          <view class="state flex align-center">
	            <view class="signature flex align-center justify-center" v-if="item.status === 2">
	              <image :src="item.signature" alt="">
	            </view>
	            <view class="reason" v-else-if="item.status === 3">拒绝理由</view>
	            <image src="https://web.detion.com/static/img/next.png" alt="" class="next">
	          </view>
	        </view>
	      </view>
	    </view>
	    <view class="send_tips flex align-center" @click="isSend = !isSend">
	      <image src="https://web.detion.com/static/img/check4.png" alt="" v-if="!isSend">
	      <image src="https://web.detion.com/static/img/checked4.png" alt="" v-else>
	      通过消息和短信将消息发送给联合申请人
	    </view>
	    <view class="check_info">
	      <view class="submit_btn">
	        <view class="agree" @click="submit">提交</view>
	      </view>
	    </view>
		
		
		<van-popup
		  :show="confirm_popup"
		  closeable
		  close-icon-position="top-left"
		  position="bottom"
		  custom-style="min-height:100px"
		  @close="onClose"
		  @click-overlay="onClose"
		>
			<view class="confirm_apply">
			  <view class="apply_title border-bottom">经费信息申请确认 <image src="https://web.detion.com/static/img/delete.png" alt="" @click="confirm_popup = false"></view>
			  <view class="approval_detail" style="padding-bottom: 20px;padding-top: 10px;">
			    <view class="detail" style="margin-top: 0">
			      <view class="con flex align-start">
			        <view class="label">申请金额</view>
			        <view class="text color_FF2A2A">￥{{money}}</view>
			      </view>
			      <view class="con flex align-start">
			        <view class="label">汇款用户</view>
			        <view class="text">{{account_name}}</view>
			      </view>
			      <view class="con flex align-start">
			        <view class="label">开户行</view>
			        <view class="text">{{bank}}</view>
			      </view>
			      <view class="con flex align-start">
			        <view class="label">汇款账号</view>
			        <view class="text">{{account_number}}</view>
			      </view>
			      <view class="con flex align-start">
			        <view class="label">申请理由</view>
			        <view class="text">{{reason}}</view>
			      </view>
			      <view class="con flex align-start">
			        <view class="label">图片</view>
			        <view class="image flex" style="width: 60px;height: 60px;">
			          <view v-for="(pic, p_index) in fileList" :key="p_index" @click="imagePreview(pic.url)" style="width: 60px;height: 60px;">
			              <image :src="pic.url" style="width: 60px;height: 60px;">
			          </view>
			        </view>
			      </view>
			    </view>
			  </view>
			  <view class="tips">提示：请确认您的信息填写准确无误，提交后我们将以消息和短信的形式通知其他联合申请人，执委团队所有成员同意后才发送至用户服务中心审批。</view>
			  <view class="submit_btn" style="padding-top: 0px;padding-bottom: 10px">
			    <view class="agree" @click="confirm_submit">确认提交</view>
			  </view>
			</view>
		</van-popup>
		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />

	    <!-- <mt-popup
	      style="width: 100vw;"
	      v-model="confirm_popup"
	      position="bottom"
	      @touchmove.native.stop.prevent>
	      <view class="confirm_apply">
	        <view class="apply_title border-bottom">经费信息申请确认 <image src="/static/img/delete.png" alt="" @click="confirm_popup = false"></view>
	        <view class="approval_detail" style="padding-bottom: 20px;padding-top: 10px;">
	          <view class="detail" style="margin-top: 0">
	            <view class="con flex align-start">
	              <view class="label">申请金额</view>
	              <view class="text color_FF2A2A">￥{{money}}</view>
	            </view>
	            <view class="con flex align-start">
	              <view class="label">汇款用户</view>
	              <view class="text">{{account_name}}</view>
	            </view>
	            <view class="con flex align-start">
	              <view class="label">开户行</view>
	              <view class="text">{{bank}}</view>
	            </view>
	            <view class="con flex align-start">
	              <view class="label">汇款账号</view>
	              <view class="text">{{account_number}}</view>
	            </view>
	            <view class="con flex align-start">
	              <view class="label">申请理由</view>
	              <view class="text">{{reason}}</view>
	            </view>
	            <view class="con flex align-start">
	              <view class="label">图片</view>
	              <view class="image">
	                <view v-for="(pic, p_index) in imgList" :key="p_index" @click="imagePreview(pic.src)">
	                  <view class="pic_ratio" style="--aspect-ratio: 1/1">
	                    <view class="flex align-center justify-center size">
	                      <image :src="pic.file.src">
	                    </view>
	                  </view>
	                </view>
	              </view>
	            </view>
	          </view>
	        </view>
	        <view class="tips">提示：请确认您的信息填写准确无误，提交后我们将以消息和短信的形式通知其他联合申请人，执委团队所有成员同意后才发送至用户服务中心审批。</view>
	        <view class="submit_btn" style="padding-top: 0px;padding-bottom: 10px">
	          <view class="agree" @click="confirm_submit">确认提交</view>
	        </view>
	      </view>
	    </mt-popup> -->
	  </view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				fileList:[],
				imgArr:[], //上传阿里后的列表地址
				clubId:'',
				money: '', // 申请金额
			    account_name: '', // 汇款户名
			    account_number: '', // 汇款账号
			    bank: '', // 开户行
			    reason: '', // 申请理由
			    imgList: [], // 图片数组
			    image: [],
			    user_list: [], // 执委团队列表
			    isSend: true, // 是否发送信息
			    bankList: [], // 开户行列表
			    bank_popup: false, // 列表选择窗
			    picker_bank: '', // 选中的开户行
			    confirm_popup: false, // 确认信息弹窗
			    finish: false
			}
		},
		onLoad(e) {
			this.clubId = e.clubId
			this.getList()
			this.getBank()
		},
		watch: {
		    finish () {
		      if (this.finish) {
				this.imgArr = JSON.stringify(this.imgArr)
		        uni.hideLoading();
		        this.$api.fund_create({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
		          club_id: this.clubId,
				  money: this.money,
				  account_name: this.account_name,
				  bank_name: this.bank,
				  bank_card_number: this.account_number,
				  apply_reason: this.reason,
				  send: this.isSend ? 1 : 2,
		          images: this.imgArr

		        }).then(res => {
		          if (res.data.code === '200') {
					  Toast('您已成功发起经费申请，快通知执委团队其他成员审核吧')
					  
					  uni.redirectTo({
					  	url:'../../pagesThree/FundsApplyDetail/FundsApplyDetail?id='+ res.data.data
					  })
		          }
		        })
		      }
		    }
		},
		methods: {
			confirm_submit () {
			      uni.showLoading({
			          title: '加载中',
			      	mask:"true"
			      });
			      this.confirm_popup = false
				  var that = this
				  async function put () {
				    for (let i = 0; i < that.fileList.length; i++) { 
				  		  await  uni.uploadFile({
								  url: app.aliUrl,
								  filePath: that.fileList[i].url,
								  name: 'file',
								  formData: {
								    key:"wx/"+"${filename}",
								    signature: app.signature,
								    policy:app.policy,
								    OSSAccessKeyId:app.OSSAccessKeyId,
								    success_action_status:'201'
								  }
				  			 }).then(res=>{
							 that.imgArr.push({
								 url_image:res[1].data.split('<Location>')[1].split("</Location>")[0]
							 })
							 if(that.fileList.length === that.imgArr.length){
								 that.finish = true
							 }
							 
						 })
				        }
				}
				put()
			},
			imagePreview(url){
				uni.previewImage({
					urls:[url]
				})
			},
			onClose(){
				this.confirm_popup = false
			},
			submit () {
			      if (this.money.trim().length === 0 || this.money.length === 0) {
			        Toast('请输入申请金额')
			      } else if (this.account_name.trim().length === 0 || this.account_name.length === 0) {
			        Toast('请输入汇款户名')
			      } else if (this.account_number.trim().length === 0 || this.account_number.length === 0) {
			        Toast('请输入汇款账号')
			      } else if (this.bank.length === 0) {
			        Toast('请选择汇款银行')
			      } else if (this.reason.trim().length === 0 || this.reason.length === 0) {
			        Toast('请输入申请理由')
			      } else if (this.fileList.length === 0) {
			        Toast('请上传图片')
			      } else {
			        this.confirm_popup = true
			      }
			},
			// 删除图片
			del(e){
				this.fileList = this.fileList.filter((item,index)=> index!=e.detail.index)
			},
			// 图片上传后的预览
			afterRead(event) {
			      const { file } = event.detail;
			      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			      this.fileList.push({url:file[0].path})
			},
			bankChoose(e){
				this.bank = this.bankList[e.detail.value]
			},
			getList(){
				this.$api.auth_club_user_info({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					club_id:this.clubId
				}).then(res=>{
					this.user_list = res.data.data
				})
			},
			getBank(){
				this.$api.bank_list({
					
				}).then(res=>{
					this.bankList = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import '../FundsApplyDetail/FundsApplyDetail.css';
	  #reason{
	    background: #fafafa;
	    font-size: 14px;
	    line-height: 14px;
	    height: 100px;
	    resize: none;
	    border: none;
	    border-radius: 4px;
	    outline: none;
	    width: 100%;
	    display: block;
	    box-sizing: border-box;
	    padding: 5px;
	  }
	  .upload_warp_img{
	    overflow: hidden;
	  }
	  .upload_warp_img>view{
	    width: 22%;
	    float: left;
	    margin-left: 3%;
	  }
	  .upload_warp_img>view:first-child{
	    margin-left: 0;
	  }
</style>
