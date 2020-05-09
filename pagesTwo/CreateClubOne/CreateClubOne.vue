<template>
	<view class="StretchIndexSend" style="position: absolute;width: 100%;min-height: 100%;">
		<view class="StretchIndexSend-padding">
				  <!-- 标题-->
				  <view style="font-size:25px;font-weight:500;color:rgba(51,51,51,1);line-height:35px;margin-bottom: 25px;">
					  俱乐部信息
				  </view>
		          <!-- 内容 -->
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">名称</view>
		              <view class="StretchIndexSend-input">
		                <input type="text" placeholder="规则：城市+德申国际+俱乐部编号" style="flex:1;font-size:16px;font-weight:400;text-align:right" v-model.trim="name">
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">标签</view>
		              <view style="flex:1" class="StretchIndexSend-city">
						  <picker mode = 'selector' @change="pickTab" :range="tabList" range-key="tagname">
								<view style="" class="flex align-center justify-end">
								   <view style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);">
									  <input type="text" placeholder="请选择俱乐部标签" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model.trim="tab" disabled="disabled">
								   </view>
								  <van-icon name="arrow-down" color="#999999" style="margin-top:3px;margin-left: 5px;"/>
								</view>
						  </picker>
		              </view>
		          </view>
		
		          <view class="StretchIndexSend-content flex justify-between align-center border-bottom">
		              <view class="StretchIndexSend-name">国家</view>
		              <view style="flex:1" class="StretchIndexSend-city">
						  <picker mode = 'selector' @change="pickCountry" :range="countryList" range-key="name_zh">
								<view style="" class="flex align-center justify-end">
								   <view style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);">
									  <input type="text" placeholder="请选择俱乐部创建国家" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model.trim="country" disabled="disabled">
								   </view>
								  <van-icon name="arrow-down" color="#999999" style="margin-top:3px;margin-left: 5px;"/>
								</view>
						  </picker>
		              </view>
		          </view>
		
				  <view class="StretchIndexSend-content flex justify-between align-center border-bottom" v-if="country">
				      <view class="StretchIndexSend-name">地区</view>
				      <view style="flex:1" class="StretchIndexSend-city">
							  <picker mode = 'selector' @change="pickCity" :range="cityList" :range-key="countryId==1?'name':'cn_name'">
									<view style="" class="flex align-center justify-end">
									   <view style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);">
										  <input type="text" placeholder="请选择" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model.trim="city" disabled="disabled">
									   </view>
									  <van-icon name="arrow-down" color="#999999" style="margin-top:3px;margin-left: 5px;"/>
									</view>
							  </picker>
				      </view>
				  </view>
				  
				  <view class="StretchIndexSend-content flex justify-between align-center border-bottom" v-if="areaList.length>0">
				      <view class="StretchIndexSend-name">城市</view>
				      <view style="flex:1" class="StretchIndexSend-city">
							  <picker mode = 'selector' @change="pickArea" :range="areaList" :range-key="countryId==1?'name':'cn_name'">
									<view style="" class="flex align-center justify-end">
									   <view style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);">
										  <input type="text" placeholder="请选择" style="flex:1;font-size:16px;font-weight:400;text-align:right;width:100%;height:100%" v-model.trim="area" disabled="disabled">
									   </view>
									  <van-icon name="arrow-down" color="#999999" style="margin-top:3px;margin-left: 5px;"/>
									</view>
							  </picker>
				      </view>
				  </view>
		
				  <view class="flex" v-if="showtext">
					  <view class="wenzijieshao" style="margin-right: 25px;width: auto;">创会设想</view>
					  <textarea class="xsdz" placeholder="请填写你的创会理由。例：我希望创一个利他，互助的俱乐部，促进大家共同成长" v-model="content1" id="xsdz" style="flex: 1;height:105px;border-radius:5px;background-color:rgba(250,250,252,1);" placeholder-style="color:rgba(153,153,153,.6)"></textarea>
				  </view>
				  
				  <view class="flex re" v-if="showtext">
						  <view class="wenzijieshao" style="margin-right: 10px;width: auto;">俱乐部简介</view>
						  <textarea class="xsdz" placeholder="请输入俱乐部简介，创会成功后会展示在俱乐部首页。" v-model="content2" id="xsdz" style="flex: 1;height:105px;border-radius:5px;background-color:rgba(250,250,252,1);" placeholder-style="color:rgba(153,153,153,.6)" maxlength="50"></textarea>
						  <text style="position: absolute;bottom: 25px;right: 8px;font-weight:400;color:rgba(102,102,102,1);font-size: 12px;">
						  	 {{content2.length}}/50
						  </text>
				  </view>
				  
	    </view>
		
		<!-- 发布预览 -->
	    <view class="jiafabu"  style="background-color: white;">
			 <view @click="send" style="border-radius:100px;">下一步</view>
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
	export default {
		
		data() {
			return {
				showtext:true,
			    finish:false,
			    name: '',
			    tab: '',
				tag_id:'',
				country:'',
				countryList:[],
				countryId:'',
				city:'',
				cityList:'',
				sn:'',
				city_id:'',
				shortname:'',
				cn_name:'',
				content1:'',
				content2:'',
				tabList:[],
				area:'',
				areaList:[],
				areashortname:'',
				areacn_name:''
				
			}
		},
		watch: {
			// 省
			countryId () {
				this.city = ''
				this.area = ''
				this.areaList = []
			    this.$api.areas_list({
			      locales_id:this.countryId
			    }).then(res => {
					this.cityList = res.data.data
			    })
			},
			// 市
			city () {
				this.area = ''
				if(this.countryId==1){
					this.$api.city_list({
					  sn:this.sn
					}).then(res => {
						console.log(res)
						this.areaList = res.data.data
					})
				}else{
					this.$api.city_list({
					  city_id:this.city_id
					}).then(res => {
						console.log(res)
						this.areaList = res.data.data
					})
				}
			    
			},
		},
		onLoad() {
			this.getTab()
			this.getCountry()
		},
		methods: {
			// 市的选择
			pickArea(e){
				if(this.countryId==1){
					this.area = this.areaList[e.detail.value].name
					this.areashortname = this.areaList[e.detail.value].shortname
					
				}else{
					this.area = this.areaList[e.detail.value].cn_name
					this.areacn_name = this.areaList[e.detail.value].cn_name
				}
			},
			// 省的选择
			pickCity(e){
				if(this.countryId==1){
					if(this.cityList[e.detail.value].name.indexOf('市')!=-1){
						this.city = this.cityList[e.detail.value].shortname
					}else{
						this.city = this.cityList[e.detail.value].name
					}
					this.shortname = this.cityList[e.detail.value].shortname
					this.sn = this.cityList[e.detail.value].sn
				}else{
					this.city = this.cityList[e.detail.value].cn_name
					this.cn_name = this.cityList[e.detail.value].cn_name
					this.city_id = this.cityList[e.detail.value].id
				}
			},
			// 国家选择
			pickCountry(e){
				this.countryId = this.countryList[e.detail.value].id
				this.country = this.countryList[e.detail.value].name_zh
				
			},
			// tab标签选择
			pickTab(e){
				// console.log(e)
				this.tag_id = this.tabList[e.detail.value].id
				this.tab = this.tabList[e.detail.value].tagname
				
			},
			// 获取标签
			getTab(){
				this.$api.create_club_get_duty({
				}).then(res=>{
					this.tabList = res.data.data
				})
			},
			// 获取国家
			getCountry(){
				this.$api.locales_list({
				}).then(res=>{
					console.log(res)
					this.countryList = res.data.data
				})
			},
			send () {
				  // 市列表要是有必须传过去
			        if (this.name && this.tab && this.country && this.city && this.content1 && this.content2) {
			          // 看看有没有市，俄罗斯就没有
			          if (this.areaList.length > 0) {
						  if(!this.area){
							  Toast('请选择城市')
						  }else{
							  // 可以下一步,但是带上城市
							  uni.navigateTo({
							  	 url:"../CreateClubTwo/CreateClubTwo"
							  })
							  
							  setTimeout(()=>{
								  uni.$emit('createClubOne',{
									  name:this.name,
									  tag_id:this.tag_id,
									  country:this.country,
									  province:this.countryId==1?this.shortname:this.cn_name,
									  city:this.countryId==1?this.areashortname:this.areacn_name,
									  content1:this.content1,
									  content2:this.content2
								  })
							  }, 2000);
						  }
						  
			          } else {
						  // 可以下一步,不带城市
						  
						  uni.navigateTo({
						  	 url:"../CreateClubTwo/CreateClubTwo"
						  })
						  
						  setTimeout(()=>{
							  // console.log(this.name)
							  uni.$emit('createClubOne',{
								  name:this.name,
								  tag_id:this.tag_id,
								  country:this.country,
								  province:this.countryId==1?this.shortname:this.cn_name,
								  content1:this.content1,
								  content2:this.content2
							  })
						  }, 2000);
						  
					  }
			        } else {
			          if (!this.name) {
						Toast('俱乐部名称没有填写')
			            return
			          }
			          if (!this.tab) {
						Toast('标签没有选择')
			            return
			          }
			
			          if (!this.country) {
						Toast('国家没有选择')
			            return
			          }
			          if (!this.city) {
						Toast('地区没有选择')
						return
			          }
					  if (!this.content1) {
						Toast('创会设想没有填写')
						return
					  }
					  if (!this.content2) {
						Toast('俱乐部简介没有填写')
						return
					  }
			        }
			}
		}
	}
</script>

<style>
	@import url("../../pagesMy/StretchIndexSend/StretchIndexSend.css");
	@import url("./CreateClubOne.css");
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
