<template>
	<view class="wrap" style="padding: 0px 30upx 20px;background-color: #ffffff;">
		
		
		<!-- 下面的三个选项卡第3个 -->
		<view class="PayStep-three" >
			<view class="flex PayStep-three-first">
				<van-icon name="manager" />
				<text>收件人</text>
			</view>
			<view class="PayStep-three-ipt">
				<input type="text" v-model.trim="name" placeholder="输入收件人姓名"/>
			</view>
			
			<view class="flex PayStep-three-first">
				<van-icon name="phone" />
				<text>联系电话</text>
			</view>
			<view class="PayStep-three-ipt">
				<input type="text" v-model.trim="mobile" placeholder="输入联系电话"/>
			</view>
			
			<view class="flex PayStep-three-first">
				<van-icon name="map-marked" />
				<text>所属地区</text>
			</view>
			<picker mode = 'region' @change="pickercity">
				<view class="PayStep-three-ipt flex justify-between align-center">
					<input type="text" v-model.trim="city" placeholder="选择所属地区" disabled=""/>
					<van-icon name="arrow-down" />
				</view>
			</picker>
			<view class="flex PayStep-three-first">
				<van-icon name="comment" />
				<text>详细地址</text>
			</view>
			<view class="PayStep-three-ipt" style="height: 125upx;">
				<textarea value="" v-model.trim="content" placeholder="输入详细地址" placeholder-style="font-size:14px;line-height:30px;margin-top:5px" style="width: 100%;
	height: 100upx;
	font-size: 14px;" maxlength="40"/>
			</view>
			
			<view class="flex justify-around">
				<view style="width: 35upx;height:35upx;margin-top: 3px;">
					<van-icon name="warning-o" color="#004DC5"/>
				</view>
				<view style="flex: 1;font-size:14px;font-weight:400;color:rgba(102,102,102,1);line-height:19px; text-align: center;padding:0 60upx 0 8upx;">
					国内地区免邮，海外及中国港澳台地区联系德申专属客服顾问：<text style="color: #064dc5;" @click="call">{{number}}</text>
				</view>   
			</view>
			<view style="width:100%;height:40px;background:rgba(0,77,197,1);border-radius:5px;text-align: center;line-height: 40px;color: white;font-weight:400;font-size: 18px;margin:40px 0 0 0 ;"  @click="ok">
				确定
			</view>
		</view>
		
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				content:'',
				city:'',
				address:'',
				mobile:'',
				name:'',
				menu: ['完成支付', '选择礼品', '添加地址'],
				activeIndex: 0,
				number:3000,
				current: 0,
				sex:1,
				sex_list: [{
					url: '../../static/img/boy.png',
					title: '男士VIP',
					value:1
				  },
				  {
					url: '../../static/img/girl.png',
					title: '女士VIP',
					value:2
				}],
				options:[],
				size_list: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
				ManTCurrent:0,
				ManTSize:'S',
				man_size: ['39', '40', '41', '42', '43', '44', '45', '46', '47', '48'],
				woman_size: ['35', '36', '37', '38', '39', '40', '41', '42'],
				womanWhiteSize:'35',
				womanWhiteCurrent:0,
				ManWhiteCurrent:0,
				ManWhiteSize:'39',
				color: ['蓝色', '红色'],
				ColorCurrent:0,
				ColorName:'蓝色',
				msg:'',
				// 5个固定的男士物品
				manList:[
					{name:'德申汇男士领带',price:198,img:'../../static/img/gift4.jpg'},
					{name:'德申汇男士车标',price:168,img:'../../static/img/gift12.jpg'},
					{name:'德申汇男士帽子',price:118,img:'../../static/img/gift5.jpg'},
					{name:'德申汇男士领结',price:98,img:'../../static/img/gift6.jpg'},
					{name:'德申汇男士胸带巾',price:98,img:'../../static/img/gift7.jpg'}
				],
				// 5个固定的女士物品
				womanList:[
					{name:'德申汇女士丝巾（大）',price:318,img:'../../static/img/gift8.jpg'},
					{name:'德申汇女士丝巾（小）',price:168,img:'../../static/img/gift11.jpg'},
					{name:'德申汇女士丝带',price:68,img:'../../static/img/gift10.jpg'},
					{name:'德申汇车标',price:168,img:'../../static/img/gift12.jpg'},
					{name:'德申汇女式帽子',price:98,img:'../../static/img/gift5.jpg'}
				]
				
			}
		},
		onShow() {
			this.getMoney()
		},
		methods: {
			call(){
				uni.makePhoneCall({
					phoneNumber:String(this.number)
				})
			},
			// 全部完成
			ok(){
				if(this.name&&this.mobile&&this.city&&this.content){
						this.address = this.city + ' ' + this.content
						this.msg = '联系人：' + this.name +'\n' + '联系电话：' + this.mobile +'\n'+'邮寄地址：' + this.address
						Dialog.confirm({
						  title: '请仔细核实信息,以防邮寄错误！',
						  message:this.msg
						}).then(() => {
							this.$api.add_address_badge({
								token: uni.getStorageSync("token"),
								user_id: uni.getStorageSync("userId"),
								name:this.name,
								mobile:this.mobile,
								address:this.address
							}).then(res=>{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
								if(res.data.code === '200'){
									uni.switchTab({
									    url: '/pages/index/index'
									});
								}
							})
						  
						}).catch(() => {
						  // on cancel
						});
					
				}else{
					if(!this.name){
						uni.showToast({
							title:'请填写收件人',
							icon:'none'
						})
						return
					}
					if(!this.mobile){
						uni.showToast({
							title:'请填写电话',
							icon:'none'
						})
						return
					}
					if(!this.city){
						uni.showToast({
							title:'请选择城市',
							icon:'none'
						})
						return
					}
					if(!this.content){
						uni.showToast({
							title:'请填写详细地址',
							icon:'none'
						})
						
					}
				}
			},
			// 选择城市
			pickercity(e){
				this.city = e.detail.value[0]+ ' ' + e.detail.value[1] + ' ' + e.detail.value[2] 
			},
			// 男士确定下一步
			manNext(){
				this.options = ['德申汇男士T恤-' + this.ManTSize, '德申汇男士白衬衫-' + this.ManWhiteSize, '德申汇拉杆箱' + this.ColorName, '德申汇男士领带', '德申汇男士胸带巾', '德申汇领结', '德申汇帽子', '德申汇车标', '德申汇徽章']
				this.msg = '德申汇男士T恤：' + this.ManTSize +'码\n' + '德申汇男士白衬衫：' + this.ManWhiteSize+'码\n' + '德申汇拉杆箱：' + this.ColorName 
				Dialog.confirm({
				  title: '核实订单',
				  message:this.msg
				}).then(() => {
					this.$api.ChooseGift({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						sex:1,
						options:JSON.stringify(this.options)
					}).then(res=>{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						this.activeIndex = 2 //到时候需要去掉
						if(res.data.code === '200'){
							this.activeIndex = 2
						}
					})
				  
				}).catch(() => {
				  // on cancel
				});
				
				
				
			},	
			// 女士确定下一步
			WomanNext(){
				this.options = ['德申汇女士T恤-' + this.ManTSize, '德申汇女士白衬衫-' + this.womanWhiteSize, '德申汇拉杆箱' + this.ColorName, '德申汇女士丝巾（大）', '德申汇女士丝巾（小）', '德申汇女士丝带', '德申汇帽子', '德申汇车标', '德申汇徽章']
				this.msg = '德申汇女士T恤：' + this.ManTSize +'码\n' + '德申汇女士白衬衫：' + this.womanWhiteSize+'码\n' + '德申汇拉杆箱：' + this.ColorName 
				Dialog.confirm({
				  title: '核实订单',
				  message:this.msg
				}).then(() => {
					this.$api.ChooseGift({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						sex:2,
						options:JSON.stringify(this.options)
					}).then(res=>{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						this.activeIndex = 2 //到时候需要去掉
						if(res.data.code === '200'){
							this.activeIndex = 2
						}
					})
				  
				}).catch(() => {
				  // on cancel
				});
				
				
				
			},	
			// 选择拉杆箱颜色，可以通用
			chooseColor(item,ind){
				this.ColorName = item
				this.ColorCurrent = ind
			},
			// 选择女白衬衫
			choosewomanWhite(item,ind){
				this.womanWhiteSize = item
				this.womanWhiteCurrent = ind
			},
			// 选择男白衬衫
			chooseManWhite(item,ind){
				this.ManWhiteSize = item
				this.ManWhiteCurrent = ind
			},
			// 选择男T
			chooseManT(item,ind){
				this.ManTSize = item
				this.ManTCurrent = ind
			},
			// 选择男女	
			radioChange(e){
				this.current = Number(e.detail.value) - 1 
				this.sex = Number(e.detail.value)
				// console.log(this.sex)
				// console.log(typeof this.sex)
			},
			getMoney(){
				// 获取电话和二维码
				this.$api.service_er_mobile({
					
				}).then(res=>{
					this.number = res.data.data.mobile
				})
			},
			pay(){
				this.activeIndex = 1
				// 支付成功后改变tab
				// this.$api.Payway({
				// 	user_id: uni.getStorageSync("userId"),
				// 	pay_way:'wxpaymini',
				// 	year: 1
				// }).then(res=>{
				// 	console.log(res)
				// })
			}
			
		}
	}
</script>

<style>
	@import url("./PayStep.css");
</style>
