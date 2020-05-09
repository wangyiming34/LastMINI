<template>
	<view class="informationSend">
		<!-- 头部 -->
		<view class="informationSend-head flex justify-between align-center">
			<view class="informationSend-canel" @click="canel">
				取消
			</view>
			<view class="informationSend-ok" @click="send">
				发布
			</view>
		</view>
		<!-- 下面的文字和图片 -->
		<textarea  placeholder="此刻你想说些什么…" v-model.trim="content" class="informationSend-text" placeholder-style="color:rgba(204,204,204,1);"/>
		<view class="">
			<view style="margin-bottom:10px">上传照片（最多9张，可不传）</view>
			<van-uploader :file-list="fileList" :max-count="9" @after-read="afterRead" multiple='true' @delete="del"/>
		</view>
		
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
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
				if(this.fileList.length>0){
					this.imgArr = JSON.stringify(this.imgArr)
					uni.hideLoading();
					this.$api.create_user_dynamics({
					  token: uni.getStorageSync("token"),
					  user_id: uni.getStorageSync("userId"),
					  content: this.content,
					  images: this.imgArr
					}).then(res => {
						// console.log(res)
					  Toast(res.data.msg)
					  // this.$toast(res.msg)
					  if (res.data.code === '200') {
						  uni.switchTab({
						  	url:'../../pages/information/information'
						  })
					  }
					})
				}else{
					// this.imgArr = JSON.stringify(this.imgArr)
					uni.hideLoading();
					this.$api.create_user_dynamics({
					  token: uni.getStorageSync("token"),
					  user_id: uni.getStorageSync("userId"),
					  content: this.content
					}).then(res => {
						console.log(res)
					  Toast(res.data.msg)
					  // this.$toast(res.msg)
					  if (res.data.code === '200') {
						  uni.switchTab({
						  	url:'../../pages/information/information'
						  })
					  }
					})
				}
		      }
		    }
		},
		methods: {
			send(){
				var that = this
				// var pattern = /^[\d-]+$/			      
				if (this.content) {
				  Dialog.confirm({
				    title: '发布提示',
				    message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
				  }).then(() => {
				    uni.showLoading({
				        title: '加载中'
				    });
					if(that.fileList.length>0){
						async function put () {
						  for (let i = 0; i < that.fileList.length; i++) { 
								// console.log(that.fileList[i].url)
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
											 hash:'',
											 url_image:res[1].data.split('<Location>')[1].split("</Location>")[0],
											 size:''
										 })
										 if(that.fileList.length === that.imgArr.length){
											 that.finish = true
										 }
										 
									 })
						     }
						}
						 put()
						
					}else{
						that.finish = true
					}
				    
				  }).catch(() => {
							
				  })
				} else {
				    Toast('请填写你要说的话！')
				}
			},
			canel(){
				uni.navigateBack({
					delta:1
				})
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
			}
		}
	}
</script>

<style>
	@import url("./informationSend.css");
</style>
