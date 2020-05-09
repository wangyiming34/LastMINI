<template>
	<view class="StretchIndexSend" style="position: absolute;width: 100%;min-height: 100%;">
		<view class="StretchIndexSend-padding" v-if="picshow">
		          <!-- 标题 -->
		          <view class="StretchIndexSend-title flex align-center">
		              <view class="StretchIndexSend-title-blue"></view>
		              <view class="StretchIndexSend-title-h2">发布详情</view>
		          </view>
		          <!-- 内容 -->
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">商品名称</view>
		              <view class="">
		                <input type="text" placeholder="请输入商品名称" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model="name">
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">商品原价</view>
		              <view class="">
		                <input @input="oldprice" type="digit" placeholder="请输入商品原价" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model="original_price">
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">商品现价</view>
		              <view class="">
		                <input @input="nowprice" type="digit" placeholder="请输入商品现价" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model="current_price">
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">客服电话</view>
		              <view class="">
		                <input @input="inputmobile" type="number" placeholder="请输入客服电话" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="mobile">
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">所在城市</view>
		              <view style="flex:1" class="StretchIndexSend-city">
						  <picker mode = 'region' @change="pickercity">
						  	<view style="" class="flex align-center justify-end">
						  	   <view style="
						  	                font-size:16px;
						  	                font-weight:400;
						  	                color:rgba(102,102,102,1);
						  			
						  	                ">
						  	      <input type="text" placeholder="请选择所在城市" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model="address" disabled="disabled">
						  	   </view>
						  			
						  	  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
						  			
						  	</view>
						  </picker>
		                
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom re">
					  
		              <view class="StretchIndexSend-name">商品类别</view>
					  <picker mode = 'selector' @change="pickershop" :range="list1">
						  <view style="flex:1" class="StretchIndexSend-city">
							
							<view style="" class="flex align-center justify-end">
							   <view style="
											font-size:16px;
											font-weight:400;
											color:rgba(102,102,102,1);
			
											">
								  <input type="text" placeholder="请选择商品类别" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model="category_name" disabled="disabled">
							   </view>
							  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
							</view>
						  </view>
					  </picker>
		          </view>
				  <!-- 图片和描述 -->
				  
					<view>
					  <view class="wenzijieshao">文字介绍</view>
					  <textarea class="xsdz" placeholder="我是商品介绍详情" v-model="content" id="xsdz"></textarea>
					  <view class="content" style="margin-bottom: 10px;">
					  	<button @tap="chooseImage()" style="margin-bottom: 20px;font-size: 18px;">点击选择商品主图（1张）</button>
					  	<image class="image" :src="path"></image>
					  </view>
					  <view class="shangpinzhaopian">介绍图片（最多9张）</view>
					  <van-uploader :file-list="fileList" :max-count="9" @after-read="afterRead" :multiple='true' @delete="del"/>
					</view>
		  
				   <!-- 图片结束 -->
		          
	    </view>
		
		<!-- 发布预览 -->
	    <view class="jiafabu" v-if="picshow">
			 <view @click="send">发布</view>
	    </view>
		
		<!-- 城市选择 -->
		<kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="true" :blob="false" :width="750" :height="750"></kps-image-cutter>

		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		components: {kpsImageCutter},
		data() {
			return {
			  picshow:true,
			  url: "",
			  path: "",
			  imgpath:'',
			  id:'',
			  finish:false,
			  fileList:[], //图片本地地址列表
			  imgArr:[], //上传阿里后的列表地址
			  content: '',
			  name: '',
			  mobile: '',
			  current_price: '',
			  original_price: '',
			  address: '',  //绑定地址
			 
			  category_id: '',
			  category_name: '',
			  showList :false,
			  // 分类列表
			  list1:[],
			  list: []
			}
		},
		watch: {
		    finish () {
			  
		      if (this.finish) {
				this.imgArr = JSON.stringify(this.imgArr)
		        uni.hideLoading();
		        this.$api.SmallStretchUpdate({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
		          name: this.name,
		          original_price: this.original_price,
		          current_price: this.current_price,
		          mobile: this.mobile,
		          address: this.address,
		          category_id: this.category_id,
		          content: this.content,
		          images: this.imgArr,
				  image:this.imgpath,
				  id:this.id
		        }).then(res => {
				  Toast(res.data.msg)
		          // this.$toast(res.msg)
		          if (res.data.code === '200') {
					  uni.reLaunch({
					  	url:'../SmallStretchStatus/SmallStretchStatus'
					  })
		          }
		        })
		      }
		    }
		},
		onLoad(e) {
			this.id = e.id
		  	this.getClassify()
			this.getData()
		},
		methods: {
			getData () {
			      this.$api.SmallStretchDetail({
			        token: uni.getStorageSync("token") || '',
			        user_id: uni.getStorageSync("userId") || '',
			        id: this.id
			      }).then(res => {
			        this.category_id = res.data.data.category_id
			        this.content = res.data.data.content
			        this.name = res.data.data.name
			        this.mobile = res.data.data.mobile
			        this.current_price = res.data.data.current_price
			        this.original_price = res.data.data.original_price
			        this.address = res.data.data.address
			        this.category_name = res.data.data.cate_name
					this.path = res.data.data.image
					// console.log(this.path)
			        // this.imageBack = res.data.data.images
					for(let val of res.data.data.images){
						this.fileList.push({url:val.url_image})
					}
					
					// this.fileList.push({url:file[0].path})
			        // console.log(this.imageBack)
			      })
			},
			// 选择商品种类
			pickershop(e){
				// console.log(e.detail.value)
				this.category_id = this.list[e.detail.value].id
				this.category_name = this.list[e.detail.value].name
			},
			// 商品分类
			getClassify () {
			      this.$api.SmallStretchGoodsCategory({
			      }).then(res => {
			        this.list = res.data.data
					res.data.data.forEach((item, index) => {
					     this.list1.push(item.name)
					  })
			      })
			},
			// 选择城市
			pickercity(e){
				this.address = e.detail.value[0].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '') + ' ' +e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
			},
			// 原价匹配数字。
			oldprice(){
				var re=/^[0-9]\d*$/;
				if(!re.test(this.original_price)){
					this.original_price = ''
					Toast('只允许输入正整数')	
				}
			},
			nowprice(){
				var re=/^[0-9]\d*$/;
				if(!re.test(this.current_price)){
					this.current_price = ''
					Toast('只允许输入正整数')	
				}
			},
			inputmobile(){
				  var pattern = /^[\d-]+$/
				  if (!pattern.test(this.mobile)) {
					this.mobile = ''
					Toast('电话号只允许数字和-组成')
				  }
			},
			sendTwo(){
				var that = this
				async function put () {
				  for (let i = 0; i < that.fileList.length; i++) { 
							if(that.fileList[i].url.indexOf("aliyuncs.com") != -1){
								// console.log(that.fileList[i])
								that.imgArr.push({
									url_image:that.fileList[i].url
								})
							}else{
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
								 })
							}
							console.log(that.imgArr)
							if(that.fileList.length === that.imgArr.length){
								that.finish = true
							}			  
				     }
				}
				 put()
				
			},
			// 发布
			send () {
				
				  var that = this
			      var pattern = /^[\d-]+$/			      
			      if (this.name && this.mobile && this.original_price && this.current_price && this.address && this.category_id && this.fileList.length > 0 && this.content && (Number(this.current_price) <= Number(this.original_price)) && this.path ) {
			        Dialog.confirm({
			          title: '发布提示',
			          message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
			        }).then(() => {
			          uni.showLoading({
			              title: '加载中'
			          });
					if(that.path.indexOf("aliyuncs.com") != -1){
						that.imgpath = that.path
						that.sendTwo()
					}else{
						uni.uploadFile({
							  url: app.aliUrl, //仅为示例，非真实的接口地址
							  filePath: that.path,
							  name: 'file',
							  formData: {
							    key:"wx/"+"${filename}",
							    signature: app.signature,
							    policy:app.policy,
							    OSSAccessKeyId:app.OSSAccessKeyId,
							    success_action_status:'201'
							  }
						}).then(res=>{
						 that.imgpath = res[1].data.split('<Location>')[1].split("</Location>")[0]
						 setTimeout(()=>{
							 that.sendTwo()
						 }, 500);
												 
						})
					}
					  
					  
			          
			        }).catch(() => {
			
			        })
			      } else {
			        if (!this.name) {
			          Toast('商品名称没有填写')
			          return
			        }
					if (!this.original_price) {
					  Toast('商品原价没有填写')
					  return
					}
					if (!this.current_price) {
					  Toast('商品现价没有填写')
					  return
					}
			        if (!this.mobile) {
			          Toast('客服电话没有填写')
			          return
			        }
					if (!pattern.test(this.mobile)) {
					  Toast('电话号只允许数字和-组成')
					  return
					}
			        
			        if (!this.address) {
			          Toast('所在城市没有填写')
			          return
			        }
			        if (!this.category_id) {
			          Toast('商品类别没有填写')
			          return
			        }
					if (!this.content) {
					  Toast('商品详情没有填写')
					  return
					}
					if (!this.path) {
					  Toast('请选择一张主图')
					  return
					}
			        if (this.fileList.length <= 0) {
			          Toast('图片不能为空')
			          return
			        }
			        if (Number(this.current_price) > Number(this.original_price)) {
			          Toast('商品现价要比原价底！')
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
			      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			      this.fileList.push({url:file[0].path})
			},
			// 这个是选择主图裁剪的
			chooseImage() {
				uni.chooseImage({
					success: (res) => {
						uni.pageScrollTo({
							scrollTop:0
						})
						console.log(res)
						// 设置url的值，显示控件
					    this.url = res.tempFilePaths[0];
						this.picshow = false
					}
				});
			},
			onok(ev) {
				this.path = ev.path;
				this.url = "";
				this.picshow = true
				setTimeout(function() {
					uni.pageScrollTo({
						scrollTop:600
					})
				}, 200);
			},
			oncancle() {
				// url设置为空，隐藏控件
				this.url = "";
				this.picshow = true
				setTimeout(function() {
					uni.pageScrollTo({
						scrollTop:600
					})
				}, 200);
			}
		}
	}
</script>

<style>
	@import url("./StretchIndexEdit.css");
	.image{
		width: 100px;
		height: 100px;
	}
</style>
