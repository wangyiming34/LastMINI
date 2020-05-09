<template>
	<view class="StretchIndexSend" style="position: absolute;width: 100%;min-height: 100%;">
		<view class="StretchIndexSend-padding">
		        
		          <!-- 内容 -->
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">交易额数目（万）</view>
		              <view class="StretchIndexSend-input">
		                <input type="text" placeholder="填写交易数目" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="money" maxlength="6" @input ="keypress">
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content  border-bottom">
		              <view class="StretchIndexSend-name" style="margin-bottom: 10px;">选择交易身份</view>
		              <view class="flex justify-between">
						<view class="both" v-for="(item,index) in both" :key="index" :class="{bothActive:bothIndex===index+1}" @click="bothclick(index+1)">
							{{item}}
						</view>
						
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">对方公司</view>
		              <view class="StretchIndexSend-input">
		                <input  type="text" placeholder="请输入对方公司名称" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="cname">
		              </view>
		          </view>
		

		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom" v-if="clubList.length>0">
		              <view class="StretchIndexSend-name">俱乐部选择</view>
		              <view style="flex:1" class="StretchIndexSend-city">
						  <picker mode = 'selector' @change="pick" :range="clubList" range-key="name">
						  	<view style="" class="flex align-center justify-end">
						  	   <view style="
						  	                font-size:16px;
						  	                font-weight:400;
						  	                color:rgba(102,102,102,1);
						  			
						  	                ">
						  	      <input type="text" placeholder="请选择俱乐部" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model.trim="clubName" disabled="disabled">
						  	   </view>
						  			
						  	  <van-icon name="arrow" color="#999999" style="margin-top:3px"/>
						  			
						  	</view>
						  </picker>
		                
		              </view>
		          </view>
		
		   
				  <!-- 图片和描述 -->
				  
				  <view style="margin-bottom: 30px;">
					  
					  <view class="shangpinzhaopian" style="margin-bottom: 8px;">上传凭证（非必填）</view>
					  <view style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);margin-bottom: 18px">
					  	合同，发票等，最多9张
					  </view>
					  <van-uploader :file-list="fileList" :max-count="9" @after-read="afterRead" multiple='true' @delete="del"/>
				  </view>
				  <!-- 图片结束 -->
				  
				  <view style="font-size:13px;font-weight:400;color:rgba(153,153,153,1);line-height:18px;">
				  	德申平台十分注重个人和公司隐私，我们将全力维护您的隐私安全，上传即同意我们的隐私政策，我们平台将不会不会保存您的数据。
				  </view>
		          
	    </view>
		
		<!-- 发布预览 -->
	    <view class="jiafabu"  style="background-color: white;">
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
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		
		data() {
			return {
				bothIndex:'',
			    both:['甲方','乙方'],
			    finish:false,
			    fileList:[], //图片本地地址列表
			    imgArr:[], //上传阿里后的列表地址
			    cname: '',
			    money: '',
				clubList:[],
				clubName:'',
				club_id:''
			}
		},
		watch: {
		    finish () {
		      if (this.finish) {
				this.imgArr = JSON.stringify(this.imgArr)
		        uni.hideLoading();
		        this.$api.Turnover_store({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
		          trade:this.bothIndex,
				  company_name:this.cname,
				  amount:this.money,
		          imgs: this.imgArr,
				  club_id:this.club_id
		        }).then(res => {
		          if (res.data.code === '200') {
					  Toast('上传成功')
					  setTimeout(function() {
						  uni.reLaunch({
						  	url:'../../pagesTwo/TradingDetail/TradingDetail'
						  })
					  }, 1000);
		          }
		        })
		      }
		    }
		},
		mounted() {
		  	
		},
		onLoad() {
			this.getClub()
		},
		methods: {
			keypress () {
				setTimeout(() => { this.money = this.money.replace(/[^\d^.]+/g, ' ') }, 0)
			},
			pick(e){
				// console.log(e.detail.value)
				this.club_id = this.clubList[e.detail.value].club_id
				this.clubName = this.clubList[e.detail.value].name
			},
			bothclick(ind){
				// console.log(ind)
				this.bothIndex = ind
			},
			getClub(){
				this.$api.Club_club_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					this.clubList = res.data.data
					// console.log(this.clubList)
					var len = res.data.data.length
					if (len > 1) {
					  var result = []
					  var obj = {}
					  for (var i = 0; i < len; i++) {
						if (!obj[this.clubList[i].club_id]) {
						  result.push(this.clubList[i])
						  obj[this.clubList[i].club_id] = true
						}
					  }
					  this.clubList = result
					} else {
					  this.clubList = res.data.data
					}
				})
			},
			// 主图下面的图片
			sendTwo(){
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
			send () {
			      // 有俱乐部必须携带俱乐部
			      if (this.clubList.length > 0) {
			        if (this.money && this.bothIndex && this.cname && this.clubName) {
			          // 看看有没有图片
			          if (this.fileList.length > 0) {
						  Dialog.confirm({
						    title: '发布提示',
						    message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
						  }).then(() => {
						    uni.showLoading({
						        title: '加载中'
						    });
							this.sendTwo()
						 })
			           
			          } else {
						  Dialog.confirm({
						     title: '发布提示',
						     message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
						   }).then(() => {
						     uni.showLoading({
						         title: '加载中'
						     });
						  	setTimeout(() => {
						  	  this.finish = true
						  	}, 1000)
						  })
			            
			          }
			        } else {
			          if (!this.money) {
						Toast('交易金额没有填写')
			            return
			          }
			          if (!this.bothIndex) {
						Toast('甲方乙方没有选择')
			            return
			          }
			
			          if (!this.cname) {
						Toast('对方公司没有填写')
			            return
			          }
			          if (!this.clubName) {
						Toast('俱乐部没有选择')
			          }
			        }
			      } else { // 没有俱乐部
			        if (this.money && this.bothIndex && this.cname) {
			          // 看看有没有图片
			          if (this.fileList.length > 0) {
							  Dialog.confirm({
								title: '发布提示',
								message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
							  }).then(() => {
								uni.showLoading({
									title: '加载中'
								});
								this.sendTwo()
							 })
			           
			          } else {
						  Dialog.confirm({
							 title: '发布提示',
							 message: '请保证信息的真实性，因此产生的一切法律纠纷均由用户自行承担。平台审核中发现问题会立即下架您所发布的内容，确认发布？'
						   }).then(() => {
							 uni.showLoading({
								 title: '加载中'
							 });
							setTimeout(() => {
							  this.finish = true
							}, 1000)
						  })
			            
			          }
			        } else {
			          if (!this.money) {
			          	Toast('交易金额没有填写')
			            return
			          }
			          if (!this.bothIndex) {
			          	Toast('甲方乙方没有选择')
			            return
			          }
			          			
			          if (!this.cname) {
			          	Toast('对方公司没有填写')
			          }
			          
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
				  setTimeout(()=>{
					  uni.pageScrollTo({
					  	scrollTop:1000
					  })
				  }, 300);
			}
		}
	}
</script>

<style>
	@import url("../../pagesMy/StretchIndexSend/StretchIndexSend.css");
	.image {
		width: 100px;
		height: 100px;
	}
	.both{
		width:45%;
		height:38px;
		border-radius:8px;
		/* opacity:0.34; */
		border:1px solid rgba(6,77,197,1);
		line-height: 38px;
		text-align: center;
		font-size:17px;
		font-weight:400;
		color:rgba(6,77,197,1);
	}
	.bothActive{
		color: white;
		background:rgba(6,77,197,1);
	}
</style>
