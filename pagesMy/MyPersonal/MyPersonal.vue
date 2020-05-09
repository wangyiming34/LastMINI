<template>
	<view>
		<view class="border-bottom-new2 MyPersonal-tab flex justify-between align-center re">
			<image :src="avatar" lazy-load="true" class="imga" mode="aspectFill" v-if="avatar" style="width: 50px;height: 50px;border-radius: 100%;"></image>
			<van-uploader :max-count="1" @after-read="afterRead" multiple='true' :preview-full-image="false" :deletable="false" style="flex: 1;height: 50px;"/>
			<van-icon name="arrow" />
		</view>
		<!-- 姓名 -->
		<view class="border-bottom-new2 MyPersonal-tab flex justify-between align-center title">
			<view class="">
				姓名
			</view>
			<view class="">
				{{name}}
			</view>
		</view>
		<!-- 身份证 -->
		<view class="border-bottom-new2 MyPersonal-tab flex justify-between align-center title">
			<view class="">
				身份证号
			</view>
			<view class="">
				{{id_card}}
			</view>
		</view>
		<!-- 政治面貌 -->
		<picker mode="selector" :range='politicsList' @change="pol">
			<view class="border-bottom-new2 MyPersonal-tab flex justify-between align-center title">	
					<view class="">
						政治面貌
					</view>
					<view class="flex justify-between align-center">
						<view style="margin-right: 5px;">
							{{politics}}
						</view>
						<van-icon name="arrow-down" />
					</view>
					
			</view>
		</picker>
		
		<!-- 国家 -->
		<picker mode="selector" :range='countryList' @change="cou" range-key='name_zh'>
			<view class="border-bottom-new2 MyPersonal-tab flex justify-between align-center title">	
					<view class="">
						国家
					</view>
					<view class="flex justify-between align-center">
						<!-- <input type="text" disabled="" v-model.trim="politics" /> -->
						<view style="margin-right: 5px;">
							{{country}}
						</view>
						<van-icon name="arrow-down" />
					</view>
					
			</view>
		</picker>
		
		<!-- 地址 -->
		<picker mode="region" @change="pickercity">
			<view class="border-bottom-new2 MyPersonal-tab flex justify-between align-center title">	
					<view class="">
						所在地址
					</view>
					<view class="flex justify-between align-center">
						<!-- <input type="text" disabled="" v-model.trim="politics" /> -->
						<view style="margin-right: 5px;">
							{{address}}
						</view>
						<van-icon name="arrow-down" />
					</view>
					
			</view>
		</picker>
		
		<!-- 文化程度 -->
		<picker mode="selector" :range='educationList' @change="edu">
			<view class="border-bottom-new2 MyPersonal-tab flex justify-between align-center title">	
					<view class="">
						文化程度
					</view>
					<view class="flex justify-between align-center">
						<!-- <input type="text" disabled="" v-model.trim="politics" /> -->
						<view style="margin-right: 5px;">
							{{education}}
						</view>
						<van-icon name="arrow-down" />
					</view>					
			</view>
		</picker>
		
		<view class="MyPersonal-tab" style="margin-top: 50px;">
			<view class="" style="font-size: 16px;color: #fff;text-align: center;line-height: 44px;background: #064DC5;border-radius: 6px;" @click="save">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp().globalData
	export default {
		data() {
			return {
				// 默认的只用了头像,别的默认没做对比,后台判断了
				finish:false,
				fileList:[], //图片本地地址列表
				imgArr:[], //上传阿里后的列表地址
				info:'',
				name: '', // 姓名
			    id_card: '', // 身份证号
			    education: '', // 文化程度
				educationList:['高中及以下', '大专', '本科', '研究生', '硕士', '博士'],
				deeducation: '',
			    avatar: '', // 头像
				deavatar: '',
			    country: '', // 国家
				countryList:[],
				decountry: '',
			    politics: '', // 政治面貌
				depolitics:'',
				politicsList:['共青团员', '共产党员', '预备党员', '群众', '其他'],
			    address: '' ,// 地址
				deaddress: ''
			}
		},
		onShow() {
			
		},
		onLoad() {
			this.getUser()
			this.getCountry()
		},
		watch: {
		    finish () {
		      if (this.finish) {

				this.$api.update_button({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					politics: this.politics,
					country: this.country,
					address: this.address,
					education: this.education,
					name: this.name,
					avatar:this.avatar
				  }).then(res => {
					  // console.log(res)
					uni.hideLoading();
					uni.showToast({
					    title: res.data.msg,
					    duration: 2000,
						icon:'none'
					});
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
			save(){
				var that = this
				uni.showLoading({
				    title: '上传中',
					mask:'true'
				});
				if(this.avatar!==this.deavatar){
					// 上传接口还没换
					
					async function put () {
						  await  uni.uploadFile({
									  url: app.aliUrl,
									  filePath: that.avatar,
									  name: 'file',
									  formData: {
									    key:"wx/"+"${filename}",
									    signature: app.signature,
									    policy:app.policy,
									    OSSAccessKeyId:app.OSSAccessKeyId,
									    success_action_status:'201'
									  }
							 }).then(res=>{
								 that.avatar = res[1].data.split('<Location>')[1].split("</Location>")[0]
								 setTimeout(function() {
									 that.finish = true
								 }, 1000);
								
							 })
					}
					 
					put()
					
				}else{
					
					this.$api.update_button({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						politics: this.politics,
						country: this.country,
						address: this.address,
						education: this.education,
						name: this.name
					  }).then(res => {
						uni.hideLoading();
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000,
							icon:'none'
						});
						if (res.data.code === '200') {
						  uni.navigateBack({
						  	delta:1
						  })
						}
					  })
				}
			},
			// 文化程度选择
			edu(e){
				// console.log(e)
				this.education = this.educationList[e.detail.value]
			},
			// 选择城市
			pickercity(e){
				this.address = e.detail.value[0].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '') + ' ' +e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
			},
			// 国家选择
			cou(e){
				// console.log(e)
				this.country = this.countryList[e.detail.value].name_zh
			},
			// 政治面貌选择
			pol(e){
				this.politics = this.politicsList[e.detail.value]
			},
			getCountry(){
				this.$api.locales_list({
				}).then(res=>{
					this.countryList = res.data.data
				})
			},
			getUser(){
				this.$api.update_user_info({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					// console.log(res)
					if (res.data.code === '200') {
						  this.info = res.data.data
						  this.name = this.info.nickname
						  this.address = this.info.address
						  this.education = this.info.education
						  this.politics = this.info.politics
						  this.country = this.info.country
						  this.deaddress = this.info.address
						  this.deeducation = this.info.education
						  this.depolitics = this.info.politics
						  this.decountry = this.info.country
						  this.avatar = this.info.avatar
						  this.deavatar = this.info.avatar
						  this.id_card = this.info.idcard
						  
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
			// 图片上传后的预览
			afterRead(event) {
			  const { file } = event.detail
			  this.avatar = file[0].path
			}
		}
	}
</script>

<style>
	@import url("./MyPersonal.css");
</style>
