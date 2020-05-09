<template>
	<view class="StretchIndexSend" style="position: absolute;width: 100%;min-height: 100%;padding-bottom: 50px;">
			<!-- 填写发布内容界面 -->
			<view class="StretchIndexSend-padding" style="padding-top: 10px;">
					  <!-- 图片 -->
					  <view class="flex justify-around border-bottom" style="margin-bottom: 10px;padding: 0 0 12px;font-size:15px;font-weight:400;color:rgba(200,200,200,.8);">
						  <view style="flex-direction: column;display: flex;justify-content: center;align-items: center;width: 40%;position: relative;">
						  	<van-uploader :file-list="fileList" :max-count="1" @after-read="afterRead" multiple='true' @delete="del"/>
							<view style="text-align: center;width: 100%;margin-top: 10px;">
								企业LOGO
							</view>
							<view style="position: absolute;font-size:16px;font-weight:400;color:rgba(0,77,197,1);bottom: 40px;">
								上传照片
							</view>
						  </view>
						  
					  	  
					  </view>
			          <!-- 内容 -->
					  <!-- 职位 -->
			          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
						  <view class="xingxing">
						  	*
						  </view>
			              <view class="StretchIndexSend-name">我的职位</view>
			              <view class="StretchIndexSend-input" style="flex: 1;margin-top: 2px;">
			                <input type="text" placeholder="请输入您的职位" placeholder-style="flex:1;font-size:14px;font-weight:400;color: #C8C8C8;" v-model="job">
			              </view>
			          </view>
					  
					  <!-- 简称 -->
					  <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
					  						  <view class="xingxing">
					  						  	*
					  						  </view>
					      <view class="StretchIndexSend-name">企业简称</view>
					      <view class="StretchIndexSend-input" style="flex: 1;margin-top: 2px;">
					        <input type="text" placeholder="请输入企业简称" placeholder-style="flex:1;font-size:14px;font-weight:400;color: #C8C8C8;" v-model="short_name">
					      </view>
					  </view>
					  
					  <!-- 联系方式 -->
					  <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
					  						  <view class="xingxing">
					  						  	*
					  						  </view>
					      <view class="StretchIndexSend-name">联系方式</view>
					      <view class="StretchIndexSend-input" style="flex: 1;margin-top: 2px;">
					        <input type="text" placeholder="请输入企业联系方式" placeholder-style="font-size:14px;font-weight:400;color: #C8C8C8;" v-model="contact">
					      </view>
					  </view>
					  
					  
					  <view class="StretchIndexSend-content flex justify-between align-center border-bottom" @click="chooseCity">
					  						  <view class="xingxing">
					  						  	*
					  						  </view>
					      <view class="StretchIndexSend-name">联系地址</view>
					      <view class="StretchIndexSend-input" style="flex: 1;margin-top: 2px;">
					        <input type="text" placeholder="请选择联系地址" placeholder-style="flex:1;font-size:14px;font-weight:400;color: #C8C8C8;" v-model="address" disabled="">
					      </view>
					  </view>
					  
					  <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
					  						  <view class="xingxing" style="margin-right: 10px;">
					  						  	
					  						  </view>
					      <view class="StretchIndexSend-name">商城主页</view>
					      <view class="StretchIndexSend-input" style="flex: 1;margin-top: 2px;">
					        <input type="text" placeholder="请输入商城主页链接" placeholder-style="flex:1;font-size:14px;font-weight:400;color: #C8C8C8;" v-model="shop_url">
					      </view>
					  </view>
					  <!-- 描述 -->
					  
					  <view class="flex" v-if="showtext">
						  <view class="xingxing">
						  	*
						  </view>
						  <view class="wenzijieshao" style="margin-right: 10px;width: auto;">企业简介</view>
						  <textarea class="xsdz" placeholder="请输入企业简介" v-model="description" id="xsdz" style="flex: 1;height:83px;border:1px solid rgba(212,212,212,1);
	border-radius:5px;background-color: white;z-index: 10; font-size:14px;font-weight:400;color: #C8C8C8;margin-bottom: 0;"></textarea>
					  </view>
					  
					  
			  
					  <!-- 发布预览 -->
					  <view class="jiafabu" style="background-color: white;position: fixed;bottom: 0;left: 0;height: auto;z-index: 1000;">
					  	 <view @click="send" style="width: 100%;position: static;border-radius: 0;" v-if="status=='1'">确定</view>
						 <view @click="send1" style="width: 100%;position: static;border-radius: 0;" v-if="status=='0'">确定</view>
					  </view>     
		    </view>
			
			
			<view class="" style="padding: 15px;font-size:14px;font-weight:400;color:rgba(51,51,51,1);">
				温馨提示：<text class="xingxing">*</text>为必填项
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
				myProps: {
				  label: 'name',
				  value: 'sn',
				  children: 'child'
				},
				description:"",
				showtext:true,
				shop_url:'',
				address:'',
				city:'',
				citySn:'',
				province:'',
				provinceSn:'',
				contact:'',
				job:'',
				status:'0',
				id:'',
				finish:false,
				fileList:[], //图片本地地址列表
				imgUrl2:[],
				list:[], // 城市列表
				logo:'',
				finish1 : false,
				short_name:''
			}
		},
		onLoad(e) {
			this.status = e.status
			this.id = e.id
			// 0是重新编辑
			if(e.status=='0'){
				// 获取默认值
				this.getData()
			}else{
				this.getCity()
			}
			
			
		},
		watch: {
		    finish () {
		      if (this.finish) {
		        uni.hideLoading();
		        this.$api.company_authentication_second({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
				  logo_image:this.imgUrl2,
				  contact:this.contact,
		          job: this.job,
		          shop_url: this.shop_url,
		          description: this.description,
		          province: this.provinceSn,
		          city: this.citySn,
				  id:this.id,
				  short_name:this.short_name
		        }).then(res => {
					// console.log(res)
				  Toast(res.data.msg)
		          // this.$toast(res.msg)
		          if (res.data.code === '200') {
					  uni.setStorageSync('company_id',res.data.data.company_id)
					  setTimeout(()=>{
						  uni.redirectTo({
						  	 url:'../../pagesTwo/MyBusiness/MyBusiness?id='+uni.getStorageSync("company_id")
						  })
					  }, 1000);
					 
		          }
		        })
		      }
		    },
			finish1 () {
			  if (this.finish1) {
			    uni.hideLoading();
			    this.$api.update_company({
			      token: uni.getStorageSync("token"),
			      user_id: uni.getStorageSync("userId"),
				  logo_image:this.imgUrl2,
				  contact:this.contact,
			      job: this.job,
			      shop_url: this.shop_url,
			      description: this.description,
			      province: this.provinceSn,
			      city: this.citySn,
				  id:this.id,
				  short_name:this.short_name
			    }).then(res => {
					// console.log(res)
				  Toast(res.data.msg)
			      // this.$toast(res.msg)
			      if (res.data.code === '200') {
					  setTimeout(()=>{
						  uni.navigateBack({
						  	delta:1
						  })
					  }, 1000);
					 
			      }
			    })
			  }
			}
		},
		methods: {
			getData(){
				this.$api.update_company_default({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
				}).then(res=>{
					// console.log(res)
					this.fileList.push({url:res.data.data.logo})
					this.job = res.data.data.job
					this.contact = res.data.data.contact
					this.shop_url = res.data.data.shop_url
					this.id = res.data.data.id
					this.description = res.data.data.description
					this.provinceSn = res.data.data.province
					this.citySn = res.data.data.city
					this.logo = res.data.data.logo
					this.short_name = res.data.data.short_name
					// console.log(this.short_name)
					this.$nextTick(()=>{
						this.getCity()
					})
				})
			},
			// 重新编辑的发布
			send1 () {
				  var that = this	      
			      if (this.job && this.contact && this.address && this.description && this.short_name &&this.fileList.length > 0 ) {
					  
					  if(this.fileList[0].url.indexOf('aliyuncs.com')==-1){
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
						  	 // console.log(res)
						  	 that.imgUrl2.push({
						  		 hash:'',
						  		 url_image:res[1].data.split('<Location>')[1].split("</Location>")[0],
						  		 size:''
						  	 })
						  	 
						  	 if(that.imgUrl2.length>0){
						  		 that.imgUrl2 = JSON.stringify(that.imgUrl2).split('[')[1].split(']')[0]
						  		 that.finish1 = true
						  	 }
						   })
						    
						  }).catch(() => {
						  			
						  })
					  }else{
						  // 这个是用的阿里返回的图片,证明没改
						  Dialog.confirm({
						    title: '发布提示',
						    message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担，确认发布？'
						  }).then(() => {
							  
							  uni.showLoading({
							      title: '加载中'
							  });
							  that.imgUrl2.push({
									 hash:'',
									 url_image:that.logo,
									 size:''
							  })
							  that.imgUrl2 = JSON.stringify(that.imgUrl2).split('[')[1].split(']')[0]
							  that.finish1 = true
							  
						  }).catch(() => {
						  			
						  })
						  
					  }
					  
					  
			
			      } else {
					  if (this.fileList.length <= 0) {
					    Toast('请上传企业执照')
					    return
					  }
					  
			          if (!this.job) {
						  Toast('我的职位没有填写')
						  return
					  }
					  if (!this.contact) {
						  Toast('联系方式没有填写')
						  return
					  }
					  if (!this.address) {
						  Toast('请选择地址')
						  return
					  }
			          if (!this.description) {
						  Toast('请填企业简介')
						  return
			          }
					  if (!this.short_name) {
						  Toast('请填企业简称')
						  return
					  }
					
			      }
			},
			// 完善的发布
			send () {
				  var that = this	      
			      if (this.job && this.contact && this.address && this.description && this.short_name && this.fileList.length > 0 ) {
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
					  
			          if (!this.job) {
						  Toast('我的职位没有填写')
						  return
					  }
					  if (!this.contact) {
						  Toast('联系方式没有填写')
						  return
					  }
					  if (!this.address) {
						  Toast('请选择地址')
						  return
					  }
			          if (!this.description) {
						  Toast('请填企业简介')
						  return
			          }
					  if (!this.short_name) {
						  Toast('请填企业简称')
						  return
					  }
					
			      }
			},
			
			// 获取城市
			getCity(){
				this.$api.E_areas_list({
					
				}).then(res=>{
					// console.log(res)
					this.list = res.data.data
					if(this.status=='0'){
						for(var i = 0 ; i<this.list.length;i++){
							if(this.provinceSn == this.list[i].sn){
								// console.log(this.list[i])
								this.address = this.list[i].name
								for(var j = 0;j<this.list[i].child.length;j++){
									if(this.citySn == this.list[i].child[j].sn){
										this.address = this.address + ' ' +this.list[i].child[j].name
									}
								}
							}
						}
					}
					
				})
			},
			chooseCity(){
				this.$refs.pic1.show()
			},
			hidep(){
				this.showtext = true
			},
			showp(){
				this.showtext = false
			},
			ok(e){
				// console.log(e)
				this.address = e.item[0].name+ ' ' + e.item[1].name
				this.provinceSn = e.value[0]
				this.citySn = e.value[1]
			},
			// 删除图片
			del(e){
				this.fileList = this.fileList.filter((item,index)=> index!=e.detail.index)
			},
			// 图片上传后的预览
			afterRead(event) {
			      const { file } = event.detail;
			      this.fileList.push({url:file[0].path})
			},
		}
	}
</script>

<style>
	@import url("../../pagesMy/StretchIndexSend/StretchIndexSend.css");
	.van-uploader__upload{
		width:105px!important;
		height:105px!important;
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
		width:105px!important;
		height:105px!important;
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
	.xingxing{
		color: red;
		margin-right: 3px;
	}

</style>
