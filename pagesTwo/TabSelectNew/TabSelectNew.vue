<template>
	<view style="background-color: white;padding-bottom:60px ;">
		<view class="tab1">
			<view class="mytab">
				我的频道
			</view>
			<view class="flex" style="flex-wrap: wrap;">
				<view v-for="(item,index) in defaultList" :key="index" class="alltab1" style="padding: ;">
					<text>{{item}}</text>
				</view>
				<view v-for="(item,index) in pList" :key="index" class="alltab1" @click="delTab(item,index)">
					<text>{{item}}</text><text style="margin-left: 8px;">x</text>
				</view>
			</view>
			
		</view>
		<view class="tab-line">
			
		</view>
		<view class="tab2">
			<view class="mytab">
				推荐频道
			</view>
			<view class="flex" style="flex-wrap: wrap;">
				<view v-for="(item,index) in list" :key="index" class="alltab" @click="selectTab(item,index)" :class="{tabactive:pList.indexOf(item)!=-1||index<defaultList.length}">
					{{item}}
				</view>
			</view>
			
		</view>
		
		<view class="publicFinish" @click="finish">
			完成
		</view>
	</view>
</template>

<script>
	// var app = getApp().globalData
	export default {
		data() {
			return {
				list:[],
				pList:[],
				defaultList:[],
				lableString:''
				
			}
		},
		onLoad() {
		    this.getLable()
		},
		methods: {
			finish(){
				var s = ""
				if(this.pList.length>0){
					for(let val of this.pList){
						s += ','+val
					}
				    this.lableString = 	s.substr(1)
				}
				this.$api.add_label({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					label:this.lableString
				}).then(res=>{
					uni.redirectTo({
						url:"../../pagesTwo/ProjectList/ProjectList"
					})
					// uni.navigateBack({
					// 	delta:1
					// })
				})
			
			},
			// 获取自己添加的标签
			getAddLable(){
				this.$api.myself_label({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
				}).then(res=>{
					this.pList = res.data.data
					this.$nextTick(()=>{
						this.getTab()
					})
				})
			},	
			// 获取默认选项
			getLable(){
				this.$api.default_label({
				}).then(res => {
					this.defaultList = res.data.data
					this.$nextTick(()=>{
						this.getAddLable()
						// this.getTab()
					})
					
				})
			},
			getTab(){
				this.$api.Opportunity_label({
				}).then(res=>{
					this.list = res.data.data
					// console.log(this.list)
				})
			},
			selectTab(it,ind){
				if(ind>=this.defaultList.length){
					if(this.pList.indexOf(it)==-1){
						this.pList.push(it)
					}
					this.$nextTick(()=>{
						uni.pageScrollTo({
							scrollTop:1000
						})
					})
				}
				
				
				
				
				// if(this.status==1){
				// 	if(this.mList.indexOf(it)==-1){
				// 		this.mList.push(it)
				// 	}
				// }
				
				// if(this.status==2){
				// 	if(this.eList.indexOf(it)==-1){
				// 		this.eList.push(it)
				// 	}
				// }

			},
			delTab(it,ind){
				// if(ind>=this.defaultList.length){
					this.pList = this.pList.filter((item,index)=>item != it)
				// }
				// if(this.status==0){
				// 	this.pList = this.pList.filter((item,index)=>item != it)
				// }
				
				// if(this.status==1){
				// 	this.mList = this.mList.filter((item,index)=>item != it)
				// }
				
				// if(this.status==2){
				// 	this.eList = this.eList.filter((item,index)=>item != it)
				// }
				
			}
		}
	}
</script>

<style>
	@import url("./TabSelectNew.css");
</style>
