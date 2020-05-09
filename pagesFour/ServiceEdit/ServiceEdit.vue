<template>
	<view class="StretchIndexSend" style="position: absolute;width: 100%;min-height: 100%;">
		<view class="caijian"@tap="chooseImage()">
			
			<view class="caijianzhong flex justify-center align-center" v-if="path.length==0">
				<van-icon name="plus" class="plus"/>
			</view>
			<view class="imgTitle" v-if="path.length==0">
				上传图片
			</view>
			<image class="image" :src="path" style="width: 100%;height: 100%;"></image>
		</view>
		<view class="StretchIndexSend-padding" v-if="picshow" style="padding: 20px 20px 0;">
				  
		          <!-- 内容 -->
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">服务标题</view>
		              <view class="StretchIndexSend-input">
		                <input type="text" placeholder="请输入标题(不超过30个字)" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="title" maxlength='30'>
		              </view>
		          </view>
				  
				  
				  <view class="StretchIndexSend-content flex justify-between align-center border-bottom re" @click.stop="Service">
				  					  
				      <view class="StretchIndexSend-name">服务类型</view>
						  <!-- <picker mode = 'selector' @change="pickershop" :range="list1"> -->
							  <view style="flex:1" class="StretchIndexSend-city">
								
								<view style="" class="flex align-center justify-end">
								   <view style="
												font-size:16px;
												font-weight:400;
												color:rgba(102,102,102,1);
				
												">
									  <input type="text" placeholder="请选择服务类型" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model="category_name" disabled="disabled">
								   </view>
								  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
								</view>
							  </view>
						  <!-- </picker> -->
				  </view>
		
		
		
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom" @click.stop="priceShow">
		              <view class="StretchIndexSend-name">价格区间</view>
		              <view class="StretchIndexSend-input">
		                <input  type="number" placeholder="请输入价格区间" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="price" disabled>
		              </view>
					  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">地址</view>
		              <view style="flex:1" class="StretchIndexSend-city">
						  <picker mode = 'region' @change="pickercity">
						  	<view style="" class="flex align-center justify-end">
						  	   <view style="
						  	                font-size:16px;
						  	                font-weight:400;
						  	                color:rgba(102,102,102,1);
						  			
						  	                ">
						  	      <input type="text" placeholder="选择地址" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model="address" disabled="disabled">
						  	   </view>
						  			
						  	  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
						  			
						  	</view>
						  </picker>
		                
		              </view>
		          </view>
		
		          
				  <!-- 图片和描述 -->
				  
				<view>
				  <view class="wenzijieshao">会员优惠（选填）</view>
				  <textarea class="xsdz" placeholder="请输入优惠方案(不超过20个字)" v-model="content" id="xsdz" style="100%;height:190upx;" maxlength="20" v-if="showArea"></textarea>
				  <view class="wenzijieshao">服务描述</view>
				  <textarea class="xsdz" placeholder="请输入描述" v-model="des" id="xsdz" v-if="showArea"></textarea>
				  
				  
				  <view class="shangpinzhaopian">服务图片（最多9张）</view>
				  <van-uploader :file-list="fileList" :max-count="9" @after-read="afterRead" multiple='true' @delete="del"/>
				</view>
		  
				   <!-- 图片结束 -->
		          
	    </view>
		
		<!-- 发布预览 -->
	    <view class="jiafabu" v-if="picshow">
			 <view @click="send1" v-if="status==100">预览</view>
			 <view @click="send" v-else>预览</view>
			 
	    </view>
		
		<!-- 图片 -->
		<kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="true" :blob="false" :width="750" :height="500"></kps-image-cutter>
		<lb-picker :list="list" mode="multiSelector" ref="pic1" :props="myProps" @confirm="ok" @show="showp" @hide="hidep"></lb-picker>
		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
		
		<van-dialog
		  use-slot
		  title="请输入服务价格区间"
		  :show="show"
		  show-cancel-button
		  @confirm='firm'
		  @close = "close"
		  @cancel = "cancel"
		>
		  <view class="main flex align-center justify-between">
			 <input type="digit" placeholder="￥请输入" v-model="sprice"/> <text style="margin: 0 15upx;">至</text> <input type="digit" placeholder="￥请输入" v-model="eprice"/>
		  </view>
		</van-dialog>
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	import LbPicker from '../base/lb-picker'
	import UniIcons from '../base/uni-icons/uni-icons'
	var app = getApp().globalData
	export default {
		components: {
			kpsImageCutter,
			LbPicker,
			UniIcons
			},
		data() {
			return {
				myProps: {
				  label: 'name',
				  value: 'id',
				  children: 'child'
				},
			  picshow:true,
			  showArea:true,
			  url: "",
			  path: "",
			  path1:'',
			  imgpath:'',
			  finish:false,
			  fileList:[], //图片本地地址列表
			  fileList1:[], //图片本地地址列表
			  imgArr:[], //上传阿里后的列表地址
			  category_id: '',
			  
			  showList :false,
			  // 分类列表
			  list1:[],
			  list: [],
			  title:'',
			  title1:'',
			  des:'',
			  des1:'',
			  price:'',
			  content: '',
			  content1: '',
			  address: '',//绑定地址
			  address1: '',//绑定地址
			  category_name: '',
			  category_name1: '',
			  cate_pid:'',
			  cate_id:'',
			  sprice:'',
			  sprice1:'',
			  eprice:'',
			  eprice1:'',
			  show:false,
			  province:'',
			  city:'',
			  imgs:[],
			  detail:{},
			  id:'',
			  status:10
			}
		},
		onLoad(e) {
		  	this.getClassify()
			if(e.id){
				this.id = e.id
			}
			if(e.status){
				this.status = e.status
			}
			// 100是编辑过来的，type为1的时候是审核失败过来的，需要判断改变值
			if(e.status==100){
				uni.showLoading({
				    title: '加载中',
					mask:"true"
				});
				this.getData()
			}
		},
		methods: {
			// 获取详情
			getData(){
				this.$api.sp_detail({
					token: uni.getStorageSync("token")||'',
					user_id: uni.getStorageSync("userId")||'',
					id:this.id
				}).then(res=>{
					if(res.data.code=="200"){
						uni.hideLoading()
						// console.log(res.data.data.data.imgs)
						for(var val of res.data.data.data.imgs){
							this.fileList.push({url:val})
						}
						for(var val of res.data.data.data.imgs){
							this.fileList1.push({url:val})
						}
						this.province = res.data.data.data.province
						this.path = res.data.data.data.img
						this.path1 = res.data.data.data.img
						this.title = res.data.data.data.title
						this.title1 = res.data.data.data.title
						this.category_name = res.data.data.data.cate_name_str
						this.category_name1 = res.data.data.data.cate_name_str
						this.cate_id = res.data.data.data.cate_id
						this.cate_pid = res.data.data.data.cate_pid
						this.sprice = res.data.data.data.sprice
						this.eprice = res.data.data.data.eprice
						this.sprice1 = res.data.data.data.sprice
						this.eprice1 = res.data.data.data.eprice
						this.cate_name = res.data.data.data.cate_name
						this.address = res.data.data.data.province + ' ' + res.data.data.data.city
						this.address1 = res.data.data.data.province + ' ' + res.data.data.data.city
						this.city = res.data.data.data.city
						this.des = res.data.data.data.desc
						this.des1 = res.data.data.data.desc
						this.content = res.data.data.data.discounts
						this.content1 = res.data.data.data.discounts
						this.price ="￥" + this.sprice + " " + "至" + " " + "￥"+ this.eprice 
					}
				})
			},
			cancel(){
				this.show = false
				// this.sprice=""
				// this.eprice=""
				this.showArea = true
			},
			firm(e){
				// console.log(e)
				// console.log(this.sprice)
				if(this.sprice || this.eprice){
					this.price ="￥" + this.sprice + " " + "至" + " " + "￥"+ this.eprice 
				}
				this.show = false
				this.showArea = true
			},
			close(){
				this.show = false
				this.showArea = true
				// this.sprice=""
				// this.eprice=""
			},
			priceShow(){
				this.show = true
				this.showArea = false
			},
			// 服务分类
			getClassify () {
				this.$api.cate_select({
					}).then(res => {
						this.list = res.data.data
					})
			},
			Service(){
				this.$refs.pic1.show()
				this.showArea=false
			},
			hidep(){
				this.showtext = true
				this.showArea = true
			},
			showp(){
				this.showtext = false
				this.showArea = true
			},
			ok(e){
				// console.log(e)
				this.cate_pid = e.value[0]
				this.cate_id = e.value[1]
				this.category_name = e.item[0].name + '/' + e.item[1].name
				this.showArea = true
			},
			// 选择城市
			pickercity(e){
				this.province = e.detail.value[0].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '')
				this.city = e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
				this.address = e.detail.value[0].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '') + ' ' +e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
			},
			// 这个是编辑的预览,需要改变才能预览
			send1(){
				if(JSON.stringify(this.fileList)==JSON.stringify(this.fileList1)&&this.path==this.path1&&this.title==this.title1&&this.category_name==this.category_name1&&this.sprice==this.sprice1&&this.eprice1==this.eprice&&this.address==this.address1&&this.des==this.des1&&this.content==this.content1){
					uni.showToast({
					    title: '您没有改变填写信息，无法预览！',
					    mask: "true",
						icon:'none'
					});
				}else{
					this.send()
					
				}
			},
			// 发布
			send () {
				  var that = this
			      var pattern = /^[\d-]+$/			      
			      if (this.path && this.title && this.category_name && this.sprice && this.eprice && this.address && this.des && this.fileList.length > 0) {
			        Dialog.confirm({
			          title: '预览提示',
			          message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认预览？'
			        }).then(() => {
						this.imgs = []
						for(var val of this.fileList){
							this.imgs.push(val.url)
						}
						
						// console.log(this.imgs)
			          this.detail = {
							  title:this.title,
							  city: this.city,
							  img: this.path,
							  cate_id:this.cate_id,
							  cate_pid:this.cate_pid,
							  imgs: this.imgs,
							  province:this.province,
							  view: 0,
							  collect: 0,
							  contact: 0,
							  cate_name: this.category_name.split('/')[1],
							  sprice: this.sprice,
							  eprice:this.eprice,
							  discounts: this.content,
							  desc:this.des
						}
					
					this.$nextTick(()=>{
						if(this.status==100){
							uni.navigateTo({
								url:'/pagesFour/ServiceDetails/ServiceDetails?detail='+ encodeURIComponent(JSON.stringify(this.detail))+'&status=1'+"&user_id="+uni.getStorageSync("userId") + "&id=" + this.id
							})
						}else{
							uni.navigateTo({
								url:'/pagesFour/ServiceDetails/ServiceDetails?detail='+ encodeURIComponent(JSON.stringify(this.detail))+'&status=1'+"&user_id="+uni.getStorageSync("userId")
							})
						}
						
					})
					  
			        }).catch(() => {
			
			        })
			      } else {
			        if (!this.path) {
			          Toast('主图没有选择')
			          return
			        }
					if (!this.title) {
					  Toast('服务标题没有填写')
					  return
					}
					if (!this.category_name) {
					  Toast('服务类型没有填写')
					  return
					}
			        if (!this.sprice) {
			          Toast('价格区间没有填写起始价格')
			          return
			        }
					if (!this.eprice) {
					  Toast('价格区间没有填写结束价格')
					  return
					}
			        
			        if (!this.address) {
			          Toast('所在城市没有填写')
			          return
			        }
			        if (!this.des) {
			          Toast('服务描述没有填写')
			          return
			        }
			        if (this.fileList.length <= 0) {
			          Toast('服务图片不能为空')
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
			},
			// 这个是选择主图裁剪的
			chooseImage() {
				uni.chooseImage({
					success: (res) => {
						uni.pageScrollTo({
							scrollTop:0
						})
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
				// setTimeout(function() {
				// 	uni.pageScrollTo({
				// 		scrollTop:600
				// 	})
				// }, 200);
			},
			oncancle() {
				// url设置为空，隐藏控件
				this.url = "";
				this.picshow = true
				// setTimeout(function() {
				// 	uni.pageScrollTo({
				// 		scrollTop:600
				// 	})
				// }, 200);
			}
		}
	}
</script>

<style>
	@import url("../../pagesMy/StretchIndexSend/StretchIndexSend.css");
	@import url("./ServiceEdit.css");
	.image {
		width: 100px;
		height: 100px;
	}
</style>
