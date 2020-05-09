<template>
	<view style="padding-bottom: 50px;">
		<view class="first border-bottom-new2 flex align-center">
			<view class="firsttitle">
				产品/服务标题
			</view>
			<input type="text" placeholder="请输入产品/服务标题" class="ippt" placeholder-class="iipptt" v-model.trim="title"/>
		</view>
		<view class="firstbottom">
			<view class="firstbottom-title">
				产品/服务简介
			</view>
			<textarea  placeholder="请输入产品/服务简介" v-model="description" class="first-textarea" maxlength="-1"/>
			
			<view class="firstbottom-title">
				产品/服务详情
			</view>
			<textarea  placeholder="请输入产品/服务详情" v-model="content" class="first-textarea" maxlength="-1"/>
			
			<view class="firstbottom-title">
				产品/服务图片
			</view>
			<view class="flex justify-around" style="margin-bottom: 10px;padding: 0 0 12px;font-size:15px;font-weight:400;color:rgba(200,200,200,.8);">
				  <view style="flex-direction: column;display: flex;justify-content: center;align-items: center;width: 100%;position: relative;">
					<van-uploader :file-list="fileList" :max-count="1" @after-read="afterRead" multiple='true' @delete="del"/>
					<view style="position: absolute;font-size:16px;font-weight:400;color:rgba(0,77,197,1);bottom: 40px;">
						上传照片
					</view>
				  </view>
			</view>
		</view>
		
		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
		 
		<view @click="send" class="publicSend" v-if="type==1000">发布</view>
		<view @click="send1" class="publicSend" v-else>确定</view>
		
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				id:"",
				title:'',
				type:'',
				description:'',
				content:'',
				fileList:[],
				imgUrl2:[],
				finish:false,
				finish1:false,
				logo:''
			}
		},
		onLoad(e) {
			if(e.id){
				this.id = e.id
				this.type = e.type
				this.getData()
			}else{
				this.type = e.type
			}
		},
		watch: {
		    finish () {
		      if (this.finish) {
		        uni.hideLoading();
		        this.$api.create_company_services_products({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
				  images:this.imgUrl2,
		          title: this.title,
		          content: this.content,
		          description: this.description,
				  company_id:uni.getStorageSync('company_id')
		        }).then(res => {
					// console.log(res)
				  Toast(res.data.msg)
		          // this.$toast(res.msg)
		          if (res.data.code === '200') {
					  setTimeout(()=>{
						  uni.redirectTo({
						  	url:'../../pagesTwo/MyBusinessProduct/MyBusinessProduct?id='+uni.getStorageSync("company_id")
						  })
					  }, 1000);
					 
		          }
		        })
		      }
		    },
			finish1 () {
			  if (this.finish1) {
			    uni.hideLoading();
			    this.$api.update_company_services_products({
			      token: uni.getStorageSync("token"),
			      user_id: uni.getStorageSync("userId"),
			      images:this.imgUrl2,
			      title: this.title,
			      content: this.content,
			      description: this.description,
			      company_id:uni.getStorageSync('company_id'),
				  type:this.type,
				  id:this.id
			    }).then(res => {
			    	// console.log(res)
			      Toast(res.data.msg)
			      // this.$toast(res.msg)
			      if (res.data.code === '200') {
			    	  setTimeout(()=>{
			    		  uni.redirectTo({
			    		  	url:'../../pagesTwo/MyBusinessProduct/MyBusinessProduct?id='+uni.getStorageSync("company_id")
			    		  })
			    	  }, 1000);
			    	 
			      }
			    })
			  }
			}
		},
		methods: {
			getData(){
				this.$api.update_company_services_products_default({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					id:this.id,
					type:this.type
				}).then(res=>{
					if(res.data.code=='200'){
						this.title = res.data.data.title
						this.description = res.data.data.description
						this.content = res.data.data.content
						this.fileList.push({url:res.data.data.url_image})
						this.logo = res.data.data.url_image
					}
				})
			},
			// 重新编辑的发布
			send1 () {
				  var that = this	      
			      if (this.title && this.content  && this.description && this.fileList.length > 0 ) {
					  
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
					  if (!this.title) {
						  Toast('产品/服务标题没有填写')
						  return
					  }
					  
					  if (!this.description) {
						  Toast('请输入产品/服务简介')
						  return
					  }
					  if (!this.content) {
						  Toast('请输入产品/服务详情')
						  return
					  }
					  if (this.fileList.length <= 0) {
					      Toast('请上传照片')
						  return
					  }
					
			      }
			},
			// 发布
			send () {
				  var that = this	      
			      if (this.title && this.content  && this.description && this.fileList.length > 0 ) {
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
			          if (!this.title) {
						  Toast('产品/服务标题没有填写')
						  return
					  }
					  
			          if (!this.description) {
						  Toast('请输入产品/服务简介')
						  return
			          }
					  if (!this.content) {
						  Toast('请输入产品/服务详情')
						  return
					  }
					  if (this.fileList.length <= 0) {
					    Toast('请上传照片')
					    return
					  }
			      }
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
	@import url("./MyProductSend.css");
	van-uploader{
		width:100%!important;
	}
	.van-uploader{
		width:100%!important;
	}
	.van-uploader__upload{
		width:100%!important;
		height:160px!important;
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
		width:100%!important;
		height:160px!important;
		border-radius:0!important;
	}
	.van-uploader__preview{
		margin: 0!important;
		width:100%!important;
		z-index: 10;
	}
</style>
