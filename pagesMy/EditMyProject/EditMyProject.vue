<template>
	<view class="StretchIndexSend" style="padding-bottom: 65px;">
		<view class="StretchIndexSend-padding">
		         
		          <!-- 内容 -->
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">标题</view>
		              <view class="">
		                <input type="text" placeholder="请输入标题（限18个字）" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="name" maxlength="18">
		              </view>
		          </view>
				  
				  <!-- 选择标签 -->
				  <view  @click.stop="tabpick" class="border-bottom StretchIndexSend-content">
				      <view class="flex justify-between  ">
							<view class="StretchIndexSend-name">标签</view>
							<view style="flex:1" class="StretchIndexSend-city">
											  						  
														<view style="" class="flex align-center justify-end">
														   <view style="
																		font-size:16px;
																		font-weight:400;
																		color:rgba(102,102,102,1);
																
																		">
															  <input type="text" placeholder="请选择" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%"  disabled="disabled">
														   </view>
																
														  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
																
														</view>
											  						  
							  
							</view>
				      </view>
					  <view class="flex" style="flex-wrap: wrap; margin-top: 5px;" v-if="elist.length>0">
					  	<view v-for="(item,index) in elist" :key="index" class="alltab1">
					  		<text>{{item}}</text>
					  	</view>
					  </view>
				  </view>
				  		
		          <!-- 选择城市 -->
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
						  	      <input type="text" placeholder="请选择" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model="address" disabled="disabled">
						  	   </view>
						  			
						  	  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
						  			
						  	</view>
						  </picker>
		                
		              </view>
		          </view>
				  
				  
				  <!-- 选择资金 -->
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom re">
					  
		              <view class="StretchIndexSend-name">可投资金</view>
					  <picker mode = 'selector' @change="pickershop" :range="list1">
						  <view style="flex:1" class="StretchIndexSend-city">
							
							<view style="" class="flex align-center justify-end">
							   <view style="
											font-size:16px;
											font-weight:400;
											color:rgba(102,102,102,1);
			
											">
								  <input type="text" placeholder="请选择" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model="money" disabled="disabled">
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
					  <view class="shangpinzhaopian">图片（最多9张）</view>
					  <van-uploader :file-list="fileList" :max-count="9" @after-read="afterRead" multiple='true' @delete="del"/>
					</view>
		  
				   <!-- 图片结束 -->
		          
	    </view>

		<!-- 发布预览 -->
	    <view class="jiafabu1">
			 <view @click="send">发布</view>
	    </view>
		
		<!-- 城市选择 -->
		

		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	// import wPicker from "@/components/w-picker/w-picker.vue";
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		
		data() {
			return {
			  finish:false,
			  fileList:[], //图片本地地址列表
			  imgArr:[], //上传阿里后的列表地址
			  content: '',
			  name: '',
			  address: '',  //绑定地址
			  category_id: '',
			  money: '',
			  elist:[],
			  showList :false,
			  lable:'',
			  list1:[],
			  province:'',
			  city:'',
			  id:'',
			  type:'',
			  Detail:''
			}
		},
		watch: {
		    finish () {
		      if (this.finish) {
				  for(var i = 0; i<this.elist.length;i++){
					  this.lable += ","+this.elist[i]
				  }
				  this.lable=this.lable.substr(1)
				  // console.log(lable.str(0))
				this.imgArr = JSON.stringify(this.imgArr)
		        uni.hideLoading();
		        this.$api.Opportunity_update_op({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
				  type:this.type,
				  label:this.lable,
		          title: this.name,
		          money: this.money,
		          province:this.province,
				  city:this.city,
		          content: this.content,
		          images: this.imgArr,
				  id:this.id
		        }).then(res => {
				  Toast(res.data.msg)
		          // this.$toast(res.msg)
		          if (res.data.code === '200') {
					  app.eList = []
					  uni.navigateBack({
					  	delta:1
					  })
		          }
		        })
		      }
		    }
		},
		mounted() {
		  	
		},
		onShow() {
			this.elist = app.eList
		},
		onLoad(e) {
			// 获取所需资金
			this.id = e.id
			this.getData()
		  	this.getMoney()
		},
		methods: {
			getData(){
				this.$api.Opportunity_detail({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					id:this.id
				}).then(res=>{
					// console.log(res)
					if (res.data.code === '200') {
					  this.Detail = res.data.data
					  this.name = res.data.data.title
					  this.elist = res.data.data.label
					  app.eList = res.data.data.label
					  // console.log(app.eList)
					  this.address = res.data.data.provincename + ' '+ res.data.data.cityname
					  this.province = res.data.data.provincename
					  this.city = res.data.data.cityname
					  this.money = res.data.data.money
					  this.content = res.data.data.content
					  res.data.data.images.forEach((item,index)=>{
						  this.fileList.push({url:item.url_image})
					  })
					  this.type = res.data.data.op_type
					} else if (res.data.code === '1010') {
					  uni.clearStorageSync()
					  uni.showToast({
					      title: '登录过期，请重新登录',
					      duration: 2000,
					  	  icon:'none'
					  });
					  uni.reLaunch({
					  	url: '../../pages/login/login'
					  })
					}
				})
			},
			tabpick(){
				uni.navigateTo({
					url:'../../pagesMy/TabSelect/TabSelect?status=2'
				})
			},
			// 选择金额
			pickershop(e){
				this.money =this.list1[e.detail.value] 
			},
			// 所需资金
			getMoney(){
			      this.$api.Opportunity_money({
			      }).then(res => {
			        this.list1 = res.data.data
			      })
			},
			// 选择城市
			pickercity(e){
				this.address = e.detail.value[0].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '') + ' ' +e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
				this.province = e.detail.value[0].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '')
				this.city = e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
			},
			// 发布
			send () {
				  var that = this		      
			      if (this.name && this.elist.length > 0 && this.address && this.money && this.content && this.fileList.length > 0 ) {
			        Dialog.confirm({
			          title: '发布提示',
			          message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
			        }).then(() => {
			          uni.showLoading({
			              title: '加载中'
			          });
					  async function put () {
					    for (let i = 0; i < that.fileList.length; i++) { 
								if(that.fileList[i].url.indexOf("aliyuncs.com") != -1){
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
										 // console.log(res)
										 that.imgArr.push({
											 url_image:res[1].data.split('<Location>')[1].split("</Location>")[0]
										 })
										 
									 })
								 }
								if(that.fileList.length === that.imgArr.length){
									that.finish = true
								}
					  						  
					       }
					  }
			           put()
			        }).catch(() => {
			
			        })
			      } else {
			        if (!this.name) {
			          Toast('请填写标题')
			          return
			        }
					if (this.elist.length<=0) {
					  Toast('请选择标签')
					  return
					}
				
			        if (!this.address) {
			          Toast('请选择城市')
			          return
			        }
			        if (!this.money) {
			          Toast('请选择金额')
			          return
			        }
					if (!this.content) {
					  Toast('请填写内容')
					  return
					}
			        if (this.fileList.length <= 0) {
			          Toast('图片不能为空')
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
