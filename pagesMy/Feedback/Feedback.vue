<template>
	<view class="Feedback">
		<view class="re new-b" style="height:88upx ;width: 100%;">
			<view class="ab pos-center" style="font-size: 36upx;
				color: #333333;
				">
				反馈与建议
			</view>
			<view class="ab" style="
			    right: 3%;
			    font-size: 28upx;
			    color: #064DC5;
				line-height: 88upx;
			" @click="send">
				提交
			</view>
		</view>
		
		<view style="padding: 20upx 30upx; width: 100%;height: 300upx ;box-sizing: border-box;">
			<textarea  placeholder="请简要描述您的问题和建议，以便我们提供更好的帮助" maxlength="-1" placeholder-style="color:#cccccc;line-height:28upx" v-model.trim="content"/>
		</view>
			
		<view style="padding: 40px 15px;">
			<van-uploader :file-list="fileList" :max-count="9" @after-read="afterRead" multiple='true' @delete="del"/>
		</view>	
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				finish:false,
				fileList:[], //图片本地地址列表
				imgArr:[], //上传阿里后的列表地址
				content:''
			}
		},
		watch: {
		    finish () {
		      if (this.finish) {
				// this.imgArr = JSON.stringify(this.imgArr)
				// console.log(JSON.stringify(this.imgArr))
		        uni.hideLoading();
		        this.$api.FeedBack({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
		          content: this.content,
		          images: JSON.stringify(this.imgArr)
		        }).then(res => {
				  uni.showToast({
				  	title:res.data.msg,
					icon:"none"
				  })
		          if (res.data.code === '200') {
					  uni.navigateBack({
					  	delta:1
					  })
		          }
		        })
		      }
		    }
		},
		methods: {
			send () {
				  var that = this      
			      if (this.content&&this.fileList.length>0) {
			        Dialog.confirm({
			          title: '发布提示',
			          message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
			        }).then(() => {
			          uni.showLoading({
			              title: '加载中'
			          });
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
								 // console.log(res)
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
			        }).catch(() => {
			
			        })
			      } else {
					  if(!this.content){
						  uni.showToast({
						  	title:'请填写文字',
						  	icon:'none'
						  })
					  }else{
						 uni.showToast({
						 	title:'最少上传一张图片',
						 	icon:'none'
						 }) 
					  }
			        
			      }
			},
			// 删除图片
			del(e){
				console.log(e)
				this.fileList = this.fileList.filter((item,index)=> index!=e.detail.index)
			},
			// 图片上传后的预览
			afterRead(event) {
			      const { file } = event.detail;
			      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			      this.fileList.push({url:file[0].path})
			}
		}
	}
</script>

<style>
	@import url("./Feedback.css");
</style>
