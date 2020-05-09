<template>
	<view>
		<checkbox-group @change="checkboxChange">
			<label class="flex" v-for="item in items" :key="item.value" style="padding: 28upx 32upx;">
				<view style="margin-right: 30upx;">
					<checkbox :value="item.value"  color="#004DC5"/>
				</view>
				<view>{{item.name}}</view>
			</label>
		</checkbox-group>
		
		<view class="btn686" @click="report">
			确认举报
		</view>
		
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				contentlist:[],
				content:'',
				id:'',
				type:1,
				items: [],
				abc:'',
				person:''
			}
		},
		onShow() {
			this.content = ''
			this.get_reports()
		},
		onLoad(e) {
			console.log(e)
			this.id =Number(e.id) 
			this.type =Number(e.type)
			if(e.abc){
				this.abc = Number(e.abc)
				console.log(this.abc)
			}
			if(e.person){
				this.person = e.person
				console.log(this.person)
			}
			
		},
		methods: {
			get_reports(){
				this.$api.get_reports({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
				
					for(var val of res.data.data){
						this.items.push({
							name:val,
							value:val
						})
					}
				})
			},
			checkboxChange(e){
				this.contentlist = e.detail.value
			},
			report(){
				if(this.contentlist.length>0){
					for (var i = 0; i < this.contentlist.length; i++) {
						this.content += this.contentlist[i]
					}
					Dialog.confirm({
					  title: '提示',
					  message:'您是否确定举报？'
					}).then(() => {
						this.$api.report_dynamic({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							type:this.type,
							type_id:this.id,
							content:this.content
						}).then(res=>{
							
							if(res.data.code === '200'){
								uni.showToast({
									title:'举报成功',
									icon:'none'
								})
								if(this.abc){
									
									setTimeout(function() {
										uni.navigateBack({
										    delta: 1
										});
									}, 1000);
									
									return
									
								}
								
								if(this.person){
									uni.setStorageSync('reportid',this.id)
									setTimeout(function() {
										uni.navigateBack({
										    delta: 1
										});
									}, 1000);
									
									return
									
								}
								
								if(this.type === 1){
									uni.setStorageSync('reportid',this.id)
									setTimeout(function() {
										uni.switchTab({
										    url: '/pages/information/information'
										});
									}, 1000);
									
								}
								
								
								
								if(this.type === 2){
									setTimeout(function() {
										uni.navigateBack({
										    delta: 1
										});
									}, 1000);
									
								}
								
							}else{
								uni.showToast({
									title:'res.data.msg',
									icon:'none'
								})
							}
						})
					  
					}).catch(() => {
					  this.content = ''
					});
					
					
				}else{
					uni.showToast({
					    title: '请选择举报理由',
					    duration: 2000,
						icon:'none'
					});
				}
			}
		}
	}
</script>

<style>

</style>
