<template>
	<view class="content"> 
	     <view class="personal_con" style="padding-top: 50px">
	       <view @click="changeText" style="position: absolute;left: 0;top:0;font-size: 16px;line-height: 40px;padding: 0 3%;text-align: right;font-weight:500;">
			   <view class="" v-if="internationalization=='zh'">
			   	 <text class="tabtitle">中文</text><text>/EN</text>
			   </view>
			   <view class="" v-else>
			   	 <text class="tabtitle">EN</text><text>/中文</text>
			   </view>
		   </view>
	       <view class="infoCon infoConNew" style="margin: 0 auto;width: 91%">
				<!-- 标题 -->
				<view style="font-size:44upx;font-weight:500;color:rgba(51,51,51,1);">
				   {{internationalization=='zh'?"海外用户认证":"Overseas user authentication"}}
				</view>
				<!-- 国家选择 -->
				<view class="text flex align-center justify-between">
				  <label for="detail">
					  {{internationalization=='zh'?"国籍":"Country"}}
				  </label>
				  <picker mode = 'selector' @change="countrySelect" :range="nationList" :range-key="internationalization=='zh'?'name_zh':'name_en'">
						  <view class="flex align-center justify-between">
								<input type="text" :placeholder="placeholderCountry" id="detail" v-model.trim="country" disabled="" >
								<van-icon name="arrow" color="#CCCCCC" size="12px"/>
						  </view>
				  </picker>
				</view>
				<!-- 证件类型 -->
				<view class="text flex align-center justify-between">
				  <label for="name">
						{{internationalization=='zh'?"证件类型":"ID Type"}}
				  </label>
				  <input type="text"  id="name" v-model.trim="type" disabled>
				</view>
				<!-- 姓名 -->
				<view class="text flex align-center justify-between">
				  <label for="name">
					{{internationalization=='zh'?"姓&emsp;&emsp;名":"Name"}}
				  </label>
				  <input type="text" :placeholder="placeholderName" id="name" v-model.trim="nickname">
				</view>
				
				<!-- 身份证号 -->
				<view class="text flex align-center justify-between">
				   <label for="id">
					   {{internationalization=='zh'?"证件号码":"ID Number"}}
				   </label>
				   <input type="text" :placeholder="placeholderIdCard" id="id" v-model.trim="idcard">
				</view>
				
				<!-- 出生日期 -->
				<view class="text flex align-center justify-between">
				   <label for="detail">
					   {{internationalization=='zh'?"出生日期":"Birth"}}
				   </label>
				   <picker mode = 'date' @change="pickerBirth">
					  <view class="flex align-center justify-between">
							<input type="text" :placeholder="placeholderBirth" id="detail" v-model.trim="birth" disabled="" >
							<van-icon name="arrow" color="#CCCCCC" size="12px"/>
					  </view>
				   </picker>
				</view>
				
				<view class="">
						<view style="margin:15px 0;font-size: 15px;color: #999999;">
							{{internationalization=='zh'?"证件照片":"Passport photo"}}
						</view>
						<van-uploader :file-list="fileList" :max-count="9" @after-read="afterRead" multiple='true' @delete="del"/>
				</view>
				
				<view style="margin: 70upx 0;color: #666666;font-size: 28upx;font-weight:400;">
					<view class="">
						{{internationalization=='zh'?"提示":"Tips："}}
					</view>
					<view class="">
						{{internationalization=='zh'?"中国港澳台用户：当地居民身份证明":"Hong Kong, Macao and Taiwan：Local  identification"}}
					</view>
					<view class="">
						{{internationalization=='zh'?"海外用户：护照或海外身份证明":"Overseas：Passport or overseas identification"}}
					</view>
					<view class="">
						{{internationalization=='zh'?"如有疑问联系德申用户服务中心：":"When in doubt, call the customer service："}}
						<text style="color: #064DC5;" @click="tel">＋8615645088075</text>
					</view>
				</view>
	       </view>
		   
	       <view class="btn1" style="margin: 50px auto;">
			 <view class="" @click="next">
			 	{{internationalization=='zh'?"完成":"Submit"}}
			 </view>
	       </view>

	     </view>
	   </view>
</template>

<script>
	var app = getApp().globalData
	export default {
		data() {
			return {
				finish:false,
				fileList:[], //图片本地地址列表
				imgArr:[], //上传阿里后的列表地址
				nationList:[],
				id:'',
				placeholderName:'请填写',
				placeholderCountry:'请选择',
				placeholderBirth:'请选择',
				birth:'',
				type:'',
				country:'',
				nickname: '',
				idcard: '',
				placeholderIdCard:'请填写',
			    address: '',
				internationalization:'zh'//默认中文
			}
		},
		onLoad() {
			// 获取国籍
			this.getNationality()
		},
		watch: {
		    finish () {
		      if (this.finish) {
					this.imgArr = JSON.stringify(this.imgArr)
					uni.hideLoading();
					this.$api.register_applies({
					  token: uni.getStorageSync("token"),
					  user_id: uni.getStorageSync("userId"),
					  // user_id:15000,
					  country_id:this.id,
					  papers_type:this.type,
					  name:this.nickname,
					  idcard:this.idcard,
					  birthday:this.birth,
					  images: this.imgArr
					}).then(res => {
						
					  uni.showToast({
					  	title:res.data.msg,
						icon:'none'
					  })
					  if (res.data.code === '200') {
						  setTimeout(()=>{
							  uni.navigateTo({
							  	url:'../../pagesMy/ForeignCardDetail/ForeignCardDetail'
							  })
						  }, 500)
					  }
					})
				
		      }
		    }
		},
		methods: {
			tel(){
				uni.makePhoneCall({
				    phoneNumber: '15645088075' //仅为示例
				});
			},
			// 生日选择
			pickerBirth(e){
				this.birth = e.detail.value
			},
			// 国家选择
			countrySelect(e){
				this.id = this.nationList[e.detail.value].id
				// 英文
				if(this.internationalization==='zh'){
					this.country = this.nationList[e.detail.value].name_zh
					if(this.id == 2 || this.id == 3 || this.id == 4){
						this.type = "当地居民身份证明"
					}else{
						this.type = "护照或海外身份证明"
					}
				}else{
					this.country = this.nationList[e.detail.value].name_en
					if(this.id == 2 || this.id == 3 || this.id == 4){
						this.type = "Local  identification"
					}else{
						this.type = "Passport or overseas identification"
					}
				}
			},
			getNationality(){
				this.$api.User_country_list({
				}).then(res=>{
					this.nationList = res.data.data
				})
			},	
			// 中英文切换
			changeText(){
				this.birth=''
				this.type=''
				this.country=''
				this.nickname= ''
				this.idcard= ''
				if(this.internationalization==='zh'){
					// 这是英文
					this.internationalization = 'en'
					this.placeholderName = 'input'
					this.placeholderCountry = 'choice'
					this.placeholderIdCard = 'input'
					this.placeholderBirth = 'choice'
				}else{
					// 这是汉语
				   this.internationalization = 'zh'
				   this.placeholderName = '请输入姓名'
				   this.placeholderCountry = '请选择国籍'
				   this.placeholderIdCard = '请输入'
				   this.placeholderBirth = '请选择'
				   
				}
			},
			foreign(){
				uni.navigateTo({
					url:'../../pagesMy/ForeignCard/ForeignCard'
				})
			},
			// // 选择城市
			// pickercity(e){
			// 	this.address = e.detail.value[0].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '') + ' ' +e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
			// },
			next () {
			      if (!this.country) {
					  if(this.internationalization==='zh'){
						  uni.showToast({
						      title: '请选择国籍',
						      duration: 1000,
						  	  icon:"none"
						  });
					  }else{
						  uni.showToast({
						      title: 'Please choose your nationality',
						      duration: 1000,
						  	  icon:"none"
						  });
						  
					  }
			      } else if (!this.nickname) {
					  if(this.internationalization==='zh'){
							  uni.showToast({
								  title: '请输入姓名',
								  duration: 1000,
								  icon:"none"
							  });
					  }else{
							  uni.showToast({
								  title: 'Please enter your name',
								  duration: 1000,
								  icon:"none"
							  }); 
					  }
			      } else if (!this.idcard) {
					  if(this.internationalization==='zh'){
							  uni.showToast({
								  title: '请输入证件号码',
								  duration: 1000,
								  icon:"none"
							  });
					  }else{
							  uni.showToast({
								  title: 'Please enter your id number',
								  duration: 1000,
								  icon:"none"
							  }); 
					  }
			      } else if (!this.birth) {
					  if(this.internationalization==='zh'){
							  uni.showToast({
								  title: '请选择出生日期',
								  duration: 1000,
								  icon:"none"
							  });
					  }else{
							  uni.showToast({
								  title: 'Please select date of birth',
								  duration: 1000,
								  icon:"none"
							  }); 
					  }
			      } else if (this.fileList.length===0) {
					  if(this.internationalization==='zh'){
							  uni.showToast({
								  title: '请选择证件照片',
								  duration: 1000,
								  icon:"none"
							  });
					  }else{
							  uni.showToast({
								  title: 'Please select id photo',
								  duration: 1000,
								  icon:"none"
							  }); 
					  }
			      }else {
					  
					  
					  var that = this
					  
					  uni.showLoading({
					      title: '提交中...'
					  });
					  
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
					  	scrollTop:1000,
						duration:0
					  })
				  }, 300);
			}
			
			
		}
	}
</script>

<style>
	@import url("../../pages/PersonalIdcard/index.css");
	@import url("./ForeignCard.css");
</style>
