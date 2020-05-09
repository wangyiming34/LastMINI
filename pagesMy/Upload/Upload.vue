<template>
	<view>
		<view class="shangpinzhaopian">图片（最多9张）</view>
		<van-uploader :file-list="fileList" :max-count="9" @after-read="afterRead" multiple='true' @delete="del"/>
		<!-- 发布预览 -->
		<view class="jiafabu1">
			 <view @click="send">发布</view>
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
	var app = getApp().globalData
	export default {
		data() {
			return {
				finish:false,
				fileList:[], //图片本地地址列表
				imgArr:[], //上传阿里后的列表地址
			}
		},
		methods: {
			send () {
				  var that = this		      
			        Dialog.confirm({
			          title: '发布提示',
			          message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
			        }).then(() => {
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
								 console.log(res[1].data.split('<Location>')[1].split("</Location>")[0])
								 
							 })
			               }
			          }
			           put()
			        }).catch(() => {
			
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
				  setTimeout(function() {
					  uni.pageScrollTo({
					  	scrollTop:1000
					  })
				  }, 300);
				 
			}
		}
	}
</script>

<style>
	@import url("../StretchIndexSend/StretchIndexSend.css");
	@import url("../FindProject/FindProject.css");
</style>
