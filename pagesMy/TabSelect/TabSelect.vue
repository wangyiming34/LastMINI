<template>
	<view style="background-color: white;padding-bottom: 60px;">
		<view class="tab1">
			<view class="mytab" style="font-size:20px;font-weight:400;color:rgba(51,51,51,1);">
				分类标签 <text style="font-size:14px;font-weight:400;color:rgba(153,153,153,1)">（分类标签作为频道分类依据）</text>
			</view>
			
			<view  class="alltab1" @click="del" style="display: inline-block" v-if="first!=''">
				<text>{{first}}</text><text style="margin-left: 8px;">x</text>
			</view>
			
			<view class="mytab" style="font-size:20px;font-weight:400;color:rgba(51,51,51,1);">
				附属标签
			</view>
			<view class="flex" style="flex-wrap: wrap;" v-if="status==0">
				<view v-for="(item,index) in pList" :key="index" class="alltab1" @click="delTab(item,index)" v-show="item!=first">
					<text>{{item}}</text><text style="margin-left: 8px;">x</text>
				</view>
			</view>
			
			<view class="flex" style="flex-wrap: wrap;" v-if="status==1">
				<view v-for="(item,index) in mList" :key="index" class="alltab1" @click="delTab(item,index)" v-show="item!=first">
					<text>{{item}}</text><text style="margin-left: 8px;">x</text>
				</view>
			</view>
			
			<view class="flex" style="flex-wrap: wrap;" v-if="status==2">
				<view v-for="(item,index) in eList" :key="index" class="alltab1" @click="delTab(item,index)" v-show="item!=first">
					<text>{{item}}</text><text style="margin-left: 8px;">x</text>
				</view>
			</view>
		</view>
		<view class="tab-line">
			
		</view>
		<view class="tab2">
			<view class="mytab">
				所有标签
			</view>
			<view class="flex" style="flex-wrap: wrap;" v-if="status==0">
				<view v-for="(item,index) in list" :key="index" class="alltab" @click="selectTab(item,index)" :class="{tabactive:pList.indexOf(item)!=-1||item==first}">
					{{item}}
				</view>
				
				<view class="alltab" style="color:rgba(51,51,51,1);" @click.stop="add">
					<text>+</text><text style="margin-left: 8px;">添加标签</text>
				</view>
			</view>
			
			<view class="flex" style="flex-wrap: wrap;" v-if="status==1">
				<view v-for="(item,index) in list" :key="index" class="alltab" @click="selectTab(item,index)" :class="{tabactive:mList.indexOf(item)!=-1||item==first}">
					{{item}}
				</view>
				
				<view class="alltab" style="color:rgba(51,51,51,1);" @click.stop="add">
					<text>+</text><text style="margin-left: 8px;">添加标签</text>
				</view>
			</view>
			
			<view class="flex" style="flex-wrap: wrap;" v-if="status==2">
				<view v-for="(item,index) in list" :key="index" class="alltab" @click="selectTab(item,index)" :class="{tabactive:eList.indexOf(item)!=-1||item==first}">
					{{item}}
				</view>
				
				<view class="alltab" style="color:rgba(51,51,51,1);" @click.stop="add">
					<text>+</text><text style="margin-left: 8px;">添加标签</text>
				</view>
			</view>
		</view>
		
		<view class="publicFinish" @click="finish">
			完成
		</view>
		
		
		<van-dialog
		  use-slot
		  title="添加自定义标签"
		  :show="show"
		  show-cancel-button
		  @confirm="ok"
		  @cancel = "cancel"
		>
		  <view class="">
			<input type="text" v-model.trim="ipt" style="width: 80%;height: 40px;margin: 0 auto 20px;" placeholder="请输入标签" focus="true"/>
		  </view>
		  
		</van-dialog>
	</view>
</template>

<script>
	var app = getApp().globalData
	export default {
		data() {
			return {
				ipt:'',
				first:'',
				status:0,
				list:[],
				pList:[],
				mList:[],
				eList:[],
				zidingyi:[],
				show:false
			}
		},
		onLoad(e) {
			this.status = e.status
			if(this.status==0){
				this.first = app.pList[0]
			}
			
			if(this.status==1){
				this.first = app.mList[0]
			}
			
			if(this.status==2){
				this.first = app.eList[0]
			}
			this.pList = app.pList
			this.mList = app.mList
			this.eList = app.eList
			this.getTab()
		},
		methods: {
			// 添加自定义
			add(){
				this.show = true
			},
			ok(){
				if(this.list.indexOf(this.ipt)!=-1){
					uni.showToast({
					    title: '不能添加重复标签',
					    mask: "true",
						icon:'none'
					});
					this.show = false
					this.ipt = ''
				}else{
					this.show = false
					this.$api.add_user_label({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						label:this.ipt
					}).then(res=>{
						this.ipt = ''
						this.getTab()
					})
				}
				
			},
			cancel(){
				this.show = false
				this.ipt = ''
			},
			del(){
				if(this.status==0){
					this.pList = this.pList.filter((item,index)=>item != this.first)
					this.first = ''
				}
				
				if(this.status==1){
					this.mList = this.mList.filter((item,index)=>item != this.first)
					this.first = ''
				}
				
				if(this.status==2){
					this.eList = this.eList.filter((item,index)=>item != this.first)
					this.first = ''
				}
			},
			finish(){
				if(this.status==0){
					if(this.first){
						app.pList = this.pList
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
						    title: '请选择分类标签',
						    mask: "true",
							icon:'none'
						});
					}
					
				}
				
				if(this.status==1){
					if(this.first){
						app.mList = this.mList
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
						    title: '请选择分类标签',
						    mask: "true",
							icon:'none'
						});
					}
				}
				
				if(this.status==2){
					if(this.first){
						app.eList = this.eList
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
						    title: '请选择分类标签',
						    mask: "true",
							icon:'none'
						});
					}
				}
			},
			getTab(){
				this.$api.Opportunity_label({
				}).then(res=>{
					this.list = res.data.data
					this.$nextTick(()=>{
						this.getDingYi()
					})
				})
			},
			// 获取全部自定义标签
			getDingYi(){
				this.$api.get_user_label({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					this.zidingyi = res.data.data
					this.list =this.list.concat(res.data.data)
					// this.$nextTick(()=>{
					// 	this.getDingYi()
					// })
				})
			},
			selectTab(it,ind){
				if(this.status==0){
					// 判断有第一标签的,可以添加附属
					if(this.first){
						if(this.pList.indexOf(it)==-1){
							this.pList.push(it)
							
						}
					}else{
						// 如果没有,看看这个标签是不是自定义，是自定义不能添加到第一标签
						if(this.zidingyi.indexOf(it)==-1){
							this.first = it
							this.pList.unshift(it)
							// this.pList.push(it)
						}else{
							uni.showToast({
							    title: '自定义标签不可作为分类标签',
							    mask: "true",
								icon:'none'
							});
						}
					}
					
				}
				
				if(this.status==1){
					
					// 判断有第一标签的,可以添加附属
					if(this.first){
						if(this.mList.indexOf(it)==-1){
							this.mList.push(it)
						}
					}else{
						// 如果没有,看看这个标签是不是自定义，是自定义不能添加到第一标签
						if(this.zidingyi.indexOf(it)==-1){
							this.first = it
							this.mList.unshift(it)
							// this.pList.push(it)
						}else{
							uni.showToast({
							    title: '自定义标签不可作为分类标签',
							    mask: "true",
								icon:'none'
							});
						}
					}
					
					
				}
				
				if(this.status==2){
					
					// 判断有第一标签的,可以添加附属
					if(this.first){
						if(this.eList.indexOf(it)==-1){
							this.eList.push(it)
						}
					}else{
						// 如果没有,看看这个标签是不是自定义，是自定义不能添加到第一标签
						if(this.zidingyi.indexOf(it)==-1){
							this.first = it
							this.eList.unshift(it)
						}else{
							uni.showToast({
							    title: '自定义标签不可作为分类标签',
							    mask: "true",
								icon:'none'
							});
						}
					}
					
					
					
				}

			},
			delTab(it,ind){
				if(this.status==0){
					this.pList = this.pList.filter((item,index)=>item != it)
				}
				
				if(this.status==1){
					this.mList = this.mList.filter((item,index)=>item != it)
				}
				
				if(this.status==2){
					this.eList = this.eList.filter((item,index)=>item != it)
				}
				
			}
		}
	}
</script>

<style>
	@import url("./TabSelect.css");
</style>
