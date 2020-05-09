<template>
	<view style="width:100%;height: 100%;background-color: #FAFAFA;padding: 14px 15px 30px;">
		<view style="padding-bottom: 30px;" v-if="clubList.length>0">
			<!-- 城市俱乐部 -->
		    <view v-for="(item,index) in clubList" :key="index" class="haveClub flex redClub"  @click="goClubIndex(item)" v-show="item.type==1">
		    	<view class="haveClub-left">
		    		<image :src="item.url_image?item.url_image:'../../static/img/logo.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
		    	</view>
		    	<view class="haveClub-right">
		    		<view style="font-size:18px;font-weight:500;color:rgba(255,255,255,1);margin-bottom: 10upx;">
		    			{{item.name}}
		    		</view>
		    		<view style="font-size:15px;font-weight:400;color:rgba(255,255,255,1);margin-bottom: 20upx;">
		    			<text>创会会长：{{item.cdr}}</text> <text style="margin: 0 5px;" v-if="item.nickname"> I </text><text v-if="item.nickname">现任会长：{{item.nickname}}</text>
		    		</view>
		    		<view class="re flex" style="font-size:13px;font-weight:400;color:rgba(255,255,255,.8);">
		    			<view style="border-radius:2px;border:1px solid rgba(255,255,255,.5);padding: 0 5px;">
		    				编号：{{item.sn==null?'暂无':item.sn}}
		    			</view>
		    			<view style="margin-left: 7px;border-radius:2px;border:1px solid rgba(255,255,255,.5);padding: 0 5px;">
		    				成员：{{item.user_count}}
		    			</view>
		    			<view class="haveClub-ab" v-show="item.type==1">
		    				城市
		    				<view class="sanjiao">
		    					
		    				</view>
		    			</view>
		    		</view>
		    	</view>
		    </view>
			<!-- 应缴费人数 -->
			<view class="jiaofei flex justify-between align-center" v-if="Renew" @click="goRenewCity">
				<view style="font-size:18px;font-weight:500;color:rgba(6,77,197,1);">
					{{cityName}}应续费VIP
				</view>
				<view class="flex justify-between align-center" style="font-size:15px;font-weight:400;color:rgba(51,51,51,1);">
					<view >
						人数：{{Renew}}人
					</view>
					<van-icon name="arrow" size="12px" color="#ccc"/>
				</view>
			</view>
			<!-- 非城市俱乐部 -->
			<view v-for="(item,index) in clubList" :key="index" class="haveClub flex"  @click="goClubIndex(item)" v-show="item.type==0" style="background: white;">
				<view class="haveClub-left">
					<image :src="item.url_image?item.url_image:'../../static/img/logo.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>
				<view class="haveClub-right">
					<view style="font-size:18px;font-weight:500;color:#666666;margin-bottom: 10upx;">
						{{item.name}}
					</view>
					<view style="font-size:15px;font-weight:400;color:#666666;margin-bottom: 20upx;">
						<text>创会会长：{{item.cdr}}</text> <text style="margin: 0 5px;" v-if="item.nickname"> I </text><text v-if="item.nickname">现任会长：{{item.nickname}}</text>
					</view>
					<view class="re flex" style="font-size:13px;font-weight:400;color:#666666;">
						<view style="border-radius:10px;border:1px solid rgba(33, 85, 255, .5);padding: 0 5px;color: #007AFF;">
							编号：{{item.sn==null?'暂无':item.sn}}
						</view>
						<view style="margin-left: 7px;border-radius:10px;border:1px solid rgba(33, 85, 255, .5);padding: 0 5px;color: #007AFF;">
							成员：{{item.user_count}}
						</view>
						<view class="haveClub-ab" v-show="item.type==1">
							城市
							<view class="sanjiao">
								
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 自由港人员 -->
			<view style="width:100%;height:134px;background:rgba(255,255,255,1);box-shadow:1px 0px 4px 1px rgba(201,201,201,0.5);border-radius:6px;padding: 5px 21px 25px;" class="flex justify-between" @click="goFreedomHarbor">
				<view style="padding-top: 20px;">
					<view style="font-size:21px;color:rgba(6,77,197,1);margin-bottom: 6px;font-weight:500;">
						{{cityName}}自由港
					</view>
					<view style="font-size:15px;color:rgba(68,68,68,1);font-weight:400;margin-bottom: 15px;">
						成员：{{freedom_harbor?freedom_harbor:0}}人
					</view>
					<view style="width:64px;height:22px;background:rgba(6,77,197,1);border-radius:11px;text-align: center;line-height: 22px;font-size:12px;font-weight:500;color:rgba(255,255,255,1);">
						详情
					</view>
				</view>
				<view style="width:87px;height:107px;">
					<image src="https://web.detion.com/static/image/club/free.png" lazy-load="true" class="imga" mode="aspectFill"></image>
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
				type:'',
				cityName:'',
				clubList:[],
				freedom_harbor:'',
				Renew:''
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: this.cityName+'城市俱乐部',
			  imageUrl:app.shareImg,
			  path: '/pagesTwo/CityClub/CityClub?type='+this.type +'&cityName=' + this.cityName
			}
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中'
			});
			this.type = e.type
			this.cityName = e.cityName
			this.$nextTick(()=>{
				this.getList()
			})
		},
		methods: {
			goRenewCity(){
				uni.navigateTo({
					url:'../../pagesThree/RenewCity/RenewCity?cityName='+this.cityName + "&type=" +this.type
				})
			},
			goFreedomHarbor(){
				if(this.freedom_harbor){
					uni.navigateTo({
						url:'../../pagesTwo/FreedomHarbor/FreedomHarbor?cityName='+this.cityName
					})
				}else{
					uni.showToast({
						icon:"none",
						title:'该城市无自由港成员'
					})
				}
				
			},
			goClubIndex(item){
				// console.log(item)
				uni.navigateTo({
					url:'../../pagesTwo/ClubIndex/ClubIndex?id='+item.id +"&type="+item.type
				})
			},
			getList(){
				this.$api.city_detail({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type:this.type,
					city_name:this.cityName
				}).then(res=>{
					uni.hideLoading();
					// console.log(res)
					if(res.data.code==='200'){
						this.clubList = res.data.data.club_list
						this.freedom_harbor = res.data.data.freedom_harbor
						if(res.data.data.Renew){
							this.Renew = res.data.data.Renew
						}
						// console.log(this.clubList)
						// console.log(this.Renew)
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../Club/Club.css");
</style>
