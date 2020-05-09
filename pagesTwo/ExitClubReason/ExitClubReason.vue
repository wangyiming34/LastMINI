<template>
	<view>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="flex boxwrap uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.id">
					<view class="box">
						<checkbox :value="item.cause" :checked="item.checked" color="#004DC5"/>
					</view>
					<view class="cause">{{item.cause}}</view>
				</label>
			</checkbox-group>
			
			<view class="qita">
				其他原因，请在下方填写
			</view>
			<view class="area">
				<textarea placeholder-class="pla" placeholder="请输入其他原因" class="text" v-model.trim='textContent'/>
			</view>
			
			<view class="flex justify-between">
				<view class="btn btn1" @click="stay">
					留下
				</view>
				<view class="btn btn2" @click="exit">
					退出
				</view>
			</view>
			 
		</view>
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				id:'',
				items:[],
				content:'',
				textContent:'',
				textArr:[]
			}
		},
		onLoad(e) {
			// console.log(e)
			this.id = e.id
			this.getReason()
		},
		methods: {
			exit(){
				if (this.textArr.length <= 0 && this.textContent == '') {
				  uni.showToast({
				      title: '必须选择退出原因或者填写其它原因',
				      mask: "true",
				  	  icon:'none'
				  });
				} else {
					  Dialog.confirm({
						title: '提示',
						message: '您当前正在进行退出俱乐部操作，当前操作不可撤销，是否确认退出？',
						confirmButtonText:'确定',
						cancelButtonText:'再想想'
					  }).then(() => {
						    var reason = ''
							if (this.textArr.length > 0) {
							  for (var item of this.textArr) {
								reason += ',' + item
							  }
							  this.content = reason.substr(1) + ',' + this.textContent
							} else {
							  this.content = this.textContent
							}
						    
							this.$api.club_login_out_commit({
								token: uni.getStorageSync("token"),
								user_id: uni.getStorageSync("userId"),
								club_id:this.id,
								content:this.content
							}).then(res=>{
								uni.showToast({
								    title: res.data.msg,
								    mask: "true",
									icon:'none'
								});
								if(res.data.code=='200'){
									setTimeout(()=>{
										uni.redirectTo({
											url:'../../pagesTwo/ExitClubDeatil/ExitClubDeatil?id='+this.id
										})
									}, 1000);
								}
							})
					  }).catch(() => {
						// on cancel
					  });
				}
			},
			stay(){
				uni.navigateBack({
				    delta: 1
				});
			},
			checkboxChange(e){
				console.log(e.detail.value)
				this.textArr = e.detail.value
			},
			getReason(){
				this.$api.club_login_out_reason({
					
				}).then(res=>{
					this.items = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import url("./ExitClubReason.css");
	
</style>
