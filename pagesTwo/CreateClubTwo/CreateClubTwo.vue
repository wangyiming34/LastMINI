<template>
	<view class="StretchIndexSend" style="position: absolute;width: 100%;min-height: 100%;">
		<view class="StretchIndexSend-padding">
				  <!-- 标题-->
				  <view style="font-size:25px;font-weight:500;color:rgba(51,51,51,1);line-height:35px;margin-bottom: 25px;">
				  	 会长信息
				  </view>
		          <!-- 内容 -->
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">生日</view>
		              <view style="flex:1" class="StretchIndexSend-city">
						  <picker mode = 'date' @change="pickBir" >
								<view style="" class="flex align-center justify-end">
								   <view style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);">
									  <input type="text" placeholder="请选择" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model.trim="birthday" disabled="disabled">
								   </view>
								  <van-icon name="arrow-down" color="#999999" style="margin-top:3px;margin-left: 5px;"/>	
								</view>
						  </picker>
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">企业</view>
		              <view class="StretchIndexSend-input">
		                <input  type="text" placeholder="请填写企业名称" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="cname">
		              </view>
		          </view>
		

		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">职务</view>
		              <view style="flex:1" class="StretchIndexSend-city">
						  <picker mode = 'selector' @change="pickDuty" :range="dutyList">
						  	<view style="" class="flex align-center justify-end">
						  	   <view style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);">
						  	      <input type="text" placeholder="请选择" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model.trim="duty" disabled="disabled">
						  	   </view>
						  	  <van-icon name="arrow-down" color="#999999" style="margin-top:3px;margin-left: 5px;"/>	
						  	</view>
						  </picker>
		                
		              </view>
		          </view>
		
				  <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
				      <view class="StretchIndexSend-name">电子邮箱</view>
				      <view class="StretchIndexSend-input">
				        <input  type="text" placeholder="请填写在邮箱" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="email">
				      </view>
				  </view>
				  
				  <view class="flex">
						  <view class="wenzijieshao" style="margin-right: 10px;width: auto;">个人简历</view>
						  <textarea class="xsdz" placeholder="请填写个人简历" v-model="resume" id="xsdz" style="flex: 1;height:105px;border-radius:5px;background-color:rgba(250,250,252,1);" placeholder-style="color:rgba(153,153,153,.6)"></textarea>
				  </view>
				  
				  <!-- 图片和描述 -->
				  
				  <view style="margin-bottom:0px;">
					  
					  <view class="shangpinzhaopian" style="margin-bottom: 20px;">上传身份证/绿卡/护照</view>
					  <view class="flex justify-center">
					  	<van-uploader :file-list="fileList" :max-count="1" @after-read="afterRead" multiple='true' @delete="del"/>
					  </view>
					  <view style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);margin-top: 10px;text-align: center;">
					  	身份证/绿卡/护照正面
					  </view>
				  </view>
				  <!-- 图片结束 -->
				  
				  
		          
	    </view>
		
		<!-- 发布预览 -->
	    <view class="jiafabu"  style="background-color: white;">
			 <view @click="send" style="border-radius:100px;">提交</view>
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
				fileList:[],
				imgArr:[],
				name:'',
				tag_id:'',
				country:'',
				province:'',
				city:'',
				content1:'',
				content2:'',
				birthday:"",
				cname:'',
				duty:'',
				dutyList:["董事长", "总经理", "总经理秘书", "总裁", "副总裁", "总裁助理", "总裁办主任", "人力资源总监", "销售总监", "技术总监", "财务总监", "生产总监", "会计", "出纳", "人事经理", "人事助理", "销售经理", "采购经理"],
				email:'',
				resume:'',
				finish:false
				
			}
		},
		watch: {
		    finish () {
		      if (this.finish) {
		        uni.hideLoading();
		        this.$api.create_city_v2({
		          token: uni.getStorageSync("token"),
		          user_id: uni.getStorageSync("userId"),
		          name:this.name,
				  tag_id:this.tag_id,
				  country:this.country,
				  province:this.province,
				  city:this.city,
				  description:this.content2,
				  birthday:this.birthday,
				  email:this.email,
				  duty:this.cname+this.duty,
				  imagine:this.content1,
				  resume:this.resume,
				  images:this.imgArr
		        }).then(res => {
					uni.showToast({
					    title: res.data.msg,
					    mask: "true",
						icon:'none'
					});
		          if (res.data.code === '200') {
					  setTimeout(function() {
						  uni.reLaunch({
						  	url:'../../pagesTwo/CreateClubDetail/CreateClubDetail'
						  })
					  }, 1000);
		          }
		        })
		      }
		    }
		},
		onLoad() {
			uni.$on('createClubOne',(data)=>{
			   this.name = data.name
			   this.tag_id = data.tag_id
			   this.country = data.country
			   this.province = data.province
			   this.city = data.city?data.city:''
			   this.content1 = data.content1
			   this.content2 = data.content2
			   // console.log(this.name)
			   // console.log(this.tag_id)
			   // console.log(this.country)
			   // console.log(this.province)
			   // console.log(this.city)
			   // console.log(this.content1)
			   // console.log(this.content2)
			})
			// this.getData()
		},
		onUnload() {
		     uni.$off('createClubOne');  
		},
		methods: {
			pickDuty(e){
				this.duty = this.dutyList[e.detail.value]
			},
			pickBir(e){
				this.birthday = e.detail.value
				
			},
			send () {
					var that = this
			        if (this.birthday && this.cname && this.duty && this.email && this.resume && this.fileList.length>0) {
						uni.showLoading({
						    title: '加载中',
							mask:"true"
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
							 
							 that.imgArr.push({
								 hash:'',
								 url_image:res[1].data.split('<Location>')[1].split("</Location>")[0],
								 size:''
							 })
							 
							 if(that.imgArr.length>0){
								 that.imgArr = JSON.stringify(that.imgArr).split('[')[1].split(']')[0]
								 that.finish = true
							 }
						 })
						  
						
							
			        } else {
			          if (!this.birthday) {
						Toast('请选择生日')
			            return
			          }
			          if (!this.cname) {
						Toast('公司没有填写')
			            return
			          }
					  if (!this.duty) {
					  	Toast('请选择职务')
					    return
					  }
			          if (!this.email) {
						Toast('请填写邮箱')
						return
			          }
					  if (!this.resume) {
						Toast('请填写个人简历')
						return
					  }
					  if (this.fileList.length==0) {
						Toast('请上传身份证/绿卡/护照')
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
	@import url("../CreateClubOne/CreateClubOne.css");
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
	.van-uploader__upload{
		width:334upx!important;
		height:193upx!important;
		background:rgba(242,242,242,0.58)!important;
		margin: 0!important;
		border: 1px dashed #ebedf0!important;
	}
	.van-icon-plus{
		color: #004DC5!important;
		font-size: 25px!important;
		font-weight: 500!important;
	}
	.van-uploader__preview-image{
		width:344upx!important;
		height:193upx!important;
		border-radius:0!important;
	}
	.van-uploader__preview{
		margin: 0!important;
		z-index: 10;
	}
	.StretchIndexSend-name{
		margin-right: 10px;
	}
</style>
