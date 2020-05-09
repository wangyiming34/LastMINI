<template>
	<view class="StretchIndexSend" style="position: absolute;width: 100%;min-height: 100%;">
		<!-- 填写发布内容界面 -->
		<view class="StretchIndexSend-padding" v-if="showStatus==1055">
				  <!-- 图片 -->
				  <view class="flex justify-around border-bottom" style="margin-bottom: 15px;padding: 20px 0;font-size:15px;font-weight:400;color:rgba(200,200,200,.8);">
					  <view style="flex-direction: column;display: flex;justify-content: center;align-items: center;width: 40%;position: relative;">
					  	<van-uploader :file-list="fileList" :max-count="1" @after-read="afterRead" multiple='true' @delete="del"/>
						<view style="text-align: center;width: 100%;margin-top: 10px;">
							上传营业执照
						</view>
						<view style="position: absolute;font-size:16px;font-weight:400;color:rgba(0,77,197,1);bottom: 60px;">
							上传照片
						</view>
					  </view>
					  
				  	  <view style="flex-direction: column;display: flex;justify-content: center;align-items: center;width: 40%;position: relative;">
				  	  	<van-uploader :file-list="fileList1" :max-count="1" @after-read="afterRead1" multiple='true' @delete="del1"/>
						<view  style="text-align: center;width: 100%;margin-top: 10px;">
							上传职业证明
						</view>
						<view style="position: absolute;font-size:16px;font-weight:400;color:rgba(0,77,197,1);bottom: 40px;">
							<view style="text-align: center;">
								上传照片
							</view>
							<view style="font-size:11px;font-weight:400;color:rgba(153,153,153,1);margin-top: 5px;">
								名片/工牌/在职证明
							</view>
						</view>
				  	  </view>
				  </view>
		          <!-- 内容 -->
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">企业名称</view>
		              <view class="StretchIndexSend-input">
		                <input type="text" placeholder="请输入企业名称" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model="name">
		              </view>
		          </view>
				  
				  <view class="StretchIndexSend-content flex justify-between align-center border-bottom re" @click="Enterprise">
				  					  
				      <view class="StretchIndexSend-name">企业行业</view>
					  
						  <view style="flex:1" class="StretchIndexSend-city">
							
							<view style="" class="flex align-center justify-end">
							   <view style="
											font-size:16px;
											font-weight:400;
											color:rgba(102,102,102,1);
			
											">
								  <input type="text" placeholder="请选择所属行业" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model="industry" disabled="disabled">
							   </view>
							  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
							</view>
						  </view>
					  
				  </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">企业地址</view>
		              <view class="StretchIndexSend-input">
		                <input  type="text" placeholder="请输入企业地址" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="address">
		              </view>
		          </view>
		          
				  <!-- 描述 -->
				  
				  <view class="flex" v-if="showtext">
					  <view class="wenzijieshao" style="margin-right: 10px;width: auto;">服务范围</view>
					  <textarea class="xsdz" placeholder="请输入服务范围" v-model="content" id="xsdz" style="flex: 1;height:83px;border:1px solid rgba(212,212,212,1);
border-radius:5px;background-color: white;z-index: 10;"></textarea>
				  </view>
		  
				  <!-- 发布预览 -->
				  <view class="jiafabu" style="background-color: white;position: fixed;bottom: 0;left: 0;height: auto;">
				  	 <view @click="send" style="width: 100%;position: static;border-radius: 0;">提交</view>
				  </view>     
	    </view>
		
		
		<!-- 展示审核中的界面 -->
		<view class="" v-if="showStatus==1019">
			<view class="aaaaaa">
				<view class="fff re" >
					<view class="cccccc re">
						<view class="scr4 ab">
							
						</view>
						<view class="scr5 ab">
							
						</view>
						<view class="scr6 ab">
							
						</view>
						<image src="https://web.detion.com/static/img/yellow.png" lazy-load="true" class="ab" mode="aspectFit"></image>
						<view class="dddddd ab">
							审核中
						</view>
					</view>
					
				</view>
				<view class="LuDingJi-no-con renzheng">
					<view>您的申请正在审核中</view>
					<view>请耐心等待</view>
					
				</view>
			</view>
			
		</view>
		
		<!-- 认证成功的界面 -->
		<view  v-if="showStatus==1056">
			<view class="aaaaaa" style="margin-bottom: 50px;">
				<view class="rrr re" >
					<view class="cccccc re">
						<view class="scr4 ab xx1">
							
						</view>
						<view class="scr5 ab xx2">
							
						</view>
						<view class="scr6 ab xx3">
							
						</view>
						<image src="https://web.detion.com/static/img/publish_success.png" lazy-load="true" class="ab" mode="aspectFit"></image>
						<view class="dddddd ab">
							认证通过
						</view>
					</view>
					
				</view>
				<view class="LuDingJi-no-con renzheng">
					<view>恭喜您认证已通过</view>
					<view>请立即前往完善企业信息</view>
					
				</view>
			</view>
			
			<view class="" style="width:590upx;height:40px;border:1px solid rgba(23,108,199,1);border-radius:20px;margin: 0px auto;line-height: 40px;text-align: center;font-size:18px;font-weight:400;color:rgba(23,108,199,1);" @click="perfection">
				企业信息完善
			</view>
		</view>
		
		<!-- 驳回的界面 -->
		<view class="" v-if="showStatus==1057">
			<view class="aaaaaa">
				<view class="bbbbbb re">
					<view class="cccccc re">
						<view class="scr1 ab">
							
						</view>
						<view class="scr2 ab">
							
						</view>
						<view class="scr3 ab">
							
						</view>
						<image src="https://web.detion.com/static/img/icon_fail.png" lazy-load="true" class="ab" mode="aspectFit"></image>
						<view class="dddddd ab">
							审核失败
						</view>
					</view>
					
				</view>
				<view class="LuDingJi-no-con renzheng">
					<view>很抱歉，您的企业认证申请被驳回</view>
					<view>驳回理由：{{reason}}</view>
					<view>如有疑问，可以联系德申汇用户服务中心</view>
					<view style="color: #064DC5" @click="phone1">电话：{{phone}}</view>
                    
				</view>
			</view>
			
			<view class="" style="width:590upx;height:40px;border:1px solid rgba(23,108,199,1);border-radius:20px;margin: 60px auto;line-height: 40px;text-align: center;font-size:18px;font-weight:400;color:rgba(23,108,199,1);" @click="showStatus = 1055">
				重新认证
			</view>
		</view>
		

		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
		<lb-picker :list="list" mode="multiSelector" ref="pic1" :props="myProps" @confirm="ok" @show="showp" @hide="hidep"></lb-picker>
	</view>
</template>

<script>
	
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	import LbPicker from '../base/lb-picker'
	import UniIcons from '../base/uni-icons/uni-icons'
	var app = getApp().globalData
	export default {
		components: {
		    LbPicker,
			UniIcons
		},
		data() {
			return {
				phone:'',
				myProps: {
				  label: 'name',
				  value: 'id',
				  children: 'child'
				},
				showtext:true,
				textareap:'请输入服务范围',
				showStatus:0,
				finish:false,
				fileList:[], //图片本地地址列表
				fileList1:[], //图片本地地址列表
				imgUrl1:[], //上传阿里后的地址
				imgUrl2:[], //上传阿里后的列表地址
				reason:'',
				id:'',
				status:'',
				name:'',
				industry:'',
			    address:'',
				content:'',
				business_image_id:'',
				pic_info:'',
				list:[],
				pid:'',
				mid:''
			}
		},
		watch: {
		    finish () {
		      if (this.finish) {
		        uni.hideLoading();
		        this.$api.company_authentication({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
				  business_image_id:this.business_image_id,
				  prove_image:this.imgUrl2,
		          name: this.name,
		          industry_pid: this.pid,
		          industry_id: this.mid,
		          address: this.address,
		          ranges: this.content
		        }).then(res => {
				  Toast(res.data.msg)
		          // this.$toast(res.msg)
		          if (res.data.code === '200') {
					  setTimeout(()=>{
						  this.getStatus()
					  }, 1000);
					  // uni.reLaunch({
					  // 	url:'../SmallStretchStatus/SmallStretchStatus'
					  // })
		          }
		        })
		      }
		    }
		},
		onLoad() {
			this.getindustry()
			this.getStatus()
		},
		methods: {
			// 去完善企业信息 status=1 是认证完善， status = 0 是重新编辑
			perfection(){
				uni.navigateTo({
					url:"../../pagesTwo/EditEnterpriseIndex/EditEnterpriseIndex?status="+'1'+'&id='+this.id
				})
			},
			phone1(){
				uni.makePhoneCall({
					phoneNumber:this.phone
				})
			},
			hidep(){
				this.showtext = true
			},
			showp(){
				this.showtext = false
			},
			ok(e){
				this.industry = e.item[0].name+ ' ' + e.item[1].name
				this.pid = e.item[1].parent_id
				this.mid = e.item[1].id
				
			},
			Enterprise(){
				this.$refs.pic1.show()
				
			},
			getindustry(){
				this.$api.Myself_industry_list({
				}).then(res=>{
					// console.log(res)
					this.list = res.data.data
				})
			},
			getStatus(){
				this.$api.company_auth_status({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					// console.log(res)
					if(res.data.code==='1055'){
						this.showStatus = 1055
					}
					if(res.data.code==='1056'){
						this.showStatus = 1056
						this.reason = res.data.data.reason
						this.status = res.data.data.status
						this.id = res.data.data.id
					}
					if(res.data.code==='1019'){
						this.showStatus = 1019
					}
					if(res.data.code==='1057'){
						this.$api.tel({
							
						}).then(res=>{
							this.phone = res.data.data
							// console.log(res)
						})
						this.showStatus = 1057
						this.reason = res.data.data.reason
						this.status = res.data.data.status
						this.id = res.data.data.id
					}
				})
			},
			// 验证企业执照
			ocr(){
				this.$api.Myself_ocr({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					business_image:this.imgUrl1
				}).then(res=>{
					// console.log(res)
					if(res.data.code === '200'){
						uni.hideLoading();
						if((res.data.data.result.words_result.单位名称.words.length === 1 && res.data.data.result.words_result.单位名称.words === '无') || (res.data.data.result.words_result.地址.words.length === 1 && res.data.data.result.words_result.地址.words === '无')){
							uni.showToast({
								title:'信息识别不完善，请填写完善',
								icon:'none'
							})
							this.business_image_id = res.data.data.storage_id
						}else{
							uni.showToast({
								title:'识别成功',
								icon:'none'
							})
							this.business_image_id = res.data.data.storage_id
							this.pic_info = res.data.data.result.words_result
						    this.name = this.pic_info.单位名称.words
						    this.address = this.pic_info.地址.words
						}
						
					}
				})
			},
			// 主图下面的图片
			upload(){
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
								 that.imgUrl1.push({
									 hash:'',
									 url_image:res[1].data.split('<Location>')[1].split("</Location>")[0],
									 size:''
								 })
								 // console.log(that.imgUrl1)
								 if(that.imgUrl1.length>0){
									 that.imgUrl1 = JSON.stringify(that.imgUrl1).split('[')[1].split(']')[0]
									 that.ocr()
								 }
						 })
			          }
				}
				 put()
			},
			// 发布
			send () {
				  var that = this	      
			      if (this.name && this.industry && this.address && this.content && this.fileList.length > 0 && this.fileList1.length > 0) {
			        Dialog.confirm({
			          title: '发布提示',
			          message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担，确认发布？'
			        }).then(() => {
			          uni.showLoading({
			              title: '加载中'
			          });
					  uni.uploadFile({
							  url: app.aliUrl,
							  filePath: that.fileList[0].url,
							  name: 'file',
							  formData: {
								  key:"wx/"+"${filename}",
								  signature: app.signature,
								  policy:app.policy,
								  OSSAccessKeyId:app.OSSAccessKeyId,
								  success_action_status:'201'
							  }
					 }).then(res=>{
						 
						 that.imgUrl2.push({
							 hash:'',
							 url_image:res[1].data.split('<Location>')[1].split("</Location>")[0],
							 size:''
						 })
						 
						 if(that.imgUrl2.length>0){
							 that.imgUrl2 = JSON.stringify(that.imgUrl2).split('[')[1].split(']')[0]
							 that.finish = true
						 }
					 })
					  
			        }).catch(() => {
			
			        })
			      } else {
					  if (this.fileList.length <= 0) {
					    Toast('请上传企业执照')
					    return
					  }
					  
					  if (this.fileList1.length <= 0) {
					    Toast('请上传职业证明')
					    return
					  }
			          if (!this.name) {
						  Toast('企业名称没有填写')
						  return
					  }
					  if (!this.industry) {
						  Toast('请选择企业行业')
						  return
					  }
					  if (!this.address) {
						  Toast('请填写地址')
						  return
					  }
			          if (!this.content) {
						  Toast('请填写服务范围')
						  return
			          }
					
			      }
			},
			// 删除图片
			del(e){
				this.fileList = this.fileList.filter((item,index)=> index!=e.detail.index)
				this.imgUrl1 = []
				this.name=''
				this.address= ''
				this.business_image_id = ''
			},
			// 图片上传后的预览
			afterRead(event) {
			      const { file } = event.detail;
			      this.fileList.push({url:file[0].path})
				  uni.showLoading({
				      title: '识别中'
				  });
				  this.$nextTick(()=>{
				  	this.upload()
				  })
			},
			// 删除图片
			del1(e){
				this.fileList1 = this.fileList1.filter((item,index)=> index!=e.detail.index)
				
			},
			// 图片上传后的预览
			afterRead1(event) {
			      const { file } = event.detail;
			      this.fileList1.push({url:file[0].path})
				  
			}
			
		}
	}
</script>

<style>
	@import url("../../pagesMy/StretchIndexSend/StretchIndexSend.css");
	@import url("./index.css");
	.van-uploader__upload{
		width:115px!important;
		height:131px!important;
		background:rgba(242,242,242,0.58)!important;
		margin: 0!important;
		border: none!important;
	}
	.van-icon-plus{
		color: #004DC5!important;
		font-size: 25px!important;
		font-weight: 500!important;
	}
	.van-uploader__preview-image{
		width:115px!important;
		height:131px!important;
		border-radius:0!important;
	}
	.van-uploader__preview{
		margin: 0!important;
		z-index: 10;
	}
	.StretchIndexSend-name{
		margin-right: 10px;
	}
	.renzheng{
		color: #616161;
		font-size: 17px;
	}
</style>
